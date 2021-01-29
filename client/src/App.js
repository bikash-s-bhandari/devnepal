
import React from 'react'
import './App.css';
import { Navbar, Home, Login, Register } from './Components/index'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
const App = () => {
  return (

    <React.Fragment>
      <Router>
        <Navbar />


        <Switch>

          <Route exact path="/" component={Home} />

          <section className="container">

            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />



          </section>
          {/* <Route render={() => <Redirect to="/" />} /> */}



        </Switch>




      </Router>
    </React.Fragment>

  );
}

export default App;
