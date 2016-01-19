var conn = require('../config/db').conn;

module.exports = {
	getAllRepuestos: getAllRepuestos,
	getAllRubros: getAllRubros,
	getVehiculos: getVehiculos,
	getFive: getFive
}	

function getAllRepuestos(cb){
	conn("select * from repuestos", cb);
}


function getAllRubros(cb){
	conn("select * from rubros", cb);
}

function getVehiculos(cb){
	conn("select * from vehiculos", cb);
}

function getFive(cb){
	conn("select * from five_temp", cb);
}