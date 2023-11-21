import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MainPage from './components/MainPage';
import SignUp from './components/SignUp';
import UserView from './components/userView';

function App() {
  return (
    <Router>
      <div>
        {/* Define routes */}
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route path="/signup" component={SignUp} />
          <Route path="/userView" component={UserView}/>
        </Switch>
      </div>
    </Router>

  );
}

export default App;
