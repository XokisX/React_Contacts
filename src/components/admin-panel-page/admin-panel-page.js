import React from "react";
import ServerApi from '../../services/server-api';

class AdminPanelPage extends React.Component{
    serverApi = new ServerApi();
    token = localStorage.getItem('token');
    constructor(props) {
        super(props);
        this.state = {
            debug: true,
            currentPage: 1,
            currentPageContacts: 1,
            users: [],
            myContacts: [],
            search: "",
            registerForm:{
                username:'',
                login:'',
                password:'',
                email:'',
                number:'',
                admin:false
            }
        }
        this.handleInput = this.handleInput.bind(this);
        this.searchUsers = this.searchUsers.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.blockUser = this.blockUser.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(event){
        console.log(this.state.registerForm);
        this.serverApi.registerByAdmin(this.token,this.state.registerForm)
        .then((data)=>{
            console.log(data.message);
            alert(data.message);
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


    componentWillMount() {
        this.loadUsers();
    }


    loadContacts() {
        this.serverApi.loadContacts(this.token)
            .then((res) => {
                console.log(res);
                if (res.status) {
                    this.setState({
                        myContacts: res.obj
                    })
                }
        })
    }
    chooseUser(key) {
        console.log(key);
        this.setState({
            currentUser: key
        })
    }

    chooseUserForSend(key) {
        let arr = this.state.usersForSend;
        if(arr.includes(key)){
            console.log(arr.indexOf(key));
            arr.splice(arr.indexOf(key),1)
            this.setState({
                usersForSend: arr
            })
        }else{
            arr.push(key)
            this.setState({
                usersForSend: arr
            })
        }
        }
     

    loadUsers() {
        if (this.state.search == "") {
            this.serverApi.loadAllUsers(this.token, this.state.currentPage, 10)
                .then((res) => {
                    console.log(res);
                    if (res.status) {
                        this.setState({
                            users: res.obj
                        })
                    }
                });
        } else {
            this.serverApi.searchUsers(this.token, this.state.search, this.state.currentPage, 10)
                .then((res) => {
                    console.log(res);
                    this.setState({
                        users: res.obj
                    })
                })
        }
    }

    handleInput(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    deleteStorage() {
        localStorage.removeItem('token');
        window.location.replace('/login');
    }

    searchUsers() {
        this.setState({
            currentPage: 1
        })
        this.loadUsers();
    }

    deleteUser(){
        if (this.state.currentUser != null && this.state.currentUser != 0){
            this.serverApi.deleteUser(this.token,this.state.currentUser)
            .then((res)=>{
                console.log(res);
                alert(res.message);
                this.loadUsers();
            })
        }
    }

    blockUser(){
        if (this.state.currentUser != null && this.state.currentUser != 0){
            this.serverApi.blockUser(this.token,this.state.currentUser)
            .then((res)=>{
                console.log(res);
                alert(res.message);
                this.loadUsers();
            })
        }
    }
    
    render(){
        let listOfUsers = this.state.users.map((user, index) =>
            <div onClick={this.chooseUser.bind(this, user.id)} className={`${this.state.currentUser == user.id ? "currentUser" : "user"}`} key={user.id}>
                <div>{user.id}</div>
                <div>{user.username}</div>
                <div>{user.email}</div>
                <div>{user.number}</div>
                <div>{user.is_blocked.toString()}</div>
            </div>
        )
        var {admin,username,login,password,repeat_email,repeat_password,email,number}= this.state.registerForm;
        let renderElem ;
        let token = localStorage.getItem('token');
        if(this.props.user.role==1){
            renderElem=(
                <div className="mainPageMain">
                <div>
                    <h1>All users</h1>
                    <div className="allUserDiv">
                        {listOfUsers}
                    </div>
                    <div>
                        <button onClick={() => {
                            if (this.state.currentPage > 1) {
                                this.setState({ currentPage: --this.state.currentPage })

                            }
                            this.loadUsers();
                        }}>prev page</button>
                        <button onClick={() => {
                            this.setState({ currentPage: ++this.state.currentPage })
                            this.loadUsers();
                        }}>next page</button>
                    </div>
                </div>

                <div className="search">
                    <h1>SearchUser</h1>
                    <h4>Write inforamtion</h4>
                    <input name="search" onChange={this.handleInput} value={this.state.search}></input>
                    <button onClick={this.searchUsers}>Search</button>
                    <br></br>
                    <button onClick={this.deleteUser}>Delete User</button>
                    <button onClick={this.blockUser}>Block User</button>
                </div>

                <button className="buttonReset" onClick={this.deleteStorage}>Reset storage</button>
                {/* {token} */}
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
                                <td>admin</td>
                                <td><input type="checkbox" onClick={()=>{
                                    this.setState({
                                        registerForm:{
                                            ...this.state.registerForm,
                                            admin:!this.state.registerForm.admin
                                        }
                                    })
                                    }
                                } value={admin}></input></td>
                            </tr>
                            <tr>
                                <td><input type="submit" onClick={this.handleSubmit}/></td>
                            </tr>
                            
                        </tbody>
                    </table>
            </div>
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

export default AdminPanelPage;