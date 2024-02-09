# Secret Service App

> [!IMPORTANT]
> Presented app is a **pet-project**

This app provides ability to share some information (`secret`) at defined time in future.
It supports displaying `AUDIO`, `VIDEO`, `IMAGE` media-types and downloading for other types (`DOC`).
For now, once `secret` is created, it can't be deleted(such possibility will be added at later version, but only at some conditions(after some time after become available or else)).
App's authorization logic build on top JWT, and prevents `secrets` from viewing by unauthorized users.

User have ability to:
- create his own `secrets`
- see other user's `secrets`
- share `secrets` via FB, X, instagram
- subscribe to other `secrets`
- leave his/her attitude with likes

Also, app has notification system which informs user when subscribed or his/her `secrets` becomes available.

Stack 
```
React,
TypeScript,
Redux,
Material UI,
SSR,
Open Graph
```
libs
```
redux-toolkit,
styled components,
react-router,
react-hook-form,
axios,
express,
jwt
```