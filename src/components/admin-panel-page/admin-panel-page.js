import React from "react";
import ServerApi from '../../services/server-api';

class AdminPanelPage extends React.Component{
    serverApi = new ServerApi();
    constructor(props){
        super(props);
        this.state={
            debug:true,
        }
        
    }

    componentWillMount(){

    }
    
    deleteStorage(){
        localStorage.removeItem('token');
        window.location.replace('/login');
    }

    render(){
        let renderElem ;
        let token = localStorage.getItem('token');
        if(this.props.user.role==1){
            renderElem=(
                <div>
                admin panel page
                {token}
                <button onClick={this.deleteStorage}>Reset storage</button>
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