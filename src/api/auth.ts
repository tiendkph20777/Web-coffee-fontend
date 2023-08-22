import { IUser } from "../models";
import instance from "./instance";

export const signupApi = async (body: IUser) => {
    const res = await instance.post('signup', body)
    return res.data
}

export const signinApi = async () => {
    const res = await instance.get('signup')
    return res.data
}
