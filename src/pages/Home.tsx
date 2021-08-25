import { FC, ReactElement } from "react";
import { Helmet } from "react-helmet";
import { makeStyles, createStyles } from "@material-ui/core/styles";

import { APP_TITLE, PAGE_TITLE_HOME } from "../utils/constants";
import { IdentityForm} from "../components/IdentityForm";
import { Container } from "@material-ui/core";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flex: 1,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      textAlign: "center",
      margin: "20px",
    },
  })
);

const Home: FC<{}> = (): ReactElement => {
  const classes = useStyles();
  return (
    <>
      <Helmet>
        <title>
          {PAGE_TITLE_HOME} | {APP_TITLE}
        </title>
      </Helmet>
      <div className={classes.root}>
        <Container component="main" maxWidth="xs">
          <IdentityForm></IdentityForm>
        </Container>
      </div>
    </>
  );
};

export default Home;