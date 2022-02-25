const {transaction, user} = require('../../models');
const jwt = require('jsonwebtoken')

exports.postTransaction = async (req, res)=>{
    try {        
        const {id} = req.params
        const ptransaction = await transaction.create({
            where:{
                id
            },
            include: [
                {
                    model: user,
                    as: "buyerUser",
                    attributes: {
                        exclude: ['password', 'createdAt', 'updatedAt' ]
                    }
                },
                {

                }
            ],
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
            
        })
        res.send({
            status: 'Success',
            data:{
                transaction: ptransaction
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
exports.getTransactions = async (req, res)=>{
    try {
        const transactions = await transaction.findAll({
            include: [
                {
                    model: user,
                    as: "buyerUser",
                    attributes: {
                        exclude: ['createdAt', 'updatedAt', 'id', 'password', 'status']
                    }
                },
            ],
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'id', 'idProduct', 'idCart', 'idBuyer']
            }
        })

        res.send({
            status: 'Success',
            data: {
                transactions
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
exports.getTransaction = async (req, res)=>{
    try {
        const {id} = req.params

        const transactionid = await transaction.findOne({
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
                transactions: transactionid
            }
        })
    } catch (error) {
        res.send({
            status: 'Failed',
            message: (error.message)
        })
    }
}
exports.updateTransaction = async (req, res)=>{
    try {
        const {id} = req.params
        
        await transaction.update(req.body,{
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
                transaction: req.body
            }
        })
    } catch (error) {
        res.send({
            status: 'Failed',
            message: (error.message)
        })        
    }
}
exports.deleteTransaction = async (req, res)=>{
    try {
        const {id} = req.params

        await transaction.destroy({
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