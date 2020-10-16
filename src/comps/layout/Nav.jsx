import React from "react";
import {
  makeStyles,
  Button,
  Typography,
  AppBar,
  IconButton,
  Toolbar,
} from "@material-ui/core";
import fbase, { projectAuth } from "../../firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import { withRouter } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles((theme) => ({
  nav: {
    display: "flex",
  },
  signedOut: {
    display: "flex",
    flex: 1,
    justifyContent: "flex-end",
    "& .sign-in-button": {
      alignSelf: "flex-end",
    },
  },
  signedIn: {
    flex: 1,
    display: "flex",
    alignItems: "center",

    "& .left-nav": {
      display: "flex",
      alignItems: "center",

      "& .btn": {
        color: "rgba(255,255,255,.8)",
      },
    },

    "& .right-nav": {
      flex: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",

      "& .sign-out-btn": {
        marginLeft: theme.spacing(2),
      },
    },
  },
}));

const Nav = ({ history }) => {
  const classes = useStyles();
  const [user] = useAuthState(projectAuth);
  const signInWithGoogle = () => {
    const provider = new fbase.auth.GoogleAuthProvider();
    projectAuth.signInWithPopup(provider);
  };

  const signOut = () => {
    projectAuth.signOut();
  };
  return (
    <div className={classes.nav}>
      <AppBar position="sticky">
        <Toolbar variant="dense">
          {user ? (
            <div className={classes.signedIn}>
              <div className="left-nav">
                <IconButton
                  edge="start"
                  className={classes.menuButton}
                  color="inherit"
                  aria-label="menu"
                >
                  <MenuIcon />
                </IconButton>
              </div>
              <div className="right-nav">
                <Typography variant="button" color="initial">
                  {user.email}
                </Typography>
                <Button
                  className="sign-out-btn"
                  variant="contained"
                  color="default"
                  onClick={signOut}
                >
                  Sign out
                </Button>
              </div>
            </div>
          ) : (
            <div className={classes.signedOut}>
              <Button
                className="sign-in-button"
                variant="outlined"
                onClick={signInWithGoogle}
              >
                Sign in
              </Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default withRouter(Nav);
