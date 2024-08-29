//Lesson 3.0.1 Assignment: Fetch by Eileen

const userUrl = "https://jsonplaceholder.typicode.com/users";

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
    .then((response) => ({
      ok: response.ok,
      status: response.status,
      url: response.url,
    }))
    .catch((err) => console.error(`checkResponseStatus() error! Message: ${err.message}`));
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
    .catch((err) => console.error(`getUsers() error! Message: ${err.message}`));
};

/* QUESTION 3: use the following to pass the test
 URL = https://jsonplaceholder.typicode.com/users/{userId}/posts
 HTTP VERB = GET
 FUNCTION ARGS: (userId: number, maxNumPosts: number - default to 3)
 FUNCTION RETURN: a promise containing an arr of posts that belong to the given user, as identified by their id number. must limit the num of posts by maxNumPosts, with a default value of 3
*/ //q3 working solution with comments- IGNORE
// export const getUserPosts = () => {
//   return fetch(userUrl) //calling fetch func on the user posts API url to return a promise
//     .then((response) => { //the fetch func promise resolves to this response value containing all posts by a specified user (user id passed in as an arg)
//       if (!response.ok) { //guard clause in case HTTP status code is outside of successful 200-299 range
//         throw new Error(`HTTP response failed. ${response.status} ${response.statusText}`); //new err thrown to be caught by the .catch() block
//       } else return response.json(); //parsing + returning a new resolved promise of all the posts by an id'd user
//     })
//     .then(posts => posts.slice(0, maxNumPosts)) //returning a copy of the specified user's posts arr, limiting it to the maxNumPosts
//     .catch((err) => console.error(`getUserPosts() error! Message: ${err.message}`)) //handling ny errors that occur + logging an error msg
// };

//q3 solution (simplified without comments)
export const getUserPosts = (userId, maxNumPosts = 3) => {
  return fetch(`${userUrl}/${userId}/posts`)
    .then((response) => response.json())
    .then((posts) => posts.slice(0, maxNumPosts))
    .catch((err) => console.error(`getUserPosts() error! Message: ${err.message}`));
};

/* QUESTION 4: use the following to pass the test
 URL = https://jsonplaceholder.typicode.com/users
 HTTP VERB = POST
 FUNCTION ARGS: (newUserData: an obj containing a username and email property as strs)
 FUNCTION RETURN: a promise containing an new user obj of the given username and email properties from the newUserData obj passed in + a new user id property assigned by the API (we don't have to assign it)
 NOTE: since this API is a mock and doesn't persist data/save our data, the id returned will always be 11 for testing purposes- this is ok, we're just practicing POSTing data with fetch
*/ //q4 working solution with comments- IGNORE
// export const createNewUser = (newUserData) => {
//   console.log('new user data:', newUserData); //logging the initial data, an obj with a user name and email property but no id property
//   return fetch(userUrl, { //as the 2nd arg, using fetch API's options obj to configure HTTP request for POST method- in short, just making a POST request to the specified url
//     method: 'POST', //explicitly setting the HTTP method, noting that fetch with no options defined uses GET method by default
//     headers: { //defining metadata about the request providing addt'l instructions on how the server should handle the request/incoming data
//       'Content-Type': 'application/json', //specifying the type of content aka data format we're sending in our POST request (JSON) so the server knows what to expect + how to parse it
//     },
//     body: JSON.stringify(newUserData), //converting the actual data obj to JSON to be sent + transmitted in the body of the request- essentially posting the passed in new user info to the server's API/database
//   })
//     .then((response) => response.json()) //parsing the resolved JSON response from the server + converting it back to a JS obj (the server is the one hosting the API url, to be clear)
//     .then((newUser) => { //handling the parsed response, which now includes the 'id' assigned by the server
//       console.log('user data after posting:', newUserData) //to help me visualize- logging the original data, unchanged with no id property
//       console.log('posted user:', newUser) //logging the response: same as newUserData obj plus the id finally assigned + returned by the server
//       return newUser
//     })
//     .catch((err) => console.error(`createNewUser() error! Message: ${err.message}`)) //catches and logs any errors that occur during the fetch request
// }

//q4 solution simplified without comments
export const createNewUser = (newUserData) => {
  return fetch(userUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newUserData),
  })
    .then((response) => response.json())
    .then((newUser) => newUser)
    .catch((err) => console.error(`createNewUser() error! Message: ${err.message}`));
};
