# Node proxy fail

This is an example that tries to reproduce errors in the up-proxy. The base hypothesis is that
API gateway timeouts mixed with lambda timeouts cause _weirdness_ in the responses, manifesting
as 502 errors.

## Deploy

```
$ up deploy
```

## Try to repo

```
$ up logs -f (in background / another terminal)
$ sh fail.sh
```

## Logs (fail.sh)
This is the _correct_ log, each request is getting echoed the correct ID.  id=4 is correctly
timing out.
```
{"id":"1","t":"10"}
{"id":"2","t":"10"}
{"id":"3","t":"20"}
{"message": "Endpoint request timed out"}
{"id":"5","t":"1"}
```

## Logs (up logs -f)
Notice how in the up logs, that ID 4 and ID 5's responses are interleaved
```
2:22:25pm INFO starting name: app type: server
2:22:25pm INFO proxy (pid=12) started version: $LATEST
2:22:25pm INFO waiting for http://127.0.0.1:44041 to listen (timeout 15s) version: $LATEST
2:22:36pm INFO response duration: 10051 id: c7852116-ac6e-11e7-9fcb-f30d1871670b ip: 76.102.196.219 method: GET path: /delay query: id=1&t=10 size: 19 B stage: development status: 200 version: $LATEST
2:22:46pm INFO response duration: 10012 id: ce12fbac-ac6e-11e7-b015-133dec5ec7e8 ip: 76.102.196.219 method: GET path: /delay query: id=2&t=10 size: 19 B stage: development status: 200 version: $LATEST
2:23:06pm WARN retry timeout exceeded
2:23:37pm INFO starting name: app type: server
2:23:37pm INFO found free port 42083 version: $LATEST
2:23:37pm INFO executing "node app.js" version: $LATEST
2:23:37pm INFO proxy (pid=12) started version: $LATEST
2:23:37pm INFO waiting for http://127.0.0.1:42083 to listen (timeout 15s) version: $LATEST
2:23:39pm INFO response duration: 1041 id: f2b55780-ac6e-11e7-bce9-0d9b471462fa ip: 76.102.196.219 method: GET path: /delay query: id=5&t=1 size: 18 B stage: development status: 200 version: $LATEST
2:23:51pm WARN retry timeout exceeded
2:23:51pm INFO response duration: 45005 id: e064c5ab-ac6e-11e7-8bbb-5704f1e5c6e6 ip: 76.102.196.219 method: GET path: /delay query: id=4&t=45 size: 19 B stage: development status: 200 version: $LATEST
```
