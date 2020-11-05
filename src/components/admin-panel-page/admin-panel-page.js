import React from "react";
import ServerApi from '../../services/server-api';

class AdminPanelPage extends React.Component{
    serverApi = new ServerApi();
    constructor(props){
        super(props);
        this.state={
            debug:true,
            login: true
        }
        
    }

    componentWillMount(){

    }
    

    render(){
        let renderElem ;
        if(this.state.login){
            renderElem=(
                <div>
                admin panel page
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