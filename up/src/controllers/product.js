const {product} = require('../../models');
const jwt = require('jsonwebtoken')

exports.postProduct = async (req, res)=>{
    try {        

        const {data} = req.body

        let final = await product.create({
            ...data,
            image: req.file.filename,
            idUser: req.user.id
        })

        final = JSON.parse(JSON.stringify(final))

        final = {
            ...final,
            image: process.env.FILE_PATH + final.image
        }

        res.send({
            status: 'Success',
            data: final
        })
    } catch (error) {
        console.log(error.message);
        res.send({
            status: 'Error',
            message: (error.message)
        });
        
    }
}
exports.getProducts = async (req, res)=>{
    try {
        let final = await product.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'id']
            }
        })

        res.send({
            status: 'Success',
            data: {
                products: final
            }
        })
    } catch (error) {
        res.send({
            status: 'Failed',
            message: (error.message)
        })
    }
}
exports.getProduct = async (req, res)=>{
    try {
        const {id} = req.params

        const final = await product.findOne({
            where:{
                id
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'id']
            }
        })

        res.send({
            status: 'Success',
            data: {
                products: final
            }
        })
    } catch (error) {
        res.send({
            status: 'Failed',
            message: (error.message)
        })
    }
}
exports.updateProduct = async (req, res)=>{
    try {
        const {id} = req.params
        
        await product.update(req.body,{
            where: {
                id
            },
            attributes: {
                include: ['title', 'price', 'image']
            }
        })
        const uproduct = await product.findOne({ 
            where:{
                id
            },
            attributes: {
                include: ['image', 'price'],
                exclude: ['id', 'createdAt', 'updatedAt']
            }
        })
        res.send({
            status: 'Success',
            data: {
                uproduct
            }
        })
    } catch (error) {
        res.send({
            status: 'Failed',
            message: (error.message)
        })        
    }
}
exports.deleteProduct = async (req, res)=>{
    try {
        const {id} = req.params

        await product.destroy({
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