import { useEffect, useState } from "react"

export default function Clock() {
    const [now, setNow] = useState<string>(
        new Date().toLocaleTimeString()
    )
    const [count, setCount] = useState<number>(0)

    const [dataApi, setApiData] = useState<any>()

    useEffect(() => {
        console.log("Count:", count)
        const callWeather = async () => {
            const res = await fetch(
                'https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=flw&lang=tc',
            )
            const data = await res.json()
            console.log(data)
            setApiData(data)
        }
        callWeather()
    }, [count])

    useEffect(() => {
        console.log("componentDidMount")
        console.log("componentDidUpdate")
        const intervalId = setInterval(() => {
            setNow(
                new Date().toLocaleTimeString()
            )
        }, 1000)
        return () => {
            console.log("componentWillUnmount")
            if (intervalId) {
                clearInterval(intervalId)
            }
        }

    }, [])
    const addCount = () => {
        setCount(count + 1)
    }
    return (

        <div>
            Clock
            <div>
                <div>
                    <h1>Hello World!</h1>
                    <div>It is {now}</div>
                    <div>Count: {count}</div>
                    <button onClick={addCount}>Add +1</button>
                    Weather:
                    <div>forecastPeriod: </div>
                    <div>{dataApi.forecastPeriod}</div>
                    <div>{dataApi.outlook}</div>
                </div>

            </div>

        </div>
    )
}