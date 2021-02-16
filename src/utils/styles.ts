import { HexColor } from 'models/HexColor'
import { COLORS } from 'constants/colors.constants'
import { TIMES } from 'constants/times.constants'

export const setCssVariable = (name: string, value: string) =>
  document.documentElement.style.setProperty(name, value)

export const initCssVariables = () => {
  Object.entries(COLORS).forEach(([name, color]: [string, HexColor]) =>
    setCssVariable(`--color-${name.toLowerCase()}`, `${color}`)
  )
  Object.entries(TIMES).forEach(([name, milliseconds]: [string, number]) =>
    setCssVariable(`--time-${name.toLowerCase()}`, `${milliseconds}ms`)
  )
}
