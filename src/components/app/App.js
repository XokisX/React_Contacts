import React, { useEffect } from "react";
import Login from '../login/';
import MainPage from '../main-page';
import RegisterPage from '../register-page';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
  withRouter,
  useParams
} from "react-router-dom";
import './app-style.css';
class Contacts extends React.Component {
 constructor(props){
  super(props);
 }

  render() {
    return (
      <Router >
        <Switch>
         <Route exact path={`/`}>
            <MainPage/>
         </Route>
         <Route  path={`/login`}>
            <Login/>
         </Route>
         <Route path={`/register`}>
           <RegisterPage/>
         </Route>
        </Switch>
      </Router>
    )
  }
}
export default Contacts;
