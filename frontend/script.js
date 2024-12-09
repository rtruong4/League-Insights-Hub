const form = document.getElementById("summonerForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const sumName = document.getElementById("summonerName");
  const tagline = document.getElementById("tagLine");

  try {
    const getAccountData = await fetch("http://localhost:5001/account-data", {
      method: "POST",
      body: JSON.stringify({
        gameName: sumName.value,
        tagLine: tagline.value,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    const data = await getAccountData.json();
    console.log(data);
  } catch (error) {
    console.log(error.message);
  }
});
