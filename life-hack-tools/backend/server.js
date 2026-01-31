import express from "express";
import cors from "cors";
import { getNext30Dates } from "./utils/dates.js";
import { getBrahmaMuhurata } from "./scraper/getBrahmaMuhurata.js";

const app = express();
app.use(cors());

async function buildBrahmaTable(dates) {
  const values = await Promise.all(
    dates.map(date => getBrahmaMuhurata(date))
  );

  let html = `
    <table border="1" cellpadding="6" style="border-collapse: collapse;">
      <thead>
        <tr>
          <th>Date</th>
          <th>Brahma Muhurta</th>
        </tr>
      </thead>
      <tbody>
  `;

  dates.forEach((date, i) => {
    html += `
      <tr>
        <td>${date}</td>
        <td>${values[i]}</td>
      </tr>
    `;
  });

  html += `
      </tbody>
    </table>
  `;

  return html;
}

app.get("/api/brahma", async (req, res) => {
  try {
    const dates = getNext30Dates();
    const html = await buildBrahmaTable(dates);
    res.send(html);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to generate table" });
  }
});

app.listen(3000, () => {
  console.log("Backend running on port 3000");
});
