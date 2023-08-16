import React, { FC } from 'react'
import Home from './Screens/Home'
import { MuiThemeProvider } from '@material-ui/core/styles'
import { CssBaseline } from '@material-ui/core'
import theme from './assets/themes/theme'
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom'
import { routes } from './core'
import { Provider } from 'react-redux'
import rootReducer from './store'

const App: FC = () => {
  return (
    <Provider store={rootReducer}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Home />
      </MuiThemeProvider>
    </Provider>
  )
}

export default App
