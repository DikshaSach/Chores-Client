import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import requiresLogin from "../../requires-login";
import {fetchChores} from '../actions/chore';
import AddChoreForm from '../add-chore-form/add-chore-form';
import './dashboard.css';

export class Dashboard extends React.Component{
constructor(props){
  super(props);
  this.state = ({
    choreData: null
  })
}
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
        console.log(this.props.chores);
        this.props.dispatch(fetchChores(this.props.id, todaysDate)).then(() => 
          this.setState({
            choreData: this.props.chores
          }),
          this.props.history.push("/dashboard")
        );
      
    }

   
  render(){
   console.log(this.state.choreData);
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
        taskCompleted =<h1>Completed</h1>
      }else{
        taskCompleted =<h1>Not Completed</h1>
      }
      stickyNotes.push(
          <a className={`note sticky${i}`} key={i}>
                <div className='pin'></div>
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
        {todaysDate}
        <h1>Dashboard</h1>
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
  