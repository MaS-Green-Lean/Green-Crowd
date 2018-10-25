const Store = require('mongoose').model('Store')

module.exports.create = (req, res, next) => {
  if (!req.body.name) {
    return next(new Error('name of store is required'))
  }
  if (!req.body.description) {
    return next(new Error('description of store required'))
  }
  if (!req.body.address) {
    return next(new Error('address of the store is required'))
  }

  Store.create({
    name: req.body.name,
    description: req.body.description,
    address: req.body.address
  }, (err, result) => {
    if (err) {
      res.locals.error = {
        status: 500,
        msg: 'error: ' + err
      }
      return next()
    } else {
      res.locals.data = {
        store: result,
        msg: 'Store successfully created'
      }
      return next()
    }
  })
}

module.exports.get = (req, res, next) => {
  console.log(req.params.id)
  if (!req.params.id) {
    return next(new Error('store id is required'))
  }
  Store.findById(req.params.id).exec((err, store) => {
    if (err) {
      return next(new Error('error occured: ' + err))
    } else if (store) {
      console.log(store)
      res.locals.data = {
        store: store
      }
      return next()
    }
  })
}
