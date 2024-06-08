# Assignment 3.0.1 - Fetch

- [Assignment 3.0.1 - Fetch](#assignment-301---fetch)
  - [Before you begin](#before-you-begin)
- [Short Answers](#short-answers)
- [async/await vs .then](#asyncawait-vs-then)
- [Section 1 - Fetching the data](#section-1---fetching-the-data)
  - [Question 1 - checkResponseStatus](#question-1---checkresponsestatus)
  - [Question 2 - getUsers](#question-2---getusers)
  - [Question 3 - getUserPosts](#question-3---getuserposts)
  - [Question 4 - createNewUser](#question-4---createnewuser)
- [Section 2 - Rendering functions](#section-2---rendering-functions)
  - [Question 5 - renderStatus](#question-5---renderstatus)
  - [Question 6 - renderUsers](#question-6---renderusers)
  - [Question 7 - renderPosts](#question-7---renderposts)
  - [Question 8 - renderNewUser](#question-8---rendernewuser)
  - [innerHTML vs nodes](#innerhtml-vs-nodes)
- [Section 3 - App](#section-3---app)
  - [Testing API Calls](#testing-api-calls)

In this assignment we're going to use the free, open source, practice API https://jsonplaceholder.typicode.com. We're going to use the users and posts endpoints to list users, list a users posts, and then create a (fake) new user! We'll also practice rendering our results.


## Before you begin
Remember, we're using Vite! So clone down your repo and run:

```bash
npm i
npm run dev
```

That will start Vite's dev server which will automatically update your page any time you save your files.

# Short Answers
DO THESE FIRST! I know we say that just about every time, but this time it will make your work *much* easier. The question prompts below are more bare-bones than what your used to. This is on purpose, as we push you to rely less on us, and more on what you learned and the test suites. The short answers will help you understand what the code questions are asking.

**Please do the short answers first!**

# async/await vs .then
We know you may know how to use `async/await` syntax already, but we're going to use `.then` syntax for this assignment. Why? Because we want you to understand promises deeply, and also why we invented better syntax! We'll be using `async/await` in the next assignment, so don't worry, you'll get to practice that too.

# Section 1 - Fetching the data
First things first, we need to fetch our data. in `main.js` you can see we're logging the functions already. As you fill them out, uncomment them to check your progress (and of course use the tests too!).

Fill out your answers in `fetch-functions.js` and run the tests in `fetch-functions.spec.js`


## Question 1 - checkResponseStatus
- URL = https://jsonplaceholder.typicode.com/users
- HTTP VERB = GET
- FUNCTION ARGS: None
- FUNCTION RETURN:
  - A promise containing the fetch response's `status`, `ok`, and `url` properties

## Question 2 - getUsers
- URL = https://jsonplaceholder.typicode.com/users
- HTTP VERB = GET
- FUNCTION ARGS: None
- FUNCTION RETURN:
  - A promise containing an array of users

## Question 3 - getUserPosts
- URL = https://jsonplaceholder.typicode.com/users/{userId}/posts
- HTTP VERB = GET
- FUNCTION ARGS: (userId: number, maxNumPosts: number - default to 3)
- FUNCTION RETURN:
  - A promise containing an array of posts that belong to the given user, as identified by their id number. There are LOTS of posts, but you must limit the number by `maxNumPosts`, with a default value of 3.

## Question 4 - createNewUser
- URL = https://jsonplaceholder.typicode.com/users
- HTTP VERB = POST
- FUNCTION ARGS: (newUserData: an object containing a `username` and `email` properties, both strings)
- FUNCTION RETURN:
  - A promise containing an new `user` object. The object should contain the given `username` and `email` properties from the `newUserData` object you passed in, but *also* the API should assign you a new id.
  - NOTE: since this API isn't really saving our data, the id passed back will always just be `11`, but that's fine for us, we're just practicing `POST`ing data with fetch!


# Section 2 - Rendering functions
Once you get your data, you actually have to use it. Now, there are 2 steps: first you need to make the rendering functions, and **then** you need to use them. We'll test using them in section 3, for this section, ***just write the functions in `render-functions.js`.***

Note that we already have a `setupPageBasics` function. Don't touch it, that's just a helper to make sure our page is always setup correctly via JS (instead of html). This is how real frameworks tend to do it, as you can't typically write raw HTML. You have to do everything in JS!

Remember, HTML doesn't care about white space. So our examples below are nicely formatted, but your output will all be smushed on one line, that's ok!

**You may need to review some of your DOM manipulation methods, that's alright!**

## Question 5 - renderStatus
- FUNCTION ARGS
  - statusDiv: an `html element` of a `div`, this is what the function will modify
  - statusInfoObj: an object with `url`, `status`, and `ok` properties. `url` is a string, `status` is a http status number, and `ok` is a boolean

The function should create in the given div the following html:
- h2 tag
  - This will have an `id` of 'status-heading' and text content of "Info on - [url]"
- p tag
  - This will have an `id` of 'status-code'
  - text content depending on the `status` and `ok` properties of the `statusInfoObj`. The template looks like this:
    - "Status code: [status code], [if `ok` is true then print 'OK', otherwise 'FAIL']"
  - Here are some actual examples text outputs:
    - Status code: 200, OK!
    - Status code: 201, OK!
    - Status code: 500, FAIL!
    - Status code: 404, FAIL!

```html
<!-- This is an example output -->
<div>
  <h2 id="status-heading">Info on - https://jsonplaceholder.typicode.com/usersasda</h2>
  <p id="status-code">Status code: 404, FAIL!</p>
</div>
```

## Question 6 - renderUsers
- FUNCTION ARGS
  - usersUl: an `HTMLElement` of a `ul` that this function will add new `li`s to, one for each user in the array
  - users: an `array` of `user` objects, each will have a LOT of properties from the API, but the only ones we care about for this function are `username` and `id`

This function will mutate the given `ul` by creating `li`s with `button` elements inside them. For each `user` in the `users` array, create a li like this (DON'T FORGET THE DATA ATTRIBUTE)

```html
<!-- for a user { username: 'Bret', id: 1 }, the final html li should be -->
<li class="user-card">
  <button data-user-id="1">Load Bret's posts</button>
</li>
```

## Question 7 - renderPosts
- FUNCTION ARGS
  - postsUl: an `HTMLElement` of a `ul` that this function will add `li`s to, one for each post
  - posts: an array of `post` (as in "blog posts") objects, each one will have an `id`, `title`, and `body` attribute.

This function works just like render users, but it makes posts instead. It will render out however many `posts` its given into the `ul`:

```html
<!-- for a post: { id: 1, title: 'My title', body: 'lorem ipsum...' } -->
<li>
  <h2>My title</h2>
  <p> lorem ipsum...</p>
</li>
```

Note: all the titles and bodies of the api are fake latin gibberish.

## Question 8 - renderNewUser
- FUNCTION ARGS
  - newUserDiv: an `HTMLElement` of a `div` that we will mutate and add our `newUserInfo`
  - newUserInfo: an object with at least a `username` and `email` property, both are strings

This function is real simple! No arrays, just mutate the div to have an `h2` and `p` tag, no id's necessary.

```html
<!-- for a user {username: 'chuck12', email: 'chuck@gamil.com'} -->
<h2>chuck12</h2>
<p>chuck@gmail.com</p>
```


## innerHTML vs nodes
So this is a crucial question: can you just set the `innerHTML` or do you need to create isolated nodes one by one? The answer is: can you trust the data? If you *know* the data isn't user generated (like status codes) then `innerHTML` is ok, but if you're ever entering text that *could've* come from a user, use nodes for safety. No malicious JS is going to sneak into our pages!

# Section 3 - App
Ok, last part! The final test is putting everything together, these are called "integration" tests. Your job is now going to be filling out the `app` function in `app.js`. We already call it for you in `main.js`, so you should see your main page update with your changes.

Let's also mix things up: instead of listing questions one by one, let's use "User Stories" (which are of course backed up by tests) for this final section. Use all the fetch and render functions we just made!

- The page should render the basic page layout on load.
- The page should render the status of `https://jsonplaceholder.typicode.com/users` properly
- All 10 user buttons should be visible at the start of the page
- Since we haven't requested any yet, no posts should be displayed
- When we click on a user's button, it should load up 3 of their posts in the post section
- When we click on another user's button, the previous 3 posts should vanish, and be replaced by 3 new posts
  - hint: handle clicking these buttons with event delegation!
- We should be able to create a new user with a username and email when we click submit on the form
- When we click submit on the form, we should hit the `JSON Placeholder` api, and get back a user object
- When we click submit on the form, we should then see the username and email printed out below in the section under the form
- When we click submit on the form, the form clears itself
- We can fill out the form as many times as we like, and the new user section will only show the latest user
  - hint: Don't forget to use the FormData browser API to handle your form data!

OK! This is a lot to think about, but you can do it! Just remember to move slowly. First get your fetches, make sure you have the right data. Then move on to the render functions, and only once you know all those work, move onto the final App section.

## Testing API Calls

A quick note about the tests. We're faking our network calls with a library called `nock`. You don't make real network calls in tests, that's unreliable and slow. Unfortunately, `nock` gives pretty garbage error messages. `nock` will fail your test if you try to make a request for a route we haven't faked. Make *sure* each fetch function only fetches *once* and the url is exactly correct, ok?

Also, if you want to console log things in your tests, don't forget to scroll up in the terminal to see the log output!
