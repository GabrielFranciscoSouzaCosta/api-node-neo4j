const PersonDAO = require('../DAO/PersonDAO');
module.exports = {
	list: (request, response) => {
		PersonDAO.listAll().then( (data) =>{
			response.json( data );
		});
	},
	insert : (request, response) => {
		const {name} = request.body;
		PersonDAO.insert(name).then( (result) => {
			response.json({msg:'Person Created Sucessfully!', status:result})
		});
	},
	find : (request, response) => {
		const {id} = request.params;
		PersonDAO.find(id).then( (data) => {
			response.json(data);
		});
	},
	delete : (request, response) => {
		const {id} = request.params;
		PersonDAO.delete(id).then( (data) => {
			if(!data)
			{
				response.status(400);
				return response.json({msg: "there is something wrong!"});
			}
			response.json({msg:"Person Deleted Sucessfully!"});
		});
	},
	update : (request, response) => {
		const {id} = request.params;
		const {name} = request.body;

		PersonDAO.update(id, name).then( (data) => {
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
	}
}