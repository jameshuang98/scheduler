# Interview Scheduler

Interview Scheduler is a full-stack, single-page application that makes use of many modern techniques to allow users to book, edit, and delete interviews. This app heavily utilizes React to create different components that users can interact with. Furthermore, it combines a Websocket server and Axios HTTP requests to an API Server (that uses a PostGresQL database) to provide a realtime experience.

This project also includes Unit and Integration testing via Jest, as well as End-to-End testing via Cypress. To isolate and test individual React components, Storybook was used.



## Screenshots of App

<h4>Screenshot of interviews on Monday:</h4>

!["Screenshot of interviews on Monday"](https://github.com/jameshuang98/scheduler/blob/master/public/images/Monday.png?raw=true)

<h4>Screenshot of interviews on Friday: </h4>

!["Screenshot of interviews on Friday"](https://github.com/jameshuang98/scheduler/blob/master/public/images/Friday.png?raw=true)

<h4>Screenshot of adding an interview:</h4>

!["Screenshot of adding an interview"](https://github.com/jameshuang98/scheduler/blob/master/public/images/Add2.png?raw=true)

<h4>Screenshot of confirmation when deleting an interview:</h4>

!["Screenshot of confirmation when deleting an interview"](https://github.com/jameshuang98/scheduler/blob/master/public/images/Delete.png?raw=true)


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
- Axios
- React
- Babel
- Jest
- Storybook
- Cypress
- Testing-library
