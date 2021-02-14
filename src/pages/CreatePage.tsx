import { FC, lazy } from 'react'

import LazyLoaded from 'components/LazyLoaded'

const Create = lazy(() => import('components/Create'))

const CreatePage: FC = () => {
  return (
    <LazyLoaded>
      <Create />
    </LazyLoaded>
  )
}

export default CreatePage
