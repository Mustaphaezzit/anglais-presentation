const SYSTEM_PROMPT = `You are a senior front-end developer. Build EXACTLY the website or app the user describes, whatever the topic (school, restaurant, shop, portfolio, club, game, tool...). If the request is vague, make confident, sensible choices.

OUTPUT FORMAT
- Output ONLY one complete HTML document, starting with <!DOCTYPE html>. No markdown fences, no explanation.
- CSS in one <style> tag, JavaScript in one <script> tag at the end of <body>. Keep the whole file under 350 lines and write compact code.
- All visible text in English.

DESIGN (it must look like a real professional website)
- Invent a believable brand name that fits the topic. Never use lorem ipsum: write realistic, specific content.
- Sticky navbar: a logo (a Lucide icon in a rounded colored square + the brand name), 3 to 5 nav links, and one call-to-action button.
- Hero section with a strong headline, one short sentence and two buttons.
- Then 3 to 4 sections that fit the topic (for example features, courses, menu, products, events, team, testimonials, pricing), then a contact or booking section, then a footer.
- Choose a coherent palette for the topic with CSS variables, rounded corners, soft shadows, generous spacing, clear typography hierarchy, system fonts only, good contrast, visible focus states, hover and transition effects.
- Responsive for a window about 600px wide and up: use flexbox/grid, and a hamburger menu under 700px that really opens and closes.
- No external images. Use CSS gradients, emoji or inline SVG for visuals.

ICONS
- Use Lucide icons with this exact script tag in <head>: <script src="https://unpkg.com/lucide@0.469.0/dist/umd/lucide.min.js"></script>
- Write icons as <i data-lucide="icon-name"></i> and call: if (window.lucide) lucide.createIcons(); once the page is ready AND again after every time you insert new HTML with JavaScript.
- Use only common icon names such as menu, x, search, shopping-cart, user, mail, phone, map-pin, calendar, clock, star, heart, check, arrow-right, graduation-cap, book-open, utensils, camera, car, sun, moon, trash-2, plus, minus, send, play.
- Never rely on icons alone: buttons and links must also have text or an aria-label.

INTERACTIVITY (every control must really work)
- Every button, link, tab, menu item, card and form must do something real. No dead buttons.
- Nav links scroll smoothly to their section using JavaScript (element.scrollIntoView({behavior:'smooth'})) and highlight the active link.
- The call-to-action opens a modal or scrolls to the form.
- Forms validate their fields and, on submit, call preventDefault and show a clear success message inside the page.
- Add interactions that fit the topic: add-to-cart with a live counter and a cart panel with totals (shop), category tabs or filters (menu, courses, gallery), a booking or reservation modal, an accordion FAQ, a lightbox, a light/dark toggle, working to-do or calculator logic (tools).
- Render lists from JavaScript arrays of realistic data, and keep the state in plain variables.
- Do NOT use alert, confirm, prompt, localStorage, sessionStorage, cookies or window.open: they are blocked. Use in-page modals, toasts and messages instead.
- Do not link to other pages. Use href="#" only together with preventDefault.`

const env = import.meta.env

// Les trois niveaux disponibles (un niveau sans modèle défini est ignoré)
const POOL = {
  premium: {
    name: 'OpenRouter Pro',
    url: '/api/openrouter/chat/completions',
    model: env.VITE_OPENROUTER_PREMIUM_MODEL,
    timeoutMs: 90000,
    maxTokens: 8000,
  },
  groq: {
    name: 'Groq',
    url: '/api/groq/chat/completions',
    model: env.VITE_GROQ_MODEL || 'openai/gpt-oss-120b',
    timeoutMs: 40000,
    maxTokens: 7000,
  },
  free: {
    name: 'OpenRouter Free',
    url: '/api/openrouter/chat/completions',
    model: env.VITE_OPENROUTER_MODEL || 'nvidia/nemotron-3.5-lightning:free',
    timeoutMs: 60000,
    maxTokens: 7000,
  },
}

// Ordre d'essai, modifiable dans .env : VITE_PROVIDER_ORDER=premium,groq,free
const ORDER = (env.VITE_PROVIDER_ORDER || 'premium,groq,free')
  .split(',')
  .map((key) => key.trim())

const PROVIDERS = ORDER.map((key) => POOL[key]).filter((p) => p && p.model)

// Retire les ```html ... ``` et le texte autour du document
function cleanHtml(raw) {
  let text = raw.trim()
  const fence = text.match(/```(?:html)?\s*([\s\S]*?)```/i)
  if (fence) text = fence[1].trim()
  const start = text.search(/<!doctype|<html|<head|<body|<style|<main|<section|<div/i)
  if (start > 0) text = text.slice(start)
  if (!/<\w+/.test(text)) throw new Error('No HTML in response')
  return text
}

async function callProvider({ url, model, timeoutMs, maxTokens }, prompt) {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model,
      temperature: 0.6,
      max_tokens: maxTokens,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: `Build this website or app: ${prompt}` },
      ],
    }),
    signal: AbortSignal.timeout(timeoutMs),
  })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)

  const data = await res.json()
  const choice = data?.choices?.[0]
  const content = choice?.message?.content
  if (!content) throw new Error('Empty response')

  const html = cleanHtml(content)
  // Page coupée : limite de longueur atteinte ou document jamais refermé
  const truncated =
    choice.finish_reason === 'length' || !/<\/html>|<\/body>/i.test(html)
  return { html, truncated }
}

/**
 * Essaie les niveaux dans l'ordre choisi. Une page coupée est refusée au profit
 * du niveau suivant, mais gardée en dernier recours si tous échouent.
 * Retourne { html, provider, failed } ; lève une erreur avec `failed` sinon.
 */
export async function generateApp(prompt) {
  const failed = []
  let partial = null

  for (const provider of PROVIDERS) {
    try {
      const { html, truncated } = await callProvider(provider, prompt)
      if (!truncated) return { html, provider: provider.name, failed }
      partial ??= { html, provider: provider.name }
      failed.push({ name: provider.name, reason: 'incomplete page' })
    } catch (e) {
      failed.push({
        name: provider.name,
        reason: e?.name === 'TimeoutError' ? 'timeout' : e?.message || 'error',
      })
    }
  }

  if (partial) return { html: partial.html, provider: partial.provider, failed }
  throw Object.assign(new Error('All providers failed'), { failed })
}