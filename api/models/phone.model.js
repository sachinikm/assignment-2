module.exports = (sequelize, Sequelize) => {
    const Phone = sequelize.define("phone", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        // DEFINE YOUR MODEL HERE
        name: {
            type: Sequelize.STRING,
            allowNull: false, //nulls are not allowed
        },
        number: {
            type: Sequelize.STRING,
            allowNull: false, //ensure number required
        },
        contactId: {//camel-case naming convention
            type: Sequelize.INTEGER, //define contactIdas foreign key
            allowNull: false, //nulls not allowed
            references:{
                model: 'contacts', //ref the Contacts table
                key: 'id', // Using id field of Contacts table as refer
                // Define onDelete as CASCADE
                onDelete: 'CASCADE',
            },
        },
    });
  
    return Phone;
};