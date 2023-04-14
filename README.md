# gmail-similarity-detector

A lightweight package to detect similar Gmail addresses based on Gmail's unique addressing rules.

## Installation

```sh
npm install gmail-similarity-detector
```

## Usage

Here's an example of how to use this package in a backend Node.js/Express application to check if a similar Gmail address already exists before creating a new user:

1. Install the required dependencies:

```sh
npm install express body-parser
```

2. Create a server.ts file and import the isGmailSimilar function from gmail-similarity-detector:

```ts
import express from "express";
import bodyParser from "body-parser";
import { isGmailSimilar, normalizeGmail } from "gmail-similarity-detector";

const app = express();
app.use(bodyParser.json());

const existingUsers: string[] = [
  "example@gmail.com",
  "test.user+123@gmail.com",
];

app.post("/register", (req, res) => {
  const { email } = req.body;

  // Check if the input Gmail address is similar to an existing one
  const isSimilar = existingUsers.some((existingEmail) =>
    isGmailSimilar(existingEmail, email)
  );

  if (isSimilar) {
    res.status(400).send({
      message: "A user with a similar Gmail address already exists.",
    });
  } else {
    existingUsers.push(email);
    res.status(201).send({
      message: "User registered successfully.",
    });
  }
});

app.post("/normalize", (req, res) => {
  const { email } = req.body;

  try {
    const normalizedEmail = normalizeGmail(email);
    res.status(200).send({
      message: "Gmail address normalized successfully.",
      normalizedEmail,
    });
  } catch (error) {
    res.status(400).send({
      message: "Error normalizing Gmail address.",
      error: error.message,
    });
  }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
```

This example demonstrates how to use the isGmailSimilar() function from the gmail-similarity-detector package to compare the input Gmail address against existing ones. If a similar email address is found, the server responds with an error message; otherwise, it adds the new user and sends a success message.

Please note that this example uses a simple in-memory array to store email addresses, which would not be suitable for a real-world application. In practice, you should use a database to store user information securely.

## API

* isGmailSimilar(existingEmail: string, inputEmail: string): boolean
  * Checks if the input Gmail address is similar to an existing one.

* normalizeGmail(email: string): string
  * Normalizes a Gmail address by removing all dots and everything after the first plus sign.
