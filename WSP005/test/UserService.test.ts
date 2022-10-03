import Knex from 'knex';
const knexfile = require('../knexfile'); // Assuming you test case is inside `services/ folder`
const knex = Knex(knexfile["test"]); // Now the connection is a testing connection.
import UserService from '../services/UserService';

describe("StudentService", () => {

    let userService: UserService;

    beforeEach(async () => {
        userService = new UserService(knex);
        // await knex('students').del();
        await knex.insert({
            name: "Peter",
            level: "30",
            date_of_birth: "1990-01-01"
        }).into('students');
    })

    it("should get all users", async () => {
        const users = await userService.getUsers();
        expect(users.length).toBe(5);
    });

})