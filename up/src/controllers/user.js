const {user} = require('../../models')
const Joi = require('joi')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.register = async (req, res)=>{
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        email: Joi.string().email().min(4).required(),
        password: Joi.string().min(6).required()
    })

    const {error} = schema.validate(req.body);
    
    if (error)
    return res.status(406).send({
        error:{
            message: (error.message)
        }
    })

    try {

        const salt = await bcrypt.genSalt(10)
        const hashedPass = await bcrypt.hash(req.body.password, salt)

        const newUser = await user.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPass
        })
        const SECRET_KEY = 'gaktaulahpusing'
        const token = jwt.sign({id: newUser.id}, SECRET_KEY)

        res.status(201).send({
            status: 'Success',
            data: {
                users: {
                    name: newUser.name,
                    token
                }
            }
        })
    } catch (error) {
        res.send({
            status: 'Failed',
            message: (error.message)
        })
    }
}
exports.login = async (req, res)=>{

    const schema = Joi.object({
        email: Joi.string().email().min(4).required(),
        password: Joi.string().min(6).required()
    })
    
    const {error} = schema.validate(req.body);
    
    if (error)
    return res.status(406).send({
        error:{
            message: error.details[0].message
        }
    })
    
    try {
        
        const newUserL = await user.findOne({
            where: {
                email: req.body.email,
            }, 
            attributes:{
                exclude: ['createdAt', 'updatedAt']
            }
        })
        
        const invalid = await bcrypt.compare(req.body.password, newUserL.password)
        
        if(!invalid){
            return res.status(400).send({
                status: 'Failed',
                message: 'Failed, Not Match'
            })
        }

        // const tokenData = {
        //     id: newUserL.id,
        //     name: newUserL.name,
        //     email: newUserL.email,
        //     status: newUserL.status
        // }

        // const token = jwt.sign({id: newUserL.id}, process.env.TOKEN_KEY)

        const SECRET_KEY = 'gaktaulahpusing'
        const token = jwt.sign({id: newUserL.id}, SECRET_KEY)
        
        res.status(200).send({
            status: 'Success',
            data: {
                users: {
                    name: newUserL.name,
                    email: newUserL.email,
                    token
                }
            }
        })
        } catch (error) {
            console.log(error);
            res.send({
                status: 'Error',
                message: 'Failed'
            });
            
        }
}
exports.getUsers = async (req, res)=>{
    try {
        const users = await user.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'status', 'password', 'id']
            }
        })

        res.send({
            status: 'Success',
            data: {
                users
            }
        })
    } catch (error) {
        res.send({
            status: 'Failed',
            message: "(error.message)"
        })
    }
}
exports.deleteUser = async (req, res)=>{
    try {
        const {id} = req.params

        await user.destroy({
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
        res.send({
            status: 'Error',
            message: (error.message)
        });
    }
}
// https://github.com/samsul-rijal/auth-and-multer-materi/blob/2.Hashing-Password-Bcrypt/src/controllers/auth.js