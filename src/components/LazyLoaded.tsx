import { FC, Suspense } from 'react'

import Loading from 'components/Loading'

const LazyLoaded: FC = ({ children }) => {
  return <Suspense fallback={<Loading />}>{children}</Suspense>
}

export default LazyLoaded
