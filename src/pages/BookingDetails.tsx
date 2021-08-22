import { FC, ReactElement } from "react";
import { Helmet } from "react-helmet";
import { makeStyles, createStyles } from "@material-ui/core/styles";

import { APP_TITLE } from "../utils/constants";
import Booking from "../components/Booking";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flex: 1,
      display: "absolute",
      right: 0,
      flexDirection: "row",
      justifyContent: "space-between",
    },
  })
);

const BookingDetails: FC<{}> = (): ReactElement => {
  const classes = useStyles();
  return (
    <>
      <Helmet>
        <title>
          {APP_TITLE}
        </title>
      </Helmet>
      <div className={classes.root}>
        <Booking></Booking>
      </div>
    </>
  );
};

export default BookingDetails;