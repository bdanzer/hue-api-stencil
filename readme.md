# Hue API
<img src="https://i.imgur.com/9C44hEF.png">
This app allows you to control Hue lights that have been added already.

## Requirements
You'll need a Hue API bridge and a light that has already been paired.

## Installation
* `git clone <repo>`
* `cd <into-cloned-dir>`
* `cd src/json/auth-copy.json && cp auth-copy.json auth.json`
* Set up the appId, clientId, & clientSecret with a hue api account: https://developers.meethue.com/develop/hue-api/
* `npm install`
* `npm start`

Once up, you can press the hue api button and connect locally to control the lights in your house.