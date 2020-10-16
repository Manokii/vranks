import React from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { projectFirestore } from "../../firebase/config";
import { Container, makeStyles, Typography, Button } from "@material-ui/core";
import { withRouter } from "react-router-dom";

const styles = makeStyles((theme) => ({
  tournamentList: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    width: "100%",

    "& .centered": {
      margin: "auto",
    },
  },
  container: {
    borderLeft: "1px solid black",
    borderRight: "1px solid black",
    height: "100%",
    display: "flex",

    "& .no-tournament": {
      margin: "auto",
      display: "flex",
      flexDirection: "column",
      alignContent: "center",
    },
  },
}));

const TournamentList = ({ history }) => {
  const classes = styles();
  const [tournaments, loading, error] = useCollectionData(
    projectFirestore.collection("tournaments"),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
      idField: "uid",
    }
  );

  return (
    <div className={classes.tournamentList}>
      {error && (
        <div className="centered">
          <strong>Error: {JSON.stringify(error)}</strong>
        </div>
      )}
      {loading && (
        <div className="centered">
          <span>Collection: Loading...</span>
        </div>
      )}
      {tournaments && (
        <Container className={classes.container} maxWidth="md">
          {tournaments.length ? (
            <div className="tournaments"></div>
          ) : (
            <div className="no-tournament">
              <Typography variant="button">
                There is no tournament listed.
              </Typography>
              <Button
                variant="contained"
                onClick={() => history.push("/tournaments/add")}
              >
                Add Tournament
              </Button>
            </div>
          )}
        </Container>
      )}
    </div>
  );
};

export default withRouter(TournamentList);
