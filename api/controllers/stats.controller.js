const db = require("../models");
const Phones = db.phones;
const Contacts = db.contacts;
const Op = db.Sequelize.Op;

// Calculate stats
exports.calculate = async (req, res) => {
  try {
    //cal the number of contacts in the database
    const numContacts=await Contacts.count();
    //find the most recently created contact
    const mostRecentContact= await Contacts.findOne({
      order: [["createdAt","DESC"]],});

    //finnd the oldest contact creation time
    const oldestContact = await Contacts.findOne({
      order:[["createdAt","ASC"]],
    });

    //cal the number of phone numbers in the db
    const numPhoneNumbers =await Phones.count();

    

    // Prepare the json response
    const stats = {
      numContacts,
      mostRecentContact: mostRecentContact ? mostRecentContact.createdAt:null,
      oldestContact:oldestContact ? oldestContact.createdAt :null,
      numPhoneNumbers,};

    //send the JSON response
    res.json(stats);
  } catch (error) {
    console.error("Error calculating stats:",error);
    res.status(500).json({ message:"An error occurred while calculating stats." });
  }
};