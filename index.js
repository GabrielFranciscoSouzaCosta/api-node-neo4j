//database stuffs
const neo4j = require('neo4j-driver')
const uri = 'neo4j://localhost:7687';
const driver = neo4j.driver(uri, neo4j.auth.basic('neo4j', '81836033'))
var session = driver.session();

const express = require('express')
const app = express();
const bodyParser = require('body-parser')
app.use(bodyParser.json())

async function getPerson()
{
	try {
		const persons = [];
		session = driver.session();

		const result = await session.run('match (n:Person) return n');
		result.records.forEach((element)=>{
			persons.push({name:element.get(0).properties.name});
		});

		return persons;
	} finally {
		await session.close()
	}
}

async function insertPerson(personName)
{
	try {
		session = driver.session();

		const result = await session.run('CREATE (a:Person {name: $name}) RETURN a', { name: personName })	
		const singleRecord = result.records[0]
		const node = singleRecord.get(0)

		return node.properties.name ? true : false;
	}
	finally
	{
		await session.close()
	}
}

app.get('/list', (request, response) => {
	getPerson().then( (data) =>{
		response.json( data );
	});
});

app.post('/create', (request, response) => {
	const {name} = request.body;

	insertPerson(name).then( (result) => {
		response.json({msg:'Pessoa Criada com Sucesso!', status:result})
	});
});

app.listen(3333);