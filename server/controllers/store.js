import Store from '../models/store'

module.exports.create = (req, res, next) => {
    if (!req.body.name) {
        return next(new Error('name of store is required'))
    }
    if (!req.body.description) {
        return next(new Error('description of store required'))
    }

    Store.create({
        name: req.body.name,
        description: req.body.description
    }, (err, result) => {
        if (err) {
            res.locals.error = {
                status: 500, 
                msg: 'error: ' + err
            };
            return next();
        } else {
            res.locals.data = {
                recycling: result,
                msg: 'Store successfully created'
            };
            return next();
        }
    })
}