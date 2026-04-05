const mongoose = require('mongoose');

async function test() {
    try {
        console.log('Connecting to mongoose...');
        await mongoose.connect('mongodb+srv://bilal8767_db_user:bilal12345@cluster0.vvlpypi.mongodb.net/appdb?retryWrites=true&w=majority&appName=Cluster0', {
            serverSelectionTimeoutMS: 5000
        });
        console.log('Connected! Fetching collections...');
        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log('Collections:', collections.map(c => c.name));
        process.exit(0);
    } catch (e) {
        console.error('ERROR CONNECTING:', e.message);
        process.exit(1);
    }
}
test();
