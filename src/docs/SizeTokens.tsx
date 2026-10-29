import type { ReactNode } from 'react'
import { resolveToken, shortName, tokensWithPrefix, type Token } from './tokens'
import './docs.css'

// Semantic tokens only (they point to a primitive), in tokens.css order
const semantic = (prefix: string) => tokensWithPrefix(prefix).filter((t) => t.ref)

// Last name segment, e.g. "--rwk-space-2xl" -> "2xl", "--rwk-size-touch-car" -> "car"
const lastSegment = (token: Token) => token.name.split('-').pop() ?? token.name

function TokenLabel({ token }: { token: Token }) {
  return (
    <div className="rwk-doc-token-label">
      <span className="rwk-text-body-strong">{shortName(token.name)}</span>
      <span className="rwk-doc-swatch-meta rwk-text-caption">→ {shortName(token.ref ?? '')}</span>
      <span className="rwk-doc-token-value rwk-text-caption">{resolveToken(token.name)}</span>
    </div>
  )
}

/** One row per spacing token, with a bar as long as the value. */
export function SpacingScale() {
  return (
    <div className="rwk-doc-scale">
      {semantic('--rwk-space-').map((token) => (
        <div className="rwk-doc-scale-row" key={token.name}>
          <TokenLabel token={token} />
          <div className="rwk-doc-scale-track">
            <div className="rwk-doc-scale-bar" style={{ width: `var(${token.name})` }} />
          </div>
        </div>
      ))}
    </div>
  )
}

function SampleGrid({ items }: { items: { token: Token; sample: ReactNode }[] }) {
  return (
    <div className="rwk-doc-swatch-grid">
      {items.map(({ token, sample }) => (
        <div className="rwk-doc-swatch" key={token.name}>
          <div className="rwk-doc-sample-stage">{sample}</div>
          <TokenLabel token={token} />
        </div>
      ))}
    </div>
  )
}

/** Same-size squares, one per corner radius. */
export function RadiusSamples() {
  return (
    <SampleGrid
      items={semantic('--rwk-radius-').map((token) => ({
        token,
        sample: <div className="rwk-doc-shape" style={{ borderRadius: `var(${token.name})` }} />,
      }))}
    />
  )
}

/** Same-size squares, one per border width. */
export function BorderWidthSamples() {
  return (
    <SampleGrid
      items={semantic('--rwk-border-width-').map((token) => ({
        token,
        sample: <div className="rwk-doc-shape rwk-doc-shape--outlined" style={{ borderWidth: `var(${token.name})` }} />,
      }))}
    />
  )
}

type TouchTargetsProps = {
  /** When to use each size, keyed by the last name segment (e.g. "mobile") */
  usage: Record<string, string>
  /** Marks the usage notes as a draft awaiting review */
  draft?: boolean
}

/** Actual-size boxes for each touch target, with usage notes. */
export function TouchTargets({ usage, draft = false }: TouchTargetsProps) {
  return (
    <div className="rwk-doc-touch-row">
      {semantic('--rwk-size-touch-').map((token) => (
        <div className="rwk-doc-touch-item" key={token.name}>
          <div
            className="rwk-doc-touch-box"
            style={{ width: `var(${token.name})`, height: `var(${token.name})` }}
          />
          <TokenLabel token={token} />
          {usage[lastSegment(token)] && (
            <p className="rwk-doc-type-usage rwk-text-body-default">
              {draft && <span className="rwk-doc-badge rwk-text-overline">Draft</span>}
              {usage[lastSegment(token)]}
            </p>
          )}
        </div>
      ))}
    </div>
  )
}

/** Inline token value for prose, so numbers in sentences are never hand-typed. */
export function TokenValue({ name }: { name: string }) {
  return <>{resolveToken(name)}</>
}
