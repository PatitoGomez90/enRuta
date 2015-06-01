var conn = require('../config/db').conn;

module.exports = {
	getAll: getAll,
	insert: insert,
	getChk2ById: getChk2ById,
	update: update
	}

function getAll(cb){
	conn('select chk2.*, chk1.nombre as chk1 from chk2 left join chk1 on chk1.id = chk2.id_chk1_fk', cb);
}

function insert(idchk1, detalle, orden, titulo, cb){
	conn("insert into chk2 (id_chk1_fk, detalle, orden, titulo) values("+idchk1+", '"+detalle+"', "+orden+", "+titulo+")", cb);
}

function getChk2ById(chk2id, cb){
	conn("select * from chk2 where id ="+chk2id, cb);
}

function update(chk2id, chk1id, detalle, orden, titulo , cb){
	conn("update chk2 set id_chk1_fk="+chk1id+", orden='"+orden+"', detalle='"+detalle+"', titulo="+titulo+" where id="+chk2id, cb)
}