import { useSelector } from "react-redux"


export default function Header() {

    const firstName = useSelector((state: any) => state.user.firstName)
    const lastName = useSelector((state: any) => state.user.lastName)
    return (
        <div className="header">
            Header
            <span>{firstName} {lastName}</span>
        </div>
    )
}