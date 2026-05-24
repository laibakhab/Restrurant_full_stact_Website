const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

async function main() {
  try {
    console.log('Connecting to MongoDB...');
    await client.connect();
    console.log('✅ Success! Connected to MongoDB server');
    
    const db = client.db('restaurant');
    console.log('✅ Switched to database: restaurant');
    
    // Check if any collections exist
    const collections = await db.listCollections().toArray();
    console.log('Collections in database:', collections.map(c => c.name));
    
    process.exit(0);
  } catch (err) {
    console.error('❌ Failed to connect to MongoDB:', err.message);
    process.exit(1);
  } finally {
    await client.close();
  }
}

main();
