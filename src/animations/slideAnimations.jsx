import { gsap } from 'gsap'

const OFFSET = 20 // px (≤ 24)
const EASE = 'power3.out'

export function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// Éléments animables, toujours scopés à la slide (jamais de sélecteur global)
function getTargets(slideEl) {
  const pick = (name) =>
    Array.from(slideEl.querySelectorAll(`[data-anim="${name}"]`))
  return {
    title: pick('title'),
    fade: pick('fade'),
    stagger: pick('stagger'),
    panel: pick('panel'),
    connector: pick('connector'),
  }
}

/* ---------- Effet "machine à écrire" (CodePanel typing) ---------- */
const typingTweens = new WeakMap()

function stopTyping(slideEl) {
  const items = typingTweens.get(slideEl)
  if (!items) return
  items.forEach(({ tween, node, full }) => {
    tween.kill()
    node.nodeValue = full // on restaure toujours le texte complet
  })
  typingTweens.delete(slideEl)
}

function startTyping(slideEl) {
  stopTyping(slideEl)
  const items = []
  slideEl.querySelectorAll('[data-typing]').forEach((el) => {
    const full = el.dataset.typing
    const node = el.firstChild // nœud texte géré par React : on le modifie sans le remplacer
    if (!full || !node) return
    const state = { n: 0 }
    node.nodeValue = ''
    const tween = gsap.to(state, {
      n: full.length,
      duration: Math.min(2.2, full.length * 0.025),
      delay: 0.6,
      ease: 'none',
      onUpdate: () => {
        node.nodeValue = full.slice(0, Math.round(state.n))
      },
      onComplete: () => {
        node.nodeValue = full
      },
    })
    items.push({ tween, node, full })
  })
  if (items.length) typingTweens.set(slideEl, items)
}

/* ---------- Flèches du WorkflowDiagram ---------- */
const loopTimelines = new WeakMap()

function stopLoops(slideEl) {
  const loops = loopTimelines.get(slideEl)
  if (loops) {
    loops.forEach((loop) => loop.kill())
    loopTimelines.delete(slideEl)
  }
  const pulses = slideEl.querySelectorAll('[data-pulse]')
  if (pulses.length) gsap.set(pulses, { opacity: 0, x: 0, y: 0 })
}

// Lit les 3 parties d'une flèche et son sens (horizontal ou vertical selon l'écran)
function connectorParts(connector) {
  const line = connector.querySelector('[data-line]')
  const head = connector.querySelector('[data-head]')
  const pulse = connector.querySelector('[data-pulse]')
  const horizontal = line ? line.offsetWidth >= line.offsetHeight : true
  return { line, head, pulse, horizontal }
}

function revealConnectors(tl, slideEl, connectors, startAt) {
  if (!connectors.length) return
  const items = connectors.map(connectorParts)

  // États de départ
  items.forEach(({ line, head, pulse, horizontal }) => {
    if (line) {
      gsap.set(
        line,
        horizontal
          ? { scaleX: 0, scaleY: 1, transformOrigin: '0% 50%' }
          : { scaleX: 1, scaleY: 0, transformOrigin: '50% 0%' },
      )
    }
    if (head) gsap.set(head, { opacity: 0, x: -6 })
    if (pulse) gsap.set(pulse, { opacity: 0, x: 0, y: 0 })
  })

  // 1. Le trait se dessine, 2. la pointe apparaît avec un petit rebond
  items.forEach(({ line, head, horizontal }, i) => {
    const at = startAt + i * 0.1
    if (line) {
      tl.to(
        line,
        horizontal
          ? { scaleX: 1, duration: 0.3, ease: 'power2.out' }
          : { scaleY: 1, duration: 0.3, ease: 'power2.out' },
        at,
      )
    }
    if (head) {
      tl.to(head, { opacity: 1, x: 0, duration: 0.2, ease: 'back.out(2)' }, at + 0.22)
    }
  })

  // 3. Une lumière glisse le long de chaque flèche, en boucle, l'une après l'autre
  const loops = []
  items.forEach(({ line, pulse, horizontal }, i) => {
    if (!line || !pulse) return
    const prop = horizontal ? 'x' : 'y'
    const length = horizontal ? line.offsetWidth : line.offsetHeight
    if (!length) return

    const loop = gsap.timeline({
      repeat: -1,
      repeatDelay: 1,
      delay: startAt + 0.9 + i * 0.3,
    })
    loop
      .set(pulse, { [prop]: 0, opacity: 0 })
      .to(pulse, { opacity: 1, duration: 0.15 })
      .to(pulse, { [prop]: length, duration: 0.9, ease: 'power1.inOut' }, '<')
      .to(pulse, { opacity: 0, duration: 0.15 }, '>-0.15')
    loops.push(loop)
  })
  if (loops.length) loopTimelines.set(slideEl, loops)
}

/* ---------- Entrée / sortie ---------- */
export function animateIn(slideEl, { direction = 1 } = {}) {
  const tl = gsap.timeline()
  if (!slideEl) return tl

  stopLoops(slideEl)

  const t = getTargets(slideEl)
  const children = [...t.title, ...t.fade, ...t.stagger, ...t.panel]

  // Reduced motion : affichage immédiat, aucun mouvement
  if (prefersReducedMotion()) {
    stopTyping(slideEl)
    tl.set(slideEl, { visibility: 'visible', opacity: 1, y: 0 })
    if (children.length) tl.set(children, { opacity: 1, y: 0 })
    const lines = slideEl.querySelectorAll('[data-line]')
    const heads = slideEl.querySelectorAll('[data-head]')
    if (lines.length) tl.set(lines, { scaleX: 1, scaleY: 1 })
    if (heads.length) tl.set(heads, { opacity: 1, x: 0 })
    return tl
  }

  // État initial caché posé en JS (évite le flash)
  gsap.set(slideEl, { opacity: 0, y: OFFSET * direction })
  if (children.length) gsap.set(children, { opacity: 0, y: OFFSET })

  tl.set(slideEl, { visibility: 'visible' })
  tl.to(slideEl, { opacity: 1, y: 0, duration: 0.2, ease: EASE })

  // Le délai entre éléments est plafonné pour garder une durée totale courte
  const reveal = (els, at, stagger = 0) => {
    if (!els.length) return
    const each = els.length > 1 ? Math.min(stagger, 0.5 / (els.length - 1)) : 0
    tl.to(els, { opacity: 1, y: 0, duration: 0.4, stagger: each, ease: EASE }, at)
  }
  reveal(t.title, 0.1, 0.1)
  reveal(t.fade, 0.2)
  reveal(t.stagger, 0.25, 0.1)
  reveal(t.panel, Math.max(0.4, tl.duration() - 0.3))

  revealConnectors(tl, slideEl, t.connector, 0.45)

  startTyping(slideEl) // indépendant de tl : ne bloque pas la navigation
  return tl
}

export function animateOut(slideEl, { direction = 1 } = {}) {
  const tl = gsap.timeline()
  if (!slideEl) return tl

  stopTyping(slideEl)
  stopLoops(slideEl)

  if (prefersReducedMotion()) {
    tl.set(slideEl, { opacity: 0, visibility: 'hidden' })
    return tl
  }

  tl.to(slideEl, {
    opacity: 0,
    y: -12 * direction,
    duration: 0.3,
    ease: 'power2.in',
  })
  tl.set(slideEl, { visibility: 'hidden' })
  return tl
}