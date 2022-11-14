import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { clearInterval } from "timers"
import image from "../assets/people.png"
import store, { IRootState } from "../redux/store"
import { fetchFacebookLogin, fetchLogin } from "../redux/user/thunk"
import Loading from "./Loading"
import {useNavigate } from "react-router-dom";
import ReactFacebookLogin, { ReactFacebookLoginInfo } from "react-facebook-login"

interface LoginFormType {
    username: string
    password: string
}
const useAppDispatch = () => useDispatch<typeof store.dispatch>()

export default function Login() {
    const navigate = useNavigate()
    const displayName = useSelector((state: IRootState) => state.user.displayName)
    const errMsg = useSelector((state: IRootState) => state.user.errMsg)
    const [show, setShow] = useState(false);
    const [intervalId, setIntervalId] = useState<NodeJS.Timer>()
    const isLoggedIn = useSelector((state: IRootState) => state.user.isLoggedIn)
    // const dispatch = ()useDispatch()
    const dispatch = useAppDispatch()

    const {register, handleSubmit} = useForm<LoginFormType>({
        defaultValues: {
            username: "james",
            password: "1234"
        }
    })

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (isLoggedIn && token) {
            navigate("/private/todo")
        }
    },[])
    const onSubmit = async (data: LoginFormType) => {
        setShow(true)
        const callApi = new Promise<void>((resolve, reject) => {
            setTimeout(async () => {
               try {
                const result = await dispatch(fetchLogin({
                    username: data.username,
                    password: data.password
                })).unwrap()
                resolve(result)
               } catch (e) {
                reject(e)
               }
            }, 1000)
        })
        
        try {
            await callApi
            navigate("/private/todo")
        } catch (err) {
            console.log(err)
            navigate("/private/404")
        }
        setShow(false)

    }
    const fBOnCLick = ()=> {
        return null;
    }
    
    const fBCallback = async (userInfo: ReactFacebookLoginInfo & { accessToken: string }) => {
        if (userInfo.accessToken) {
            console.log("userInfo.accessToken: " , userInfo.accessToken)

            await dispatch(fetchFacebookLogin({
                token: userInfo.accessToken
            }));

            navigate("/private/todo")
        }
        return null;
    }
    
    return <div>
        Login Page : 

        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>Username: 
                    <input {...register('username')}/>
                </label>
                <br/>
                <label>password: 
                    <input {...register('password')}/>
                </label>
                <br/>
                <button>Login</button>
            </form>
            <div>Display Name: {displayName}</div>

            <div>Error Msg : {errMsg}</div>

            <Loading show={show}/>

            <div className="fb-button">
                <ReactFacebookLogin
                    appId={"821878685716245"}
                    autoLoad={false}
                    fields="name,email,picture"
                    onClick={fBOnCLick}
                    callback={fBCallback}
                />  
            </div>
        </div>
    </div>
}
