import { useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import image from "../assets/people.png"
import { IRootState } from "../redux/store"
import { fetchLogin } from "../redux/user/thunk"
import Loading from "./Loading"
interface LoginFormType {
    username: string
    password: string
}
export default function Login() {
    const displayName = useSelector((state: IRootState) => state.user.displayName)
    const errMsg = useSelector((state: IRootState) => state.user.errMsg)
    const dispatch = useDispatch()
    const [show, setShow] = useState(false);
    const [intervalId, setIntervalId] = useState<NodeJS.Timer>()

    const { register, handleSubmit } = useForm<LoginFormType>({
        defaultValues: {
            username: "james",
            password: "1234"
        }
    })

    const onSubmit = async (data: LoginFormType) => {
        setShow(true)
        // console.log(1)
        console.log(data)

        // dispatch(fetchLogin({
        //     username: data.username,
        //     password: data.password
        // })).unwrap()
        const callApi = new Promise<void>((resolve, reject) => {
            setTimeout(async () => {
                const result = await dispatch(fetchLogin({
                    username: data.username,
                    password: data.password
                })).unwrap()
                resolve(result)
            }, 2000)
        })
        await callApi
        // console.log(3)
        setShow(false)
    }

    return <div>
        Login Page :

        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>Username:
                    <input {...register('username')} />
                </label>
                <br />
                <label>password:
                    <input {...register('password')} />
                </label>
                <br />
                <button>Login</button>
            </form>
            <div>Display Name: {displayName}</div>

            <div>Error Msg : {errMsg}</div>

            <Loading show={show} />
        </div>
    </div>
}