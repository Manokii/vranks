import React, { useState } from "react";
import {
  Button,
  makeStyles,
  TextField,
  Typography,
  Snackbar,
} from "@material-ui/core";
import axios from "axios";

const TournamentCreateMogul = ({
  setError,
  error,
  setLoadingState,
  loading,
  setLoadedTournament: setTournament,
  setLoadedTournamentSummary: summarize,
}) => {
  const [mogulId, setMogulId] = useState("");

  const loadMogul = () => {
    setLoadingState(true);
    axios
      .get(
        `https://noki-cors.herokuapp.com/polling.mogul.gg:443/API/Tournament/${mogulId}?lastUpdatedDateTime`,
        {
          headers: { "arena-api-key": "C434EDE3-2E7E-4B9D-A070-58B2CF94846D" },
        }
      )
      .then(({ data: { Response } }) => {
        if (Response.Game.GameName !== "Valorant")
          throw { message: "Error: The game is not Valorant." };

        const data = {
          mogulId: Response.TournamentId,
          startDate: Response.TournamentLiveDateTime,
          title: Response.TournamentTitle,
          type: Response.TournamentTypeName,
          host: {
            name: Response.EntityOwnerProfile.DisplayName,
            mogulId: Response.EntityOwnerProfile.EntityId,
            LogoUrl: Response.EntityOwnerProfile.LogoUrl,
          },
          participants: Response.Participants.length,
          rounds: Response.RoundRules.length,
          matches: Response.Matches.length,
        };
        summarize({ data, type: "mogul" });
        setTournament({ data: Response, type: "mogul" });
      })
      .catch((err) => setError(err.message))
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
            https://mogul.gg/tournaments/details/<strong>42991</strong>/
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
