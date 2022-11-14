import { Bearer } from 'permit';
import jwtSimple from 'jwt-simple';
import express from 'express';
import jwt from './jwt';
import { userRecords, blackListToken } from '../server';

const permit = new Bearer({
    query:"access_token"
})

export async function isLoggedIn(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction) {

    try{
        const token = permit.check(req)
        if(!token){
            return res.status(401).json({msg:"Missing Token"});
        }
        console.log("token: ", token)
        console.log("blackListToken: ", blackListToken)
        if (blackListToken.includes(token)) {
            return res.status(401).json({msg:"you are logout already"});
        }
        // 驗證
        const payload = jwtSimple.decode(token,jwt.jwtSecret);
        
        const userId = payload.user_id
        // Call Database getUserByUserId
        console.log(userRecords)
        const users = userRecords.filter(user=> user.id == userId)
        if (users.length == 1) {
            req.user = users[0]
            req.token = token
            return next();
        } else {
            return res.status(401).json({msg:"Permission Denied"});
        }
    }catch(e){
        return res.status(401).json({msg:"Wrong Token"});
    }
}
