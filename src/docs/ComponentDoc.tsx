// Building blocks for component documentation pages (Material Design 3 style).
// Every value shown is read from tokens, so docs stay in sync with components.
import type { ReactNode } from 'react'
import { resolveToken, shortName } from './tokens'
import './docs.css'

/** Page title, one-line summary and a link to the Figma source. */
export function DocHeader({ title, summary, figmaUrl }: { title: string; summary: ReactNode; figmaUrl: string }) {
  return (
    <div className="rwk-doc-section">
      <h1 className="rwk-text-h1">{title}</h1>
      <p className="rwk-doc-lead rwk-text-body-large">{summary}</p>
      <a className="rwk-doc-link rwk-text-body-strong" href={figmaUrl} target="_blank" rel="noreferrer">
        View in Figma
      </a>
    </div>
  )
}

/** A titled documentation section. Pass `draft` while the content awaits review. */
export function DocSection({ title, draft = false, children }: { title: string; draft?: boolean; children: ReactNode }) {
  return (
    <div className="rwk-doc-section">
      <h2 className="rwk-text-h2">
        {title}
        {draft && <span className="rwk-doc-badge rwk-doc-badge--heading rwk-text-overline">Draft</span>}
      </h2>
      {children}
    </div>
  )
}

// Doc illustrations are magnified so small parts can be labeled; this is not a design value.
const ANATOMY_ZOOM = 4

type AnatomyPart = {
  label: string
  description: string
  /** Marker position relative to the component, as CSS percentages, e.g. "50%" */
  x: string
  y: string
}

/** Magnified component with numbered markers and a matching legend. */
export function Anatomy({ children, parts }: { children: ReactNode; parts: AnatomyPart[] }) {
  return (
    <div className="rwk-doc-anatomy">
      <div className="rwk-doc-stage">
        <div className="rwk-doc-anatomy-frame">
          <div style={{ zoom: ANATOMY_ZOOM }}>{children}</div>
          {parts.map((part, i) => (
            <span className="rwk-doc-marker rwk-text-caption" key={part.label} style={{ left: part.x, top: part.y }}>
              {i + 1}
            </span>
          ))}
        </div>
      </div>
      <ol className="rwk-doc-legend">
        {parts.map((part, i) => (
          <li className="rwk-doc-legend-item" key={part.label}>
            <span className="rwk-doc-marker rwk-doc-marker--static rwk-text-caption">{i + 1}</span>
            <span>
              <span className="rwk-text-body-strong">{part.label}</span>
              <span className="rwk-doc-swatch-meta rwk-text-body-default"> — {part.description}</span>
            </span>
          </li>
        ))}
      </ol>
    </div>
  )
}

/** Wraps a component at actual size with redline dimension markers read from tokens. */
export function Measure({
  width,
  height,
  label,
  children,
}: {
  /** Token that sets the width, e.g. "--rwk-size-icon-m" */
  width?: string
  /** Token that sets the height */
  height?: string
  /** Caption under the sample, e.g. the variant name */
  label?: string
  children: ReactNode
}) {
  return (
    <figure className="rwk-doc-measure">
      <div className="rwk-doc-measure-target">
        {width && (
          <span className="rwk-doc-dim rwk-doc-dim--width">
            <span className="rwk-text-caption">{resolveToken(width)}</span>
          </span>
        )}
        {height && (
          <span className="rwk-doc-dim rwk-doc-dim--height">
            <span className="rwk-text-caption">{resolveToken(height)}</span>
          </span>
        )}
        {children}
      </div>
      {label && <figcaption className="rwk-doc-swatch-meta rwk-text-caption">{label}</figcaption>}
    </figure>
  )
}

/** Row of Measure samples on a shared stage. */
export function MeasureRow({ children }: { children: ReactNode }) {
  return <div className="rwk-doc-stage rwk-doc-measure-row">{children}</div>
}

type SpecRow = { part: string; property: string; token: string }

/** Property / token / value table; values are resolved from tokens at render time. */
export function SpecTable({ rows }: { rows: SpecRow[] }) {
  return (
    <table className="rwk-doc-table">
      <thead>
        <tr className="rwk-text-caption">
          <th>Part</th>
          <th>Property</th>
          <th>Token</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody className="rwk-text-body-default">
        {rows.map((row) => (
          <tr key={`${row.part}-${row.property}`}>
            <td>{row.part}</td>
            <td>{row.property}</td>
            <td><code>{row.token}</code></td>
            <td>{resolveToken(row.token)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

type ColorRow = {
  part: string
  state: string
  /** Color token; omit when the color is inherited and describe it in `note` */
  token?: string
  note?: string
}

/** Part × state → color token table, with a swatch of the resolved color. */
export function ColorTable({ rows }: { rows: ColorRow[] }) {
  return (
    <table className="rwk-doc-table">
      <thead>
        <tr className="rwk-text-caption">
          <th>Part</th>
          <th>State</th>
          <th>Token</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody className="rwk-text-body-default">
        {rows.map((row) => (
          <tr key={`${row.part}-${row.state}`}>
            <td>{row.part}</td>
            <td>{row.state}</td>
            <td>
              {row.token && <code>{shortName(row.token)}</code>}
              {row.note && <span className="rwk-doc-swatch-meta"> {row.note}</span>}
            </td>
            <td>
              {row.token ? (
                <span className="rwk-doc-color-value">
                  <span className="rwk-doc-color-dot" style={{ background: `var(${row.token})` }} />
                  {resolveToken(row.token)}
                </span>
              ) : (
                <span className="rwk-doc-swatch-meta">Inherited</span>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
