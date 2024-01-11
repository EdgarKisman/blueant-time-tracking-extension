import React, { type PropsWithChildren, useState } from 'react'
import {
  Box,
  Button,
  Grommet,
  grommet,
  Header,
  Page,
  PageContent,
  Text,
} from 'grommet'
import { Moon, Sun } from 'grommet-icons'
import { deepMerge } from 'grommet/utils'
import LoginPage from './pages/login/LoginPage'
import TimeOverviewPage from './pages/overview/TimeOverviewPage'
import { AuthContext } from './context/AuthContext'
import useAuthentication from './hooks/useAuthentication'
import isNil from 'lodash/isNil'

const theme = deepMerge(grommet, {
  global: {
    colors: {
      brand: 'rgba(0,100,163,0.75)',
    },
    font: {
      family: 'Roboto',
      size: '18px',
      height: '20px',
    },
  },
})

const AppBar = (props: PropsWithChildren): JSX.Element => (
  <Header
    background="brand"
    pad={{ left: 'medium', right: 'small', vertical: 'small' }}
    elevation="medium"
    {...props}
  />
)

const App = (): JSX.Element => {
  const [darkMode, setDarkMode] = useState(false)
  const authentication = useAuthentication()

  return (
    <Grommet theme={theme} full themeMode={darkMode ? 'dark' : 'light'}>
      <AuthContext.Provider value={authentication}>
        <Page>
          <AppBar>
            <Text size="large">BlueAnt Time Tracker</Text>
            <Button
              icon={darkMode ? <Moon /> : <Sun />}
              data-testid="toggle-theme-btn"
              onClick={() => {
                setDarkMode(!darkMode)
              }}
              tip={{
                content: (
                  <Box
                    pad="small"
                    round="small"
                    background={darkMode ? 'dark-1' : 'light-3'}
                  >
                    {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                  </Box>
                ),
              }}
            />
          </AppBar>
          <PageContent>
            {!isNil(authentication.user?.session) ? (
              <TimeOverviewPage />
            ) : (
              <LoginPage />
            )}
          </PageContent>
        </Page>
      </AuthContext.Provider>
    </Grommet>
  )
}

export default App
