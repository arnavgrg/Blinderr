# LA Hacks 2020 Front End React App

## Pre-requisites

* [Node.js v10+](https://nodejs.org/en/download/)
* NPM v6+ (comes installed with newer Node versions)

## Install Dependencies

Run `npm install` to install all dependencies from NPM.

## Install Twilio CLI

The app is deployed to Twilio using the Twilio CLI. Install twilio-cli with:

    $ npm install -g twilio-cli

Login to the Twilio CLI. You will be prompted for your Account SID and Auth Token, both of which you can find on the dashboard of your [Twilio console](https://twilio.com/console).

    $ twilio login

This app requires an additional plugin. Install the CLI plugin with:

    $ twilio plugins:install @twilio-labs/plugin-rtc

## Deploy the app to Twilio

The app is deployed to Twilio with a single command:

    $ npm run deploy:twilio-cli

This performs the following steps:

* Builds the React app in the `src` directory
* Generates a random code used to access the Video app
* Deploys the React app and token server function as a Twilio Serverless service.
* Prints the URL for the app and the passcode.

**The passcode will expire after one week**. To generate a new passcode, redeploy the app:

    $ npm run deploy:twilio-cli -- --override

## View app details

View the URL and passcode for the Video app with

     $ twilio rtc:apps:video:view

## Delete the app

Delete the app with

    $ twilio rtc:apps:video:delete

This removes the Serverless app from Twilio. This will ensure that no further cost are incurred by the app.

## Running a local token server - Required for running app locally

This application requires an access token to connect to a Room. The included local token [server](server.js) provides the application with access tokens. Perform the following steps to setup the local token server:

- Create an account in the [Twilio Console](https://www.twilio.com/console).
- Click on 'Settings' and take note of your Account SID.
- Create a new API Key in the [API Keys Section](https://www.twilio.com/console/video/project/api-keys) under Programmable Video Tools in the Twilio Console. Take note of the SID and Secret of the new API key.
- Store your Account SID, API Key SID, and API Key Secret in a new file called `.env` in the root level of the application (example below).

```
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_API_KEY_SID=SKxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_API_KEY_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

Now the local token server (see [server.js](server.js)) can dispense Access Tokens to connect to a Room.

## Running the App locally

Run the app locally with

    $ npm start

This will start the local token server and run the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to see the application in the browser.

The page will reload if you make changes to the source code in `src/`.
You will also see any linting errors in the console. Start the token server locally with

    $ npm run server

The token server runs on port 8081 and expects a `GET` request at the `/token` route with the following query parameters:

```
identity: string,  // the user's identity
roomName: string   // the room name
```

The response will be a token that can be used to connect to a room.

Try it out with this sample `curl` command:

`curl 'localhost:8081/token?identity=TestName&roomName=TestRoom'`
