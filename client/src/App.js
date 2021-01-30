
import React, { useEffect } from 'react'
import './App.css';
import { Navbar, Home, Login, Register, Alert } from './Components/index'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { Provider } from 'react-redux';
import store from './redux/store';
import setAuthToken from './Utils/setAuthToken'
import { getUserData } from './redux/Actions/authActions'
const App = () => {

  if (localStorage.token) {
    setAuthToken(localStorage.token)
  }

  useEffect(() => {
    store.dispatch(getUserData())


  }, [])
  return (

    <React.Fragment>
      <Provider store={store}>
        <Router>
          <Navbar />

          <Route exact path="/" component={Home} />
          <section className="container">
            <Alert />
            <Switch>
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
            </Switch>

          </section>


        </Router>
      </Provider>
    </React.Fragment>

  );
}

export default App;
