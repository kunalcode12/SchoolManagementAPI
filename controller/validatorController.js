const stringSimilarity = require("string-similarity");

const validSchoolNames = [
  "High School",
  "Elementary School",
  "Public School",
  "Middle School",
  "Academy",
  "Primary School",
  "Secondary School",
  "International School",
  "Christian School",
  "Catholic School",
  "Islamic School",
  "Prep School",
  "school",
  "School",
];
const isValidSchoolName = function (name) {
  // Check for at least one space
  if (!/\s/.test(name)) return false;

  // Check for invalid characters
  const pattern = /^[a-zA-Z0-9\s,.-]+$/;
  if (!pattern.test(name)) return false;

  // Check for too many repitations repetition
  if (/(.)\1{5,}/.test(name)) return false;
  if (name.trim().length < 3 || name.length > 100) {
    return false;
  }

  const matches = stringSimilarity.findBestMatch(name, validSchoolNames);
  return matches.bestMatch.rating > 0.4;
};

const validateAddress = function (address) {
  if (typeof address !== "string") return false;

  // Check length
  if (address.length < 5 || address.length > 200) return false;

  // Check for at least one number
  if (!/\d/.test(address)) return false;

  // Check for at least one letter
  if (!/[a-zA-Z]/.test(address)) return false;

  // Check for at least one space
  if (!/\s/.test(address)) return false;

  // Check for invalid characters
  const pattern = /^[a-zA-Z0-9\s,.-]+$/;
  if (!pattern.test(address)) return false;

  // Check for too many repitations repetition
  if (/(.)\1{5,}/.test(address)) return false;

  return true;
};

module.exports = { isValidSchoolName, validateAddress };
