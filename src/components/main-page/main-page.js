import React from "react";
import ServerApi from '../../services/server-api';

class MainPage extends React.Component{
    serverApi = new ServerApi();
    constructor(props){
        super(props);
        this.state={
            debug:true,
            login: true
        }
        if(!this.state.login){
            window.location.replace("/login");
        }
    }

    componentWillMount(){

    }
    

    render(){
        let renderElem ;
        if(this.state.login){
            renderElem=(
                <div>
                main page
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

export default MainPage;