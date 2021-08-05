# Spendings Django REST API v1

## Project work for Polygence

[Overview](#overview)

[Entities (and Models)](#entities-and-models)

[API Documentation](#api-documentation)

## Overview

### Backend:

- Stack: Python, Django, Django REST framework, PostgreSQL database, Heroku

- Deployment: [https://spendings-django.herokuapp.com/api/](https://spendings-django.herokuapp.com/api/)

### Frontend:

- Stack: JS, React (without framework), Webpack, Babel, Styled Components

- Deployment: [https://spendingz.nemethrichard.hu](https://spendingz.nemethrichard.hu)

## Entities (and Models)

1. [Spendings](#spendings)

### Spendings

```json
{
  "id": "IntegerField",
  "description": "CharField,        Required!",
  "amount": "IntegerField,          Required!",
  "date": "DateTimeField,           Optional. (default: current timestamp)",
  "currency": "CharField,           Required!",
  "created": "DateTimeField",
  "last_updated": "DateTimeField",
  "amount_in_huf": "IntegerField     Not editable"
}
```

[Go to the SPENDING endpoints](#spending)

## API documentation

#### Status

| Status | Description             |
| ------ | ----------------------- |
| `-`    | not working yet         |
| `DEV`  | in development mode     |
| `LIVE` | tested and working fine |

### Spending

| Method   | Endpoint                                                                                    | Function                        | Status |
| -------- | ------------------------------------------------------------------------------------------- | ------------------------------- | ------ |
| `POST`   | [`/api/spendings/`](#post-apispendings)                                                     | Create a spending               | LIVE   |
| `GET`    | [`/api/spendings/`](#get-apispendings)                                                      | List all spendings              | LIVE   |
| `GET`    | [`/api/spendings/{spending_id}/`](#get-apispendingsspending_id)                             | Spending Detail view            | LIVE   |
| `GET`    | [`/api/spendings?currency={ISO_currency_code}`](#get-apispendingscurrencyiso_currency_code) | Filter spendings by currency    | LIVE   |
| `GET`    | [`/api/spendings?ordering={db_field}`](#get-apispendingsorderingdb_field)                   | Order spendings by any db field | LIVE   |
| `PATCH`  | [`/api/spendings/{spending_id}/`](#patch-apispendingsspending_id)                           | Partially update spending       | DEV    |
| `PUT`    | [`/api/spendings/{spending_id}/`](#put-apispendingsspending_id)                             | Fully update spending           | LIVE   |
| `DELETE` | [`/api/spendings/{spending_id}/`](#delete-apispendingsspending_id)                          | Delete a spending               | LIVE   |

### `POST /api/spendings`

Request

```json
{
  "description": "Mango                   Required!",
  "amount": "12.0                         Required!",
  "date": "2021-06-02T22:31:32.843408Z    Optional. (default: current timestamp)",
  "currency": "USD                        Required!"
}
```

Response

`HTTP_201_CREATED`

```json
{
  "id": 6,
  "description": "Mango",
  "amount": 12.0,
  "date": "2021-06-02T22:31:32.843408Z",
  "currency": "USD",
  "created": "2021-08-02T22:31:33.033740Z",
  "last_updated": "2021-08-02T22:31:33.033771Z"
}
```

Response when required field is missing

`HTTP_400_BAD_REQUEST`

```json
{
  "currency": ["This field is required."]
}
```

### `GET /api/spendings`

Response

`HTTP_200_OK`

```json
[
  { "Spending object" }
]
```

### `GET /api/spendings/{spending_id}`

Request

Query Parameters: **`spending_id`** (required)

Response

`HTTP_200_OK`

```json
{ "Spending Object" }
```

Response when spending does not exists

`HTTP_404_NOT_FOUND`

```json
{
  "detail": "Not found."
}
```

### `GET /api/spendings/?currency={ISO_currency_code}`

Request

Query Parameters: **`ISO_currency_code`**

Response

`HTTP_200_OK`

```json
[
  {
    "id": 6,
    "description": "Mango",
    "amount": 12.0,
    "date": "2021-08-02T22:31:32.843408Z",
    "currency": "ISO_currency_code",
    "created": "2021-08-02T22:31:33.033740Z",
    "last_updated": "2021-08-02T22:31:33.033771Z"
  }
]
```

### `GET /api/spendings/?ordering={db_field}`

Request

Query Parameters: **`db_field`**

Response

`HTTP_200_OK`

```json
[
  {
    "id": 6,
    "description": "Mango",
    "amount": 12.0,
    "date": "2021-08-02T22:31:32.843408Z",
    "currency": "ISO_currency_code",
    "created": "2021-08-02T22:31:33.033740Z",
    "last_updated": "2021-08-02T22:31:33.033771Z"
  }
]
```

### `PATCH /api/spendings/{spending_id}/`

Request

Query Parameters: **`spending_id`** (required)

```json
{
  "description": "Mango from Taiwan"
}
```

Response

`HTTP_200_OK`

```json
[
  {
    "id": 6,
    "description": "Mango from Taiwan",
    "amount": 12.0,
    "date": "2021-08-02T22:31:32.843408Z",
    "currency": "USD",
    "created": "2021-08-02T22:31:33.033740Z",
    "last_updated": "2021-08-03T22:31:33.033771Z"
  }
]
```

### `PUT /api/spendings/{spending_id}/`

Request

Query Parameters: **`spending_id`** (required)

```json
{
  "description": "Mango from Hungary",
  "amount": 680.0,
  "currency": "HUF"
}
```

Response

`HTTP_200_OK`

```json
[
  {
    "id": 6,
    "description": "Mango from Hungary",
    "amount": 680.0,
    "date": "2021-08-02T22:31:32.843408Z",
    "currency": "HUF",
    "created": "2021-08-02T22:31:33.033740Z",
    "last_updated": "2021-08-03T22:31:33.033771Z"
  }
]
```

### `DELETE /api/spendings/{spending_id}`

Path variables: **`spending_id`** (required)

Response

`HTTP_204_NO_CONTENT`

Response when spending does not exists

`HTTP_404_NOT_FOUND`

```json
{
  "detail": "Not found."
}
```
