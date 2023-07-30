# Address Api Spec

### Create Address API

###### Endpoint: POST /api/contacts/:contactId/addresses
###### Headers: 
- Authorization: token
###### Request Body:
```json
{
    "street": "Jalan apa",
    "city": "Kota apa",
    "province": "Province apa",
    "country": "Negara apa",
    "postal_code": "Kode pos"
}
```

###### Response Body Success:
```json
{
    "data" : {
        "id": 1,
        "street": "Jalan apa",
        "city": "Kota apa",
        "province": "Province apa",
        "country": "Negara apa",
        "postal_code": "Kode pos"
    }
}
```

###### Response Body Error:
```json
{
    "errors" : "Country is required"
}
```

### Update Address API

###### Endpoint: PUT /api/contacts/:contactId/addresses/:addressId
###### Headers: 
- Authorization: token
###### Request Body:
```json
{
    "street": "Jalan apa",
    "city": "Kota apa",
    "province": "Province apa",
    "country": "Negara apa",
    "postal_code": "Kode pos"
}
```

###### Response Body Success:
```json
{
    "data" : {
        "id": 1,
        "street": "Jalan apa",
        "city": "Kota apa",
        "province": "Province apa",
        "country": "Negara apa",
        "postal_code": "Kode pos"
    }
}
```

###### Response Body Error;
```json
{
    "errors" : "Country is required"
}
```

### Get Address API
###### Endpoint: GET /api/contacts/:contactsId/addresses/:addressId

###### Headers: 
- Authorization: token

###### Request Body Success:
```json
{
    "data" : {
        "id": 1,
        "street": "Jalan apa",
        "city": "Kota apa",
        "province": "Province apa",
        "country": "Negara apa",
        "postal_code": "Kode pos"
    }
}
```
###### Request Body Error:
```json
{
    "errors" : "Contact is not found"
}
```

### List Addresses API
###### Endpoint: GET /api/contacts/:contactsId/adresses

###### Headers: 
- Authorization: token

###### Request Body Success:
```json
{
    "data" : [
        {
            "id": 1,
            "street": "Jalan apa",
            "city": "Kota apa",
            "province": "Province apa",
            "country": "Negara apa",
            "postal_code": "Kode pos"
        },
        {
            "id": 2,
            "street": "Jalan apa",
            "city": "Kota apa",
            "province": "Province apa",
            "country": "Negara apa",
            "postal_code": "Kode pos"
        }
    ]
}
```

### Remove Addresses API
###### Endpoint: DELETE /api/contacts/:contactId/addresses/:addressId

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
    "errors" : "Address is not found"
}
```