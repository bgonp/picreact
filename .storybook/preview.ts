import type { Preview } from '@storybook/react'

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'white',
      values: [
        { name: 'white', value: 'var(--color-white)' },
        { name: 'first', value: 'var(--color-first)' },
        { name: 'second', value: 'var(--color-second)' },
      ],
    },
  },
}

export default preview
