import { describe, it, expect, afterEach, afterAll, beforeEach, vi } from 'vitest';

import app from './app';
import ScoreCounter from 'score-tests';
import path from 'path';
import nock from 'nock';
import nodeFetch from 'node-fetch';

// node fetch works nicely with nock, native fetch does not and may be missing on some systems
global.fetch = nodeFetch;

const testSuiteName = 'App Tests';
const scoresDir = path.join(__dirname, '..', 'scores');
const scoreCounter = new ScoreCounter(testSuiteName, scoresDir);

const baseUrl = 'https://jsonplaceholder.typicode.com';
const usersUrl = `${baseUrl}/users`;

const waitForRenders = () => new Promise(resolve => setTimeout(resolve, 25));

describe(testSuiteName, () => {
  it('app - renders the right status', async () => {
    const users = [
      { id: 1, username: 'Leanne_Graham' },
      { id: 2, username: 'Ervin_Howell' },
      { id: 3, username: 'that-guy-there' },
    ];
    nock(baseUrl).persist().get('/users').reply(200, users);

    const builtApp = document.createElement('div');
    app(builtApp);

    await waitForRenders()
    expect(builtApp.querySelector('#status-heading').textContent)
      .toBe(`Info on - https://jsonplaceholder.typicode.com/users`);
    expect(builtApp.querySelector('#status-code').textContent)
      .toBe(`Status code: 200, OK!`);

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  it('app - renders the right users', async () => {
    const users = [
      { id: 1, username: 'Leanne_Graham' },
      { id: 2, username: 'Ervin_Howell' },
      { id: 3, username: 'that-guy-there' },
    ];
    nock(baseUrl).persist().get('/users').reply(200, users);

    const builtApp = document.createElement('div');
    app(builtApp);
    await waitForRenders()

    const liTags = builtApp.querySelectorAll('li');
    expect(liTags.length).toBe(users.length);

    liTags.forEach((liTag, i) => {
      expect(liTag.classList.contains('user-card')).toBe(true);
      expect(liTag.children.length).toBe(1);
      expect(liTag.children[0].tagName).toBe('BUTTON');
      expect(liTag.children[0].textContent).toBe(`Load ${users[i].username}'s posts`);
      expect(Number(liTag.children[0].dataset.userId)).toBe(users[i].id);
    });

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  it('app - only renders posts once a button has been clicked', async () => {
    const users = [
      { id: 1, username: 'Leanne_Graham' },
      { id: 2, username: 'Ervin_Howell' },
      { id: 3, username: 'that-guy-there' },
    ];
    const userId = 1;
    const posts = [
      { id: 1, title: 'Title 1', body: 'Body 1' },
      { id: 2, title: 'Title 2', body: 'Body 2' },
      { id: 3, title: 'Title 3', body: 'Body 3' },
      { id: 4, title: 'Title 4 NO NO', body: 'Body 4 BAD' },
      { id: 5, title: 'Title 5 UH OH', body: 'Body 5 OH DEAR' },
    ];

    nock(baseUrl).persist().get('/users').reply(200, users);
    nock(baseUrl).get(`/users/${userId}/posts`).reply(200, posts);

    const builtApp = document.createElement('div');
    app(builtApp);
    await waitForRenders()

    const liTags = builtApp.querySelectorAll('#posts-list li');
    expect(liTags.length).toBe(0);

    const button = builtApp.querySelector(`button[data-user-id="${userId}"]`);
    button.click();

    await waitForRenders()

    const newLiTags = builtApp.querySelectorAll('#posts-list li');
    const maxNumOfPosts = 3;
    expect(newLiTags.length).toBe(maxNumOfPosts);

    liTags.forEach((liTag, i) => {
      expect(liTag.children.length).toBe(2);
      expect(liTag.children[0].tagName).toBe('H2');
      expect(liTag.children[0].textContent).toBe(posts[i].title);
      expect(liTag.children[1].tagName).toBe('P');
      expect(liTag.children[1].textContent).toBe(posts[i].body);
    });

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  it('app - creates and renders a new user on form submission', async () => {
    const users = [
      { id: 1, username: 'Leanne_Graham' },
      { id: 2, username: 'Ervin_Howell' },
      { id: 3, username: 'that-guy-there' },
    ];
    nock(baseUrl).persist().get('/users').reply(200, users);

    const newUserFormData = { username: 'Leanne_Graham', email: 'leanne@gmail.com' };
    const newUser = { id: 11, ...newUserFormData};
    nock(baseUrl).post('/users', newUserFormData).reply(200, newUser);

    const builtApp = document.createElement('div');
    app(builtApp);
    const emptyNewUserDiv = builtApp.querySelector('#new-user');
    expect(emptyNewUserDiv.children.length).toBe(0);

    // fill out the form to submit it
    const form = builtApp.querySelector('#new-user-form');
    const usernameInput = builtApp.querySelector('#username');
    const emailInput = builtApp.querySelector('#email');
    usernameInput.value = newUserFormData.username;
    emailInput.value = newUserFormData.email;
    form.dispatchEvent(new Event('submit'));

    await waitForRenders()
    const fullNewUserDiv = builtApp.querySelector('#new-user');
    expect(fullNewUserDiv.children.length).toBe(2);

    const newUserHeading = builtApp.querySelector('#new-user h2');
    expect(newUserHeading.textContent).toBe(newUserFormData.username);

    const newUserEmail = builtApp.querySelector('#new-user p');
    expect(newUserEmail.textContent).toBe(newUserFormData.email);

    scoreCounter.correct(expect); // DO NOT TOUCH
  })

  beforeEach(() => scoreCounter.add(expect));
  afterAll(scoreCounter.export);
})