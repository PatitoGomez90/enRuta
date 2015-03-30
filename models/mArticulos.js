var conn = require('../config/db').conn;

module.exports = {
	getAll: getAll,
	getAllActivos: getAllActivos,
	insert: insert,
	getArticuloPorId: getArticuloPorId,
	update: update,
	del: del,
	getCostouporIDart: getCostouporIDart,
	updateStockResta: updateStockResta,
	updateStockSuma: updateStockSuma,
	getConsulta: getConsulta,
	getArtporCdFabrica: getArtporCdFabrica,
	getArtporCdInterno: getArtporCdInterno,
	getConsultaPorNombre: getConsultaPorNombre,
	getArticuloPorIdconJoin: getArticuloPorIdconJoin
	}

function getAll(cb){
	conn('select * from articu', cb);
}

function getAllActivos(cb){
	conn("SELECT * from articu where activa = 1 order by Nombre", cb);
}

function insert(cdfabrica, cdinterno, nombre, descripcion, familia, tipo, umed, costo, iva, muevest, stock1, stock2, stock3, stock4, minimo, maximo, cb){
	conn("insert into articu(cdfabrica, cdinterno, nombre, descrip, idfamilia, idtipo, idumed, costo, iva, muevest, stock1, stock2, stock3, stock4, minimo, maximo, activa) values('"+cdfabrica+"', "+cdinterno+", '"+nombre+"', '"+descripcion+"', "+familia+", "+tipo+", "+umed+", "+costo+", "+iva+", "+muevest+", "+stock1+", "+stock2+", "+stock3+", "+stock4+", "+minimo+", "+maximo+", 1)", cb);
}

function getArticuloPorId(id, cb){
	conn("select * from articu where id ="+id, cb);
}

function update(id, cdfabrica, cdinterno, nombre, descripcion, idfamilia, idtipo, idumed, costo, iva, muevestock, stock1, stock2, stock3, stock4, minimo, maximo, activa, cb){
	conn("UPDATE articu SET cdfabrica= '"+cdfabrica+"', cdinterno="+cdinterno+", nombre='"+nombre+"', descrip='"+descripcion+"', idfamilia="+idfamilia+", idtipo="+idtipo+", idumed="+idumed+", costo="+costo+", iva="+iva+", muevest="+muevestock+", stock1="+stock1+", stock2="+stock2+", stock3="+stock3+", stock4="+stock4+", minimo="+minimo+", maximo="+maximo+", activa="+activa+" where id="+id, cb);
}

function del(id, cb){
	conn("DELETE from articu where id="+id , cb);
}

function getCostouporIDart(id, cb){
	conn("select * from articu where id="+id, cb);
}

function traerStockActual(idart, stockid, cb){
	conn("select "+stockid+" from articu where id = "+idart, cb);
}

function updateStockResta(idart, depor, cantidad, cb){
	stockid2 = "stock" + depor;
	traerStockActual(idart, stockid2, function(stockactual){
		switch(depor){
			case "1":
				stockactualizado = parseFloat(stockactual[0].stock1) - cantidad;
				conn("update articu set "+stockid2+" = "+stockactualizado+" where id="+idart, cb);
				break;
			case "2":
				stockactualizado = parseFloat(stockactual[0].stock2) - cantidad;
				conn("update articu set "+stockid2+" = "+stockactualizado+" where id="+idart, cb);
				break;
			case "3":
				stockactualizado = parseFloat(stockactual[0].stock3) - cantidad;
				conn("update articu set "+stockid2+" = "+stockactualizado+" where id="+idart, cb);
				break;
			case "4":
				stockactualizado = parseFloat(stockactual[0].stock4) - cantidad;
				conn("update articu set "+stockid2+" = "+stockactualizado+" where id="+idart, cb);
				break;
		}
	});
}

function updateStockSuma(idart, depdes, cantidad, cb){
	stockid = "stock"+depdes;
	traerStockActual(idart, stockid, function(stockactual){
		switch(depdes){
			case "1":
				stockactualizado = parseFloat(stockactual[0].stock1) + parseFloat(cantidad);
				conn("update articu set "+stockid+" = "+stockactualizado+" where id="+idart, cb);
				break;
			case "2":
				stockactualizado = parseFloat(stockactual[0].stock2) + parseFloat(cantidad);
				conn("update articu set "+stockid+" = "+stockactualizado+" where id="+idart, cb);
				break;
			case "3":
				stockactualizado = parseFloat(stockactual[0].stock3) + parseFloat(cantidad);
				conn("update articu set "+stockid+" = "+stockactualizado+" where id="+idart, cb);
				break;
			case "4":
				stockactualizado = parseFloat(stockactual[0].stock4) + parseFloat(cantidad);
				conn("update articu set "+stockid+" = "+stockactualizado+" where id="+idart, cb);
				break;
		}
	});
}

function getConsulta(columna, filtro, cb){
	conn("select articu.*, familia.nombre as fnombre from articu  left join familia on familia.id = articu.IdFamilia where "+ columna +" = '"+filtro+"' order by articu.nombre ", cb);
}

function getArtporCdFabrica(cdfabrica, cb){
	conn("SELECT COUNT(cdfabrica) as asd FROM articu where cdfabrica = '"+ cdfabrica+"'" , cb);
}

function getArtporCdInterno(cdinterno, cb){
	conn("SELECT COUNT(cdinterno) as asd FROM articu where cdinterno = '"+ cdinterno+"'" , cb);
}

function getConsultaPorNombre(columna, filtro, cb){
	conn("select articu.*, familia.nombre as fnombre from articu  left join familia on familia.id = articu.IdFamilia where "+ columna +" like '%"+filtro+"%' order by articu.nombre", cb);
}

function getArticuloPorIdconJoin(id, cb){
	conn("select articu.*, familia.nombre as fnombre, tipoar.descripcion as ardescripcion, umed.nombre as unombre from articu left join familia on familia.id = articu.IdFamilia left join tipoar on tipoar.id = articu.Idtipo left join umed on umed.id = articu.IdUmed where articu.id = "+id, cb);
}