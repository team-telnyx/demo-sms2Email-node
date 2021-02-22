require("dotenv").config();
const nodemailer = require("nodemailer");
const config = require("./config");
const express = require("express");
const app = express();

app.use(express.json());

const router = express.Router();
app.use(router);

const smsRouter = async (req, res) => {
	res.sendStatus(200); // Play nice and respond to webhook
	const event = req.body.data;

	switch (event.event_type) {
		case "message.received":
			sendEmail(event);
			break;
		case "message.sent":
			// Do nothing
			break;
		default:
			console.log(event.event_type);
			break;
	}
};

const sendEmail = async (event) => {
	try {
		// Variables Needed for Email Info
		const smsFrom = event.payload.from.phone_number;
		const smsReceivedAt = event.payload.received_at;
		const smsBody = event.payload.text;

		// create reusable transporter object using the default SMTP transport
		// In order to use Gmail, you should create a new account solely for this Application
		// After Creation, you will need to go to https://myaccount.google.com/lesssecureapps and set to YES
		let transporter = nodemailer.createTransport({
			service: "gmail",
			auth: {
				user: config.SMTP_USER,
				pass: config.SMTP_PASS,
			},
		});

		// send mail with defined transport object
		let info = await transporter.sendMail({
			from: `Telnyx SMS Forwarding <${config.SMTP_USER}>`, // sender address
			to: config.DESTINATION_MAILBOX, // list of receivers
			subject: `New SMS Message from ${smsFrom}`, // Subject line
			text: `Message: ${smsBody}
            Recieved at: ${smsReceivedAt}`, // plain text body
		});

		// console.log("Message sent: %s", info.messageId);
		// Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

		// Preview only available when sending through an Ethereal account

		// console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

		// Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou..
	} catch (e) {
		console.log("Error Sending Email");
		console.log(e.message);
	}
};

router.route("/telnyx-webhook").post(smsRouter);

app.listen(config.PORT);
console.log(`Server listening on port ${config.PORT}`);
