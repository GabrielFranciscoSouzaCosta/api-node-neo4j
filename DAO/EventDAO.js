const database = require('../database/database');

module.exports = {
	insert: async (EventTitle, EventDate) => {
		try {
			session = database.driver.session();
			const result = await session.run('CREATE (a:Evento {titulo: $titulo, data: $data}) RETURN a', { titulo: EventTitle, data: EventDate });
			const singleRecord = result.records[0];
			const node = singleRecord.get(0);

			return node.properties.name ? true : false;
		}
		finally
		{
			await session.close();
		}
	},
	listAll: async () => {
		try {
			const events = [];
			session = database.driver.session();
			const result = await session.run('match (e:Evento) return e');
			result.records.forEach( (element) => {
				let event = {
					id: element.get(0).identity.low,
					titulo: element.get(0).properties.titulo
				};

				events.push(event);
			});

			return events;
		}
		finally
		{
			await session.close();
		}
	},
	update: async (id, EventTitle, EventData) => {
		try {
			session = database.driver.session();
			const result = await session.run('MATCH (e:Evento) WHERE ID(e) = ' + id + ' set e.titulo = "' + EventTitle + '", e.data = "' + EventData + '" return e');

			const singleRecord = result.records[0];
			const node = singleRecord.get(0);
			return node.properties.titulo ? node.properties : false;
		}
		finally
		{
			await session.close();
		}
	},
	delete: async (id) => {
		try {
			session = database.driver.session();
			const result = await session.run('MATCH (e:Evento) where ID(e) = ' + id + ' detach delete e');

			return result ? true : false;
		}
		finally
		{
			await session.close();
		}
	},
	find: async (id) => {
		try {
			var event = '';
			session = database.driver.session();
			const result = await session.run('match (n:Evento) WHERE ID(n) = ' + id + ' return n');
			result.records.forEach( (element) => {
				event = {
					titulo: element.get(0).properties.titulo,
					data: element.get(0).properties.data
				};
			});

			return event;
		}
		finally
		{
			await session.close()
		}
	},
}