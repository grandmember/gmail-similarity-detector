import { isGmailSimilar } from "./gmail-similarity-detector";

const email1 = "example@gmail.com";
const email2 = "e.xample+123@gmail.com";

console.log(
  `Are ${email1} and ${email2} similar?`,
  isGmailSimilar(email1, email2),
  "; Expected: true",
  "; Actual: ",
  isGmailSimilar(email1, email2),
  "; Passed: ",
  isGmailSimilar(email1, email2) === true
);
