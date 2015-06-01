var conn = require('../config/db').conn;

module.exports = {
	getAll: getAll,
	insert: insert
	}

function getAll(cb){
	conn('select * from maq where tipo = 2 or tipo = 3', cb);
}

function insert(codigo, dominio, nombre, marca, modelo, serie, nmotor, tipomaq, tipoequipo, anio, fcompra, tipocontrol, tipocomb, base, titular, datos, linkfab, activa, cb){
	conn("INSERT INTO maq(`codigo`, `dominio`, `nombre`, `marca`, `tipo`, `modelo`, `anio`, `serie`, `motor`, `fcompra`, `control`, `combus`, `titular`, `datos`, `linkfab`, `activa`, `base`, tipoequipo) VALUES ("+codigo+", '"+dominio+"', '"+nombre+"', '"+marca+"', "+tipomaq+", '"+modelo+"', "+anio+", '"+serie+"', '"+nmotor+"', '"+fcompra+"', "+tipocontrol+", "+tipocomb+", '"+titular+"', '"+datos+"', '"+linkfab+"', 1, "+base+", "+tipoequipo+")", cb);
}