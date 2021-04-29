import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import SignUp from './modules/signUp/SignUp';

import './App.css';

function App() {
  return (
    <Router>
      <Route exact path="/">
        <Redirect to="/sign-up" />
      </Route>
      <Route path="/sign-up" exact component={SignUp} />
    </Router>
  );
}

export default App;
