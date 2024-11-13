const express = require("express");
const router = express.Router();
const FetchDataController = require("../controllers/fetch-data");
const verifyComplianceController = require("../controllers/verify-compliance");

router.get(
  "/",
  FetchDataController.getWebPageData,
  verifyComplianceController.verifyCompliance
);

module.exports = router;
