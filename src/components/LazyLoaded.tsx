import { FC, ReactNode, Suspense } from 'react'

import Loading from 'components/Loading'

const LazyLoaded: FC<{ children: ReactNode }> = ({ children }) => {
  return <Suspense fallback={<Loading />}>{children}</Suspense>
}

export default LazyLoaded
