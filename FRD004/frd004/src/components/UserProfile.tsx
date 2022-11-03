import { useSelector } from "react-redux"
// import image from "../assets/user_icon.png"

export default function UserProfile() {

    const firstName = useSelector((state: any) => state.user.firstName)
    const lastName = useSelector((state: any) => state.user.lastName)
    const age = useSelector((state: any) => state.user.age)
    const image = useSelector((state: any) => state.user.images)

    return (
        <div >
            UserProfile
            <img src={image} className="img" />
            <div>User Name: {firstName} {lastName}</div>
            <div>Age: {age}</div>
            <div>Gender: M</div>

        </div>
    )
}