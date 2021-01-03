import { MouseEvent, useCallback, useState } from 'react'

type useClickControlType = {
  handleMouseDown: (e: MouseEvent) => void
  handleMouseUp: (e: MouseEvent) => void
  handleMouseLeave: () => void
  isLeftClicked: boolean
  isRightClicked: boolean
}

export const useClickControl = (): useClickControlType => {
  const [isLeftClicked, setLeftClicked] = useState<boolean>(false)

  const [isRightClicked, setRightClicked] = useState<boolean>(false)

  const handleMouseDown = useCallback<(e: MouseEvent) => void>(({ button }) => {
    if (button === 0) setLeftClicked(true)
    else if (button === 2) setRightClicked(true)
  }, [])

  const handleMouseUp = useCallback<(e: MouseEvent) => void>(({ button }) => {
    if (button === 0) setLeftClicked(false)
    else if (button === 2) setRightClicked(false)
  }, [])

  const handleMouseLeave = useCallback<() => void>(() => {
    setLeftClicked(false)
    setRightClicked(false)
  }, [])

  return {
    handleMouseDown,
    handleMouseUp,
    handleMouseLeave,
    isLeftClicked,
    isRightClicked,
  }
}
