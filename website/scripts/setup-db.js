// MongoDB setup script
db = db.getSiblingDB('tm-landing-page');

// Create contacts collection with schema validation
db.createCollection('contacts', {
   validator: {
      $jsonSchema: {
         bsonType: 'object',
         required: ['name', 'email', 'message', 'createdAt'],
         properties: {
            name: {
               bsonType: 'string',
               description: 'Name must be a string and is required'
            },
            email: {
               bsonType: 'string',
               description: 'Email must be a string and is required'
            },
            message: {
               bsonType: 'string',
               description: 'Message must be a string and is required'
            },
            createdAt: {
               bsonType: 'date',
               description: 'Creation timestamp must be a date and is required'
            },
            metadata: {
               bsonType: 'object',
               required: ['timestamp'],
               properties: {
                  userAgent: {
                     bsonType: 'string',
                     description: 'User agent string'
                  },
                  timestamp: {
                     bsonType: 'string',
                     description: 'ISO timestamp string'
                  }
               }
            }
         }
      }
   }
});

// Create indexes
db.contacts.createIndex({ "email": 1 });
db.contacts.createIndex({ "createdAt": -1 });

// Create a test document
db.contacts.insertOne({
   name: "Test User",
   email: "test@example.com",
   message: "This is a test message",
   createdAt: new Date(),
   metadata: {
      userAgent: "Test Script",
      timestamp: new Date().toISOString()
   }
});
