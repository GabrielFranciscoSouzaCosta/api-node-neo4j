const database = require('../database/database');

module.exports = {
	insert: async (TagName) => {
		try {
			session = database.driver.session();
			const result = await session.run('CREATE (a:Tag {nome: $nome}) RETURN a', { nome: TagName });
			const singleRecord = result.records[0];
			const node = singleRecord.get(0);

			return node.properties ? {nome: node.properties.nome, id: node.identity.low} : false;
		}
		finally
		{
			await session.close();
		}
	},
	listAll: async () => {
		try {
			const tags = [];
			session = database.driver.session();
			const result = await session.run('match (e:Tag) return e');
			result.records.forEach( (element) => {
				let tag = {
					id: element.get(0).identity.low,
					nome: element.get(0).properties.nome
				};

				tags.push(tag);
			});

			return tags;
		}
		finally
		{
			await session.close();
		}
	},
	update: async (id, TagName) => {
		try {
			session = database.driver.session();
			const result = await session.run('MATCH (e:Tag) WHERE ID(e) = ' + id + ' set e.nome = "' + TagName + '" return e');

			const singleRecord = result.records[0];
			const node = singleRecord.get(0);
			return node.properties.nome ? node.properties : false;
		}
		finally
		{
			await session.close();
		}
	},
	delete: async (id) => {
		try {
			session = database.driver.session();
			const result = await session.run('MATCH (e:Tag) where ID(e) = ' + id + ' detach delete e');

			return result ? true : false;
		}
		finally
		{
			await session.close();
		}
	},
	find: async (id) => {
		try {
			var tag = '';
			session = database.driver.session();
			const result = await session.run('match (n:Tag) WHERE ID(n) = ' + id + ' return n');
			result.records.forEach( (element) => {
				tag = {
					nome: element.get(0).properties.nome
				};
			});

			return tag;
		}
		finally
		{
			await session.close()
		}
	},
}