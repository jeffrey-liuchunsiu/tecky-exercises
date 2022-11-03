import { useEffect, useState } from "react"
import { useForm } from "react-hook-form";

export default function HookForm() {
    // const [name, setName] = useState('')
    // const [password, setPassword] = useState('')

    type LoginFormType = {
        username: string
        password: string

    }
    const { register, handleSubmit, watch } = useForm<LoginFormType>({
        defaultValues: {
            username: "jeffrey",
            password: "1234"
        }

    })

    console.log("username: ", watch("username"))

    const onSubmit = async (data: LoginFormType) => {
        console.log("data", data)
        // e.preventDefault()
        console.log("Submit")
        // console.log("name: ", name)
        // console.log("password: ", password)

        const res = await fetch("/user/login", {
            method: "POST",
            // body: JSON.stringify({
            //     username: name,
            //     password: password
            // }),
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json"
            }
        })
    }

    return <div style={{ textAlign: "center" }}>
        <form onSubmit={handleSubmit(onSubmit)}>
            <label>
                Username:
                <input
                    type="text"
                    {...register("username")}


                />
            </label>
            <br></br>
            <label>
                Password:
                <input
                    type="text"
                    {...register("password")}
                />
            </label>
            <input type="submit" value="Submit" />
        </form>
    </div>
}