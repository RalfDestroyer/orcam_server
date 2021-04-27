import { Device } from "./Device";

export interface User {
    userId: string,
    hash: string,
    identityId: string,
    createdAt: number,
    updatedAt: number,
    email: string,
    devices: Device[],
    firstName: string,
    lastName: string
}