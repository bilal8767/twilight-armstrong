const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READONLY, (err) => {
    if (err) {
        console.error('Error opening database for reading', err.message);
        return;
    }
    
    db.all("SELECT * FROM submissions", [], (err, rows) => {
        if (err) {
            console.error(err.message);
        } else {
            console.log("\n--- DATABASE RECORDS ---");
            if (rows.length === 0) {
                console.log("Database is empty. No forms have been submitted yet.");
            } else {
                console.log(JSON.stringify(rows, null, 2));
            }
            console.log("------------------------\n");
        }
        db.close();
    });
});
