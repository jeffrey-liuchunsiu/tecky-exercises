import express from 'express';
import path from 'path';

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("./public"));


app.post('/name', (req, res, next) => {
    const { name, location } = req.body;
    res.send(`Name is ${name}, Location is ${location}`,);
    res.end(`Name is ${name}, Location is ${location}`, () => { });
    console.log("James is handsome1");
    // next()
});

app.use(() => {
    console.log("James is handsome2");

})


app.post("/test-api", (req, res, next) => {
    res.status(200).send("Success! Post");
    let name = req.body.name
    let password = req.body.password
    console.log("name: ", name);
    console.log("password: ", password);
    // next()
})
app.get("/test-api", (req, res, next) => {
    res.status(200).send("Success! Get");
    let name = req.body.name
    let password = req.body.password
    console.log("name: ", name);
    console.log("password: ", password);
    // next()
})

app.get("/test-api", (req, res, next) => {
    res.status(200).send("Success!");
    let name = req.query.name
    let password = req.query.password
    console.log("name: ", name);
    console.log("password: ", password);
})

app.get("/test-api/name/:name/password/:password", (req, res, next) => {
    res.status(200).send("Success!");
    let name = req.params.name
    let password = req.params.password
    console.log("name: ", name);
    console.log("password: ", password);
})

app.listen(8080, () => {
    console.log("Listening")
});