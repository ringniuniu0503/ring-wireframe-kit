import type { Meta, StoryObj } from '@storybook/react-vite'
import { Icon, type IconSize } from './Icon'

const sizes: IconSize[] = ['xs', 's', 'm', 'l']

const meta = {
  title: 'Foundations/Icon',
  component: Icon,
  args: { name: 'star', size: 'xs' },
  argTypes: {
    size: { control: 'inline-radio', options: sizes },
  },
} satisfies Meta<typeof Icon>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--rwk-space-lg)' }}>
      {sizes.map((size) => (
        <Icon key={size} {...args} size={size} />
      ))}
    </div>
  ),
}

export const InheritsTextColor: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--rwk-space-sm)' }}>
      {(['--rwk-color-text-primary', '--rwk-color-text-secondary', '--rwk-color-status-error'] as const).map((color) => (
        <span
          key={color}
          className="rwk-text-body-default"
          style={{ display: 'flex', alignItems: 'center', gap: 'var(--rwk-space-xs)', color: `var(${color})` }}
        >
          <Icon {...args} />
          Text in {color.replace('--rwk-', '')}
        </span>
      ))}
    </div>
  ),
}

export const WithLabel: Story = {
  args: { name: 'favorite', size: 'm', label: 'Favorite' },
}
