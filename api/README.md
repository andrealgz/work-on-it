"Work On It" API RESTFul HTTP


## User

| http verb | path                    | status codes | purpose         |
|-----------|-------------------------|--------------|-----------------|
| GET       | /api/v1/user            | 200, 404     | list for admins |
| GET       | /api/v1/user/<nickname> | 200, 404     | profile         |
| PATCH     | /api/v1/user/<nickname> | 200, 404     | update profile  |


## Service

| http verb | path                    | status codes | purpose |
|-----------|-------------------------|--------------|---------|
| GET       | /api/v1/services        | 200,         | list    |
| GET       | /api/v1/services/<id>   | 200,         | detail  |
| POST      | /api/v1/services/create | 201, 404     | create  |


## Order

| http verb | path                    | status codes | purpose         |
|-----------|-------------------------|--------------|-----------------|
| GET       | /api/v1/orders          | 200,         | list for admins |
| GET       | /api/v1/orders/<id>     | 200, 404     | detail          |
| PATCH     | /api/v1/orders/<id>     | 200, 404     | update          |
| POST      | /api/v1/orders/create   | 201, 400     | create          |
| POST      | /api/v1/orders/messages | 201, 400     | create message  |


## Auth

| http verb | path             | status codes | purpose  |
|-----------|------------------|--------------|----------|
| POST      | /api/v1/login    | 200, 400     | login    |
| POST      | /api/v1/register | 201, 400     | register |
| DELETE    | /api/v1/logout   | 200, 404     | logout   |
