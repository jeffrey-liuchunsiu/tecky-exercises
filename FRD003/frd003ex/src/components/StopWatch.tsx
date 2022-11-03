import { useEffect, useState } from "react"

enum Mode {
    Start = "Start",
    Stop = "Stop"
}

export default function StopWatch() {

    const [second, setSecond] = useState<number>(0)
    const [milliSecond, setMilliSecond] = useState<number>(58000)

    const [intervalId, setIntervalId] = useState<NodeJS.Timer | null>(null)

    const [currentMode, setCurrentMode] = useState<Mode>(Mode.Stop)
    const [lapRecords, setLapRecords] = useState<string[]>(["a", "b"])
    // useEffect(() => {

    // })

    const getMins = () => {
        return (Math.floor(milliSecond / 1000 / 60 % 60)).toString().padStart(2, "0")
    }

    const getMilliSecond = () => {
        return (milliSecond % 1000).toString().substring(0, 2)
    }

    const getSecond = () => {
        return (Math.floor(milliSecond / 1000 % 60)).toString().padStart(2, "0")

    }

    const leftButton = () => {
        // if (intervalId && currentMode === Mode.Stop) {
        if (currentMode === Mode.Stop) {
            // clearInterval(intervalId)
            setIntervalId(null)
            setMilliSecond(0)
        }
        if (currentMode === Mode.Start) {
            const newLapRecords = [...lapRecords]
            newLapRecords.push(displayTime())
            //Records
            setLapRecords(newLapRecords)

        }
    }
    const rightButton = () => {
        if (intervalId == null && currentMode === Mode.Stop) {
            const id = setInterval(() => {
                setMilliSecond((milliSecond) => milliSecond + 80)
                // setSecond((value) => value + 1)
            }, 80)
            setIntervalId(id)
            setCurrentMode(Mode.Start)
        }
        if (intervalId != null && currentMode === Mode.Start) {
            clearInterval(intervalId)
            setIntervalId(null)
            setCurrentMode(Mode.Stop)

        }
    }
    const displayTime = (): string => {
        return `${getMins()}:${getSecond()}.${getMilliSecond()}`
    }
    return (
        <div>
            <h1>{getMins()}:{getSecond()}.{getMilliSecond()}</h1>

            <div className="button-container">
                <div onClick={leftButton}>
                    {
                        currentMode == Mode.Start ? "Lap" : "Reset"
                    }
                </div>
                {/* <div>Lap</div> */}
                <div className="right-btn" onClick={rightButton}>
                    {
                        currentMode == Mode.Start ? "Pause" : "Start"
                    }
                </div>
                {/* <div>Resume</div> */}
                {/* <div>Pause</div> */}
            </div>
            <div className="lab-container">
                {
                    lapRecords.map((record, index) => {
                        return (
                            <div key={index}>
                                {record}
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}