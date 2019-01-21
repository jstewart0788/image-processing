import React, { PureComponent } from "react";
import { Provider } from "react-redux";
import { Route } from "react-router"; // react-router v4
import { ConnectedRouter } from "connected-react-router";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import { history, store } from "./Store";
import Home from "./Home";
import ToolKits from './ToolKits';
import NavBar from "./Global/NavBar";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#0277bd',
    },
  }
});


class App extends PureComponent {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <MuiThemeProvider theme={theme}>
            <>
              <Route path="/" component={NavBar} />
              <Route exact path="/" component={Home} />
              <Route exact path="/toolkits" component={ToolKits} />
            </>
          </MuiThemeProvider>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;