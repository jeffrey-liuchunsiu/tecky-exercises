import { useEffect, useState } from "react"

export default function Form() {

    const [name, setName] = useState("")

    const onSubmit = (e: any) => {
        e.preventDefault()
        console.log("Submit")
        console.log("name: ", name)
        // await fetch("")
    }

    return (
        <div>

            <form onSubmit={onSubmit}>
                <label>
                    Name:
                    <input
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </label>
                <input type="submit" value="Submit" />
            </form>
        </div>
    )

}