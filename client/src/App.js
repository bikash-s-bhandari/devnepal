
import React, { useEffect } from 'react'
import './App.css';
import { Navbar, Home, Login, Register, Alert } from './Components/index'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux';
import store from './redux/store';
import { checkAuthentication } from './Utils/checkAuthentication'
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
            </Switch>

          </section>


        </Router>
      </Provider>
    </React.Fragment>

  );
}

export default App;
