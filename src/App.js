import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MainPage from './components/MainPage';
import SignUp from './components/SignUp';
import UserView from './components/userView';
import AdminHome from './components/AdminHome';
import EditUser from './components/EditCity';

function App() {
  return (
    <Router>
      <div>
        {/* Define routes */}
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route path="/signup" component={SignUp} />
          <Route path="/userView" component={UserView}/>
          <Route path ="/AdminHome" component={AdminHome}/> 
          <Route path ="/EditCity" component={EditUser}/>
        </Switch>
      </div>
    </Router>

  );
}

export default App;
