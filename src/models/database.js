const pg = require('pg');

const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/lexmbudget';

const pool = new pg.Pool({
	host:'localhost',
	database:'lexmbudget',
	port: 5432
});

pool.query(
	`CREATE TABLE brands (
			id SERIAL PRIMARY KEY, 
			brandname VARCHAR(200) not null
	)`,
(err, res) => {
	if(err) {
		console.log(err.stack)
	} else {
		console.log(res.rows[0])
	}
});

pool.end();
