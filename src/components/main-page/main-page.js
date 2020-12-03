import React from "react";
import ServerApi from '../../services/server-api';
import as from './main-page-style.css';
class MainPage extends React.Component {
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
            usersForSend: [],
            search: ""
        }
        this.handleInput = this.handleInput.bind(this);
        this.searchUsers = this.searchUsers.bind(this);
        this.addContact = this.addContact.bind(this);
        this.loadContacts = this.loadContacts.bind(this);
        this.deleteContacts = this.deleteContacts.bind(this);
        this.sendEmails = this.sendEmails.bind(this);
    }

    componentWillMount() {
        this.loadUsers();
        this.loadContacts();
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

    addContact() {
        
        if (this.state.currentUser != null && this.state.currentUser != 0) {
            this.serverApi.addContact(this.token, this.props.user.id, this.state.currentUser)
                .then((res) => {
                    console.log(res);
                    alert(res.message);
                    this.loadContacts();
                })
        }
    }

    deleteContacts(){
        this.loadUsers();
        if(this.state.usersForSend.length>0){
            this.serverApi.deleteContacts(localStorage.getItem('token'),this.props.user.id,this.state.usersForSend)
            .then((res)=>{
                console.log(res);
                if(res.status){
                    alert(res.message);
                    this.loadContacts();
                }
            })
        }
    }

    sendEmails(){
        if(this.state.message!=null&&this.state.message!=''){
            this.serverApi.sendEmails(this.token,this.props.user.id,this.state.usersForSend,this.state.message)
            .then((res)=>{
                console.log(res);
            })
        }
    }


    render() {
        let renderElem;
        let listOfUsers = this.state.users.map((user, index) =>
            <div onClick={this.chooseUser.bind(this, user.id)} className={`${this.state.currentUser == user.id ? "currentUser" : "user"}`} key={user.id}>
                <div>{user.id}</div>
                <div>{user.username}</div>
                <div>{user.email}</div>
                <div>{user.number}</div>
            </div>
        )

        let myContacts = this.state.myContacts.map((user, index) => {
            if(this.state.usersForSend.includes(user.user2.id)){
                return(
                    <React.Fragment>
                        <div onClick={this.chooseUserForSend.bind(this, user.user2.id)} className="currentUser" key={user.user2.id}>
                            <div>{user.user2.id}</div>
                            <div>{user.user2.username}</div>
                            <div>{user.user2.email}</div>
                            <div>{user.user2.number}</div>
                        </div>
                    </React.Fragment>
                    )
            }else{
                return(
                    <React.Fragment>
                        <div onClick={this.chooseUserForSend.bind(this, user.user2.id)} className="user" key={user.user2.id}>
                            <div>{user.user2.id}</div>
                            <div>{user.user2.username}</div>
                            <div>{user.user2.email}</div>
                            <div>{user.user2.number}</div>
                        </div>
                    </React.Fragment>
                    )
            }
          


        }

        )
        console.log(myContacts);
        if (this.props.user.role == 2) {
            renderElem = (
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
                        <button onClick={this.addContact}>Add user to contact</button>
                    </div>

                    <button className="buttonReset" onClick={this.deleteStorage}>Reset storage</button>
                    <br></br>
                    <div>
                        <h1>My Contacts</h1>
                        <div className="allUserDiv">
                            {myContacts}
                        </div>
                    </div>

                    <div className="panel">
                        <h1>Panel</h1>
                        <h4>Write inforamtion</h4>
                        <input name="message" onChange={this.handleInput} value={this.state.message}></input>
                        <button onClick={this.sendEmails}>Send to email</button>
                        <br></br>
                        <button onClick={this.deleteContacts}>Delete from contact</button>
                    </div>


                    {/* {token} */}

                </div>
            )
        }
        else {
            renderElem = null;
        }
        return (
            <>
                {renderElem}
            </>
        )
    }
}

export default MainPage;