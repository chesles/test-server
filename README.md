# test-server

Installation (requires [node.js][node], which comes with `npm`):

```bash
git clone https://github.com/chesles/test-server.git
cd test-server
npm install
npm start
```

If all goes well you'll have a server running on port 2700

## Features


### delayed responses

Make a request take longer with the `delay` parameter:

    curl localhost:2700?delay=2000

### unique payload enforcement

enforce unique parameters between requests with `enforce_unique=true` and `unique_keys` (a comma-separated list).

Once this request is made

    curl -v localhost:2700?enforce_unique=true&unique_keys=id,username \
      -d  "id=1" -d "username=foo"

This one will be OK:

    curl -v localhost:2700?enforce_unique=true&unique_keys=id,username \
      -d  "id=2" -d "username=bar"

...and this one will return a 500 error (because `id=1` has already been passed:

    curl -v localhost:2700?enforce_unique=true&unique_keys=id,username \
      -d  "id=1" -d "username=blah"

Kill & restart the server to clear the set of values that have been seen.

## TODO

- redirects
- set the status code
- set cookies
- set headers
- other?

      
  [node]: http://nodejs.org