import "./App.css";
import "./style.css";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Helmet from "react-helmet";
import Register from "./components/Register";
import "./custom.css";
import { ToastContainer } from "react-toastify";
import AdminDash from "./components/Admin/AdminDash";
import SupplierDash from "./components/Supplier/SupplierDash";
import CustomerDash from "./components/Customer/CustomerDash";
import ProtectedRoute from "./ProtectedRoute";
import Cart from "./components/Cart";

function App() {
  return (
    <div className="App">
      {/* <ToastContainer /> */}
      <Helmet>
        <title>E-Commerce-Portal</title>
      </Helmet>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/create">
            <Register />
          </Route>
          <Route path="/cart">
            <Cart />
          </Route>
          <Route path="/admin/dashboard">
            <ProtectedRoute component={AdminDash} role="admin" />
          </Route>
          {/* <Route path="/admin/manage-users">
            <ProtectedRoute component={AdminDash} role="admin" />
          </Route> */}
          <Route path="/supplier/dashboard">
            <ProtectedRoute component={SupplierDash} role="supplier" />
          </Route>
          <Route path="/customer/dashboard">
            <ProtectedRoute component={CustomerDash} role="customer" />
          </Route>
          {/* <Route path="/home">
            <ProtectedRoute component={Home} role="customer" path="/home" />
          </Route> 
          <Route path="/profile">
            <ProtectedRoute></ProtectedRoute>
          </Route>
          <Route path="/cart">
            <ProtectedRoute
              component={Cart}
              role="customer"
              path="/home"
            ></ProtectedRoute>
          </Route>*/}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
