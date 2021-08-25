import { Box } from '@material-ui/core';
import { useEffect } from 'react';
import { useState } from 'react';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import { API_BASE_PATH } from '../utils/constants';

export default function JSS() {
  const history = useHistory();
  const [bookingState, setBookingState] = useState({
    consumerName: '',
    centerName: '',
    bookingDate: '',
    bookingTime: '',
  })

  useEffect(() => {
    const consumer = JSON.parse(localStorage.getItem('userInfo') ?? '');
    if(!bookingState.bookingDate && consumer.nationalId) {
      axios.get(`${API_BASE_PATH}/consumers/${consumer.nationalId}`)
      .then(({ data: consumer }) => {
        console.log(consumer);
        setBookingState({
          consumerName: consumer.name,
          centerName: consumer.bookings[0].centre.name,
          bookingDate: consumer.bookings[0].bookingDate,
          bookingTime: consumer.bookings[0].slot.startAt,
        })
      }, (error) => {
        console.log(error);
      });
    } 
  }, []);

  const cancelAndRedirect = () => {
    const bookingDetails = JSON.parse(localStorage.getItem('bookingDetails') ?? '');
    axios.delete(`${API_BASE_PATH}/bookings/${bookingDetails.id}`)
      .then(() => {
        console.log(`Booking deleted successfully.`);
        localStorage.removeItem('selectedCentre');
        localStorage.removeItem('bookingDetails');
        history.push('/centres')
      }, (error) => {
        console.log(error);
      });
  }
  

  return (
    <>
      <Box color="white" bgcolor="darkcyan" p={1}>
        Congratulations <b>{bookingState.consumerName}</b>, 
        <p>
          Your appointment has been confirmed at <b>{bookingState.centerName}</b> on <b>{moment(bookingState.bookingDate).format('LL')}</b> at <b>{moment(bookingState.bookingTime, [moment.ISO_8601, 'HH:mm']).format('LT')}</b>.
        </p>
      </Box>
      <Box m="2rem" />
      <div style={{
         textAlign: 'center',
         margin: '10px',
         position: 'absolute',
         left: 0
        }}>
          <Button variant="contained" color="secondary" onClick={() => { 
              cancelAndRedirect();
            }} >
          Cancel and book again
          </Button>
      </div>
      <div style={{
          textAlign: 'center',
          margin: '10px',
          position: 'absolute',
          right: 0
        }}>
          <Button variant="contained" color="default" onClick={() => { 
            localStorage.clear();
            history.push('/')
            }} >
          Book another appointment
          </Button>
      </div>
      </>
  );
}
