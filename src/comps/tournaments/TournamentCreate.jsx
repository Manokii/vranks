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
import { projectFirestore as db } from "../../firebase/config";
import axios from "axios";

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


// ====================== Functions ===========================
const convertDataFromMogul = async (loadedTournament) => {
  const { data } = loadedTournament;
  let structured = {
    bracketingPlatform: 'mogul',
    mogulOwnerId: data.EntityOwnerProfile.EntityName,
    mogulOwnerUid: data.EntityOwnerProfile.EntityId,
    region: data.GamingServerRegionName,
    dateCreated: data.CreatedDateTime,
    isLan: data.LanModeEnabled,
    isPublic: data.IsPublic,
    documentStatus: 'pending',
    status: data.TournamentIsComplete ?  'finished'  : data.TournamentIsLive ? 'ongoing' : 'upcoming',
    allowedCountryList: data.AllowedCountryList.map((country) => country.AddressCountryCode),
    dateTournamentPublic: data.TournamentLiveDateTime,
    dateTournamentStart: data.TournamentStartDateTime,
    dateTournamentEnd: data.TournamentStartDateTime,
    title: data.TournamentTitle,
    titleSub: data.TournamentSubTitle,
    tags: data.TournamentStaticTags,
    description: data.TournamentDescription,
    game: data.Game.GameName.toLowerCase(),
    type: data.TournamentTypeName,
    logoUrl: data.LogoUrl,
    matchIds: data.Matches.filter(({EntityParticipantA: a, EntityParticipantB: b}) => ![a.IsBye, a.NoShow, a.Forfeit, b.IsBye, b.NoShow, b.Forfeit].some(e => e)).map(({TournamentMatchId}) => 
      TournamentMatchId
    )
  };

  return structured
};

// ====================== Tournament Create ===================

const TournamentCreate = () => {
  const classes = styles();
  const [loading, setLoadingState] = useState(false);
  const [alert, setAlert] = useState();
  const [loadedTournament, setLoadedTournament] = useState(null);
  const [loadedTournamentSummary, setLoadedTournamentSummary] = useState(null);

  const closeSnackbar = (event, reason) => {
    if (reason === "clickaway") return;
    setAlert(null);
  };

  useEffect(() => {
    if (!loadedTournament) return;
    console.log(loadedTournament);
    if (loadedTournament.type === "mogul") {
      convertDataFromMogul(loadedTournament).then(setLoadedTournamentSummary);
    } else if (loadedTournament.type === "manual") {
      console.log("Adds tournament manually");
    }
  }, [loadedTournament]);


  useEffect(() => {
    if(!loadedTournamentSummary) return
    console.log(loadedTournamentSummary)
  }, [loadedTournamentSummary])

  const testShtHere = async () => {
    console.log(loadedTournamentSummary)
  };
  
  const save = async () => {
    const pendingRef = db.collection('pending-tournaments').doc(String(loadedTournament.data.TournamentId))
    const tRef = db.collection('tournaments').doc(String(loadedTournament.data.TournamentId))
    try { 
      const pendingSnap = await pendingRef.get()
      const tSnap = await tRef.get()
      if (pendingSnap.exists) {
        setAlert( {message: `Tournament is already in pending queue`, severity: 'info'})
      } else if (tSnap.exists && tSnap.data() === loadedTournamentSummary) {
          setAlert( {message: `Tournament already exists`, severity: 'warning'})
      } else {
        pendingRef.set(loadedTournamentSummary).then(() => {
          setAlert( {message: `Tournament ${tSnap.id} Successfully Updated`, severity: 'success'})
        })
      }
    } catch (err) {
      console.log(err)
      setAlert(err)
    }
  }

  return (
    <div className={classes.createTournament}>
      <Container maxWidth="md">
        <div className="content">
          <div className="inputs">
            <Mogul
              alert={alert}
              setAlert={setAlert}
              closeSnackbar={closeSnackbar}
              setLoadingState={setLoadingState}
              loading={loading}
              setLoadedTournament={setLoadedTournament}
            />

            <Typography
              variant="button"
              style={{ textAlign: "center", opacity: 0.5 }}
            >
              More options soon...
            </Typography>
          </div>

          {Boolean(loadedTournamentSummary) && (
            <div className="output">
              {JSON.stringify(loadedTournamentSummary, null, 3)}
            </div>
          )}
        </div>
        <Button onClick={testShtHere}>Test</Button>
      </Container>

      <Fab
        disabled={!Boolean(loadedTournamentSummary && loadedTournament)}
        onClick={save}
        color="primary"
        variant="extended"
        className={classes.save}
      >
        <SaveIcon className={classes.extendedIcon} />
        Save
      </Fab>

      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        open={Boolean(alert)}
        autoHideDuration={6000}
        onClose={closeSnackbar}
      >
        <Alert severity={alert?.severity || 'error'}>{alert?.message}</Alert>
      </Snackbar>
    </div>
  );
};

export default TournamentCreate;
