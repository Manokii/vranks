import React, { useState, useEffect } from "react";
import {
  Button,
  makeStyles,
  Typography,
  Snackbar,
  Fab,
  Container,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import Mogul from "./TournamentCreateMogul";
import SaveIcon from "@material-ui/icons/Save";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const styles = makeStyles((theme) => ({
  createTournament: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",

    "& .content": {
      display: "flex",
      width: "100%",
      flexWrap: "wrap",
      justifyContent: "center",
      "& .inputs": {
        display: "flex",
        flexDirection: "column",
        "& > *": {
          padding: theme.spacing(2),
          borderBottom: "1px solid rgba(0,0,0,.1)",
        },
      },

      "& .output": {
        padding: theme.spacing(2),
        borderLeft: "1px solid rgba(0,0,0,.1)",
        flex: 1,
        whiteSpace: "pre-wrap",
        wordBreak: "",
        maxHeight: 500,
        overflowY: "auto",
      },

      "& .mogul": {
        display: "flex",
        flexDirection: " column",
      },
    },
  },
  save: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

const TournamentCreate = () => {
  const classes = styles();
  const [loading, setLoadingState] = useState(false);
  const [error, setError] = useState(null);
  const [loadedTournament, setLoadedTournament] = useState(null);
  const [loadedTournamentSummary, setLoadedTournamentSummary] = useState(null);

  const closeSnackbar = (event, reason) => {
    if (reason === "clickaway") return;
    setError(null);
  };

  useEffect(() => {
    if (!loadedTournament) return;
    console.log(loadedTournament);
  }, [loadedTournament]);

  return (
    <div className={classes.createTournament}>
      <Container maxWidth="md">
        <div className="content">
          <div className="inputs">
            <Mogul
              error={error}
              setError={setError}
              closeSnackbar={closeSnackbar}
              setLoadingState={setLoadingState}
              loading={loading}
              setLoadedTournament={setLoadedTournament}
              setLoadedTournamentSummary={setLoadedTournamentSummary}
            />

            <Typography
              variant="button"
              style={{ textAlign: "center", opacity: 0.5 }}
            >
              More options soon...
            </Typography>
          </div>

          {Boolean(loadedTournament) && (
            <div className="output">
              {JSON.stringify(loadedTournamentSummary.data, null, 3)}
            </div>
          )}
        </div>
      </Container>

      <Fab
        disabled={!Boolean(loadedTournament)}
        color="primary"
        variant="extended"
        className={classes.save}
      >
        <SaveIcon className={classes.extendedIcon} />
        Save
      </Fab>

      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        open={Boolean(error)}
        autoHideDuration={6000}
        onClose={closeSnackbar}
      >
        <Alert severity="error">{error}</Alert>
      </Snackbar>
    </div>
  );
};

export default TournamentCreate;
