var conn = require('../config/db').conn;

module.exports = {
	getAll: getAll,
	insert: insert,
	getEquipoById: getEquipoById,
	update: update,
	del: del
}

function getAll(cb){
	conn('select * from maq where tipo = 1 or tipo = 3', cb);
}

function insert(codigo, dominio, nombre, marca, modelo, serie, nmotor, tipomaq, tipoequipo, anio, fcompra, tipocontrol, tipocomb, base, titular, datos, linkfab, activa, cb){
	conn("INSERT INTO maq(`codigo`, `dominio`, `nombre`, `marca`, `tipo`, `modelo`, `anio`, `serie`, `motor`, `fcompra`, `control`, `combus`, `titular`, `datos`, `linkfab`, `activa`, `base`, tipoequipo) VALUES ("+codigo+", '"+dominio+"', '"+nombre+"', '"+marca+"', "+tipomaq+", '"+modelo+"', "+anio+", '"+serie+"', '"+nmotor+"', '"+fcompra+"', "+tipocontrol+", "+tipocomb+", '"+titular+"', '"+datos+"', '"+linkfab+"', 1, "+base+", "+tipoequipo+")", cb);
}

function getEquipoById(id, cb){
	conn("select maq.*, DATE_FORMAT(maq.fcompra, '%d/%m/%Y') as fcompraf, DATE_FORMAT(maq.fbaja, '%d/%m/%Y') as fbajaf from maq where id="+id, cb);
}

function update(id,	codigo,	dominio, nombre, marca,	modelo, serie, nmotor, tipomaq, tipoequipo, anio, fcompra, fbaja, mbaja, tipocontrol, tipocomb, base, titular, datos, linkfab, activa, cb){
	if (fbaja==null || fbaja=="")
		conn("UPDATE `maq` SET `codigo`="+codigo+", `dominio`='"+dominio+"', `nombre`='"+nombre+"', `marca`='"+marca+"', `tipo`="+tipomaq+", `modelo`='"+modelo+"', `anio`="+anio+", `serie`='"+serie+"', `motor`='"+nmotor+"', `fcompra`='"+fcompra+"', `control`="+tipocontrol+", `combus`="+tipocomb+", `titular`='"+titular+"', `mbaja`='"+mbaja+"', `datos`='"+datos+"', `linkfab`='"+linkfab+"', `activa`="+activa+", `base`="+base+", `tipoequipo`="+tipoequipo+" WHERE id="+id, cb);
	else
		conn("UPDATE `maq` SET `codigo`="+codigo+", `dominio`='"+dominio+"', `nombre`='"+nombre+"', `marca`='"+marca+"', `tipo`="+tipomaq+", `modelo`='"+modelo+"', `anio`="+anio+", `serie`='"+serie+"', `motor`='"+nmotor+"', `fcompra`='"+fcompra+"', `control`="+tipocontrol+", `combus`="+tipocomb+", `titular`='"+titular+"', `fbaja`='"+fbaja+"', `mbaja`='"+mbaja+"', `datos`='"+datos+"', `linkfab`='"+linkfab+"', `activa`="+activa+", `base`="+base+", `tipoequipo`="+tipoequipo+" WHERE id="+id, cb);
}

function del(id, cb){
	conn("delete from maq where maq.id ="+id, cb);
}