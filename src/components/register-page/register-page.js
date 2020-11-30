import React from "react";
import ServerApi from '../../services/server-api';

class RegisterPage extends React.Component{
    serverApi = new ServerApi();
    constructor(props){
        super(props);
        this.state={
            debug:true,
            login: false,
            registerForm:{
                username:'',
                login:'',
                password:'',
                email:'',
                number:'',
            }
        }
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount(){

    }
    
    handleSubmit(event){
        console.log(this.state.registerForm);
        this.serverApi.registerUser(this.state.registerForm)
        .then((data)=>{
            console.log(data);
            if(data.status){
                alert("Successful");
                //window.location.replace("/");
            }else{
                alert("Error");
            }
        })
    }

    handleOnChange(event){
        if(event.target.name!=='repeat_password'&&event.target.name!=='repeat_email'){
            this.setState({
                registerForm:{
                    ...this.state.registerForm,
                    [event.target.name]:event.target.value
                }
            })
        }
        else{
            this.setState({
                [event.target.name]:event.target.value
            })
        }
    }

    render(){
        var {username,login,password,repeat_email,repeat_password,email,number}= this.state.registerForm;
        let renderElem ;
        if(!this.state.login){
            renderElem=(
                <div>
                    <h2>Register</h2>
                    <table>
                        <thead></thead>
                        <tfoot></tfoot>
                        <tbody>
                            <tr>
                                <td>username</td>
                                <td><input type="text" name="username" onChange={this.handleOnChange} value={username} placeholder="username"/></td>
                            </tr>
                            <tr>
                                <td>login</td>
                                <td><input type="text" name="login" onChange={this.handleOnChange} value={login} placeholder="login"/></td>
                            </tr>
                            <tr>
                                <td>password</td>
                                <td><input type="text" name="password" onChange={this.handleOnChange} value={password} placeholder="password"/></td>
                            </tr>
                            <tr>
                                <td>repeat password</td>
                                <td><input type="text" name="repeat_password" onChange={this.handleOnChange} value={repeat_password} placeholder="repeat password"/></td>
                            </tr>
                            <tr>
                                <td>email</td>
                                <td><input type="text" name="email" onChange={this.handleOnChange} value={email} placeholder="email"/></td>
                            </tr>
                            <tr>
                                <td>repeat email</td>
                                <td><input type="text" name="repeat_email" onChange={this.handleOnChange} value={repeat_email} placeholder="repeat email"/></td>
                            </tr>
                            <tr>
                                <td>number</td>
                                <td><input type="text" name="number" onChange={this.handleOnChange} value={number} placeholder="number"/></td>
                            </tr>
                            <tr>
                                <td><input type="submit" onClick={this.handleSubmit}/></td>
                            </tr>
                        </tbody>
                    </table>
                    <button onClick={()=>{window.location.replace('/login')}}>return to login</button>
            </div>
            )
        }
        else{
            renderElem=null;
        }
        return(
           <>
               {renderElem}
           </>
        )
    }
}

export default RegisterPage;