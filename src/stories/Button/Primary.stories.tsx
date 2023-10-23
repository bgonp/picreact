import type { Meta, StoryObj } from '@storybook/react'

import { CloseIcon } from 'components/icons'
import { COLORS } from 'constants/colors.constants'
import { initCssVariables } from 'utils/styles'

import Button from 'components/Button'

initCssVariables()

const meta = {
  title: 'Components/Button/Primary',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    children: 'Button',
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
    primary: true,
    ...(args.asIcon
      ? { children: <CloseIcon color={args.outlined ? COLORS.FIRST : COLORS.WHITE} /> }
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
