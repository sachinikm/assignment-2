- A simple web applicaton that consists of frontend and backend (REST API and DB) to keep and maintain all the contacts
- The backend contains the API and Sequelize scripts to handle the request.
- The applicaton is created in a docker container with microservices configuraTon.
- The applicaton has the following functonalites:
• Add new a contact name
• Add new phone numbers
• List all contact names and phone numbers
• Remove a phone number from a contact
• Remove a contact name and all of the phone numbers
• Display the statstcs of the data


- The project has several microservices that are connected to each other. These microservices are NGINX, Frontend, Backend and Database
- The database shall have two tables, one for contacts called Contacts and one for phone numbers called Phones.
  • Records from the Contactor table shall contain the fields id (number, Primary Key), name (string)
  • Records from the Phones table shall contain the fields id (number, Primary Key), name (string), number (string), and contactId (number, Foreign Key)
  • Foreign keys shall follow the camel-case naming conven􀆟on (eg a foreign key to the Contacts table would be called contactId). Specify the foreign key name explicitly in associa􀆟ons, as in Lab 07 (there we did foreignKey: 'postId').
  • Each phone number shall belong to one contact, but a single contact can have many phone numbers.
  • Two Sequelize models shall be defined – Contact and Phone. These models shall have the correct associa􀆟ons.

- The backend exposes the following REST API
  • GET /contacts
  Returns a list of all contacts (does not include phone numbers).
• GET /contacts/:contactId/phones
Returns a list of all phone numbers for a par􀆟cular contact.
• POST /contacts
Creates a new contact using the posted data. Returns the new contact.
• GET /contacts/:contactId
Returns a single contact by ID.
• DELETE /contacts/:contactId
Deletes a single contact by ID. All of the contact’s phone numbers shall be deleted also. Returns an empty object, {}.
• PUT /contacts/:contactId
Updates the atributes of a par􀆟cular contact. Returns the updated contact. This needs to work even though it will not be used by the frontend.
• POST /contacts/:contactId/phones
Creates a new phone number using the posted data. Returns the new note.
• GET /contact/:contactId/phones/:phoneId
Returns a single phone number by ID.
• DELETE /contact/:contactId/phones/:phoneId
Deletes a single phone number by ID. Returns an empty object, {}.
• PUT /contact/:contactId/phones/:phoneId
Updates the atributes of a par􀆟cular phone number. Returns the updated phone number. This needs to work even though it will not be used by the frontend.

- A read-only web interface for the Contactor applicaton which displays contacts and phone numbers
- A new REST API endpoint at GET /stats. This endpoint will serve to show statstcs about the applicaton.
- The frontend to display summary statstcs on the Contactor home page. The statstcs themselves shall be retrieved using the /stats API endpoint implemented above point
- A refresh buton which updates the displayed sta􀆟s􀆟cs when clicked
