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
