import copy from 'copy-to-clipboard'

const TITLE = 'Try this PICREACT puzzle!'
const SHARED_MSG = 'Sharing puzzle!'
const COPIED_MSG = 'Puzzle URL copied!'

export const share = (url: string, callback: (message: string) => void): void => {
  if (typeof navigator.share === 'function') {
    navigator.share({ title: TITLE, url }).then(() => callback(SHARED_MSG))
  } else {
    copy(url)
    callback(COPIED_MSG)
  }
}
