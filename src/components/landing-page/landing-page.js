import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import LoginForm from '../login-form/login-form';
import { withRouter } from "react-router-dom";
export function LandingPage(props){
   if(props.loggedIn){
       return <Redirect to="/dashboard"/>;
   }
   return(
    <div className="landing-page-container">
      <div className="login-form-container">
        <LoginForm />
    </div>
  </div>
   );
}

const mapStateToProps = state => ({
  
    loggedIn: state.auth.currentUser !==null
    
  });
  
  export default connect(mapStateToProps)(withRouter(LandingPage));
  