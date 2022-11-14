import express from "express";
import { Request, Response } from "express";
import cors from "cors";
import { Status, TodoItem, User } from "./models/todo";
import { isLoggedIn } from "./token/guards";
import jwtSimple from 'jwt-simple';
import jwt from "./token/jwt";
import fetch from 'node-fetch';
const app = express();
app.use(cors());
app.use(express.json())


let todoItems: TodoItem[] = [{
  id: 1,
  name: "Buy milk",
  status: Status.Complete
},
{
  id: 2,
  name: "Buy banana",
  status: Status.Complete
},
]

export const userRecords: User[] = [
  {
    id: 1,
    username: "james",
    password: "1234",
    firstName: "James",
    lastName: "Lam",
    email: "james123@tecky.io"
  },
  {
    id: 2,
    username: "dickson",
    password: "1234",
    firstName: "Dickson",
    lastName: "Wu",
    email: "dickson@tecky.io"
  }
]

export const blackListToken: string[] = []

app.post('/login/facebook', async (req: Request, res: Response) => {
  if (!req.body.token) {
    res.status(401).json({ msg: "Wrong Access Token!" });
    return;
  }
  const { token } = req.body;
  console.log("token: ", token)
  const fetchResponse = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,picture`);
  const result = await fetchResponse.json();
  if(result.error){
      res.status(401).json({msg:"Wrong Access Token!"});
      return ;
  }
  const email = result.email
  // Checking user existed from user table
  let users = userRecords.filter(user => {
    return user.email == email
  })

  if (users.length === 0) {
    // Create a User account to user table
    const user: User = {
      id: userRecords[userRecords.length - 1].id + 1,
      username: result.name,
      password: "",
      firstName: result.name,
      lastName: result.name,
      email: email
    } 
    userRecords.push(user)
    users[0] = user
  } 


  const user = users[0]
  const payload = {
      user_id: user.id,
      displayName: `${user.firstName} ${user.lastName}`,
      time: new Date().toLocaleTimeString()
    }
  const token2 = jwtSimple.encode(payload, jwt.jwtSecret);


  console.log(result)
  res.json({
    token: token2,
    test: result
  })
})

app.post("/logout", isLoggedIn, (req: Request, res: Response) => {
  const token = req.token!
  blackListToken.push(token)
  res.json(blackListToken)
})

app.post("/login", function (req: Request, res: Response) {
  const { username, password } = req.body
  const users = userRecords.filter(user => {
    return user.username === username && user.password === password
  })
  console.log(users)
  if (users.length === 1) {
    const user = users[0]
    ////////////////////////////////////////////////
    const payload = {
      user_id: user.id,
      displayName: `${user.firstName} ${user.lastName}`,
      time: new Date().toLocaleTimeString()
    }
    const token = jwtSimple.encode(payload, jwt.jwtSecret);
    ////////////////////////////////////////////////


    res.json({
      status: "successful",
      token: token
      // displayName: `${user.firstName} ${user.lastName}`
    });
  } else {
    res.status(400).json({
      status: "fail",
      msg: "Username or password is invalid"
    })
  }
});

app.get("/todoItems", isLoggedIn, function (req: Request, res: Response) {
  // Call DB
  const dbData = todoItems
  res.json(dbData);
});

app.post("/todoItem", function (req: Request, res: Response) {
  const { name } = req.body
  const todoItem: TodoItem = {
    id: Number(todoItems[todoItems.length - 1].id) + 1,
    name,
    status: Status.Active
  }
  todoItems.push(todoItem)
  res.json(todoItems);
})

app.delete("/todoItem", function (req: Request, res: Response) {
  const { id } = req.body
  const newItems = todoItems.filter(item => {
    console.log("item.id:", item.id)
    console.log("id:", id)
    return !(item.id == id)
  })
  todoItems = newItems
  res.json(newItems)
})

app.put("/todoItem", function (req: Request, res: Response) {
  const { name, id, status } = req.body
  // console.log("id:", id)
  // console.log("name:", name)
  // console.log("status:", status)

  const newTodoItems = todoItems.map((item: TodoItem) => {
    // console.log("item.id:", item.id)
    // console.log("id:", id)

    if (item.id == id) {
      item.name = name
      item.status = status
    }
    return item
  })
  console.log(newTodoItems)
  todoItems = newTodoItems
  res.json(todoItems);
})

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}/`);
});
