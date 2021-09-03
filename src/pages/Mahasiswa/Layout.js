import { Flex } from 'components'
import Router from './Router'

export const Layout = () => {
  return (
    <Flex sx={{ py: 4, flexDirection: 'column', height: '100%' }}>
      <Router />
    </Flex>
  )
}
