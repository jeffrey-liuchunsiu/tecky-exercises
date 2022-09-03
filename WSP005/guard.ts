import express from 'express';


export const isLoggedIn = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
) => {
    console.log(req.session);

    // console.log(req.session?.user);
    if (req.session?.user) {
        next()
    } else {
        // res.redirect("/");
    }
}