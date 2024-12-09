const express = require("express");
const app = express();
const { api_key } = require("./config.js");

// port
const port = 5001;

// middleware
app.use(express.json());

// Utility function to fetch metadata
const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    res
      .status(500)
      .json({ error: `(fetchData) An error occurred: ${error.message}` });
  }
};

// Get Account Data Wrapper
const getAccountData = async (gameName, tagLine) => {
  try {
    // 1. Get encrypted account puuid by Account gameName and tagLine
    const accountData = await fetchData(
      `https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}?api_key=${api_key}`
    );
    const puuid = accountData.puuid;

    // 2. Get encrypted summoner id using encrypted account puuid
    const summonerData = await fetchData(
      `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}?api_key=${api_key}`
    );
    const encryptedSummonerId = summonerData.id;

    // 3. Get Account Tier, Rank, League Points, Wins, Losses by encrypted summoner id
    const leagueEntries = await fetchData(
      `https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/${encryptedSummonerId}?api_key=${api_key}`
    );

    // 4. Get Account Top 3 Champions by Master (Descending)
    const champions = await fetchData(
      `https://na1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/${puuid}/top?api_key=${api_key}`
    );

    return {
      leagueEntries,
      champions,
    };
  } catch (error) {
    res
      .status(500)
      .json({ error: `(getAccountData) An error occurred: ${error.message}` });
  }
};

// GET: Fetch Account Metadata
app.get("/get-account", async (req, res) => {
  try {
    const { gameName, tagLine } = req.body;

    const accountData = await getAccountData(gameName, tagLine);

    res.status(200).json(accountData);
  } catch (error) {
    res.status(500).json({
      error: `(GET: /get-account) An error occurred: ${error.message}`,
    });
  }
});

app.listen(port, () => {
  console.log(`Express Server listening on Port ${port}`);
});
