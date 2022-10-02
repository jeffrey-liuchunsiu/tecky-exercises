import { Request, Response } from 'express';
// import { Client } from 'pg';
import UserService from '../services/UserService';
import UserController from '../controllers/UserController';
// import { knex } from '../knexfile';
import { Knex } from "knex";
import SocketIO from 'socket.io';
import User from '../models/UserModels';
import { checkPassword } from '../hash';

jest.mock('../services/UserService');
jest.mock('../hash');
// jest.mock('../controllers/UserController')

describe("UerController", () => {
    let controller: UserController;
    let service: UserService;
    let io: SocketIO.Server;
    let req: Request;
    let res: Response;
    let tony: User;

    beforeEach(function () {
        tony = {
            id: 1,
            username: "Tony",
            password: "string",
            // image: "",
            created_at: new Date,
            updated_at: new Date
        };

        service = new UserService({} as Knex);
        service.getUsers = jest.fn(async () => [tony]);
        service.getUser = jest.fn(async () => tony);
        io = createSocketIO()
        req = createRequest()
        res = createResponse()
        controller = new UserController(service, io);

    })
    it("getUser", async () => {
        await controller.getUsers(req, res);
        expect(service.getUsers).toBeCalledTimes(1)
        expect(res.json).toBeCalledWith([tony]);
    });
    it.only("login invalid password", async () => {
        await controller.login(req, res);
        expect(service.getUser).toBeCalledTimes(1)
        expect(res.status).toBeCalledWith(401)
        expect(res.status(401).json).toBeCalledWith({
            message: 'Incorrect username or password'
        });
    });
    it.only("login valid password", async () => {
        (checkPassword as jest.Mock).mockReturnValue(true);
        await controller.login(req, res);
        expect(service.getUser).toBeCalledTimes(1)
        expect(res.status).toBeCalledWith(200)

        let user = {
            user: {
                loggedIn: true,
                username: tony.username,
                userId: tony.id
            }
        }
        expect(res.status(200).json).toBeCalledWith({
            message: "Login Successful",
            // user: { username: tony.username }
            data: { user: user.user }
        });
    });



})
function createSocketIO() {
    const emit = jest.fn((event, msg) => null)
    return {
        to: jest.fn(() => ({ emit }))
    } as any as SocketIO.Server
}

function createRequest() {
    return {
        session: {},
        body: { username: "Tony", password: "string" }
    } as any as Request
}


function createResponse() {
    const json = jest.fn((code) => null)
    return {
        status: jest.fn(() => ({ json })),
        json: jest.fn(() => null)
    } as any as Response
}