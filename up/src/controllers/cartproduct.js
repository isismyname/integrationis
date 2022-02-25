const {cartproduct} = require('../../models');
const jwt = require('jsonwebtoken')

exports.postCartproduct = async (req, res)=>{
    try {        
        const pcartproduct = await cartproduct.create({
            include: ['title']
        })
        res.send({
            status: 'Success',
            data:{
                cartproduct: pcartproduct
            }
        })
    } catch (error) {
        console.log(error.message);
        res.send({
            status: 'Error',
            message: (error.message)
        });
        
    }
}
exports.getCartproducts = async (req, res)=>{
    try {
        // const {id} = req.params
        // const cartproducted = await cartproduct.findAll(req.body, {
        //     where: {
        //         id
        //     },
        //     attributes: {
        //         include: ['title'],
        //         exclude: ['createdAt', 'updatedAt']
        //     }
        // })
        const cartproducts = await cartproduct.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        })

        res.send({
            status: 'Success',
            data: {
                cart: cartproducts
            }
        })
    } catch (error) {
        console.log(error.message);
        res.send({
            status: 'Failed',
            message: (error.message)
        })
    }
}
exports.getCartproduct = async (req, res)=>{
    try {
        const {id} = req.params

        const cartproductid = await cartproduct.findOne({
            where:{
                id
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'status', 'password', 'idUser']
            }
        })

        res.send({
            status: 'Success',
            data: {
                cartproducts: cartproductid
            }
        })
    } catch (error) {
        res.send({
            status: 'Failed',
            message: (error.message)
        })
    }
}
exports.updateCartproduct = async (req, res)=>{
    try {
        const {id} = req.params
        
        await cartproduct.update(req.body,{
            where: {
                id
            },
            attributes: {
                include: ['title', 'price', 'image']
            }
        })
        res.send({
            status: 'Success',
            data: {
                cartproduct: req.body
            }
        })
    } catch (error) {
        res.send({
            status: 'Failed',
            message: (error.message)
        })        
    }
}
exports.deleteCartproduct = async (req, res)=>{
    try {
        const {id} = req.params

        await cartproduct.destroy({
            where:{
                id
            }
        })
        res.send({
            status: 'Success',
            data:{
                id
            }
        })
    } catch (error) {
        
    }
}