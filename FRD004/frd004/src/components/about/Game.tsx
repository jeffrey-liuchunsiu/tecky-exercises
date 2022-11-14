import { useEffect } from "react"
import { useParams } from "react-router-dom"

export default function Game() {

    const { gameId } = useParams<{ gameId: string }>()

    useEffect(() => {
        const fetchOwnProfile = async () => {
            const res = await fetch("/getMe/" + gameId)
            const data = await res.json()
        }
        fetchOwnProfile()
    }, [gameId])

    return (<div>
        Game: {gameId}
    </div>)
}