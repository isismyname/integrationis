const express = require('express')
const router = express.Router()

//router
const {auth} = require('../middlewares/auth')
const {uploadFile} = require('../middlewares/uploadFile')
const {register, login, getUsers, deleteUser} = require('../controllers/user')
const {postProduct, getProducts, getProduct, updateProduct, deleteProduct} = require('../controllers/product')
const {postTopping, getToppings, getTopping, updateTopping, deleteTopping} = require('../controllers/topping')
const {postTransaction, getTransactions} = require('../controllers/transaction')
const {postCartproduct, getCartproducts, getCartproduct} = require('../controllers/cartproduct')

router.post('/register', register)
router.post('/login', login)

//user
router.get('/users', getUsers)
router.delete('/users/:id', deleteUser)

// product
router.post('/product', uploadFile("image"), auth, postProduct)
router.get('/products', getProducts)
router.get('/product/:id', getProduct)
router.patch('/product/:id', auth, updateProduct)
router.delete('/product/:id', auth, deleteProduct)

// topping
router.post('/topping', uploadFile("image"), auth, postTopping)
router.get('/toppings', getToppings)
router.get('/topping/:id', getTopping)
router.patch('/topping/:id', auth, updateTopping)
router.delete('/topping/:id', auth, deleteTopping)

//transaction
router.get('/transactions', getTransactions)
router.post('/transactions', postTransaction)

//cart
router.post('/carts', postCartproduct)
router.get('/carts', getCartproducts)
router.get('/cart/:id', getCartproduct)

module.exports = router