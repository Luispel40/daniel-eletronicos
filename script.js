async function pushTableFromSheets(params) {
  const response = await fetch(
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vQ-Ec4yQHAejSfAOK_Y6emKGU2kL7rB2q5iCOsdR-6MGZrThUUuxfYsNvoIwmdA4Mtx831qkJFhG7GT/pubhtml?gid=0&single=true"
  );
  const html = await response.text();
  const tempElement = document.createElement("div");
  tempElement.innerHTML = html;
  const elementoRitz = tempElement.querySelector(".ritz");

  console.log(elementoRitz);
}

pushTableFromSheets();
