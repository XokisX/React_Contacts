import React, { useEffect } from "react";
import Login from '../login/';
import MainPage from '../main-page';
import AdminPanelPage from '../admin-panel-page';
import RegisterPage from '../register-page';
import ServerApi from '../../services/server-api';
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
  serverApi = new ServerApi();
  constructor(props){
    super(props);
    this.state={
      user:{
      }
    }
    this.saveUserDataUser = this.saveUserDataUser.bind(this);
  }

  saveUserDataUser(data){
    console.log(data);
    this.setState({
      user:{
        email:data.email,
        id: data.id,
        is_blocked: data.is_blocked,
        username:data.username,
        role:data.roleEntity.id,
        number: data.number,
      }
    })
  }

  componentWillMount(){
    //localStorage.removeItem('token');
    
    
    let token = localStorage.getItem('token');
    console.log(token);
    console.log(window.location.href);
   
    if(token!=null &&token!=""){

      this.serverApi.getUserByToken(localStorage.getItem('token'))
      .then((res)=>{
          this.saveUserDataUser(res.obj);
          if(res.obj.roleEntity.id==1){
            if(!window.location.pathname.includes("admin")){
              window.location.replace("/admin/panel");
            }
        }else if (res.obj.roleEntity.id==2){
          if(!window.location.pathname.includes("user")){
              window.location.replace("/user/mainPage")
          }
          
        }
      });
     
     
    }else{
      if(window.location.pathname!="/login"&&window.location.pathname!="/register"){
        window.location.replace('/login');

      }
    }
  }

  render() {
    return (
      <Router >
        <Switch>
         <Route exact path={`/user/mainPage`}>
            <MainPage
                user ={this.state.user}
            />
         </Route>
         <Route path={`/login`}>
            <Login
              saveUserDataUser = {this.saveUserDataUser}
            />
         </Route>
         <Route path={`/register`}>
           <RegisterPage/>
         </Route>

         <Route path={`/admin/panel`}>
           <AdminPanelPage
              user ={this.state.user}
           />
         </Route>
        </Switch>
      </Router>
    )
  }
}
export default Contacts;
