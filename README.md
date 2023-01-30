# How to launch the Back-end ?
## Set up .env
Before launch, please change :
**PORT**, **MONGO_USER**, **MONGO_PASSWORD** end **TOKEN_SECRET**

## Let's start !
```sh
npm run start
```
> Info : Tested on Node : v19.4.0

## Endpoints API

POST : http://localhost:3000/api/auth/signup

POST : http://localhost:3000/api/auth/login

GET : http://localhost:3000/api/sauces

GET : http://localhost:3000/api/sauces/:id

PUT : http://localhost:3000/api/sauces/:id

DELETE : http://localhost:3000/api/sauces/:id

POST : http://localhost:3000/api/sauces/:id/like


