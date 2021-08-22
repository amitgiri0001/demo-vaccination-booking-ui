import React, { useEffect } from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import {  Button } from "@material-ui/core";
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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: '36ch',
      backgroundColor: theme.palette.background.paper,
    },
    inline: {
      display: 'inline',
    },
  }),
);



function CenterList()  {
  const classes = useStyles();
  const [ centerList, setCenterList ] = useState([]);
  const [ selectedCenter, setCenter ] = useState({});

  const history = useHistory();

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
      axios.get(`https://vacc-api.herokuapp.com/centres`)
      .then(({data}) => {
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
    if(selectedCenter) {
      localStorage.setItem('selectedCentre', JSON.stringify(selectedCenter));
      history.push('/slots')
    }
  }

  return (
          <List className={classes.root}>
            {
              centerList.map((center: any) => (
                <>
                <ListItem key={center.id} alignItems="flex-start"
                 button
                 selected={selectedCenter === center.id}
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

            <Button variant="contained" color="primary" onClick={() => handleSubmit()} >
              Submit
            </Button>
        </List>
  );
}

export default CenterList;