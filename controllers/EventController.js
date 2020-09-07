const EventDAO = require('../DAO/EventDAO');
module.exports = {
	list: (request, response) => {
		EventDAO.listAll().then( (data) =>{
			response.json( data );
		});
	},
	insert : (request, response) => {
		const {titulo} = request.body;
		const {data} = request.body;

		EventDAO.insert(titulo, data).then( (result) => {
			response.json({msg:'Event Created Sucessfully!', status:result})
		});
	},
	update : (request, response) => {
		const {id} = request.params;
		const {titulo} = request.body;
		const {data} = request.body;

		EventDAO.update(id, titulo, data).then( (data) => {
			if(!data)
			{
				response.status(400);
				return response.json({msg: "there is something wrong!"});
			}
			response.json({
				msg:"Person Updated Sucessfully!",
				data:data
			});
		});
	},
	delete : (request, response) => {
		const {id} = request.params;
		EventDAO.delete(id).then( (data) => {
			if(!data)
			{
				response.status(400);
				return response.json({msg: "there is something wrong!"});
			}

			response.json({msg:"Event Deleted Sucessfully!"});
		});
	},
	find : (request, response) => {
		const {id} = request.params;
		EventDAO.find(id).then( (data) => {
			if(!data)
			{
				response.json({msg:"Sorry, There is no Event with this id in the database!"});
			}
			else
			{
				response.json(data);
			}
		});
	}
}