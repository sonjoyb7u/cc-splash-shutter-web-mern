import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './pages/Home/Home/Home';
import Login from './pages/Login/Login/Login';
import Registration from './pages/Registration/Registration';
import DashboardLayout from './pages/Dashboard/DashboardLayout/DashboardLayout';


function App() {
  return (
    <div className="App">
      <Router>
          <Switch>
            <Route exact path="/">
              <Home></Home>
            </Route>
            <Route exact path="/home">
              <Home></Home>
            </Route>
            <Route path="/dashboard">
              <DashboardLayout></DashboardLayout>
            </Route>
            <Route exact path="/login">
              <Login></Login>
            </Route>
            <Route exact path="/registration">
              <Registration></Registration>
            </Route>
              
          </Switch>
      </Router>
      
    </div>
  );
}

export default App;
