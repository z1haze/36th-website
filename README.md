![Logo](docs/img/logo.png "Logo")

The Fighting 36th Website
---

> This repository contains the source code for the 36th website.

This website will handle the following tasks:

#### Front End

* Provide news/blog posts for community members and alike to read
* Display full member roster
* Display and provide sponsorship information for current and future sponsorship opportunities

#### Developer Setup

1. `git clone git@github.com:the-fighting-36th/website.git`
2. `cp .env.example .env` (and fill in the env variables)
3. `nvm install`
4. `cd client/src/ && npm install && cd ../../`
5. `cd server/ && npm install && cd ..`
6. Create your local pg database to be used by the application.
7. `knex migrate:latest`
> The client and server run as 2 separate processes. This allows us to decouple the server from the client, if there was ever a change to move to a different backend, or a different front end.

* To start the server, `cd server/ && npm start`
* To start the client watcher, `cd client/src/ && npm start`
* To compile client assets for production, `cd client/src/ && npm run build && cd ../../`
