import { describe, it, expect, afterEach, afterAll, beforeEach, vi } from 'vitest';

import {
  checkResponseStatus,
  getUsers,
  getUserPosts,
  createNewUser,
} from './fetch-functions.js';
import ScoreCounter from 'score-tests';
import path from 'path';
import nock from 'nock';
import nodeFetch from 'node-fetch';

// node fetch works nicely with nock, native fetch does not and may be missing on some systems
global.fetch = nodeFetch;

const testSuiteName = 'Fetch Function Tests';
const scoresDir = path.join(__dirname, '..', 'scores');
const scoreCounter = new ScoreCounter(testSuiteName, scoresDir);

const baseUrl = 'https://jsonplaceholder.typicode.com';
const usersUrl = `${baseUrl}/users`;

describe(testSuiteName, () => {
  afterEach(() => {
      vi.restoreAllMocks()
  });

  it('checkResponseStatus - returns a promise and fetches the right url', async () => {
    // fake the server response each time
    const fakeRoute = nock(baseUrl).get('/users').reply(200);

    return checkResponseStatus()
      .then(() => {
        expect(fakeRoute.isDone()).toBe(true);
        scoreCounter.correct(expect); // DO NOT TOUCH
      })
      .catch((e) => {
        expect(e).toBeUndefined();
      });
  });

  it('checkResponseStatus', () => {
    nock(baseUrl).get('/users').reply(202);
    expect(checkResponseStatus()).resolves.toEqual({
      ok: true,
      status: 202,
      url: usersUrl,
    })

    nock(baseUrl).get('/users').reply(500)
    expect(checkResponseStatus()).resolves.toEqual({
      ok: false,
      status: 500,
      url: usersUrl,
    });

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  it('getUsers - returns a promise and fetches the right url', async () => {
    const fakeRoute = nock(baseUrl).get('/users').reply(200, []);

    return getUsers()
      .then(() => {
        expect(fakeRoute.isDone()).toBe(true);
        scoreCounter.correct(expect); // DO NOT TOUCH
      })
      .catch((e) => {
        expect(e).toBeUndefined();
      });
  });

  it('getUsers - returns the users', () => {
    const users = [
      { id: 1, username: 'Leanne_Graham' },
      { id: 2, username: 'Ervin_Howell' },
      { id: 3, username: 'that-guy-there' },
    ];

    nock(baseUrl).get('/users').reply(200, users);
    expect(getUsers()).resolves.toEqual(users);

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  it('getUserPosts - returns a promise and fetches the right url', async () => {
    const userId = 1;
    const fakeRoute = nock(baseUrl).get(`/users/${userId}/posts`).reply(200, []);

    return getUserPosts(userId)
      .then(() => {
        expect(fakeRoute.isDone()).toBe(true);
        scoreCounter.correct(expect); // DO NOT TOUCH
      })
      .catch((e) => {

        expect(e).toBeUndefined();
      });
  });

  it('getUserPosts - only returns the first 3 posts', () => {
    const userId = 1;
    const posts = [
      { id: 1, title: 'Title 1', body: 'Body 1' },
      { id: 2, title: 'Title 2', body: 'Body 2' },
      { id: 3, title: 'Title 3', body: 'Body 3' },
      { id: 4, title: 'Title 4 NO NO', body: 'Body 4 BAD' },
      { id: 5, title: 'Title 5 UH OH', body: 'Body 5 OH DEAR' },
    ];

    const scope = nock(baseUrl).get(`/users/${userId}/posts`).reply(200, posts);
    getUserPosts(userId)
      .then(response => {
        expect(response).toEqual(posts.slice(0, 3));
        expect(scope.isDone()).toBe(true);
      })
      .catch((e) => {
        // did you return a promise AND hit the right route?
        expect(e).toBeUndefined();
      });

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  it('createNewUser - returns a promise and fetches the right url', async () => {
    const fakeRoute = nock(baseUrl).post('/users').reply(200, {});

    return createNewUser({})
      .then(() => {
        expect(fakeRoute.isDone()).toBe(true);
        scoreCounter.correct(expect); // DO NOT TOUCH
      })
      .catch((e) => {
        // did you return a promise AND hit the right route?
        console.log('error: createNewUser - returns a promise and fetches the right url:', e);
        expect(e).toBeUndefined();
      });
  });

  it('createNewUser - returns the new user', () => {
    const newUserFormData = { username: 'Leanne_Graham', email: 'leanne@gmail.com' };
    const newUser = { id: 11, ...newUserFormData };

    nock(baseUrl).post('/users', newUserFormData).reply(200, newUser);
    return createNewUser(newUserFormData)
      .then((postedUser) => {
        expect(postedUser).toEqual(newUser);
        scoreCounter.correct(expect); // DO NOT TOUCH
      })
      .catch((e) => {
        // did you send the right body data to the right route?
        console.log('error: createNewUser - returns the new user -', e);
        expect(e).toBeUndefined();
      });

    scoreCounter.correct(expect); // DO NOT TOUCH
  });


  beforeEach(() => scoreCounter.add(expect));
  afterAll(scoreCounter.export);
})