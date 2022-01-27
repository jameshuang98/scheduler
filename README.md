# Interview Scheduler

Interview Scheduler is a full-stack, single-page application that makes use of many modern techniques to allow users to book, edit, and delete interviews. This app heavily utilizes React to create different components that users can interact with. Furthermore, it combines a Websocket server and Axios HTTP requests to an API Server (that uses a PostGresQL database) to provide a realtime experience.

This project also includes Unit and Integration testing via Jest, as well as End-to-End testing via Cypress. To isolate and test individual React components, Storybook was used.


Screenshots of App:

Screenshot of appointments on Monday: 
!["Screenshot of appointments on Monday"](https://github.com/jameshuang98/tweeter/blob/master/docs/tweeter-home.png?raw=true)

Screenshot of appointments on Friday: 
!["Screenshot of appointments on Friday"](https://github.com/jameshuang98/tweeter/blob/master/docs/tweeter-home.png?raw=true)

Screenshot of adding an appointment:
!["Screenshot of adding an appointment"](https://github.com/jameshuang98/tweeter/blob/master/docs/tweeter-tablet-size.png?raw=true)

Screenshot of editing an existing appointment:
!["Screenshot of editing an existing appointment"](https://github.com/jameshuang98/tweeter/blob/master/docs/tweeter-tablet-size.png?raw=true)

Screenshot of confirmation when deleting an appointment:
!["Screenshot of confirmation when deleting an appointment"](https://github.com/jameshuang98/tweeter/blob/master/docs/tweeter-tablet-size.png?raw=true)


## Setup

Install dependencies with 
```sh
npm install
```

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

## Dependencies
- Node.js
- Axios
- React
- Babel
- Jest
- Storybook
- Cypress
- Testing-library
