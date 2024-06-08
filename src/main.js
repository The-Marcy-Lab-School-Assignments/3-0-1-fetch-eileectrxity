import './style.css';
import {
  checkResponseStatus,
  getUserPosts,
  createNewUser,
  getUsers
} from './fetch-functions.js';
import app from './app'

const appDiv = document.querySelector('#app');
app(appDiv);

// Ordinarily this wouldn't be here, we're adding it to make it easier to see your fetch functions
// checkResponseStatus()
//   .then(statusInfo => console.log('status:', statusInfo))
//   .then(() => getUsers())
//   .then(users => console.log('users:', users))
//   .then(() => getUserPosts(1))
//   .then(posts => console.log('posts:', posts))
//   .then(() => createNewUser({ name: 'max12', email: 'max@gmail.com' }))
//   .then(newUser => console.log('newUser:', newUser));
