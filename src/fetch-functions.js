//Lesson 3.0.1 Assignment: Fetch by Eileen

const userUrl = 'https://jsonplaceholder.typicode.com/users'
 
/* QUESTION 1: use the following to pass the test
 URL = https://jsonplaceholder.typicode.com/users
 HTTP VERB = GET
 FUNCTION ARGS: none
 FUNCTION RETURN: a promise containing the fetch response's status, ok, and url properties
*/ //q1 working solution with comments- IGNORE
// export const checkResponseStatus = () => {
//   return fetch(userUrl)
//     .then(response => { //returning a promise, fetching from the right url
//       return { //returning an obj with the exact structure expected in the test spec file
//         'ok': response.ok, //a bool indicating if the response status is in the 200-299 range (success!)
//         'status': response.status, //the HTTP status code of the response
//         'url': response.url //URL of the request made
//       }
//     })
//     .catch((err) => console.error(`checkResponseStatus() error! Message: ${err.message}`)) //catching any errors + logging a msg as best practice
// };

//q1 solution simplified without comments
export const checkResponseStatus = () => {
  return fetch(userUrl)
 .then(response => ({
      'ok':response.ok,
      'status': response.status,
      'url': response.url
 }))
 .catch((err) => console.error(`checkResponseStatus() error! Message: ${err.message}`))
};

/* QUESTION 2: use the following to pass the test
 URL = https://jsonplaceholder.typicode.com/users
 HTTP VERB = GET
 FUNCTION ARGS: none
 FUNCTION RETURN: a promise containing an array of users
*/ //q2 working solution with comments- IGNORE; to help me understand how fetching + promises relate to one another
// export const getUsers = () => {
//   return fetch(userUrl) //calling fetch func on the user API url- noting that the fetch func internally creates + returns a promise which is an instance of JS's Promise class/prototype. this promise represents the eventual completion (or failure) of the HTTP request
//     .then((response) => { //the fetch func promise resolves to this response value- the response is an obj instance of JS's Response class/prototype that represents the HTTP response and has its own methods and properties
//       if (!response.ok) { //response.ok represents the HTTP status code and is only true if found within the 200-299 range- noting that we need this guard clause because, by default, the fetch func promise does not reject if the request returns a 400-500 HTTP failure code, only on network errors
//         throw new Error(`HTTP response failed. ${response.status} ${response.statusText}`); //throwing a new err that will be caught by the catch chain
//       } else return response.json(); //consuming the readable stream and parsing the HTTP response body as JSON- here, we return a new promise that resolves with the resulting parsed data, which is then passed in to the next .then() in the promise chain
//     })
//     .then(data => {
//       return data; //don't need to console.log the data as it's already being logged in main.js
//     }) //only returning the data since it's required by the test spec- usually do not need to return the data if we're not passing it further down the promise chain to any subsequent .then() calls- this would've made it a terminal operation in the promise chain
//     .catch((err) => { //handle any errors that occur during the promise resolution- named parameter err instead of error to not confuse self with the Error keyword
//       console.error(`getUserPosts() error! Message: ${err.message}`); //logging error msg to the console using the error obj's .message property
//     }) //promise is rejected if code reaches this catch chain
// };

//q2 solution simplified without comments
export const getUsers = () => {
  return fetch(userUrl)
 .then((response) => response.json())
 .then((users) => users)
 .catch((err) => console.error(`getUsers() error! Message: ${err.message}`))
};

export const getUserPosts = () => {
};

export const createNewUser = () => {
}
