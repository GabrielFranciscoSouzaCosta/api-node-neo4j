const neo4j		= require('neo4j-driver');
const uri		= 'neo4j://localhost:7687';
const driver	= neo4j.driver(uri, neo4j.auth.basic('neo4j', '81836033'));
const session	= driver.session();

module.exports = {
	neo4j: neo4j,
	uri:uri,
	driver:driver,
	session:session
}