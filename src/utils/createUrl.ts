export const createUrl = <Key extends string>(
  path: string,
  params: Record<Key, string>
): string =>
  `${window.location.protocol}//${window.location.host}` +
  Object.keys(params)
    .reduce(
      (acc, key) => acc.replace(new RegExp(`:${key}\\??`), params[key as Key]),
      path
    )
    .replace(/:\w+\??\/?/g, '')
