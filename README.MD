![build status](https://travis-ci.com/Tauag/Sunbeam.svg?branch=master)
![gitter](https://badges.gitter.im/sunbeam-weather/community.svg)

# Intro

Sunbeam (_Working Title_) is a weather app designed for clarity and simplicity. I took design inspiration from Google's Material UI guidelines and incorporated it to an application that is great at conveying just the weather data that you want to know everyday.

Powered by [DarkSky](https://darksky.net), one of the best sources for weather data.

# Local Setup

First, you will need to spin up a local server to act as middleware for DarkSky and Google APIs. I recommend a simple Nodejs server running Express.

You will need to support the following endpoints:

```
Google's GeoCoding API: <Domain>/api/locate?address=<Address Here>
DarkSky's API: <Domain>/api/weather?lat=<Latitude>&lng=<Longitude>
```

Then all you gotta do is the usual:

```
npm i
npm start
```

# Thanks

This project was originally just intended for me to mess around with React's new Hooks API. If any of my code or design is useful to you please feel free to use it. Also, all feedback is appreciated!
