import { describe, it, expect, afterEach, afterAll, beforeEach, vi } from 'vitest';
import {
  renderStatus,
  renderUsers,
  renderPosts,
  renderNewUser,
} from './render-functions.js';
import ScoreCounter from 'score-tests';
import path from 'path';

const testSuiteName = 'Render Functions Tests';
const scoresDir = path.join(__dirname, '..', 'scores');
const scoreCounter = new ScoreCounter(testSuiteName, scoresDir);

const baseUrl = 'https://jsonplaceholder.typicode.com';
const usersUrl = `${baseUrl}/users`;

describe(testSuiteName, () => {
  it('renderStatus - Good Version: updates and returns the the status div with h2 and p tag information', () => {

    const statusDiv = document.createElement('div');
    const url = 'https://jsonplaceholder.typicode.com/users';
    const status = 200;
    const ok = true;

    renderStatus(statusDiv, { url, status, ok });
    expect(statusDiv.children.length).toBe(2);

    expect(statusDiv.querySelector('#status-heading').textContent)
      .toBe(`Info on - ${url}`);
    expect(statusDiv.querySelector('#status-code').textContent)
      .toBe(`Status code: ${status}, OK!`);

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  it('renderStatus - Bad Link Version: updates and returns the the status div with h2 and p tag information', () => {

    const statusDiv = document.createElement('div');
    const url = 'https://jsonplaceholder.typicode.com/usersasda';
    const status = 404;
    const ok = false;

    renderStatus(statusDiv, { url, status, ok });
    expect(statusDiv.children.length).toBe(2);

    expect(statusDiv.querySelector('#status-heading').textContent)
      .toBe(`Info on - ${url}`);
    expect(statusDiv.querySelector('#status-code').textContent)
      .toBe(`Status code: ${status}, FAIL!`);

    console.log('statusDiv.innerHTML:', statusDiv.innerHTML);
    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  it('renderUsers - updates and returns the usersUl with li tags for each user', () => {
    const usersUl = document.createElement('ul');
    const users = [
      {  id: 1, username: 'bro-dude',  email: 'bret@gmail.com' },
      {  id: 2, username: 'auntAnt',  email: 'ant@gmail.com' },
      {  id: 3, username: 'slam_sam',  email: 'sam@gmail.com' },
    ];

    renderUsers(usersUl, users);
    expect(usersUl.children.length).toBe(users.length);

    const liTags = usersUl.querySelectorAll('li');
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

  it("renderUsers - clears the html each time so multiple calls don't duplicate users", () => {
    const usersUl = document.createElement('ul');
    const users = [
      {  id: 1, username: 'Bret',  email: 'bret@gmail.com' },
      {  id: 2, username: 'Antonette',  email: 'ant@gmail.com' },
      {  id: 3, username: 'Samantha',  email: 'sam@gmail.com' },
    ];

    renderUsers(usersUl, users);
    renderUsers(usersUl, users);
    renderUsers(usersUl, users);
    renderUsers(usersUl, users);
    expect(usersUl.children.length).toBe(users.length);

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  it('renderPosts - updates and returns the postsUl with li tags for each post', () => {
    const postsUl = document.createElement('ul');
    const posts = [
      { id: 1, title: 'Title 1', body: 'Body 1' },
      { id: 2, title: 'Title 2', body: 'Body 2' },
      { id: 3, title: 'Title 3', body: 'Body 3' },
    ];

    renderPosts(postsUl, posts);
    expect(postsUl.children.length).toBe(posts.length);

    const liTags = postsUl.querySelectorAll('li');
    expect(liTags.length).toBe(posts.length);

    liTags.forEach((liTag, i) => {
      expect(liTag.children.length).toBe(2);
      expect(liTag.children[0].tagName).toBe('H2');
      expect(liTag.children[0].textContent).toBe(posts[i].title);
      expect(liTag.children[1].tagName).toBe('P');
      expect(liTag.children[1].textContent).toBe(posts[i].body);
    });

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  it("renderPosts - clears the html each time so multiple calls don't duplicate posts", () => {
    const postsUl = document.createElement('ul');
    const posts = [
      { id: 1, title: 'Title 1', body: 'Body 1' },
      { id: 2, title: 'Title 2', body: 'Body 2' },
      { id: 3, title: 'Title 3', body: 'Body 3' },
    ];

    renderPosts(postsUl, posts);
    renderPosts(postsUl, posts);
    renderPosts(postsUl, posts);
    renderPosts(postsUl, posts);
    expect(postsUl).toBe(postsUl);
    expect(postsUl.children.length).toBe(posts.length);

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  it('renderNewUser - updates and returns the newUserDiv with h2 and p tag information', () => {
    const newUserDiv = document.createElement('div');
    const user = { username: 'Bret', email: 'bret@gmail.com' };

    renderNewUser(newUserDiv, user);
    expect(newUserDiv).toBe(newUserDiv);
    expect(newUserDiv.children.length).toBe(2);

    const h2Tag = newUserDiv.querySelector('h2');
    expect(h2Tag.textContent).toBe(user.username);

    const pTag = newUserDiv.querySelector('p');
    expect(pTag.textContent).toBe(user.email);

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  it("renderNewUser - clears the html each time so multiple calls don't duplicate users", () => {
    const newUserDiv = document.createElement('div');
    const user = { username: 'Bret', email: 'bret@gmail.com' };

    renderNewUser(newUserDiv, user);
    renderNewUser(newUserDiv, user);
    renderNewUser(newUserDiv, user);
    renderNewUser(newUserDiv, user);
    expect(newUserDiv.children.length).toBe(2);

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  beforeEach(() => scoreCounter.add(expect));
  afterAll(scoreCounter.export);
})