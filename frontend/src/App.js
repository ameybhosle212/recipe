import logo from './logo.svg';
import './App.css';
import { Switch , BrowserRouter as Router } from 'react-router-dom'
import PrivateRoute from './Routes/PrivateRoute';
import PublicRoute from './Routes/PublicRoute';
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import Profile from './Components/Profile';
import OtherRecipes from './Components/OtherRecipes';
import Logout from './Components/Logout';


function App() {
  return (
    <Router>
      <Switch>
        <PrivateRoute exact path="/" component={Dashboard} />
        <PublicRoute exact path="/login" component={Login} />
        <PrivateRoute exact path="/profile" component={Profile} />
        <PublicRoute exact path="/:profile/recipes" component={OtherRecipes} />
        <PrivateRoute exact path="/logout" component={Logout} />
      </Switch>
    </Router>
  );
}

export default App;
