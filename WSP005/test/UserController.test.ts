import { Request, Response } from 'express';
// import { Client } from 'pg';
import UserService from '../services/UserService';
import UserController from '../controllers/UserController';
// import { knex } from '../knexfile';
import { Knex } from "knex";
import SocketIO from 'socket.io';
import User from '../models/UserModels';
import { checkPassword } from '../hash';
import formidable from 'formidable'
import IncomingForm from 'formidable/Formidable';
import { request } from 'http';
import { formParsePromise } from '../utils/upload';


jest.mock('../services/UserService');
jest.mock('../hash');
jest.mock('../utils/upload')
// jest.mock('../controllers/UserController')

describe("UerController", () => {
    let controller: UserController;
    let service: UserService;
    let io: SocketIO.Server;
    let req: Request;
    let res: Response;
    let tony: User;
    let form: IncomingForm;
    // let formParsePromise: () => Promise<any>
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
        form = formidable({})
        // formidableCB = jest.fn().mockResolvedValue({ err: null, fields: {}, files: [] })
        io = createSocketIO()
        req = createRequest()
        res = createResponse()
        // formParsePromise = jest.fn().mockResolvedValue({ fields: { ...req.body } })
        controller = new UserController(service, io);

    })
    it("getUser", async () => {
        await controller.getUsers(req, res);
        expect(service.getUsers).toBeCalledTimes(1)
        expect(res.json).toBeCalledWith([tony]);
    });
    it.only("login invalid password", async () => {
        await controller.login(req, res);

        // let result = await formParsePromise()
        // console.log('result = ', result)
        (formParsePromise as jest.Mock).mockResolvedValue({ fields: { ...req.body } })

        expect(service.getUser).toBeCalledTimes(1)
        expect(res.status).toBeCalledWith(500)
        expect(res.status(401).json).toBeCalledWith({
            message: 'Incorrect username or password'
        });
    });
    it("login valid password", async () => {
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