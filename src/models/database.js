const pg = require('pg');

const pool = new pg.Pool({
	host:'localhost',
	database:'lexmbudget',
	port: 5432
});



async function build_table(name, query) {
	const res = await  pool.query(query);
};

var tables = [
	{
		name: 'brands',
		query:
			`CREATE TABLE IF NOT EXISTS brands (
					id SERIAL PRIMARY KEY,
					brandname VARCHAR(200) not null
			)`
	},
	{
		name: 'products',
		query:
			`CREATE TABLE IF NOT EXISTS products (
					id SERIAL PRIMARY KEY,
					brand_id INTEGER REFERENCES brands (id),
					productname VARCHAR(200) not null
			)`
	},
	{
		name: 'stores',
		query:
			`CREATE TABLE IF NOT EXISTS stores (
				id SERIAL PRIMARY KEY,
				storename VARCHAR(200) not null
			)`
	},
	{
		name: 'prices',
		query:
			`CREATE TABLE IF NOT EXISTS prices (
				id SERIAL PRIMARY KEY,
				store_id INTEGER REFERENCES stores (id),
				product_id INTEGER REFERENCES products (id),
				cost MONEY
			)`
	}
];

async function build_all() {
	for(var i = 0; i < tables.length; i++) {
		e = tables[i];
		console.log(`Building ${e.name}`);
		await build_table(e.name, e.query);
		console.log('After build');
	};
	await pool.end();
};

build_all();
