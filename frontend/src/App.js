import logo from './logo.svg';
import './App.css';
import {Route  , Switch , BrowserRouter as Router } from 'react-router-dom'
import PrivateRoute from './Component/PrivateRoute';
import Login from './Component/Login';
import Home from './Component/Home';
import Dashboard from './Component/Dashboard';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" exact component={Login} />
        <Route path="/getAllData" exact component={Dashboard} />
        
        {/* <PrivateRoute path="/" exact component={Home} /> */}
      </Switch>
    </Router>
  );
}

export default App;
