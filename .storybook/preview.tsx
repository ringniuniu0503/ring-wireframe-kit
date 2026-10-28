import type { Preview } from '@storybook/react-vite'
import '../src/styles/fonts.css'
import '../src/styles/tokens.css'

const preview: Preview = {
  parameters: {
    options: {
      // Sidebar order mirrors the sections of the Figma Wireframe Kit
      storySort: {
        order: [
          'Foundations',
          ['Introduction', 'Color', 'Typography', 'Spacing', 'Shape', 'Touch Targets', 'Iconography'],
          'Actions',
          'Inputs',
          'Navigation',
          'Content',
          'Feedback & Overlay',
          'Chat & AI',
        ],
      },
    },
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
  },
};

export default preview;