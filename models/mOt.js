var conn = require('../config/db').conn;

module.exports = {
	getAll: getAll,
	insert: insert,
	getOtById: getOtById,
	update: update
}

function getAll(cb){
	conn("select ot.*, DATE_FORMAT(ot.fecha_emision, '%d/%m/%Y') as fechaemision, DATE_FORMAT(ot.fecha_cierre, '%d/%m/%Y') as fechacierre, emple.nombre as emple, maq.nombre as equipo from ot left join emple on emple.codigo = ot.id_emple_fk left join maq on maq.id = ot.id_emple_fk", cb);
}

function insert(fechaemision, empleid, equipoid, tarea, repuestos, prioridad, cb){
	conn("insert into ot(fecha_emision, id_emple_fk, id_equipo_fk, id_tarea_fk, repuestos, prioridad, estado) values('"+fechaemision+"', "+empleid+", "+equipoid+", '"+tarea+"', '"+repuestos+"', '"+prioridad+"', 1)", cb)
}

function getOtById(id, cb){
	conn("select ot.*, DATE_FORMAT(ot.fecha_emision, '%d/%m/%Y') as fechaemision, DATE_FORMAT(ot.fecha_cierre, '%d/%m/%Y') as fechacierre from ot where id="+id, cb);
}

function update(otid, empleid, fechaemision, equipoid, tarea, repuestos, prioridad, cb){
	conn("update ot set id_emple_fk="+empleid+", fecha_emision='"+fechaemision+"', id_equipo_fk="+equipoid+", id_tarea_fk='"+tarea+"', repuestos='"+repuestos+"', prioridad='"+prioridad+"' where id="+otid, cb);
}