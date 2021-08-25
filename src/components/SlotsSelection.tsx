import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import { Box, Button, FormControl, FormHelperText, Snackbar } from '@material-ui/core';
import { useEffect } from 'react';
import { API_BASE_PATH } from '../utils/constants';
import { Alert } from '@material-ui/lab';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
  }),
);

export default function SlotsSelection() {
  const classes = useStyles();
  const history = useHistory();
  const [slotSelectedDate, setSlotSelectedDate] = useState(moment().format('YYYY-MM-DD'));
  const [slotsList, setSlotsList] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState({ id: null, startAt: ''});
  const [errorMessage, setError] = useState('');
  const [showError, setShowError] = useState(false);

  const getSlots = () => {
    const selectedCentre = JSON.parse(localStorage.getItem('selectedCentre') ?? '');
    axios.get(`${API_BASE_PATH}/centres/${selectedCentre?.id}/slots?date=${slotSelectedDate}`)
    .then(({data}) => {
      console.log(data);
      setSlotsList(data);
    }, (error) => {
      console.log(error);
    });
  }

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setShowError(false);
  };

  const bookSlot = () => {
    const selectedCentre = JSON.parse(localStorage.getItem('selectedCentre') ?? '');
    const consumerId = JSON.parse(localStorage.getItem('userInfo') ?? '')?.id;
    
    const bookingDetails = {
      slotId: selectedSlot.id,
      centreId: +selectedCentre.id,
      consumerId: consumerId,
      bookingDate: slotSelectedDate
    }

    axios.post(`${API_BASE_PATH}/bookings`, {
      ...bookingDetails
    })
    .then(({data}) => {
      console.log(data);
      localStorage.setItem('bookingDetails', JSON.stringify({
        ...bookingDetails,
        slotTime: selectedSlot.startAt,
        ...data
      }))
      history.push('/booking')
    }, (error) => {
      const errorCode = error?.response?.data?.error?.code;
      if(errorCode === 'ALREADY_BOOKED') {
        setError('Booking already exist.');
      } 
      else if(errorCode === 'SLOT_FULL') {
        setError('Unfortunately, the slot has been taken. Please try again.')
      }
      setShowError(true);
      console.log(error);
    });
  }

  return (
    <div>
      <div>
        <form className={classes.container} noValidate>
          <FormControl>
            <TextField
              id="date"
              label="Select a date for the slot"
              type="date"
              defaultValue={moment().format('YYYY-MM-DD')}
              className={classes.textField}
              inputProps={{
                min: moment().add(1, 'd').format('YYYY-MM-DD'),
                max: moment().add(32, 'd').format('YYYY-MM-DD')
              }}
              onChange={(e) => setSlotSelectedDate(e.target.value)}
            />
          </FormControl>
            <Button variant="contained" color="primary" onClick={() => getSlots()} >
                Submit
            </Button>
        </form>
      </div>
      <Box m="2rem" />
      <div style={{ width: '100%' }}>
        {
          slotsList.map((slot: any) => (
                <Chip
                label={slot.startAt.slice(0, 5)}
                key={slot.id}
                clickable
                style={{margin: '5px', border: '1px'}}
                color={slot.isBooked ? 'secondary' : selectedSlot.id === slot.id ? 'primary' : 'default' }
                onClick={() => { if(!slot.isBooked) setSelectedSlot(slot) }}
                />
          ))
        }
      </div>
      <Box m="2rem" />
      <div style={{
        position: 'absolute',
        right: 30
      }}>
        <Button style={{
          display: selectedSlot.id ? 'inline' : 'none',
        }} variant="contained" color="primary" onClick={() => bookSlot()} >
              Book
        </Button>
      </div>
      <Snackbar open={showError} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
