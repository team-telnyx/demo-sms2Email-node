
<div align="center">

# Telnyx Node SMS to Email Demo


![Telnyx](./logo-dark.png)



The full documentation and tutorial is available on [developers.telnyx.com](https://developers.telnyx.com/docs/v2/development/dev-env-setup?lang=dotnet&utm_source=referral&utm_medium=github_referral&utm_campaign=cross-site-link)
</div>

## Pre-Reqs

You will need to set up:

-   [Telnyx Account](https://telnyx.com/sign-up?utm_source=referral&utm_medium=github_referral&utm_campaign=cross-site-link)
-   [Telnyx Phone Number](https://portal.telnyx.com/#/app/numbers/my-numbers?utm_source=referral&utm_medium=github_referral&utm_campaign=cross-site-link) enabled with:

    -   [Telnyx Messaging Profile](https://portal.telnyx.com/#/app/messaing/applications?utm_source=referral&utm_medium=github_referral&utm_campaign=cross-site-link)

-   [NODE](https://developers.telnyx.com/docs/v2/development/dev-env-setup?lang=node&utm_source=referral&utm_medium=github_referral&utm_campaign=cross-site-link) installed with [HomeBrew](https://formulae.brew.sh/formula/node)
-   Ability to receive webhooks (with something like [ngrok](https://developers.telnyx.com/docs/v2/development/ngrok?utm_source=referral&utm_medium=github_referral&utm_campaign=cross-site-link))

-   [Gmail Account](https://accounts.google.com/SignUp?service=mail&continue=https://mail.google.com/mail/) You will want to setup a new gmail account specifically for this demo

## What you can do

-   This app will take all recieved SMS messages and send them to the email address you have provided in `DESTINATION_MAILBOX` using the [NodeMailer](https://nodemailer.com/about/) Module

## Usage

The following environmental variables need to be set

| Variable               | Description                                                                                                                                 |
| :--------------------- | :------------------------------------------------------------------------------------------------------------------------------------------ |
| `USER_EMAIL`       | Your Sending, SMTP User Email|
| `USER_PASS` | Your Sending, SMTP User Password                                                            |
| `DESTINATION_MAILBOX`           | The DID associated with the call control connection to be used for initating calls                                                          |
| `APP_PORT`             | **Defaults to `8000`** The port the app will be served                                                                                   |


### .env file

This app uses the excellent [dotenv](https://www.npmjs.com/package/dotenv) package to manage environment variables.

Make a copy of [`.env.sample`](./.env.sample) and save as `.env` and update the variables to match your creds.

```
DESTINATION_MAILBOX=youremail@domain.com
SMTP_USER=yoursendinguser@gmail.com
SMTP_PASS=yoursendinguserpassowrd
PORT=8081

```

### Callback URLs For Telnyx Applications

| Callback Type          | URL                               |
| :--------------------- | :-------------------------------- |
| Inbound SMS Callback | `{ngrok-url}/telnyx-webhook` |


### Install

Run the following commands to get started

```
$ git clone https://github.com/team-telnyx/demo-sms2Email-node.git
$ npm install
```

### Ngrok

This application is served on the port defined in the runtime environment (or in the `.env` file). Be sure to launch [ngrok](https://developers.telnyx.com/docs/v2/development/ngrok?utm_source=referral&utm_medium=github_referral&utm_campaign=cross-site-link) for that port

```
./ngrok http 8000
```

> Terminal should look _something_ like

```
ngrok by @inconshreveable                                                                                                                               (Ctrl+C to quit)

Session Status                online
Account                       Little Bobby Tables (Plan: Free)
Version                       2.3.35
Region                        United States (us)
Web Interface                 http://127.0.0.1:4040
Forwarding                    http://your-url.ngrok.io -> http://localhost:8000
Forwarding                    https://your-url.ngrok.io -> http://localhost:8000

Connections                   ttl     opn     rt1     rt5     p50     p90
                              0       0       0.00    0.00    0.00    0.00
```

### Update your Messaging Profile
 At this point you will need to login to your Mission Control Account and Update  your Message Profile Inbound Webhook URL to the generated ngrok URL + path (Example: `http://ngrok.io/telnyx-webhook`).

### Run

Run the app with the express servering on port 8000

```
node server.js
```

## Next Steps

#### Gmail Setup for Use with Nodemailer

You should setup a new gmail account for the specific purpose of using this Application. Be sure to use a very complex password of 20+ charaters with upper, lower, number, and special characters. After you have setup this new gmail account, you will need to enable `LESS SECURE ACCESS`. Go to https://myaccount.google.com/lesssecureapps, and set to Yes.

### Deploy to Heroku

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)


