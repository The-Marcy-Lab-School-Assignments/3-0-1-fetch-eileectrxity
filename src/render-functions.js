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

export const renderUsers = () => {
};

export const renderPosts = () => {
}

export const renderNewUser = () => {
}