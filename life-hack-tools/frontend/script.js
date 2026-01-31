async function loadTable() {
  const resultDiv = document.getElementById("resultTable");

  const params = new URLSearchParams(location.search);
  const env = params.get("env");

const API_URL =
  env === "local"
    ? "http://localhost:3000/api/brahma"
    : "https://your-render-app.onrender.com/api/brahma"; //TODO: change this


  try {
    const response = await fetch(API_URL);
    const html = await response.text();
    resultDiv.innerHTML = html;
  } catch (err) {
    console.error(err);
    resultDiv.innerText = "Error loading data";
  }
}

document.addEventListener("DOMContentLoaded", loadTable);
