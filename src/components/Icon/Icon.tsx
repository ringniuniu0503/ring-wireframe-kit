import './Icon.css'

export type IconSize = 'xs' | 's' | 'm' | 'l'

export type IconProps = {
  /** Material Symbols Rounded icon name, e.g. "search", "home", "settings" */
  name?: string
  /** Icon size, mapped to the --rwk-size-icon-* tokens */
  size?: IconSize
  /**
   * Accessible name read by screen readers. Leave empty for decorative icons,
   * which are then hidden from assistive technology.
   */
  label?: string
}

/**
 * Material Symbols Rounded icon. The color always follows the surrounding text color.
 *
 * Placeholder phase: renders an outlined box at the correct size, with the icon name
 * shown on hover. Swapping in the real glyph will only change this component's internals.
 */
export function Icon({ name = 'star', size = 'xs', label }: IconProps) {
  const a11y = label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': true }

  return <span className={`rwk-icon rwk-icon--${size}`} data-icon={name} title={name} {...a11y} />
}
