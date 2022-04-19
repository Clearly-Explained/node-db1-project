const router = require('express').Router()

const Account = require('./accounts-model')
const md = require('./accounts-middleware.js');


router.get('/', async (req, res, next) => {
  try {
    const accounts = await Account.getAll()
    res.json(accounts)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', md.checkAccountId, async (req, res, next) => {
  res.json(req.account)
})

router.post('/', md.checkAccountPayload, 
  md.checkAccountNameUnique, 
  async (req, res, next) => {
  try {
    let toTrim = req.body.name.trim()
    req.body.name = toTrim
    const data = await Account.create(req.body)
    res.status(201).json(data)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', 
  md.checkAccountId,
  md.checkAccountPayload,
  md.checkAccountNameUnique, 
  async (req, res, next) => {
  try {
    const data = await Account.updateById(req.params.id, req.body)
    res.json(data)
  } catch (err) {
    next(err)
  }
});

router.delete('/:id', 
  md.checkAccountId, 
  async (req, res, next) => {
  try {
    const data = await Account.deleteById(req.params.id)
    res.json(data)
  } catch (err) {
    next(err)
  }
})


router.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message,})
})



module.exports = router;