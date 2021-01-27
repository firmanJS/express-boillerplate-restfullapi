const router = require('express').Router()
const item = require('../api/item/ItemController')
const { itemValidation } = require('../api/item/validation')
const { verifyToken } = require('../middleware')

router.get('/', verifyToken, item.index)
router.post('/', verifyToken, [itemValidation], (req, res) => {
  item.store(req, res)
})
router.get('/:id', verifyToken, item.show)
router.put('/:id', verifyToken, item.update)
router.delete('/:id', verifyToken, item.destroy)

module.exports = router
