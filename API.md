# API

API endpoints for the tree mapping project.

## `/api/v1/trees`

### GET

**Request:**

```sh
$ curl http://localhost:3000/api/v1/trees
```

**Returns:**

```JSON
[{"latitude":40.664795,"longitude":-73.99332,"empty":true,"id":"3iul7mblgpk70vvhzy"}]
```

### POST

**Request:**

```sh
$ curl -X POST \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -d '{"latitude":49.2, "longitude":-123.2, "empty":"true"}' http://localhost:3000/api/v1/trees
```


**Returns:**

```JSON
[{"latitude":40.664795,"longitude":-73.99332,"empty":true,"id":"3iul7mblgpk70vvhzy"}, {"latitude":49.2, "longitude":-123.2, "empty":"true", "id":"3iul7mblgpk70vvhzq"}]
```

## `/api/v1/dreams/:id`

### GET

**Request:**

```sh
curl http://localhost:3000/api/v1/trees/<id>
```

```JSON
{"latitude":49.2, "longitude":-123.2, "empty":"true", "id":"3iul7mblgpk70vvhzq"}
```

### PUT

**Request:**

```sh
curl -X PUT \
-H 'Content-Type: application/json' \
-H 'Accept: application/json' \
-d '{"latitude":49.2, "longitude":-123.2, "empty":"false"}' \
http://localhost:3000/api/v1/trees/<id>
```

**Returns**:

```JSON
{"latitude":49.2, "longitude":-123.2, "empty":"false", "id":"3iul7mblgpk70vvhzq"}
```

### DELETE

**Request:**

```sh
curl -X DELETE \
http://localhost:3000/api/v1/dreams/<id>
```

```JSON
{"message":""}
```