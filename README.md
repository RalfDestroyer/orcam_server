# orcam_server

This cli tool does the following task:
1. fetch a list of devices from server API
2. check if each device has a userId field.
3. if it has, you need to fetch the user by that id.
4. if the user has firstName or lastName fields, you need to update device.userName field: device.userName = user.firstName + ' ' + user.lastName.
5. store device using update API

#### src/globals/Constants.ts
```
const CONST = {
    BASE_URL: '[SERVER_BASE_URL]'
}
```

## Reminder:
Don't forget to update access key if needed in src/app.ts -> initServer funciton:


```
this.http = new Http(CONST.BASE_URL, "[ACCESS_KEY]")
```
