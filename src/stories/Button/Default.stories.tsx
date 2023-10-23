import type { Meta, StoryObj } from '@storybook/react'

import { CloseIcon } from 'components/icons'
import { COLORS } from 'constants/colors.constants'
import { initCssVariables } from 'utils/styles'

import Button from 'components/Button'

initCssVariables()

const meta = {
  title: 'Components/Button/Default',
  component: Button,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'first',
    },
  },
  tags: ['autodocs'],
  args: {
    children: 'Button',
    title: 'Button',
  },
  argTypes: {
    asIcon: { control: false },
    primary: { control: false },
    secondary: { control: false },
    href: { control: false },
    to: { control: false },
    onClick: { control: false },
  },
} satisfies Meta<typeof Button>

export default meta

type Story = StoryObj<typeof meta>

const createStory = (
  args: {
    asIcon?: boolean
    large?: boolean
    outlined?: boolean
    disabled?: boolean
  } = {}
): Story => ({
  args: {
    ...(args.asIcon
      ? { children: <CloseIcon color={args.outlined ? COLORS.WHITE : COLORS.FIRST} /> }
      : null),
    ...args,
  },
  ...(args.asIcon ? { argTypes: { children: { control: false } } } : null),
})

export const Default = createStory({})

export const Disabled = createStory({ disabled: true })

export const Outlined = createStory({ outlined: true })

export const OutlinedDisabled = createStory({ outlined: true, disabled: true })

export const Large = createStory({ large: true })

export const LargeDisabled = createStory({ large: true, disabled: true })

export const LargeOutlined = createStory({ large: true, outlined: true })

export const LargeOutlinedDisabled = createStory({
  large: true,
  outlined: true,
  disabled: true,
})

export const Icon = createStory({ asIcon: true })

export const IconDisabled = createStory({ asIcon: true, disabled: true })

export const IconOutlined = createStory({ asIcon: true, outlined: true })

export const IconOutlinedDisabled = createStory({
  asIcon: true,
  outlined: true,
  disabled: true,
})

export const IconLarge = createStory({ asIcon: true, large: true })

export const IconLargeDisabled = createStory({
  asIcon: true,
  large: true,
  disabled: true,
})

export const IconLargeOutlined = createStory({
  asIcon: true,
  large: true,
  outlined: true,
})

export const IconLargeOutlinedDisabled = createStory({
  asIcon: true,
  large: true,
  outlined: true,
  disabled: true,
})
