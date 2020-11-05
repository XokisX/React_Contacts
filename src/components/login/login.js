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
                pass:''
            }
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
    }

    handleSubmit(event){
        console.log(this.state.userFormLogin);
        this.serverApi.loginUser(this.state.userFormLogin)
        .then((data)=>{
            console.log(data);
            if(data.status){
                alert("Successful");
                window.location.replace("/");
            }else{
                alert("Error");
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
                            <td><input name="pass" onChange={this.handleOnChange} type="text"></input></td>
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