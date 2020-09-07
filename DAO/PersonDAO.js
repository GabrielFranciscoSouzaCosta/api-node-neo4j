const database = require('../database/database');
module.exports = {
	insert: async (personName) => {
		try {
			session = database.driver.session();
			const result = await session.run('CREATE (a:Person {name: $name}) RETURN a', { name: personName })	
			const singleRecord = result.records[0];
			const node = singleRecord.get(0);
			return node.properties.name ? true : false;
		}
		finally
		{
			await session.close()
		}
	},
	update: async (id, name) => {
		try {
			session = database.driver.session();
			const result = await session.run('MATCH (e:Person) WHERE ID(e) = ' + id + ' set e.name = "' + name + '" return e');

			const singleRecord = result.records[0];
			const node = singleRecord.get(0);
			return node.properties.name ? node.properties : false;
		}
		finally
		{
			await session.close();
		}
	},
	delete: async (id) => {
		try {
			session = database.driver.session();
			const result = await session.run('MATCH (e:Person) where ID(e) = ' + id + ' detach delete e');
			return result ? true : false;
		}
		finally
		{
			await session.close()
		}
	},
	find: async (id) => {
		try {
			var person = '';
			session = database.driver.session();
			const result = await session.run('match (n:Person) WHERE ID(n) = ' + id + ' return n');
			result.records.forEach( (element) => {
				person = {name:element.get(0).properties.name};
			});
			return person;
		}
		finally
		{
			await session.close()
		}
	},
	listAll: async () => {
		try {
			const persons = [];
			session = database.driver.session();
			const result = await session.run('match (n:Person) return n');
			result.records.forEach( (element) => {
				let person = {
					id: element.get(0).identity.low,
					name: element.get(0).properties.name
				};
				persons.push(person);
			});
			return persons;
		}
		finally
		{
			await session.close()
		}
	}
}