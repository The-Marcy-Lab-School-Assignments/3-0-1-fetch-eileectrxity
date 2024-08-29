import {
  renderStatus,
  setupPageBasics,
  renderUsers,
  renderPosts,
  renderNewUser,
} from "./render-functions.js";
import {
  checkResponseStatus,
  getUserPosts,
  createNewUser,
  getUsers,
} from "./fetch-functions.js";

//QUESTION 9: use all the fetch and render functions just made to complete app integration
// //q9 working solution with comments- IGNORE
// export default function app(appDiv) {
//   const { statusDiv, usersUl, postsUl, newUserForm, newUserDiv } = setupPageBasics(appDiv); //destructuring DOM elements returned by setupPageBasics to handle UI components

//   checkResponseStatus() //fetching to render API status below
//     .then((status) => renderStatus(statusDiv, status)); //passing the status data to renderStatus to update the UI in the #status div

//   getUsers() //fetching all users from API
//     .then((users) => renderUsers(usersUl, users)); //rendering all users in the #users-list ul on page load

//   usersUl.addEventListener('click', (e) => { //adding a click event listener to the users list, using event delegation to handle clicks on user lis
//     // console.log('event:', e, 'event target:', e.target, 'dataset:', e.target.dataset);
//     let clickedUser = e.target.dataset.userId; //extracting the userId from the clicked el's data attribute
//     if (clickedUser) { //only proceeds if an el with an existing userId dataset was clicked
//       getUserPosts(clickedUser) //fetching all posts pertaining to the clicked user
//         .then((posts) => renderPosts(postsUl, posts)); //rendering a maxNumPosts of the user's posts in the #posts-lists ul
//     }
//   });

//   newUserForm.addEventListener('submit', (e) => { //handling form submission for adding a new user
//     e.preventDefault(); //preventing forms default behavior of refreshing on submission
//     const newUserData = Object.fromEntries(new FormData(newUserForm)); //collecting form data and converting it into an obj w/ FormData API
//     // debugger; //logging directly in the dev tools console: ('event:', e, 'event target:', e.target) + (newUserData)
//     createNewUser(newUserData) //sending the new user data to the server via POST request
//       .then((newUser) => { //handling the server's response
//         renderNewUser(newUserDiv, newUser); //rendering the newly created user in the #new-user div
//         newUserForm.reset(); //clearing the form after a successful POST + render to be ready for the next input
//       })
//   });

//   // //alt method: using form obj methods instead of FormData API
//   // newUserForm.addEventListener('submit', (e) => {
//   //   e.preventDefault();
//   //   const formData = new FormData(newUserForm);
//   //   const newUserData = {
//   //     username: formData.get('username'),
//   //     email: formData.get('email')
//   //   };
//   //   createNewUser(newUserData)
//   //     .then((newUser) => {
//   //       renderNewUser(newUserDiv, newUser);
//   //       newUserForm.reset();
//   //     })
//   // });
// };

//q9 solution simplified without comments- refactored to demonstrate an asynchronous application flow, utilizing promise chaining to sequentially handle operations through event-driven architecture
export default function app(appDiv) {
  const home = setupPageBasics(appDiv);
  checkResponseStatus()
    .then((status) => renderStatus(home.statusDiv, status))
    .then(() => getUsers())
    .then((users) => renderUsers(home.usersUl, users));

  home.usersUl.addEventListener("click", (e) => { //event listeners shouldn't be inside the promise chain as they don't depend on the completion of previous async operations
    if (e.target.matches("button")) {
      getUserPosts(e.target.dataset.userId)
        .then((posts) => renderPosts(home.postsUl, posts));
      }
  });

  home.newUserForm.addEventListener("submit", (e) => {
    e.preventDefault();
    createNewUser(Object.fromEntries(new FormData(home.newUserForm)))
      .then((newUser) => {
        renderNewUser(home.newUserDiv, newUser);
        home.newUserForm.reset();
      });
  });
};
