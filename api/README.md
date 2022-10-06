"Work On It" API RESTFul HTTP


## User

| http verb | path                       | status codes | purpose        |
|-----------|----------------------------|--------------|----------------|
| GET       | /api/v1/user/<id>          | 200, 404     | profile        |
| GET       | /api/v1/user/<id>/orders   | 200, 404     | list orders    |
| PATCH     | /api/v1/user/<id>          | 200, 404     | update profile |


## Service

| http verb | path                    | status codes | purpose |
|-----------|-------------------------|--------------|---------|
| GET       | /api/v1/services        | 200,         | list    |
| GET       | /api/v1/services/<id>   | 200,         | detail  |
| POST      | /api/v1/services/create | 201, 404     | create  |


## Order

| | http verb | path                        | status codes | purpose         |
|-----------|-----------------------------|--------------|-----------------|
| GET       | /api/v1/orders              | 200,         | list for admins |
| GET       | /api/v1/orders/<id>         | 200, 404     | detail          |
| POST      | /api/v1/orders              | 201, 400     | create          |


## Auth

| http verb | path             | status codes | purpose  |
|-----------|------------------|--------------|----------|
| POST      | /api/v1/login    | 200, 400     | login    |
| DELETE    | /api/v1/logout   | 200, 404     | logout   |
| POST      | /api/v1/register | 201, 400     | register |


## Message

| http verb | path        | status codes | purpose |
|-----------|-------------|--------------|---------|
| GET       | /api/v1/*** | 201, 400     | show    |
| POST      | /api/v1/*** | 200, 404     | send    |
