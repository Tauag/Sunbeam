![build status](https://travis-ci.com/Tauag/Sunbeam.svg?branch=master)

# Intro

[![Join the chat at https://gitter.im/sunbeam-weather/community](https://badges.gitter.im/sunbeam-weather/community.svg)](https://gitter.im/sunbeam-weather/community?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Sunbeam (_Working Title_) is a weather app designed for clarity and simplicity. I borrowed design inspiration from both Google's Material UI guidelines and DarkSky. The intention is to have an application that is great at conveying just the weather data that you want to know everyday.

Powered by [DarkSky](https://darksky.net), one of the best sources for weather data.

# Local Setup

First, you will need to spin up a local server to act as middleware for DarkSky and Google APIs. I recommend a simple Nodejs server running Express. I don't publish my code for the backend server for the sake of keeping my keys hidden.

You will need to support the following endpoints:

```
Google's GeoCoding API: <Domain>/api/locate?address=<Address Here>
DarkSky's API: <Domain>/api/weather?lat=<Latitude>&lng=<Longitude>$time=<time>
```

Then all you gotta do is the usual:

```
npm i
npm start
```

# Thanks

This project was originally just intended for me to mess around with React's new Hooks API. If any of my code or design is useful to you please feel free to use it. Also, all feedback is appreciated!
