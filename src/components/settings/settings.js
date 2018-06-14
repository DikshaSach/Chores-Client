import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import requiresLogin from "../../requires-login";



export class Settings extends React.Component{

  render(){
    
      return(
          <div className="settings-container">
          <h1>Settings</h1>
          </div>

      );
  }
}

  

const mapStateToProps = state => ({
  
    loggedIn: state.auth.currentUser !==null
    
  });


  export default requiresLogin()(connect(mapStateToProps)(withRouter(Settings)));
  