# orcam_server

This cli tool does the following task:
1. fetch a list of devices from server API
2. check if each device has a userId field.
3. if it has, you need to fetch the user by that id.
4. if the user has firstName or lastName fields, you need to update device.userName field: device.userName = user.firstName + ' ' + user.lastName.
5. store device using update API

## Installing
```
git clone https://github.com/RalfDestroyer/orcam_server.git
npm i
tsc && node dist/app.js
```

## Optimization:

By using forEach && async/await, task executable time down from ~2 minutes to ~9 seconds.

## Reminder:

#### src/app.ts
Don't forget to update access key if needed in src/app.ts -> initServer funciton:


```
this.http = new Http(CONST.BASE_URL, "[ACCESS_KEY]")
```


Don't forget to update server base url if needed in src/globals/Constants.ts:


#### src/globals/Constants.ts
```
const CONST = {
    BASE_URL: '[SERVER_BASE_URL]'
}
```
