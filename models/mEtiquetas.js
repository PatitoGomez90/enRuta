var conn = require('../config/db').conn;

module.exports = {
	getAll: getAll,
	getLast: getLast,
	insertArt1: insertArt1,
	insertArt2: insertArt2,
	deleteFila: deleteFila,
	deleteTodo: deleteTodo
}

function getAll(cb){
	conn("select * from etiquetas", cb);
}

function getLast(cb){
	conn("select * from etiquetas where id2=0 limit 1", cb);
}

function insertArt1(art1id, art1cdinterno, art1nombre, cb){
	conn("insert into etiquetas (id1, codigo1, nombre1, id2) VALUES ("+art1id+", "+art1cdinterno+", '"+art1nombre+"', 0)", cb);
}

function insertArt2(id, id_2, art2id, art2cdinterno, art2nombre, cb){
	conn("update etiquetas set id2="+art2id+", id_2="+id_2+", codigo2="+art2cdinterno+", nombre2='"+art2nombre+"' where id="+id, cb);
}

function deleteFila(id, cb){
	conn("DELETE FROM etiquetas where id="+id, cb);
}

function deleteTodo(cb){
	conn("DELETE FROM etiquetas", cb);
}