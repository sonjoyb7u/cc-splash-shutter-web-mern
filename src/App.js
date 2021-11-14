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
import ProductDetail from './pages/Home/ProductDetail/ProductDetail';
import ShippingDetail from './pages/Home/ShippingDetail/ShippingDetail';
import AuthProvider from './assets/contexts/AuthProvider';
import PrivateRoute from './pages/Login/PrivateRoute/PrivateRoute';
import PlaceOrder from './pages/Home/PlaceOrder/PlaceOrder';
import ExploreProduct from './pages/Home/ExploreProduct/ExploreProduct';


function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
            <Switch>
              <Route exact path="/">
                <Home></Home>
              </Route>
              <Route exact path="/home">
                <Home></Home>
              </Route>
              <Route exact path="/product-detail/:id">
                <ProductDetail></ProductDetail>
              </Route>
              <Route exact path="/explore-products">
                <ExploreProduct></ExploreProduct>
              </Route>
              <PrivateRoute exact path="/shipping-detail/:id">
                <ShippingDetail></ShippingDetail>
              </PrivateRoute>
              <PrivateRoute exact path="/place-order">
                <PlaceOrder></PlaceOrder>
              </PrivateRoute>
              <PrivateRoute path="/dashboard">
                <DashboardLayout></DashboardLayout>
              </PrivateRoute>
              <Route exact path="/login">
                <Login></Login>
              </Route>
              <Route exact path="/registration">
                <Registration></Registration>
              </Route>
            </Switch>
        </Router>
      </AuthProvider>
      
    </div>
  );
}

export default App;
