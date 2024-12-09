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
  const queueType = accountData.leagueEntries[0].queueType;
  const tier = accountData.leagueEntries[0].tier;
  const rank = accountData.leagueEntries[0].rank;
  const lp = accountData.leagueEntries[0].leaguePoints;
  const wins = accountData.leagueEntries[0].wins;
  const losses = accountData.leagueEntries[0].losses;

  // 3. Feature 3 Metadata (Top Champions)
  const champions = accountData.champions
    .map((champion) => {
      return `Champion: ${champion.championId}, Level: ${champion.championLevel}, Points: ${champion.championPoints}`;
    })
    .join(", ");

  profileDiv.innerHTML = `
    <p>Name: ${name}</p>
    <p>Tagline: ${tagline}</p>
    <p>Profile Picture ID: ${profileId}</p>
    <p>Level: ${level}</p>
    <p>Queue Type: ${queueType}</p>
    <p>Rank: ${rank}</p>
    <p>Tier: ${tier}</p>
    <p>LP: ${lp}</p>
    <p>Wins: ${wins}</p>
    <p>Losses: ${losses}</p>
    <p>Top Champions: ${champions}</p>
  `;
} else {
  document.getElementById("profileInfo").innerText = "No data available.";
}
