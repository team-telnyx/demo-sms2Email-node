require("dotenv").config();
var path = require("path");

const express = require("express");
const config = require("./config");
const telnyx = require("telnyx")(config.TELNYX_API_KEY);

const sms = require("./sms");

const app = express();

const webhookValidator = async (req, res, next) => {
	try {
		const event = telnyx.webhooks.constructEvent(
			JSON.stringify(req.body, null, 2),
			req.header("telnyx-signature-ed25519"),
			req.header("telnyx-timestamp"),
			config.TELNYX_PUBLIC_KEY
		);
		next();
		return;
	} catch (e) {
		console.log(`Invalid webhook: ${e.message}`);
		return res.status(400).send(`Webhook Error: ${e.message}`);
	}
};

app.use(express.json());

app.use("/sms", sms, webhookValidator);
app.post("/message/callbacks/status", (req, res) => {
	res.sendStatus(200);
	const event = req.body.data;
	console.log(`Received Status Callback: ${event.event_type}`);
});

app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname + "/index.html"));
});

app.listen(config.PORT);
console.log(`Server listening on port ${config.PORT}`);
