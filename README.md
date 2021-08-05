# Spendings Django REST API v1

## Project work for Polygence

[Entities (and Models)](#entities-and-models)

[API Documentation](#api-documentation)

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

| Method   | Endpoint                                                                                 | Function                     | Status |
| -------- | ---------------------------------------------------------------------------------------- | ---------------------------- | ------ |
| `POST`   | [`/api/spendings/`](#post-spendings)                                                     | Create a spending            | LIVE   |
| `GET`    | [`/api/spendings/`](#get-spendings)                                                      | List all spendings           | LIVE   |
| `GET`    | [`/api/spendings/{spending_id}/`](#get-spendingsspending_id)                             | Spending Detail view         | LIVE   |
| `GET`    | [`/api/spendings?currency={ISO_currency_code}`](#get-spendingscurrencyiso_currency_code) | Filter spendings by currency | LIVE   |
| `PATCH`  | [`/api/spendings/{spending_id}/`](#patch-spendingsspending_id)                           | Partially update spending    | LIVE   |
| `PUT`    | [`/api/spendings/{spending_id}/`](#put-spendingsspending_id)                             | Fully update spending        | LIVE   |
| `DELETE` | [`/api/spendings/{spending_id}/`](#delete-spendingsspending_id)                          | Delete a spending            | LIVE   |

### `POST /spendings`

Request

```json
{
  "description": "Mango",                   Required!
  "amount": 12.0,                           Required!
  "date": "2021-06-02T22:31:32.843408Z",    Optional. (default: current timestamp),
  "currency": "USD",                        Required!
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

### `GET /spendings`

Response

`HTTP_200_OK`

```json
[
  { "Spending object" }
]
```

### `GET /spendings/{spending_id}`

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

### `GET /spendings/?currency={ISO_currency_code}`

Request

Query Parameters: **`ISO_currency_code`** (required)

Response

`HTTP_200_OK`

```json
[
    {
        "id": 6,
        "description": "Mango",
        "amount": 12.0,
        "date": "2021-08-02T22:31:32.843408Z",
        "currency": ISO_currency_code,
        "created": "2021-08-02T22:31:33.033740Z",
        "last_updated": "2021-08-02T22:31:33.033771Z"
    }
]
```

### `PATCH /spendings/{spending_id}/`

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

### `PUT /spendings/{spending_id}/`

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

### `DELETE /spendings/{spending_id}`

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
