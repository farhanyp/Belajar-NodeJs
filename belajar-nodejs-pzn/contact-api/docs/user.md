# User Api Spec

### Register User API

###### Endpoint: POST /api/users
###### Request Body:
```json
{
    "username": "pzn",
    "password": "rahahsia",
    "name": "Programmer Zaman Now"
}
```

###### Response Body Success:
```json
{
    "data" : {
        "username" : "pzn",
        "name" : "Programmer Zaman Now"
    }
}
```

###### Response Body Error:
```json
{
    "errors" : "Username already registered"
}
```

### Login User API

###### Endpoint: POST /api/users/login
###### Request Body:
```json
{
    "username": "pzn",
    "password": "rahasia"
}
```

###### Response Body Success:
```json
{
    "data" : {
        "token" : "unique-token"
    }
}
```

###### Response Body Error;
```json
"errors" : "Username or Password wrong"
```

### Update User API
###### Endpoint: PATCH /api/users/current

###### Headers: 
-   : token

###### Request Body:
```json
{
    "name": "Programmer Zaman Now lagi",
    "password" : "new rahasia"
}
```

###### Response Body Success:
```json
{
    "data":{
        "username" : "pzn",
        "name" : "Programmer Zaman Now Lagi"
    }
}
```

###### Response Body Error
```json
{
    "errors": "Name length max 100"
}
```

### Get User API
###### Endpoint: GET /api/users/current

###### Headers: 
- Authoriztion: token

###### Request Body Success:
```json
{
    "data" : {
        "username" : "pzn",
        "name" : "Programmer Zaman Now"
    }
}
```
###### Request Body Error:
```json
{
    "errors" : "Unauthorized"
}
```

### Logout User API
###### Endpoint: DELETE /api/users/logout

###### Headers: 
- Authoriztion: token

###### Request Body Success:
```json
{
    "data" : "OK"
}
```
###### Request Body Error:
```json
{
    "errors" : "Unauthorized"
}
```