import React, { useEffect } from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { Button, Fab } from "@material-ui/core";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import axios from 'axios';
import { useState } from 'react';
import { API_BASE_PATH } from '../utils/constants';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
    inline: {
      display: 'inline',
    },
    floatingIcon: {
      position: 'fixed',
      bottom: 0,
      zIndex: 999,
      right: 0,
      marginRight: '20px',
      marginBottom: '20px',
    },
    floatingIconButtonDiv: {
      paddingLeft: '50px',
      paddingRight: '50px'
    }
  }),
);



function CenterList() {
  const classes = useStyles();
  const [centerList, setCenterList] = useState([]);
  const [selectedCenter, setCenter] = useState({ id: null });

  const history = useHistory();

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    axios.get(`${API_BASE_PATH}/centres`)
      .then(({ data }) => {
        console.log(data);
        setCenterList(data);
      }, (error) => {
        console.log(error);
      });
  }, []);

  const handleSelect = (center: any) => {
    setCenter(center);
  }

  const handleSubmit = () => {
    if (selectedCenter.id) {
      localStorage.setItem('selectedCentre', JSON.stringify(selectedCenter));
      history.push('/slots')
    }
  }

  return (
    <>
    <div>
    <List className={classes.root}>
      {
        centerList.map((center: any) => (
          <>
            <ListItem key={center.id} alignItems="flex-start"
              button
              selected={selectedCenter.id === center.id}
              onClick={() => handleSelect(center)}>
              <ListItemAvatar>
                <HomeWorkIcon></HomeWorkIcon>
              </ListItemAvatar>
              <ListItemText
                primary={center.name}
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      color="textPrimary"
                    >
                      {center.vaccineType}
                    </Typography>
                    {center.address}
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </>
        ))
      }

    </List>
    </div>
     
     <div className={classes.floatingIcon}>
        <Fab variant="extended" className={classes.floatingIconButtonDiv} color="primary" aria-label="add" onClick={() => handleSubmit()} >
          Next 
        </Fab>
     </div>
    </>
  );
}

export default CenterList;