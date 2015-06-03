var mEtiquetas = require('../models/mEtiquetas');
var mArt = require('../models/mArticulos');

module.exports = {
	addArt: addArt,
	getImprimir: getImprimir,
	getListaImpresion: getListaImpresion,
	getBorrarFila: getBorrarFila,
	getBorrarTodo: getBorrarTodo
}

function addArt(req, res) {
	params = req.params;
	id = params.id;

	mArt.getArticuloPorId(id, function (art){
		mEtiquetas.getLast(function (ets){
			if (ets[0] == null){
				mEtiquetas.insertArt1(art[0].id, art[0].CdInterno, art[0].Nombre, function (){
					res.send(200);
				});
			}else{
				mEtiquetas.insertArt2(ets[0].id, art[0].id, art[0].CdInterno, art[0].Nombre, function(){
					res.send(200);
				});
			}
		});
	});
}

function getImprimir(req, res){
	mEtiquetas.getAll(function (etiquetas){
		res.render('articulosimprimir', {
			etiquetas: etiquetas
		});
	});
}

function getListaImpresion(req, res){
	mEtiquetas.getAll(function (etiquetas){
		res.render('articuloslistaimpresion', {
			pagename: "Lista de Etiquetas a Imprimir",
			etiquetas: etiquetas
		});
	});	
}

function getBorrarFila(req, res){
	params = req.params;
	id = params.id;
	mEtiquetas.deleteFila(id, function(){
		res.redirect('articulosimprimirlimpiar');
	});
}

function getBorrarTodo(req, res){
	mEtiquetas.deleteTodo(function(){
		res.redirect('articulosimprimirlimpiar');
	});
}