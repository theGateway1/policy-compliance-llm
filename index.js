const express = require("express");
const app = express();
const VerifyComplianceRouter = require("./routes/verify-compliance");
app.use(express.json());

// Add CORS middleware
app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "TODO - UPDATE THIS: https://d3ecocrh7z4pdj.amplifyapp.com"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET");
  next();
});

// App routes
app.get("/", (req, res, next) =>
  res.status(200).send("Welcome to AI based policy-checker.")
);

app.use("/verify-compliance", VerifyComplianceRouter);

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server listening on port ${port}`));
