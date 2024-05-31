const express = require('express');
const router = express.Router();
const { createMessage, getMessage } = require("../Controler/MessageControl.js");

router.post("/", createMessage);
router.get("/:chatId", getMessage);

module.exports = router;
