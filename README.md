# Test Assignment

### Тестовое задание на должность "Ведущий разработчик NodeJS"

## Clone

- Git Clone: `https://github.com/mensenvau/test_assignment.git`
- Open Folder `cd test_assignment`

## Install

### RabbitMQ

- MAC: `brew install rabbitmq ` [document](https://www.rabbitmq.com/install-homebrew.html)
- Any: `docker run -it --rm --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3.9-management`

#### We need start runing RabbitMQ: `brew services start rabbitmq `

### Npm

- `npm install`

## .Env setup

```
RABBITMQ_CONNETION_STRING=amqp://localhost:5672

M1_PORT=4000
M2_PORT=4001
```

_RABBITMQ_CONNETION_STRING - RABBITMQ defaults to this state, if you have something different please change it!_

## Run and test:

### Run

- `npm run start `

### Test

I think the task doesn't have complete information about what to do with the data, so I made 2 sample routers.

- `http://127.0.0.1:4000/users` - get information about all users
- `http://127.0.0.1:4000/user-info/1` , (`http://127.0.0.1:4000/user-info/<user-id>`) - Get information about the user
