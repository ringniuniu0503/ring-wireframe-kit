// Reads token definitions straight from the generated tokens.css,
// so documentation pages never contain hand-typed values.
import tokensCss from '../styles/tokens.css?raw'

export type Token = {
  /** CSS variable name, e.g. "--rwk-color-text-primary" */
  name: string
  /** Variable this token points to, e.g. "--rwk-color-gray-900"; null for primitives */
  ref: string | null
}

const declaration = /^\s*(--rwk-[a-z0-9-]+):\s*(.+);\s*$/gm
const alias = /^var\((--rwk-[a-z0-9-]+)\)$/

export const tokens: Token[] = [...tokensCss.matchAll(declaration)].map(([, name, value]) => ({
  name,
  ref: value.match(alias)?.[1] ?? null,
}))

// Figma style names are written as comments above each text style, e.g. "/* Figma: WF/H1 */"
const figmaComment = /\/\* Figma: (.+?) \*\/\s*--rwk-text-([a-z0-9-]+)-font-family:/g
const figmaStyleNames = new Map(
  [...tokensCss.matchAll(figmaComment)].map(([, figmaName, style]) => [style, figmaName]),
)

/** Figma Text Style name for a text style, e.g. "h1" -> "WF/H1". */
export const figmaStyleName = (style: string) => figmaStyleNames.get(style) ?? style

/** Tokens whose name starts with the given prefix, in tokens.css order. */
export const tokensWithPrefix = (prefix: string) => tokens.filter((t) => t.name.startsWith(prefix))

/** The value the browser actually resolved for a token (aliases followed). */
export const resolveToken = (name: string) =>
  getComputedStyle(document.documentElement).getPropertyValue(name).trim()

/** Token name without the "--rwk-" prefix, for compact labels. */
export const shortName = (name: string) => name.replace(/^--rwk-/, '')
