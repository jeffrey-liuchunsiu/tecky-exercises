import React from "react";
import AlertBox from "./AlertBox";

// interface LifecycleProps {
//     isShow: boolean;
// }

export default class Lifecycle extends React.Component<{}, {
    count: number
    isShowModal: boolean
}> {

    constructor(props: any) {
        super(props)
        console.log("constructor")
        this.state = {
            count: 0,
            isShowModal: false
        }
    }

    componentDidMount(): void {
        console.log("componentDidMount")

    }

    componentDidUpdate(prevProps: Readonly<{}>, prevState: Readonly<{ count: number; }>, snapshot?: any): void {
        console.log("old count: " + prevState.count)
        console.log("new count: " + this.state.count)
        if (this.state.count == 5) {
            const newState = { ... this.state }
            newState.isShowModal = true
            newState.count = this.state.count + 1
            this.setState(newState)
        }

    }

    closeModal = () => {
        this.setState({
            isShowModal: false
        })
    }

    addCount = () => {
        this.setState({
            count: this.state.count + 1
        })
    }

    public render() {
        console.log("render")
        return (

            <div>
                Lifecycle
                <div>Count : {this.state.count}</div>
                <button onClick={this.addCount}>Add +1</button>
                <AlertBox isShowModal={this.state.isShowModal} closeModal={this.closeModal} />
            </div >
        )
    }
}