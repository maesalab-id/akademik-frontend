import { H2, Tabs, Tab } from '@blueprintjs/core'
import { Box, Divider, Flex } from 'components'
import { useNav } from 'pages/Root/hoc'
import React from 'react'
import { useHistory, useRouteMatch } from 'react-router'
import Router from './Router'

export const Layout = () => {
  const { location: { pathname } } = useHistory();
  const { path } = useRouteMatch();
  const navigation = useNav(path);

  return (
    <Flex sx={{ py: 4, flexDirection: 'column', height: '100%' }}>
      <Box sx={{ px: 3 }}>
        <Box as={H2} sx={{ m: 0, mb: 4 }}>Kelas</Box>
        <Tabs selectedTabId={pathname} onChange={tab => navigation.go(tab)}>
          {
            navigation.items.map((item, i) => (
              <Tab id={item.path} key={i} title={item.text} />
            ))
          }
        </Tabs>
      </Box>
      <Divider sx={{ mt: 0, mb: pathname.includes('detail') ? 0 : `8px` }} />
      <Router />
    </Flex>
  )
}

