import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import fbase, { projectAuth } from "../../firebase/config";
import { Button, makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  signIn: {
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
}));
const SignInPage = () => {
  const classes = useStyles();

  const signInWithGoogle = () => {
    const provider = new fbase.auth.GoogleAuthProvider();
    projectAuth.signInWithPopup(provider);
  };

  return (
    <div className={classes.signIn}>
      <Typography variant="button">
        You are not logged in, This app is whitelist only
      </Typography>

      <Button variant="outlined" color="default" onClick={signInWithGoogle}>
        Sign In With Google 
      </Button>
    </div>
  );
};

export default SignInPage;
