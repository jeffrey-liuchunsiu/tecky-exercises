import { useEffect } from "react"
import { useParams } from "react-router-dom"

export default function Me() {
    const param = useParams<{ userId: string }>()

    useEffect(() => {
        const fetchOwnProfile = async () => {
            const res = await fetch("/getMe/" + parseInt(param.userId!))
            const data = await res.json()
        }
        fetchOwnProfile()
    }, [param.userId])

    return (<div>
        <div>About Me</div>

        <div>
            My Id : {param ? param.userId : "???"}
        </div>
    </div>)
}