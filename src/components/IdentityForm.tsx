import { FormControl, InputLabel, Input, FormHelperText, Button, makeStyles, Theme, createStyles, TextField, Snackbar } from "@material-ui/core";
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import axios from "axios";
import moment from "moment";
import React, { useState } from "react";
import { useHistory, withRouter } from "react-router-dom";
import { API_BASE_PATH } from "../utils/constants";


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginTop: '10px'
    },
    formControl: {
      width: '100%',
      marginTop: '10px'
    }
  }),
);

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export function IdentityForm() {
  const classes = useStyles();
  const [inputState, setInputState] = useState({});
  const [isIdentityConflictError, setIdentityConflictError] = useState(false);

  const history = useHistory();
  
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    const name = target?.name;
    const value = target?.value;
    setInputState((prevState) => ({
      ...prevState,
      ...{[name]: value}
    }));
  }

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    axios.post(`${API_BASE_PATH}/consumers`, inputState)
    .then(({data}) => {
      console.log(data);
      localStorage.setItem( 'userInfo', JSON.stringify(data))
      if(data.bookings?.length) {
        history.push(`/booking`)
      }
      else {
        history.push(`/centres`)
      }
    }, (error) => {
      console.error(error);
      const errorCode = error?.response?.data?.error?.code;
      if(errorCode === 'CONSUMER_IDENTITY_EXITS') {
        setIdentityConflictError(true);
      }
    })
  }

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setIdentityConflictError(false);
  };

  return (
    <React.Fragment>
      <form autoComplete="off">
        <div>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="nationalId">National Id</InputLabel>
            <Input id="nationalId" name="nationalId" required onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e)} />
            <FormHelperText id="nationalId"></FormHelperText>
          </FormControl>
        </div>
        <div>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="name">Full Name</InputLabel>
            <Input id="name" required name="name" onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e)}  />
            <FormHelperText id="name"></FormHelperText>
          </FormControl>
        </div>
        <div>
          <FormControl className={classes.formControl}>
            <TextField
              required
              name="birthday"
              id="birthday"
              type="date"
              className={classes.textField}
              inputProps={{
                max: moment().subtract(12, 'years').format('YYYY-MM-DD')
              }}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
            />
            <FormHelperText id="name">Your date of birth</FormHelperText>
          </FormControl>
        </div>
       
        
        <Button type="submit" variant="contained" color="primary" onClick={(e) => handleSubmit(e)} >
          Register
        </Button>
      </form>
      <Snackbar open={isIdentityConflictError} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          IC already exists. Try again with proper details.
        </Alert>
      </Snackbar>
    </React.Fragment>
  )

}

