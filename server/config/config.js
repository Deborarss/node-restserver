// PORT
process.env.PORT = process.env.PORT || 3001;

// Environment
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// Database
let urlDB;

if(process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = 'mongodb+srv://debora:41BdvhJzxmn2a7GT@cluster0-b567m.mongodb.net/cafe';
}

process.env.URLDB = urlDB;