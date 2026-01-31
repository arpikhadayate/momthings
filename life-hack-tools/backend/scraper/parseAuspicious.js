export function parseAuspicious($) {
  const value = $(".dpAuspiciousCardWrapper .dpTableValue")
    .first()
    .text()
    .replace(/\s+/g, " ")
    .trim();

  return value;
}
