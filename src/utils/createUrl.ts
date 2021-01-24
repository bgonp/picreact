export const createUrl = (path: string, params: { [key: string]: string } = {}): string =>
  `${window.location.protocol}//${window.location.host}` +
  Object.keys(params)
    .reduce((acc, key) => acc.replace(new RegExp(`:${key}\\??`), params[key]), path)
    .replace(/:\w+\??\/?/g, '')
