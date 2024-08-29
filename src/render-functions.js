export const setupPageBasics = (parentEl) => {
    parentEl.innerHTML = `
      <h1>Intro To Fetch!</h1>
      <div id='status'></div>
      <div id='users'>
        <h2>Users</h2>
        <ul id='users-list'></ul>
      </div>
      <div id='posts'>
        <h2>Posts</h2>
        <ul id='posts-list'></ul>
      </div>
      <form id='new-user-form' aria-labelledby='new-user-heading'>
        <h2 id='new-user-heading'>Create A New Blog User!</h2>
        <label for='username'>Username:</label>
        <input type='text' id='username' name='username' />
        <label for='email'>Email:</label>
        <input type='email' id='email' name='email' />
        <button>Submit</button>
      </form>
      <div id='new-user'></div>
    `;

    const statusDiv = parentEl.querySelector('#status');
    const usersUl = parentEl.querySelector('#users-list');
    const postsUl = parentEl.querySelector('#posts-list');
    const newUserForm = parentEl.querySelector('#new-user-form');
    const newUserDiv = parentEl.querySelector('#new-user');

    return { statusDiv, usersUl, postsUl, newUserForm, newUserDiv };
};

/* QUESTION 5
FUNCTION ARGS:
 statusDiv: an html el of a div, this is what the func will modify
 statusInfoObj: an obj with url, status, and ok properties. url is a str, status is a http status num, and ok is a bool
EXPECTED FUNCTION OUTPUT:
<!--  where statusInfoObj = { ok: response.ok.., status: response.status.., url: response.url.. } -->
<div>
 <h2 id="status-heading">Info on - https://jsonplaceholder.typicode.com/usersasda</h2>
 <p id="status-code">Status code: 404, FAIL!</p>
</div>
*/
export const renderStatus = (statusDiv, statusInfoObj) => { //statusInfoObj is the obj that our checkResponseStatus() func returns
  const h2 = document.createElement('h2')
  h2.id = 'status-heading';
  h2.textContent = `Info on - ${statusInfoObj.url}`;

  const p = document.createElement('p');
  p.id = 'status-code';
  p.textContent = `Status code: ${statusInfoObj.status}, ${statusInfoObj.ok ? 'OK!' : 'FAIL!'}`

  statusDiv.append(h2, p); //appending newly created els to the statusDiv- noting that append was used over appendChild as the latter can only append 1 el at a time
};


/* QUESTION 6
FUNCTION ARGS:
 usersUl: an HTMLElement of a ul that this func will add new lis to, one for each user in the arr
 users: an arr of user objs, each will have a LOT of properties from the API, but the only ones we care about for this func are username and id
EXPECTED FUNCTION OUTPUT:
<!--  where users = [{ id: 1, username: "Bret" }, { id: 2, username: "Antonette" }, etc...] -->
<li class="user-card">
 <button data-user-id="1">Load Bret's posts</button>
</li>
*/
export const renderUsers = (usersUl, users) => { //users is the arr of objs that our getUsers() func returns
  usersUl.innerHTML = '';
  users.forEach((user) => { //iterating over each user obj in the given arr of users, will access their id + username properties by dot notation
    const li = document.createElement('li');
    li.classList.add('user-card'); //adding a new class, .user-card, to each newly created user li

    const button = document.createElement('button');
    button.dataset.userId = user.id; //setting dataset automatically converts camelCase in JavaScript to the correct kebab-case in HTML- could also have done button.setAttribute('data-user-id', user.id) but this is better practice in this case
    button.textContent = `Load ${user.username}'s posts`;

    li.appendChild(button);
    usersUl.appendChild(li);
 })
};

/* QUESTION 7
FUNCTION ARGS:
 postsUl: an HTMLElement of a ul that this func will add lis to, one for each post
 posts: an arr of post (as in "blog posts") objs, each one will have an id, title, and body attribute
EXPECTED FUNCTION OUTPUT:
<!--  where posts = [{ id: 1, title: 'My title', body: 'lorem ipsum...' }, { id: 2, title: 'My title', body: 'lorem ipsum...' }, etc...] -->
<li>
 <h2>My title</h2>
 <p> lorem ipsum...</p>
</li>
*/
export const renderPosts = (postsUl, posts) => { //posts is the arr of objs that our getUserPosts() func returns
  postsUl.innerHTML = ''; //clearing the posts ul to render a new post on 'click' listener later
  posts.forEach((post) => { //iterating over each user's post obj
    const li = document.createElement('li');
    
    const h2 = document.createElement('h2');
    h2.textContent = post.title; //post.title is already a str so no need to do string interpolation
    
    const p = document.createElement('p');
    p.textContent = post.body;
    
    li.append(h2, p);
    postsUl.appendChild(li);
 })
};


/* QUESTION 8
FUNCTION ARGS:
 newUserDiv: an HTMLElement of a div that we will mutate and add our newUserInfo
 newUserInfo: an obj with at least a username and email property, both are strs
EXPECTED FUNCTION OUTPUT:
<!--  where newUserInfo = { username: "max12", email: "max@gmail.com", id: 11 } -->
<h2>chuck12</h2>
<p>chuck@gmail.com</p>
*/
export const renderNewUser = (newUserDiv, newUserInfo) => { //users is the obj that our getUsers() func returns
  newUserDiv.innerHTML = '';
  const h2 = document.createElement('h2');
  h2.textContent = newUserInfo.username;

  const p = document.createElement('p');
  p.textContent = newUserInfo.email;

  newUserDiv.append(h2, p);
};