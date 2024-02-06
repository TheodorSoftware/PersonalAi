import { Status } from "../../contants/enums/Status.enum"
import { UserCredentials } from "../../interfaces/UserCredentials.interface"

export default interface LoginSlice{
    userCredetials: UserCredentials,
    userAuth: {
        tokenValue: string | undefined,
        status: Status,
        error: string
    }  
}