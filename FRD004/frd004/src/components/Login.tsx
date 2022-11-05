import { useForm } from "react-hook-form"
import { login, UserType } from "../redux/user/userSlice"
import { useDispatch } from 'react-redux';
import image from "../assets/user_icon.png"
interface LoginFormType {
    username: string,
    password: string,
}
export default function Login() {
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm<LoginFormType>({
        defaultValues: {
            username: "",
            password: ""
        }
    })

    const onSubmit = (data: LoginFormType) => {
        console.log(data.username)
        console.log(data.password)
        if (data.username === "james" && data.password === "1234") {
            dispatch(login({
                firstName: "Jares",
                lastName: "1234",
                age: 18,
                gender: "M",
                images: image,
                isLoggedIn: true

            } as UserType))
        }
    }

    // const {} = useForm({
    //     defaultValies:{
    //         username: "",
    //         password: ""
    //     }
    // })
    return (
        <div >
            Login Page:

            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label>
                        Username:
                        <input {...register('username')} />

                    </label>
                    <br />
                    <label>
                        password:
                        <input {...register('password')} />
                    </label>
                    <br />
                    <button>Login</button>
                </form>
            </div>

        </div>
    )
}


