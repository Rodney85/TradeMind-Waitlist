# MongoDB Setup Instructions

## 1. Create MongoDB Atlas Account & Cluster
1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Create a new project called "TradeMind"
3. Create a new cluster:
   - Choose FREE tier
   - Select a cloud provider and region close to your Render deployment
   - Choose "M0 Sandbox" (Free tier)
   - Name your cluster "trademind-cluster"

## 2. Configure Database Access
1. In MongoDB Atlas, go to "Database Access"
2. Click "Add New Database User"
3. Create a user with the following settings:
   - Authentication Method: Password
   - Username: trademind_admin
   - Password: [Generate a secure password]
   - Built-in Role: "Atlas admin"
   - Click "Add User"

## 3. Configure Network Access
1. Go to "Network Access"
2. Click "Add IP Address"
3. For development: Add your current IP address
4. For Render deployment: Click "Allow Access from Anywhere" (Add: 0.0.0.0/0)
   - Note: You can later restrict this to specific Render IP addresses

## 4. Get Connection String
1. Go to your cluster and click "Connect"
2. Choose "Connect your application"
3. Copy the connection string
4. Replace <password> with your database user's password
5. Add this as MONGODB_URI in your environment variables:
   - Local: Add to .env.local file
   - Render: Add to environment variables in dashboard

## 5. Initialize Database
1. Connect to your cluster using MongoDB Compass or mongosh
2. Run the setup-db.js script to:
   - Create the database
   - Set up collections with validation
   - Create necessary indexes
   - Insert test data

## 6. Verify Setup
1. Check if the database "tm-landing-page" is created
2. Verify the "contacts" collection exists
3. Confirm the test document was inserted
4. Test indexes are created

## Environment Variables
Make sure these environment variables are set:
```
MONGODB_URI=mongodb+srv://trademind_admin:<password>@trademind-cluster.xxxxx.mongodb.net/tm-landing-page?retryWrites=true&w=majority
```

## Common Issues
1. Connection Timeout: Check network access settings
2. Authentication Failed: Verify username and password
3. SSL/TLS Issues: Ensure proper SSL configuration in connection string
