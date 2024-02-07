import express from 'express';
import redis from 'redis';
import { promisify } from 'util';

/********************************Data**********************************************/
const listProducts = [
	{itemId: 1, itemName: 'Suitcase 250', price: 50, initialAvailableQuantity: 4},
	{itemId: 2, itemName: 'Suitcase 450', price: 100, initialAvailableQuantity: 10},
	{itemId: 3, itemName: 'Suitcase 650', price: 350, initialAvailableQuantity: 2},
	{itemId: 4, itemName: 'Suitcase 1050', price: 550, initialAvailableQuantity: 5}
];


/********************************Data Access**********************************************/
function getItemById(id) {
	return listProducts.find((item) => {
		return item.Id === id
	});
};

/*************************http server setup for product Api***********************/
const app = express();
app.listen(1245, () => console.log('Server successfully setup, now listening on port 1245 '));

// All Product detail
app.get('/list_products', (req, res) => {
	res.json(listProducts);
});

// A single Product detail
app.get('/list_products/:itemId',  (req, res) => {
	const itemId = Number(req.params.itemId);
	const item = getItemById(itemId);
	if (item === null) {
		res.json({"status":"Product not found"});
		return;
	}
	//item.currentQuantity = await getCurrentReservedStockById(itemId);
	res.json(item);
});

// Reserve a product
app.get('/reserve_product/:itemId', async (req, res) => {
	const itemId = parseInt(req.params.itemId);
	const item = getItemById(itemId);
	if (item === null) {
		res.json({"status":"Product not found"});
		return;
	}
	let inStock = await getCurrentReservedStockById(itemId);
	if (inStock === null) {
		inStock = item.initialAvailableQuantity;
		return;
	}
	inStock = parseInt(inStock);
	if (inStock < 1){
		res.json({"status":"Not enough stock available","itemId": itemId});
		return;
	} 
	reserveStockById(itemId, inStock - 1);
	res.json({"status":"Reservation confirmed","itemId": itemId});
});

/************************************inStock in Redis**************************************/

const redis_client = redis.createClient();
redis_client.on('error', err => console.log(`Establishing connection to redis server failed: ${err}`))
	    .on('connect', () => console.log('successfully connected to to redis server'));

//promisify get method of string data type in redis to allow async
const redis_str_get = promisify(redis_client.get).bind(redis_client);

function reserveStockById(itemId, stock) {
	redis_client.set(`item.${itemId}`, stock);
};

async function getCurrentReservedStockById(itemId){
	const item = await redis_str_get(`item.${itemId}`);
	return item;
}

