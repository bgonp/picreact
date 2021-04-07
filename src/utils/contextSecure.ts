import { Context, createContext, useContext } from 'react'

export const createContextSecure = <T>(): Context<T | null> => {
  return createContext<T | null>(null)
}

export const useContextSecure = <T>(context: Context<T>): NonNullable<T> => {
  const contextValue = useContext(context)
  if (!contextValue) {
    throw new Error('Trying to use context with no parent provider')
  }
  return contextValue as NonNullable<T>
}
