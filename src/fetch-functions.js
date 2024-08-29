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

export const getUsers = () => {
};

export const getUserPosts = () => {
};

export const createNewUser = () => {
}
