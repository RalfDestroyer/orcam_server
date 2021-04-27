import CONST from "./globals/Constants"
import { Device } from "./globals/models/Device"
import { User } from "./globals/models/User"
import { Http } from "./services/http"

class App {
    http: Http

    constructor() {
        this.initServer()
        this.getAndEditAllDevicesByPageSize(10)
    }

    initServer = (): void => {
        this.http = new Http(CONST.BASE_URL, "accessKey test-key-id-1")
    }

    getAndEditAllDevicesByPageSize = async (size: number): Promise<void> => {
        const resp = await this.getDevices(0, size)

        if (!resp) {
            console.error(`ERROR IN TASK: CANT GET FIRTS ${size} DEVICES`)
            return
        }


        this.editDevicesASync(resp.items)

        const totalPages = resp.total / size;
        const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

        pages.forEach((page) => this.getAndEditDevices(page, size));
    }

    getAndEditDevices = async (page: number, size: number): Promise<void> => {
        const resp = await this.getDevices(page, size)
        if (resp) this.editDevicesASync(resp.items)
        else console.error(`ERROR IN TASK: GET DEVICES IN PAGE: ${page}, SIZE: ${size}`)

    }

    getDevices = (page: number, size: number): Promise<any> => {
        return this.http.get("/devices", { page: page, size: size })
    }

    editDevicesASync = (items: Device[]): void => {
        items.forEach(async device => {
            if (device.userId) {
                const user: User = await this.getUserById(device.userId)

                if (!user) {
                    console.error(`ERROR IN TASK: GET USER DATA BY DEVICE_ID: ${device.deviceId} | USER_ID: ${device.userId}`)
                } else if (user.firstName && user.lastName) {
                    const resp = await this.updateDeviceUserName(device.deviceId, user.firstName, user.lastName)

                    if (!resp) console.error(`ERROR IN TASK: EDIT USERNAME TO DEVICE_ID ${device.deviceId}`)
                }
            }
        });
    }


    getUserById = (userId: string): Promise<any> => {
        return this.http.get("/users/" + userId)
    }

    updateDeviceUserName = (deviceId: string, firstName: string, lastName: string): Promise<any> => {
        return this.http.post("/devices/" + deviceId, { userName: firstName + " " + lastName })
    }
}

new App()