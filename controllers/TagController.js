const TagDAO = require('../DAO/TagDAO');
module.exports = {
	list: (request, response) => {
		TagDAO.listAll().then( (data) =>{
			response.json( data );
		});
	},
	insert : (request, response) => {
		const {nome} = request.body;

		TagDAO.insert(nome).then( (result) => {
			response.json({msg:'Tag Created Sucessfully!', data: result});
		});
	},
	update : (request, response) => {
		const {id} = request.params;
		const {nome} = request.body;

		TagDAO.update(id, nome).then( (data) => {
			if(!data)
			{
				response.status(400);
				return response.json({msg: "there is something wrong!"});
			}
			response.json({
				msg:"Tag Updated Sucessfully!",
				data:data
			});
		});
	},
	delete : (request, response) => {
		const {id} = request.params;

		TagDAO.delete(id).then( (data) => {
			if(!data)
			{
				response.status(400);
				return response.json({msg: "there is something wrong!"});
			}

			response.json({msg:"Tag Deleted Sucessfully!"});
		});
	},
	find : (request, response) => {
		const {id} = request.params;
		TagDAO.find(id).then( (data) => {
			if(!data)
			{
				response.json({msg:"Sorry, There is no Tag with this id in the database!"});
			}
			else
			{
				response.json(data);
			}
		});
	}
}