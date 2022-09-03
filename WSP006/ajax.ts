import express from 'express';
import path from 'path';

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"))

app.listen(8080, () => {
    console.log("Listening")
});