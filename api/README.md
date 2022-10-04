CRUD "work-on-it" API REST HTTP


## User

| http verb  | path                    | status codes  | purpose |
| ---------  | --------------------    | ------------- | ------- |
| POST       | /api/v1/user            | 201, 400      | create  |
| GET        | /api/v1/user/<id>       | 200, 404      | profile |
| PATCH      | /api/v1/user/<id>       | 200, 404      | update profile |



## Professional

| http verb | path                           | status codes  | purpose |
| --------- | --------------------           | ------------- | ------- |
| GET       | /api/v1/user/professional      | 200,          | list    |
| GET       | /api/v1/user/professional/<id> | 200, 404      | detail  |


## Order

| http verb | path                           | status codes  | purpose |
| --------- | --------------------           | ------------- | ------- |
| GET       | /api/v1/orders                 | 200,          | list    |
| GET       | /api/v1/order/<id>             | 200, 404      | detail  |
| POST      | /api/v1/order                  | 201, 400      | create  |


## Auth

| http verb | path                           | status codes  | purpose |
| --------- | --------------------           | ------------- | ------- |
| POST      | /api/v1/login                  | 201, 400      | login   |
| DELETE    | /api/v1/logout                 | 200, 404      | logout  |


## Message

| http verb | path                           | status codes  | purpose |
| --------- | --------------------           | ------------- | ------- |
| GET       | /api/v1/***                    | 201, 400      |  show   |
| POST      | /api/v1/***                    | 200, 404      |  send   |



## Payment Methods
