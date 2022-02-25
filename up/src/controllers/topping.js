const {topping} = require('../../models');
const jwt = require('jsonwebtoken')

exports.postTopping = async (req, res)=>{
    try {        

        const {data} = req.body

        let final = await topping.create({
            ...data,
            image: req.file.filename,
            idUser: req.user.id,
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
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
exports.getToppings = async (req, res)=>{
    try {
        const toppings = await topping.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'id']
            }
        })

        res.send({
            status: 'Success',
            data: {
                toppings
            }
        })
    } catch (error) {
        res.send({
            status: 'Failed',
            message: (error.message)
        })
    }
}
exports.getTopping = async (req, res)=>{
    try {
        const {id} = req.params

        const toppingid = await topping.findOne({
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
                toppings: toppingid
            }
        })
    } catch (error) {
        res.send({
            status: 'Failed',
            message: (error.message)
        })
    }
}
exports.updateTopping = async (req, res)=>{
    try {
        const {id} = req.params
        
        await topping.update(req.body,{
            where: {
                id
            },
            attributes: {
                include: ['title', 'price', 'image']
            }
        })
        const utopping = await topping.findOne({ 
            where:{
                id
            },
            attributes: {
                include: ['image', 'price'],
                exclude: ['createdAt', 'updatedAt']
            }
        })
        res.send({
            status: 'Success',
            data: {
                utopping
            }
        })
    } catch (error) {
        res.send({
            status: 'Failed',
            message: (error.message)
        })        
    }
}
exports.deleteTopping = async (req, res)=>{
    try {
        const {id} = req.params

        await topping.destroy({
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