import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import requiresLogin from "../../requires-login";
import {fetchChores} from '../actions/chore';

export class Dashboard extends React.Component{

    componentWillMount(){
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!`
        var yyyy = today.getFullYear();
        if (dd < 10) {
          dd = "0" + dd;
        }
        if (mm < 10) {
          mm = "0" + mm;
        }
        let todaysDate = mm + "" + dd + "" + yyyy;
        this.props.dispatch(fetchChores(this.props.id, todaysDate));
    }
  render(){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!`
    var yyyy = today.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }
    let todaysDate = mm + "/" + dd + "/" + yyyy;
      return(
        <div className="dashboard-container">
            <div> Date: {todaysDate}</div>
            <div>Chore Name: {this.props.chores.choreName}</div>
            <div>Chore Completed: {this.props.chores.choreCompleted}</div>
        </div>

      );
  }
}
  

const mapStateToProps = state => {
    const { currentUser } = state.auth;
      return {
        loggedIn: state.auth.currentUser !== null,
        username: state.auth.currentUser.username,
        name: `${currentUser.firstName} ${currentUser.lastName}`,
        id: `${currentUser.id}`,
        chores: state.chore.choreData
      };
}

  export default requiresLogin()(connect(mapStateToProps)(withRouter(Dashboard)));
  