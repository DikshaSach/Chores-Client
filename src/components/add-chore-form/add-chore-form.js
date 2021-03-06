import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import requiresLogin from "../../requires-login";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Field, reduxForm, focus } from "redux-form";
import { addChore } from '../actions/chore';
import { required, nonEmpty } from "../../validators";
import Input from "../../input";
import './add-chore-form.css';



export class AddChoreForm extends React.Component{
    state = {
        open: false
      };
    onSubmit(values){
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
       const creator = this.props.id;
       const choreName = values.choreName;
       const choreCompleted = 'No';
       const date = todaysDate;
       const chore = {creator, choreName, choreCompleted, date};
       console.log(chore);
       this.props.dispatch(addChore(chore));
    }
      handleClickOpen = () => {
        this.setState({ open: true });
      };
    
      handleClose = () => {
        this.setState({ open: false });
      };
    
      render() {
        let error;
        if (this.props.error) {
          error = (
            <div className="form-error" aria-live="polite">
              {this.props.error}
            </div>
          );
        }
        return (
          <div className="add-chore-form-container">
            <Button id="add-chore-form-button" variant="fab" color="secondary" aria-label="add" onClick={this.handleClickOpen}>+</Button>
            <Dialog
            className="dialog-box-container"
              open={this.state.open}
              onClose={this.handleClose}
              aria-labelledby="form-dialog-title"
              maxWidth='sm'
              fullWidth={true}
            >
              <DialogTitle className="form-dialog-title">Add a Chore</DialogTitle>
              <DialogContent className="form-dialog-content">
        <form
          className="chore-form"
          onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}
        >
        {error}
         <label htmlFor="choreName">
           Enter Chore Detail 
          </label>
          <Field
            component={Input}
            type="text"
            name='choreName'
            id='choreName'
            validate={[required, nonEmpty]}
          />
          <DialogActions className="form-dialog-actions">
                <Button type="button" variant="contained" color="secondary" onClick={this.handleClose}>
                  Cancel
                </Button>
                <Button type="submit" variant="contained" color="primary" onClick={this.handleClose} disabled={this.props.pristine || this.props.submitting}>
                  Add
                </Button>
              </DialogActions>
        </form>
              </DialogContent>
              
            </Dialog>
          </div>
        );
      }
    }

  

const mapStateToProps = state => {  
    const { currentUser } = state.auth;
    return {
      id: `${currentUser.id}`
    };
};


  export default requiresLogin()(connect(mapStateToProps)(reduxForm({
    form: "addChore",
    onSubmitFail: (errors, dispatch) =>
      dispatch(focus("addChore", "title"))
  })(withRouter(AddChoreForm))));
  