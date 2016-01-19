var conn = require('../config/db').conn;

module.exports = {
	getAll: getAll,
	insert: insert,
	verificarNumero: verificarNumero,
	getbyId: getbyId,
	update: update,
	getByNumero: getByNumero,
	del: del
}

function getAll(cb){
	conn("select *, DATE_FORMAT(vehiculos.fecha_alta, '%d/%m/%Y') as fecha_alta_f, DATE_FORMAT(vehiculos.chasis_fecha, '%d/%m/%Y') as chasis_fecha_f, "+
		"DATE_FORMAT(vehiculos.carro_fecha, '%d/%m/%Y') as carro_fecha_f from vehiculos", cb);
}

function insert(numero, marca, modelo, dominio, tipo, fecha_alta, chasis, chasis_fecha, chasis_dlls, chasis_pesos, carro, carro_fecha, carro_dlls, carro_pesos, ano, cb){
	conn("insert into vehiculos(numero, marca, modelo, dominio, tipo, fecha_alta, chasis, chasis_fecha, chasis_dlls, "+
		"chasis_pesos, carro, carro_fecha, carro_dlls, carro_pesos, ano) "+
		"values("+numero+", '"+marca+"', "+modelo+", '"+dominio+"', '"+tipo+"', '"+fecha_alta+"', '"+chasis+"', '"+chasis_fecha+"', "+
			chasis_dlls+", "+chasis_pesos+", '"+carro+"', '"+carro_fecha+"', "+carro_dlls+", "+carro_pesos+", '"+ano+"')", cb);
}

function verificarNumero(numero, cb){
	conn("select * from vehiculos where numero = "+numero, cb);
}

function getbyId(id, cb){
	conn("select *, DATE_FORMAT(vehiculos.fecha_alta, '%d/%m/%Y') as fecha_alta_f, DATE_FORMAT(vehiculos.chasis_fecha, '%d/%m/%Y') as chasis_fecha_f, "+
		"DATE_FORMAT(vehiculos.carro_fecha, '%d/%m/%Y') as carro_fecha_f from vehiculos where id = "+id, cb);
}

function update(id, numero, marca, modelo, dominio, tipo, fecha_alta, chasis, chasis_fecha, chasis_dlls, chasis_pesos, carro, carro_fecha, carro_dlls, carro_pesos, ano, cb){
	conn("UPDATE vehiculos SET numero = "+numero+", marca = '"+marca+"', modelo = "+modelo+", dominio = '"+dominio+"', tipo = '"+tipo+"', "+
		"fecha_alta = '"+fecha_alta+"', chasis = '"+chasis+"', chasis_fecha = '"+chasis_fecha+"', chasis_dlls = "+chasis_dlls+", "+
		"chasis_pesos = "+chasis_pesos+", carro = '"+carro+"', carro_fecha = '"+carro_fecha+"', carro_dlls = "+carro_dlls+", "+
		"carro_pesos = "+carro_pesos+", ano = "+ano+" WHERE id = "+id, cb);
}

function getByNumero(numero, cb){
	conn("select * from vehiculos where numero = "+numero, cb);
}

function del(id, cb){
	conn("delete from vehiculos where id = "+id, cb);
}