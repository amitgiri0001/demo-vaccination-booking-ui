import { FC, ReactElement } from "react";
import { Helmet } from "react-helmet";
import { makeStyles, createStyles } from "@material-ui/core/styles";

import { APP_TITLE } from "../utils/constants";
import CentreList from "../components/CenterList";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flex: 1,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      textAlign: 'center'
    },
  })
);

const Centres: FC<{}> = (): ReactElement => {
  const classes = useStyles();
  return (
    <>
      <Helmet>
        <title>
          {APP_TITLE}
        </title>
      </Helmet>
      <div className={classes.root}>
        <CentreList></CentreList>
      </div>
    </>
  );
};

export default Centres;