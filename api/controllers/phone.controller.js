const db = require("../models");
const Phones = db.phones;
const Op = db.Sequelize.Op;

// Create phone
exports.create = (req, res) => {
    const contactId= req.params.contactId;
    const {name,number} =req.body;
    //chck if the contact exists
    db.contacts.findByPk(contactId)
        .then(contact=>{
            if (!contact){
                res.status(404).send({ message:`Contact with ID ${contactId} not found.` });
            }else{
                //create phone no and associate it with contact
                Phones.create({
                    name:name,
                    number:number,
                    contactId:contactId
                })
                .then(phone=>{
                    res.status(201).send(phone);
                })
                .catch(err =>{
                    res.status(500).send({
                        message: err.message|| "Some error occurred while creating the phone number."
                    });
                });
            }
        })
        .catch(err=>{
            res.status(500).send({message: err.message });
        });
};

// Get all phones
exports.findAll = (req, res) => {
    const contactId =req.params.contactId;
    
    Phones.findAll({ where:{contactId:contactId } })
        .then(phoneNumbers =>{
            res.send(phoneNumbers);
        })
        .catch(err=>{
            res.status(500).send({
                message: err.message|| "Some error occurred while retrieving phone numbers."
            });
        });
};

// Get one phone by id
exports.findOne = (req, res) => {
        const contactId=req.params.contactId;
        const phoneId = req.params.phoneId;
        
        Phones.findOne({where:{ id:phoneId,contactId: contactId } })
            .then(phone=>{
                if(!phone){
                    res.status(404).send({message:`Phone number with ID ${phoneId} not found for contact with ID ${contactId}.` });
                } else{
                    res.send(phone);
                }
            })
            .catch(err=>{
                res.status(500).send({ message:err.message});
            });
};

// Update one phone by id
exports.update = (req, res) => {
        const contactId=req.params.contactId;
        const phoneId=req.params.phoneId;
        const {name}=req.body;
        
        Phones.update({name: name}, {where:{id: phoneId, contactId:contactId } })
            .then(num=>{
                if (num== 1){
                    res.send({message: "Phone number updated successfully." });
                } else{
                    res.status(404).send({
                        message:`Cannot update phone number with ID ${phoneId}. Phone number not found for contact with ID ${contactId}.`
                    });
                }
            })
            .catch(err=>{
                res.status(500).send({message: err.message});
            });
};

// Delete one phone by id
exports.delete = (req, res) => {
    const contactId=req.params.contactId;
    const phoneId=req.params.phoneId;
    
    Phones.destroy({where: { id: phoneId, contactId:contactId}})
        .then(num=>{
            if (num ==1) {
                res.send({});
            } else {
                res.status(404).send({
                    message:`Cannot delete phone number with ID ${phoneId}. Phone number not found for contact with ID ${contactId}.`
                });
            }
        })
        .catch(err=>{
            res.status(500).send({ message:err.message});
        });
    
};