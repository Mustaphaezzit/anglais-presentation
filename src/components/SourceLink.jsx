import { ExternalLink } from 'lucide-react'

function getDomain(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return url
  }
}

export default function SourceLink({ number, author, title, url, anim = 'stagger' }) {
  const domain = getDomain(url)
  const fullTitle = author ? `${author} — ${title}` : title
  return (
    <li data-anim={anim || undefined} className="border-b border-line">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${fullTitle}, ${domain} (opens in new tab)`}
        className="group flex min-h-11 items-start gap-4 py-3"
      >
        <span aria-hidden="true" className="pt-0.5 font-mono text-sm text-ink-soft">
          {String(number).padStart(2, '0')}
        </span>
        <span className="flex-1">
          {author && (
            <span className="block text-sm text-ink-soft">{author}</span>
          )}
          <span className="block font-medium text-accent-text group-hover:underline group-focus-visible:underline">
            {title}
          </span>
          <span className="block font-mono text-xs text-ink-soft">{domain}</span>
        </span>
        <ExternalLink
          size={16}
          aria-hidden="true"
          className="mt-1 shrink-0 text-ink-soft"
        />
      </a>
    </li>
  )
}