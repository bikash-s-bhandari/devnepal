
import React, { useEffect } from 'react'
import './App.css';
import { Navbar, Home, Login, Register, Alert } from './Components/index'
import { Dashboard, ProfileForm, AddEducation, AddExperience, Posts, PostDetail, NotFound } from './Pages'
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
              <PrivateRoute exact path="/posts" component={Posts} />
              <PrivateRoute exact path="/posts/:id" component={PostDetail} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute exact path="/edit-profile" component={ProfileForm} />
              <PrivateRoute exact path="/add-education" component={AddEducation} />
              <PrivateRoute exact path="/add-experience" component={AddExperience} />
              <Route component={NotFound} />
            </Switch>

          </section>


        </Router>
      </Provider>
    </React.Fragment>

  );
}

export default App;
