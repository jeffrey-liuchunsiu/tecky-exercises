

const image = <img src="../images/dog.jeg" />;
const header = <h1>Simple Website</h1>;
const steps: string[] = ["create-react-app", "npm start"]
const displayList = (item: number) => {
    return (
        <span className="command"> {steps[item]}</span>
        // steps.map((step: string, index: number) => {
        //   return (
        //     <li>{step}</li>
        //   )
        // })
    )
}

export default function Simple() {
    return (
        <div>
            <body className="body">
                <header>
                    {header}
                </header>
                <section>
                    This is a simple website made without React. Try to convert this into React enabled.
                    <ol>

                        <li>First, you need to use {displayList(0)}</li>
                        {/* <li>First, you need to use <span class="command">create-react-app</span></li> */}
                        <li>Second, you need to run {displayList(1)}</li>
                        {/* <li>Second, you need to run <span class="command">npm start</span></li> */}
                    </ol>
                </section>
                <footer className="footer">
                    {image}
                </footer>
            </body>
        </div>
    )
}