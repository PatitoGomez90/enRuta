var conn = require('../config/db').conn;

module.exports = {
	getAll: getAll,
	insert: insert,
	getValesEntreFechas: getValesEntreFechas,
	getValesEntreFechasYSector: getValesEntreFechasYSector,
	getVale: getVale,
	del: del
	}

function getAll(cb){
	conn('select * from vales', cb);
}

function insert(idtipovale, fecha, nmovi, articulo, cantidad, depor, depdes, secor, secdes, costou, costot, cb){
	conn("insert into vales( Tipoid, fecha, idmovi, idarticulo, cantidad, dorigen, ddestino, IdsectorOr, IdsectorDe, costou, costot) values('"+idtipovale+"','"+fecha+"', "+nmovi+", "+articulo+", "+cantidad+", "+depor+", "+depdes+", "+secor+", "+secdes+", "+costou+", "+costot+")", cb);
}

function getValesEntreFechas(finicio, ffin, cb){
	conn("SELECT vales.*, DATE_FORMAT(vales.fecha, '%d/%m/%Y') as fechaf, articu.nombre as nombrearticulo, (select sectores.nombre from sectores where sectores.id = vales.IdsectorDe) as sectorDe, (select sectores.nombre from sectores where sectores.id = vales.IdsectorOr) as sectorOr, tipvales.nombre as tipovale FROM vales LEFT JOIN tipvales ON vales.Tipoid = tipvales.id LEFT JOIN articu ON vales.Idarticulo = articu.id WHERE fecha >= '"+finicio+"' AND fecha <= '"+ffin+"'", cb);
}

function getValesEntreFechasYSector(finicio, ffin, sector, cb){
	conn("SELECT vales.*, DATE_FORMAT(vales.fecha, '%d/%m/%Y') as fechaf, articu.nombre as nombrearticulo, (select sectores.nombre from sectores where sectores.id = vales.IdsectorDe) as sectorDe, (select sectores.nombre from sectores where sectores.id = vales.IdsectorOr) as sectorOr, tipvales.nombre as tipovale FROM vales LEFT JOIN tipvales ON vales.Tipoid = tipvales.id LEFT JOIN articu ON vales.Idarticulo = articu.id WHERE fecha >= '"+finicio+"' AND fecha <= '"+ffin+"' AND (IdsectorOr ="+sector+" OR IdsectorDe ="+sector+")", cb);
}

function getVale(id, cb){
	conn("SELECT vales.*, DATE_FORMAT(vales.fecha, '%d/%m/%Y') as fechaf, articu.nombre as nombrearticulo, (select sectores.nombre from sectores where sectores.id = vales.IdsectorDe) as sectorDe, (select sectores.nombre from sectores where sectores.id = vales.IdsectorOr) as sectorOr, tipvales.nombre as tipovale FROM vales LEFT JOIN tipvales ON vales.Tipoid = tipvales.id LEFT JOIN articu ON vales.Idarticulo = articu.id WHERE Nroid ="+id, cb);	
}

function del(id, cb){
	conn("DELETE FROM vales where Nroid="+id, cb);
}