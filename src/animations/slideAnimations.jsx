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

/* ---------- Entrée / sortie ---------- */
export function animateIn(slideEl, { direction = 1 } = {}) {
  const tl = gsap.timeline()
  if (!slideEl) return tl

  const t = getTargets(slideEl)
  const children = [...t.title, ...t.fade, ...t.stagger, ...t.panel]

  // Reduced motion : affichage immédiat, aucun mouvement
  if (prefersReducedMotion()) {
    stopTyping(slideEl)
    tl.set(slideEl, { visibility: 'visible', opacity: 1, y: 0 })
    if (children.length) tl.set(children, { opacity: 1, y: 0 })
    if (t.connector.length) tl.set(t.connector, { scaleX: 1 })
    return tl
  }

  // État initial caché posé en JS (évite le flash)
  gsap.set(slideEl, { opacity: 0, y: OFFSET * direction })
  if (children.length) gsap.set(children, { opacity: 0, y: OFFSET })
  if (t.connector.length) {
    gsap.set(t.connector, { scaleX: 0, transformOrigin: '0% 50%' })
  }

  tl.set(slideEl, { visibility: 'visible' })
  tl.to(slideEl, { opacity: 1, y: 0, duration: 0.2, ease: EASE })

  const reveal = (els, at, stagger = 0) => {
    if (!els.length) return
    const each = els.length > 1 ? Math.min(stagger, 0.5 / (els.length - 1)) : 0
    tl.to(els, { opacity: 1, y: 0, duration: 0.4, stagger: each, ease: EASE }, at)
  }
  reveal(t.title, 0.1, 0.1)
  reveal(t.fade, 0.2)
  reveal(t.stagger, 0.25, 0.1)
  reveal(t.panel, Math.max(0.4, tl.duration() - 0.3))

  if (t.connector.length) {
    tl.to(
      t.connector,
      { scaleX: 1, duration: 0.3, stagger: 0.1, ease: 'power2.out' },
      0.45,
    )
  }

  startTyping(slideEl) // indépendant de tl : ne bloque pas la navigation
  return tl
}

export function animateOut(slideEl, { direction = 1 } = {}) {
  const tl = gsap.timeline()
  if (!slideEl) return tl

  stopTyping(slideEl)

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