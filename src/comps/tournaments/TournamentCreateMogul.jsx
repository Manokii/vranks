import React, { useState } from "react";
import {
  Button,
  makeStyles,
  TextField,
  Typography,
  Snackbar,
} from "@material-ui/core";
import axios from "axios";
import isDev from '../../IsDev'

const TournamentCreateMogul = ({
  setAlert,
  alert,
  setLoadingState,
  loading,
  setLoadedTournament: setTournament,
}) => {
  const [mogulId, setMogulId] = useState("");

  const loadMogul = () => {
    setLoadingState(true);
    axios
      .get(
        `https://${isDev() && 'noki-cors.herokuapp.com/'}polling.mogul.gg${isDev() && ':443'}/API/Tournament/${mogulId}?lastUpdatedDateTime`,
        {
          headers: { "arena-api-key": "C434EDE3-2E7E-4B9D-A070-58B2CF94846D" },
        }
      )
      .then(({ data: { Response } }) => {
        if (Response.Game.GameName !== "Valorant")
          throw new Error("Error: The game is not Valorant.")
        setTournament({ data: Response, type: "mogul" });
      })
      .catch((err) => setAlert(err.message))
      .then((_) => setLoadingState(false));
  };

  const handleChange = ({ currentTarget: { value } }) => {
    setMogulId(value);
  };

  return (
    <div className="mogul">
      <Typography variant="h6">Add tournament from Mogul.gg</Typography>
      <TextField
        variant="filled"
        label="Mogul ID"
        value={mogulId}
        onChange={handleChange}
        name="mogulId"
        helperText={
          <>
            https://mogul.gg/tournaments/details/<strong>43413</strong>/
          </>
        }
      />
      <Button
        variant="outlined"
        color="primary"
        onClick={loadMogul}
        disabled={loading}
      >
        {!loading ? "Load Tournament" : "Loading..."}
      </Button>
    </div>
  );
};

export default TournamentCreateMogul;
