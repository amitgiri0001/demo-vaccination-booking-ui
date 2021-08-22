import { Box } from '@material-ui/core';
import { useEffect } from 'react';
import { useState } from 'react';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

export default function JSS() {
  const history = useHistory();
  const [bookingState, setBookingState] = useState({
    consumerName: '',
    centerName: '',
    bookingDate: '',
    bookingTime: '',
  })
 
  useEffect(() => {
    const selectedCentre = JSON.parse(localStorage.getItem('selectedCentre') ?? '');
    const consumer = JSON.parse(localStorage.getItem('userInfo') ?? '');
    const bookingDetails = JSON.parse(localStorage.getItem('bookingDetails') ?? '');
    setBookingState({
      consumerName: consumer.name,
      centerName: selectedCentre.name,
      bookingDate: bookingDetails.bookingDate,
      bookingTime: bookingDetails.slotTime,
    })
  }, [])

  return (
    <>
    <Box color="white" bgcolor="darkcyan" p={1}>
      Congratulations {bookingState.consumerName}, 
      <p>
        Your appointment has been confirmed at "{bookingState.centerName}" on {bookingState.bookingDate} at {bookingState.bookingTime}.
      </p>
    </Box>
    <Box m="2rem" />
    <div style={{
      position: 'absolute',
      right: 30,
    }}>
      <Button variant="contained" color="primary" onClick={() => history.push('/')} >
            Back to Home
      </Button>
    </div>
      </>
  );
}
