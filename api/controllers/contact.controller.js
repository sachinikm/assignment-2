const db = require("../models");
const Contacts = db.contacts;
const Phones = db.phones;
const Op = db.Sequelize.Op;

//create contact
exports.create = (req, res) => {
    const { name} =req.body;
    const contact={
    name: name};
  Contacts.create(contact)
    .then(newContact=>{
      res.send(newContact);})
    .catch(err => {
      res.status(500).send({
        message:err.message ||"error occurred while creating a contact."
    });
    });};

// Get all contacts
exports.findAll = (req, res) => {
    Contacts.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred"
            });
        });
};

// Get one contact by id
exports.findOne= (req, res)=> {
    const id=req.params.contactId;

    Contacts.findByPk(id)
        .then(data=>{
            if(data){
                res.send(data);
            }else{
                res.status(404).send({
                    message:`Contact with id ${id} not found.`
                });}
        })
        .catch(err => {
            res.status(500).send({
                message: `Error retrieving contact with id ${id}.`
        });
        });};

// Update one contact by id
exports.update=(req, res)=>{
    const id = req.params.contactId;
    Contacts.update(req.body, {
        where:{ id:id}
    })
        .then(num=>{
            if (num==1) {
                res.send({
                    message:"Contact was updated successfully."
                });
            } else{
                res.status(404).send({
                    message:`Cannot update contact with id ${id}`
                });
            }
        })
        .catch(err=>{
            res.status(500).send({
                message:`Error updating contact with id ${id}.`
            });
        });
};

// Delete one contact by id
exports.delete = (req, res) => {
    const id=req.params.contactId;

    Contacts.destroy({
        where:{id:id}
    })
        .then(num=>{
            if (num==1){
                // If the contact was deleted, delete associated phone numbers
                Phones.destroy({
                    where: {contactId:id}
                });

                res.send({});
            } else {
                res.status(404).send({
                    message:`Cannot delete contact with id ${id} : ${err.message}.`
                });
            }
        })
        .catch(err=>{
            res.status(500).send({
                message:`Error deleting contact with id ${id}.: ${err.message}.`
            });
        });
};
