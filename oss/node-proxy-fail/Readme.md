# Node proxy fail

This is an example that tries to reproduce http ContentLength=0 errors in the up-proxy.

## To reproduce reliably, you need to build a custom version of Up which allows POSTs to retry

## Deploy

```
$ custom_up deploy
```

## Try to repo

```
$ custom_up logs -f (in background / another terminal)
$ sh fail.sh
```

## Logs (up logs -f)
```
7:51:45pm INFO starting name: app type: server
7:51:45pm INFO found free port 41693 version: $LATEST
7:51:45pm INFO executing "node app.js" version: $LATEST
7:51:45pm INFO proxy (pid=16) started version: $LATEST
7:51:45pm INFO waiting for http://127.0.0.1:41693 to listen (timeout 15s) version: $LATEST
7:51:49pm WARN retrying idempotent request status: 500
7:51:49pm ERRO network error: http: ContentLength=2 with Body length 0 version: $LATEST
7:51:49pm WARN restarting version: $LATEST
7:51:49pm INFO found free port 42787 version: $LATEST
7:51:49pm INFO executing "node app.js" version: $LATEST
7:51:49pm INFO proxy (pid=22) started version: $LATEST
7:51:49pm INFO waiting for http://127.0.0.1:42787 to listen (timeout 15s) version: $LATEST
7:51:49pm INFO proxy (pid=16) exited with code=-1 version: $LATEST
7:51:49pm WARN restarted restarts: 1 version: $LATEST
7:51:49pm ERRO network error: http: ContentLength=2 with Body length 0 version: $LATEST
7:51:49pm WARN restarting version: $LATEST
7:51:49pm INFO found free port 46309 version: $LATEST
7:51:49pm INFO executing "node app.js" version: $LATEST
7:51:49pm INFO proxy (pid=22) exited with code=-1 version: $LATEST
7:51:49pm INFO proxy (pid=29) started version: $LATEST
7:51:49pm INFO waiting for http://127.0.0.1:46309 to listen (timeout 15s) version: $LATEST
7:51:50pm WARN restarted restarts: 2 version: $LATEST
7:51:50pm WARN retry attempts exceeded
7:51:50pm ERRO response duration: 4054 id: c96e63be-ac9c-11e7-8e46-57bf72187269 ip: 136.24.92.185 method: POST path: /delay query: id=1&t=3 size: 0 B stage: development status: 502 version: $LATEST
```
