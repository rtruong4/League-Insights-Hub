const form = document.getElementById("summonerForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("summonerName").value;
  const tagline = document.getElementById("tagLine").value;

  try {
    const getAccountData = await fetch("http://localhost:5001/account-data", {
      method: "POST",
      body: JSON.stringify({
        gameName: name,
        tagLine: tagline,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    const data = await getAccountData.json();
    console.log(data);

    sessionStorage.setItem("accountData", JSON.stringify(data));

    window.location.href = "profile.html";
  } catch (error) {
    console.log(error.message);
  }
});
