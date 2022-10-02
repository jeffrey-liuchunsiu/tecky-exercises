import express from 'express'
import { Request, Response } from 'express'
import Knex from "knex";
const knexConfigs = require("./knexfile");
const configMode = process.env.NODE_ENV || "development";
const knexConfig = knexConfigs[configMode];
export const knex = Knex(knexConfig);