import { useForm } from "react-hook-form"

interface LoginFormType {
    username: string,
    password: string,
}
export default function Login() {
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


