import { HexColor } from 'models/HexColor'
import { COLORS } from 'constants/colors.constants'

export const setCssVariable = (name: string, value: string) =>
  document.documentElement.style.setProperty(name, value)

export const initColors = () =>
  Object.entries(COLORS).forEach(([name, color]: [string, HexColor]) =>
    setCssVariable(`--color-${name.toLowerCase()}`, `${color}`)
  )
