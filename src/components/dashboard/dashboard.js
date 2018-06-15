import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import requiresLogin from "../../requires-login";
import {fetchChores} from '../actions/chore';
import {deleteChore} from '../actions/chore';
import AddChoreForm from '../add-chore-form/add-chore-form';
import './dashboard.css';

export class Dashboard extends React.Component{
constructor(props){
  super(props);
  this.state = ({
    choreData: null
  })
}
    componentDidMount(){
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
        this.props.dispatch(fetchChores(this.props.id, todaysDate)).then(() => 
          this.setState({
            choreData: this.props.chores
          }),
          this.props.history.push("/dashboard")
        );
      
    }
    handleDeleteClick(id){
      this.props.dispatch(deleteChore(id)).then(() => {
        return this.props.history.push("/dashboard");
      });
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
    let stickyNotes = [];
    let taskCompleted;
    
    if(this.state.choreData !== null){
    for(let i=0; i<this.props.chores.length; i++){
      if(this.props.chores[i].choreCompleted === 'Yes'){
        taskCompleted =<div className="checkmark">
        <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
         viewBox="0 0 161.2 161.2" enableBackground="new 0 0 161.2 161.2">
      <path className="path" fill="none" stroke="#5aa375" strokeMiterlimit="10" d="M425.9,52.1L425.9,52.1c-2.2-2.6-6-2.6-8.3-0.1l-42.7,46.2l-14.3-16.4
        c-2.3-2.7-6.2-2.7-8.6-0.1c-1.9,2.1-2,5.6-0.1,7.7l17.6,20.3c0.2,0.3,0.4,0.6,0.6,0.9c1.8,2,4.4,2.5,6.6,1.4c0.7-0.3,1.4-0.8,2-1.5
        c0.3-0.3,0.5-0.6,0.7-0.9l46.3-50.1C427.7,57.5,427.7,54.2,425.9,52.1z"/>
      <circle className="path" fill="none" stroke="#5aa375" strokeWidth="4" strokeMiterlimit="10" cx="80.6" cy="80.6" r="62.1"/>
      <polyline className="path" fill="none" stroke="#5aa375" strokeWidth="6" strokeLinecap="round" strokeMiterlimit="10" points="113,52.8 
        74.1,108.4 48.2,86.4 "/>
      
      <circle className="spin" fill="none" stroke="#5aa375" strokeWidth="4" strokeMiterlimit="10" strokeDasharray="12.2175,12.2175" cx="80.6" cy="80.6" r="73.9"/>
      
      </svg>
      <p>Completed</p>
      </div>
      }else{
        taskCompleted = <div className="checkmark">
          <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"  x="0px" y="0px"
            viewBox="0 0 161.2 161.2" enableBackground="new 0 0 161.2 161.2" >
            <path className="path" fill="none" stroke="#797a79" strokeMiterlimit="10" d="M425.9,52.1L425.9,52.1c-2.2-2.6-6-2.6-8.3-0.1l-42.7,46.2l-14.3-16.4
            c-2.3-2.7-6.2-2.7-8.6-0.1c-1.9,2.1-2,5.6-0.1,7.7l17.6,20.3c0.2,0.3,0.4,0.6,0.6,0.9c1.8,2,4.4,2.5,6.6,1.4c0.7-0.3,1.4-0.8,2-1.5
            c0.3-0.3,0.5-0.6,0.7-0.9l46.3-50.1C427.7,57.5,427.7,54.2,425.9,52.1z"/>
            <circle className="path" fill="none" stroke="#797a79" strokeWidth="4" strokeMiterlimit="10" cx="80.6" cy="80.6" r="62.1"/>
            <circle className="spin" fill="none" stroke="#797a79" strokeWidth="4" strokeMiterlimit="10" strokeDasharray="12.2175,12.2175" cx="80.6" cy="80.6" r="73.9"/>
          </svg>
          <p>Not Completed</p>
        </div>
      }
      stickyNotes.push(
          <a className={`note sticky${i} ${this.props.chores[i]._id}`} key={i}>
                <div className='pin' onClick={() => this.handleDeleteClick(this.props.chores[i]._id)}></div>
                <div className='text'>
                  {this.props.chores[i].choreName}
                  {taskCompleted}
                 
                </div>
            </a>       
      )
    };
  };
      return(
        <div className="dashboard-container">
        <div className="todays-date">
          {todaysDate}
        </div>
        <h1 className="dashboard-title">Dashboard</h1>
        <AddChoreForm></AddChoreForm>

          <div id='frame' className='flex-container'>
            {stickyNotes}
          </div>
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
  