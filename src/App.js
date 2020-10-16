import { Button, makeStyles } from "@material-ui/core";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import fbase, { projectAuth } from "./firebase/config";
import Nav from "./comps/layout/Nav";
import SignInPage from "./comps/layout/SignInPage";
import { Switch, Route, Redirect } from "react-router-dom";
import TournamentList from "./comps/tournaments/TournamentList";
import TournamentCreate from "./comps/tournaments/TournamentCreate";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    height: "100vh",
    width: "100%",
    flexDirection: "column",

    "& .main-content": {
      flex: 1,
    },
  },
}));

function App() {
  const classes = useStyles();
  const [user] = useAuthState(projectAuth);

  const signInWithGoogle = () => {
    const provider = new fbase.auth.GoogleAuthProvider();
    projectAuth.signInWithPopup(provider);
  };

  return (
    <div className={classes.root}>
      <Nav />
      <div className="main-content">
        {user ? (
          <Switch>
            <Route path="/tournaments" exact>
              <TournamentList />
            </Route>
            <Route path="/tournaments/add" exact component={TournamentCreate} />
          </Switch>
        ) : (
          <SignInPage />
        )}
      </div>
    </div>
  );
}

export default App;
