var conn = require('../config/db').conn;

module.exports = {
	getAll: getAll,
	insert: insert,
	getById: getById,
	getCantRepuestosEnRubroById: getCantRepuestosEnRubroById,
	getByCodigo: getByCodigo,
	update: update,
	del: del,
	getRubroEnRepById: getRubroEnRepById,
    getAllAceites: getAllAceites,
    getLastAceite: getLastAceite
}

function getAll(cb){
	conn('select *, if (stock_actual <= punto_pedido, maximo-stock_actual, 0) as faltante from repuestos', cb);
}

function insert(codigo, nombre, stock, valor, calle, modulo, estante, minimo, maximo, descripcion, marca, observaciones, puntopedido, coche, id_rubro, cb){
	conn("insert into repuestos(codigo, nombre, stock_actual, valor, calle, modulo, estante, minimo, maximo, descripcion, marca, "+
		"observaciones, punto_pedido, coche, id_rubro_fk) values('"+codigo+"', '"+nombre+"', "+stock+", "+valor+", '"+calle+"', "+modulo+", '"+estante+
		"', "+minimo+", "+maximo+", '"+descripcion+"', "+marca+", '"+observaciones+"', "+puntopedido+", "+coche+", "+id_rubro+");", cb);
}

function getById(id, cb){
	conn("select * from repuestos where id = "+id, cb);
}

function getCantRepuestosEnRubroById(id_rubro, cb){
	conn("select count(*) as cant FROM repuestos where id_rubro_fk = "+id_rubro, cb);
}

function getByCodigo(codigo, cb){
	conn("select * from repuestos where codigo = '"+codigo+"'", cb);
}

function update(id_repuesto, codigo, nombre, stock, valor, calle, modulo, estante, minimo, maximo, descripcion, marca, observaciones, puntopedido, id_rubro, cb){
	conn("update repuestos set codigo='"+codigo+"', nombre='"+nombre+"', stock_actual="+stock+", valor="+valor+", calle='"+calle+"', modulo="+modulo+
		", estante='"+estante+"', minimo="+minimo+", maximo="+maximo+", descripcion='"+descripcion+"', marca="+marca+", observaciones='"+observaciones+
		"', punto_pedido="+puntopedido+", id_rubro_fk="+id_rubro+" where id ="+id_repuesto, cb);
}

function del(id_repuesto, cb){
	conn("delete from repuestos where id = "+id_repuesto, cb);
}

function getRubroEnRepById(id_rubro, cb){
	conn("select * from repuestos where id_rubro_fk = "+id_rubro, cb);
}

function getAllAceites(cb){
	conn("select *, if (stock_actual <= punto_pedido, maximo-stock_actual,0) as faltante from repuestos where nombre like '%aceite%' order by codigo", cb);
}

function getLastAceite(cb){
	conn("SELECT id_repuesto_fk FROM evhsa.comb_planilladiaria  order by fecha desc LIMIT 1", cb);
}