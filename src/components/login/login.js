import React from "react";
import ServerApi from '../../services/server-api';
import  './login-style.css';
class Login extends React.Component{
    serverApi = new ServerApi();
    constructor(props){
        super(props);
        this.state={
            debug:false,
            userFormLogin:{
                login:'',
                password:''
            }
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
    }

    handleSubmit(){
        console.log(this.state.userFormLogin);
        this.serverApi.loginUser(this.state.userFormLogin)
        .then((data)=>{
            if(data.status){
                alert(data.message);
                localStorage.setItem('token',data.obj);
                this.serverApi.getUserByToken(data.obj)
                .then((res)=>{
                    this.props.saveUserDataUser(res.obj);
                    if(res.obj.roleEntity.id==1){
                        window.location.replace('/admin/panel');
                    }else if(res.obj.roleEntity.id==2){
                        window.location.replace('/user/mainPage');
                    }
                });
               
                //window.location.replace("/");
            }else{
                alert(data.message);
            }
        })
    }

    handleOnChange(event){
        this.setState({
            userFormLogin:{
                ...this.state.userFormLogin,
                [event.target.name]:event.target.value
            }
        })
    }

    openRegisterPage(){
        window.location.replace("/register");
    }

    render(){
        return(
            <div className="login">
            <div className="loginDiv">
                <table >
                    <thead></thead>
                    <tfoot></tfoot>
                    <tbody>
                        <tr>
                            <td>Login</td>
                            <td><input name="login" onChange={this.handleOnChange} type="text"></input></td>
                        </tr>

                        <tr>
                            <td>Pass</td>
                            <td><input name="password" onChange={this.handleOnChange} type="text"></input></td>
                        </tr>
                    </tbody>
                </table>
                
                <input type="submit" onClick={this.handleSubmit}></input>
                <button onClick={this.openRegisterPage}>Register</button>
            </div>
            </div>
        )
    }
}

export default Login;