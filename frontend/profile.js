const accountData = JSON.parse(sessionStorage.getItem("accountData"));

if (accountData) {
  const profileDiv = document.getElementById("profileInfo");
  console.log(accountData);

  // 1. Feature 1 Metadata (Name, Tagline, Profile Picture, Level)
  const name = accountData.gameName;
  const tagline = accountData.tagLine;
  const profileId = accountData.summonerData.profileIconId;
  const level = accountData.summonerData.summonerLevel;

  // 2. Feature 2 Metadata (Rank, Tier, LP, Wins, Losses)
  const tier = accountData.leagueEntries[0].tier;
  const rank = accountData.leagueEntries[0].rank;
  const lp = accountData.leagueEntries[0].leaguePoints;
  const wins = accountData.leagueEntries[0].wins;
  const losses = accountData.leagueEntries[0].losses;

  // 3. Feature 3 Metadata (Top Champions)

  console.log(`Summoner Name: ${name}`);
  console.log(`Tagline: ${tagline}`);
  console.log(`Profile Picture ID: ${profileId}`);
  console.log(`Summoner Level: ${level}`);
  console.log(`Rank: ${rank}`);
  console.log(`Tier: ${tier}`);
  console.log(`League Points (LP): ${lp}`);
  console.log(`Wins: ${wins}`);
  console.log(`Losses: ${losses}`);
} else {
  document.getElementById("profileInfo").innerText = "No data available.";
}
