# API

API endpoints for the tree mapping project.

## `/api/v1/trees`

### GET

```sh
$ curl http://localhost:3000/api/v1/trees
```

### POST

```sh
$ curl -X POST \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -d '{"latitude":49.2, "longitude":-123.2, "empty":"true"}' http://localhost:3000/api/v1/trees
```

## `/api/v1/dreams/:id`

### GET

```sh
curl http://localhost:3000/api/v1/trees/<id>
```

### PUT

```sh
curl -X PUT \
-H 'Content-Type: application/json' \
-H 'Accept: application/json' \
-d '{"latitude":49.2, "longitude":-123.2, "empty":"false"}' \
http://localhost:3000/api/v1/trees/<id>
```

### DELETE

```sh
curl -X DELETE \
http://localhost:3000/api/v1/dreams/<id>
```