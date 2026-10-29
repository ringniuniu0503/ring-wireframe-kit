import { figmaStyleName, resolveToken, shortName, tokens, tokensWithPrefix } from './tokens'
import './docs.css'

// Style names in tokens.css order, e.g. "h1", "body-large"
const styleNames = tokensWithPrefix('--rwk-text-')
  .filter((t) => t.name.endsWith('-font-size'))
  .map((t) => shortName(t.name).replace(/^text-/, '').replace(/-font-size$/, ''))

const styleToken = (style: string, prop: string) => `--rwk-text-${style}-${prop}`

// The primitive a text-style token points to, e.g. "--rwk-font-weight-bold" -> "bold"
const primitiveLabel = (style: string, prop: string, primitivePrefix: string) => {
  const ref = tokens.find((t) => t.name === styleToken(style, prop))?.ref ?? ''
  return ref.replace(primitivePrefix, '')
}

function Specs({ style }: { style: string }) {
  const size = resolveToken(styleToken(style, 'font-size'))
  const weight = resolveToken(styleToken(style, 'font-weight'))
  const lineHeight = resolveToken(styleToken(style, 'line-height'))
  const lineHeightPx = parseFloat(size) * parseFloat(lineHeight)
  // "bold" -> "Bold", matching the Figma font style names
  const weightName = primitiveLabel(style, 'font-weight', '--rwk-font-weight-').replace(/^./, (c) => c.toUpperCase())

  const rows: [string, string][] = [
    ['Class', `.rwk-text-${style}`],
    ['Size', size],
    ['Weight', `${weight} · ${weightName}`],
    ['Line height', `${lineHeight} (${lineHeightPx}px)`],
    ['Letter spacing', resolveToken(styleToken(style, 'letter-spacing'))],
  ]

  return (
    <dl className="rwk-doc-specs">
      {rows.map(([label, value]) => (
        <div className="rwk-doc-specs-row" key={label}>
          <dt className="rwk-doc-specs-label rwk-text-caption">{label}</dt>
          <dd className="rwk-doc-specs-value rwk-text-body-default">{value}</dd>
        </div>
      ))}
    </dl>
  )
}

type TypeScaleProps = {
  /** Sample sentences shown in every style */
  samples: { en: string; zh: string }
  /** When to use each style, keyed by style name (e.g. "h1", "body-large") */
  usage: Record<string, string>
  /** Marks the usage notes as a draft awaiting review */
  draft?: boolean
}

/** One row per text style: live preview on the left, token-driven specs on the right. */
export function TypeScale({ samples, usage, draft = false }: TypeScaleProps) {
  return (
    <div className="rwk-doc-type-list">
      {styleNames.map((style) => (
        <div className="rwk-doc-type-row" key={style}>
          <div className="rwk-doc-type-preview">
            <span className="rwk-doc-group-title rwk-text-overline">{figmaStyleName(style)}</span>
            <p className={`rwk-text-${style}`}>{samples.en}</p>
            <p className={`rwk-text-${style}`}>{samples.zh}</p>
            {usage[style] && (
              <p className="rwk-doc-type-usage rwk-text-body-default">
                {draft && <span className="rwk-doc-badge rwk-text-overline">Draft</span>}
                {usage[style]}
              </p>
            )}
          </div>
          <Specs style={style} />
        </div>
      ))}
    </div>
  )
}
