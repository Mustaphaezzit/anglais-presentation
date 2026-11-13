export default function ComparisonTable({
  headers,
  rows,
  highlightColumn = 1, // colonne "expérimenté" en vert
  caption,
  className = '',
}) {
  const headCls = (c) =>
    c === highlightColumn ? 'text-accent-text' : 'text-ink-soft'

  return (
    <div className={className}>
      {/* md et plus : vrai tableau */}
      <table className="hidden w-full border-collapse text-left md:table">
        {caption && <caption className="sr-only">{caption}</caption>}
        <thead>
          <tr>
            {headers.map((h, c) => (
              <th
                key={h}
                scope="col"
                className={`border-b-2 px-4 py-3 font-mono text-xs uppercase tracking-[0.08em] ${headCls(c)} ${
                  c === highlightColumn ? 'border-accent' : 'border-line'
                }`}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row[0]}
              data-anim="stagger"
              className="border-b border-line align-top"
            >
              {row.map((cell, c) =>
                c === 0 ? (
                  <th
                    key={headers[c]}
                    scope="row"
                    className="px-4 py-3 text-left font-semibold"
                  >
                    {cell}
                  </th>
                ) : (
                  <td
                    key={headers[c]}
                    className={`px-4 py-3 ${c === highlightColumn ? 'bg-accent-tint/40' : ''}`}
                  >
                    {cell}
                  </td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {/* sous md : cartes empilées */}
      <ul className="space-y-3 md:hidden">
        {rows.map((row) => (
          <li key={row[0]} data-anim="stagger" className="panel p-4">
            <p className="mb-2 font-semibold">{row[0]}</p>
            <dl className="space-y-2">
              {row.slice(1).map((cell, i) => {
                const c = i + 1
                return (
                  <div key={headers[c]}>
                    <dt
                      className={`font-mono text-xs uppercase tracking-[0.08em] ${headCls(c)}`}
                    >
                      {headers[c]}
                    </dt>
                    <dd className="mt-0.5">{cell}</dd>
                  </div>
                )
              })}
            </dl>
          </li>
        ))}
      </ul>
    </div>
  )
}