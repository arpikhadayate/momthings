import axios from "axios"; 
import { load } from "cheerio";
import { parseAuspicious } from "./parseAuspicious.js";

export async function getBrahmaMuhurata(dateString) {
  const url = `https://www.drikpanchang.com/panchang/day-panchang.html?geoname-id=5809844&date=${dateString}`;
  const { data } = await axios.get(url);

  const $ = load(data);
  return parseAuspicious($);
}
