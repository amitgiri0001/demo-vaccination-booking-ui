import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import { Box, Button } from '@material-ui/core';
import { useEffect } from 'react';

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

  const getSlots = () => {
    const selectedCentre = JSON.parse(localStorage.getItem('selectedCentre') ?? '');
    axios.get(`https://vacc-api.herokuapp.com/centres/${selectedCentre?.id}/slots?date=${slotSelectedDate}`)
    .then(({data}) => {
      console.log(data);
      setSlotsList(data);
    }, (error) => {
      console.log(error);
    });
  }

  const bookSlot = () => {
    const selectedCentre = JSON.parse(localStorage.getItem('selectedCentre') ?? '');
    const consumerId = JSON.parse(localStorage.getItem('userInfo') ?? '')?.id;
    
    const bookingDetails = {
      slotId: selectedSlot.id,
      centreId: +selectedCentre.id,
      consumerId: consumerId,
      bookingDate: slotSelectedDate
    }

    axios.post(`https://vacc-api.herokuapp.com/bookings`, {
      ...bookingDetails
    })
    .then(({data}) => {
      console.log(data);
      localStorage.setItem('bookingDetails', JSON.stringify({
        ...bookingDetails,
        slotTime: selectedSlot.startAt
      }))
      history.push('/booking')
    }, (error) => {
      console.log(error);
    });
  }

  return (
    <div>
      <div>
        <form className={classes.container} noValidate>
          <TextField
            id="date"
            label="Slot Date"
            type="date"
            defaultValue={moment().format('YYYY-MM-DD')}
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => setSlotSelectedDate(e.target.value)}
          />
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
                    clickable
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
    </div>
  );
}
