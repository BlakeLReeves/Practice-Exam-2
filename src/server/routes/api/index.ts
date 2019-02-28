import * as express from 'express';
import * as passport from 'passport';

import booksRouter from './books';
import categoriesRouter from './categories';

const apiRouter = express.Router();

apiRouter.use((req, res, next) => {
    passport.authenticate('bearer', { session: false }, (err, user, info) => {
        if(user) req.user = user;
        return next();
    })(req, res, next);
});

apiRouter.use('/books', booksRouter);
apiRouter.use('/categories', categoriesRouter);

export default apiRouter;