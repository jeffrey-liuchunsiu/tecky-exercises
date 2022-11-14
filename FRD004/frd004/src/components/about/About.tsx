import { useEffect } from "react"
import { Outlet, useParams } from "react-router-dom"

export default function Me() {
    const param = useParams<{ userId: string }>()

    // useEffect(() => {
    //     const fetchOwnProfile = async () => {
    //         const res = await fetch("/getMe/" + param.userId)
    //         const data = await res.json()
    //     }
    //     fetchOwnProfile()
    // }, [param.userId])

    return (<div>
        <div>About Page
            <Outlet />
        </div>

        {/* <div>
            My Id : {param ? param.userId : "???"}
        </div> */}
    </div>)
}