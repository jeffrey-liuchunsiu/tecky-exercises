import { useForm } from "react-hook-form"
import { login, UserType } from "../redux/user/userSlice"
import { useDispatch } from 'react-redux';
import image from "../assets/user_icon.png"
import { useNavigate } from "react-router";
interface LoginFormType {
    id: number,
    username: string,
    password: string,
}
export default function Login() {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm<LoginFormType>({
        defaultValues: {
            id: 0,
            username: "",
            password: ""
        }
    })

    const onSubmit = (data: LoginFormType) => {
        console.log(data.username)
        console.log(data.password)
        if (data.username === "james" && data.password === "1234") {
            const resData = {
                id: 11,
                firstName: "Jares",
                lastName: "1234",
                age: 18,
                gender: "M",
                images: image,
                isLoggedIn: true

            } as UserType
            dispatch(login(resData))
            navigate(`/about/me/${resData.id}`)
        } else {
            navigate(`/games`)
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


