import { FC, lazy } from 'react'

import Wrapper from 'components/Wrapper'

const Create = lazy(() => import('components/Create'))

const CreatePage: FC = () => {
  return (
    <Wrapper>
      <Create />
    </Wrapper>
  )
}

export default CreatePage
