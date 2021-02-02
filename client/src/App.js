
import React, { useEffect } from 'react'
import './App.css';
import { Navbar, Home, Login, Register, Alert } from './Components/index'
import Dashboard from './Pages/Dashboard/Dashboard'
import NotFound from './Pages/404/NotFound'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux';
import store from './redux/store';
import { checkAuthentication } from './Utils/checkAuthentication'
import PrivateRoute from './Utils/PrivateRoute'
const App = () => {
  const initialLoad = async () => {
    checkAuthentication();

  };

  useEffect(() => {
    initialLoad();


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
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <Route component={NotFound} />
            </Switch>

          </section>


        </Router>
      </Provider>
    </React.Fragment>

  );
}

export default App;
