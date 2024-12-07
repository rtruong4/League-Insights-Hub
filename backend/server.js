const express = require("express");
const app = express();
const { api_key } = require("./config.js");

// port
const port = 5001;

// middleware
app.use(express.json());

// routes

// get account by riot id
app.get("/get-account", async (req, res) => {
  try {
    const { gameName, tagLine } = req.body;

    const accountResponse = await fetch(
      `https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}?api_key=${api_key}`
    );

    const account = await accountResponse.json();

    const puuid = account.puuid;

    const summonerResponse = await fetch(
      `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}?api_key=${api_key}`
    );

    const summoner = await summonerResponse.json();

    const encryptedSummonerId = summoner.id;

    const leagueResponse = await fetch(
      `https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/${encryptedSummonerId}?api_key=${api_key}`
    );

    const league = await leagueResponse.json();

    res.status(200).json(league);
  } catch (error) {
    console.log(`GET route: error getting account, ${error.message}`);
  }
});

app.listen(port, () => {
  console.log(`Express Server listening on Port ${port}`);
});
