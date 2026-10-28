import { resolveToken, shortName, tokensWithPrefix, type Token } from './tokens'
import './docs.css'

const colorTokens = tokensWithPrefix('--rwk-color-')

// Second name segment, e.g. "--rwk-color-text-primary" -> "text"
const groupOf = (token: Token) => shortName(token.name).split('-')[1]

function groupBy(list: Token[]) {
  const groups = new Map<string, Token[]>()
  for (const token of list) {
    const key = groupOf(token)
    groups.set(key, [...(groups.get(key) ?? []), token])
  }
  return [...groups]
}

function Swatch({ token, label }: { token: Token; label: string }) {
  return (
    <div className="rwk-doc-swatch">
      <div className="rwk-doc-swatch-chip" style={{ background: `var(${token.name})` }} />
      <span className="rwk-doc-swatch-name rwk-text-body-strong">{label}</span>
      {token.ref && (
        <span className="rwk-doc-swatch-meta rwk-text-caption">→ {shortName(token.ref)}</span>
      )}
      <span className="rwk-doc-swatch-value rwk-text-caption">{resolveToken(token.name)}</span>
    </div>
  )
}

/** Semantic colors grouped by role; each shows the primitive it points to. */
export function SemanticColors() {
  return groupBy(colorTokens.filter((t) => t.ref)).map(([group, list]) => (
    <div className="rwk-doc-group" key={group}>
      <h3 className="rwk-doc-group-title rwk-text-overline">{group}</h3>
      <div className="rwk-doc-swatch-grid">
        {list.map((token) => (
          <Swatch key={token.name} token={token} label={shortName(token.name)} />
        ))}
      </div>
    </div>
  ))
}

/** Primitive palette grouped by hue. Reference only. */
export function PrimitiveColors() {
  return groupBy(colorTokens.filter((t) => !t.ref)).map(([hue, list]) => (
    <div className="rwk-doc-group" key={hue}>
      <h3 className="rwk-doc-group-title rwk-text-overline">{hue}</h3>
      <div className="rwk-doc-swatch-grid rwk-doc-swatch-grid--compact">
        {list.map((token) => (
          <Swatch key={token.name} token={token} label={shortName(token.name)} />
        ))}
      </div>
    </div>
  ))
}
