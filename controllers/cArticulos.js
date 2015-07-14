var mArt = require('../models/mArticulos');
var mBorro = require('../models/mBorro');
var mFamilia = require('../models/mFamilia');
var mTipo = require('../models/mTipo');
var mUmed = require('../models/mUmed');
var mAyuda = require('../models/mAyuda');
var mEtiquetas = require('../models/mEtiquetas');

module.exports = {
	getConsulta: getConsulta,
	getAlta: getAlta,
	postAlta: postAlta,
	getModificar: getModificar,
	postModificar: postModificar,
	getDel: getDel,
	getCostou: getCostou,
	getBuscar: getBuscar,
	getBuscarPorNombre: getBuscarPorNombre,
	getVerArt: getVerArt,
	getArtporCdFabrica2: getArtporCdFabrica2,
	printTicket: printTicket
};

function getConsulta(req, res) {
	req.session.nromenu = 9;
	mAyuda.getAyudaTexto(req.session.nromenu, function (ayuda){
		res.render('articulosconsulta', {
			pagename: 'Consulta de Articulos',
			ayuda: ayuda[0]
		});
	});
}

function getAlta(req, res){
	req.session.nromenu = 8;
	mAyuda.getAyudaTexto(req.session.nromenu, function (ayuda){
		mFamilia.getAllActivas(function (familias){
			mTipo.getAll(function (tipos){
				mUmed.getAllActivas(function (umeds){
					res.render('articulosalta', {
						pagename: 'Alta de Articulos',
						familias: familias,
						tipos: tipos,
						umeds: umeds,
						ayuda: ayuda[0]
					});
				});
			});
		});
	});
}


function postAlta(req, res){
	params = req.body;
	cdfabrica = params.cdfabrica;
	cdinterno = params.cdinterno;
	nombre = params.nombre;
	descripcion = params.descripcion;
	familia = params.familia;
	tipo = params.tipo;
	umed = params.umed;
	costo = params.costo;
	iva = params.iva;
	muevestock = params.muevest;
	stock1 = params.stock1;
	//stock2 = params.stock2;
	//stock3 = params.stock3;
	//stock4 = params.stock4;
	minimo = params.minimo;
	maximo = params.maximo;

	if (muevestock=="on")
		muevestock = 1;
	else
		muevestock = 0;
	print = params.print;
	if (print == "on")
		print = 1;
	else
		print = 0;

	mArt.getArtporCdFabrica(cdfabrica, function (art){
		//console.log(art[0].asd)
		if (art[0].asd == 0){
			mArt.getArtporCdInterno(cdinterno, function (art){
				if (art[0].asd == 0){
					mArt.insert(cdfabrica, cdinterno, nombre, descripcion, familia, tipo, umed, costo, iva, muevestock, stock1, minimo, maximo, function(){
						console.log("print: "+print)
						if (print == 1){

							mArt.getUltimoId(function (ultimoid){
								console.log( ultimoid[0].id)
								ultimoid = ultimoid[0].id;
								console.log("ultimo id: "+ultimoid)
								mArt.getArticuloPorId(ultimoid, function (arti){
									mEtiquetas.getLast(function (ets){
										if (ets[0] == null){
											mEtiquetas.insertArt1(arti[0].id, arti[0].CdInterno, arti[0].Nombre, function (){
												res.redirect('articulosalta');
											});
										}else{
											mEtiquetas.insertArt2(ets[0].id, arti[0].id, arti[0].CdInterno, arti[0].Nombre, function(){
												res.redirect('articulosalta');
											});
										}
									});
								});
							})
						}else{
							res.redirect('articulosalta');
						}
					});
				}else{
					res.render('error', {
		      			error: "Codigo Interno existente. Intente con otro Codigo Interno."
		      		});
				}
			});
		}else{
			res.render('error', {
      			error: "Codigo de Fabrica existente. Intente con otro Codigo de Fabrica."
      		});
		}
	});	
}

function getModificar(req, res){
	params = req.params;
	id = params.id;
	mFamilia.getAllActivas(function (familias){
		mTipo.getAll(function (tipos){
			mUmed.getAllActivas(function (umeds){
				mArt.getArticuloPorId(id, function (docs){
					//console.log(docs[0])
					res.render('articulosmodificar',{
						pagename: 'Modificar Articulo',
						art: docs[0],
						familias: familias,
						tipos: tipos,
						umeds: umeds
					});
				});
			});
		});
	});	
}

function postModificar(req, res){
	params = req.body;
	id = params.id;
	cdfabrica = params.cdfabrica;
	cdinterno = params.cdinterno;
	nombre = params.nombre;
	descripcion = params.descripcion;
	idfamilia = params.familia;
	idtipo = params.tipo;
	idumed = params.umed;
	costo = params.costo;
	iva = params.iva;
	muevestock = params.muevestock;
	if (muevestock == "on")
		muevestock = 1;
	else
		muevestock = 0;
	stock1 = params.stock1;
	//stock2 = params.stock2;
	//stock3 = params.stock3;
	//stock4 = params.stock4;
	minimo = params.minimo;
	maximo = params.maximo;
	activa = params.activa;
	if (activa=="on")
		activa = 1;
	else
		activa = 0;

	mArt.update(id, cdfabrica, cdinterno, nombre, descripcion, idfamilia, idtipo, idumed, costo, iva, muevestock, stock1, minimo, maximo, activa, function(){
		res.redirect('/articulosconsulta');
	});
}

function getDel(req, res){
  	var params = req.params;
  	var id = params.id;

  	mArt.getArticuloPorId(id, function (docs){
  		art = docs[0];
		mBorro.add(req.session.user.usuario,"Articulos", "Borra nombre: "+ art.nombre + ", id: " + id , function(){
			mArt.del(id, function(){
				res.redirect('/articulosconsulta'); 
			});
		});
  	});  
}

function getCostou(req, res){
	params = req.params;
	id = params.idart;
	mArt.getCostouporIDart(id, function (art){
		res.send(art[0]);
	});
}

function getBuscar(req, res){
	params = req.params;
	filtro = params.busqueda;
	columna = params.columna;
	mArt.getConsulta(columna, filtro, function (consulta){
		res.send(consulta);
	});
}

function getBuscarPorNombre(req, res){
	params = req.params;
	filtro = params.busqueda;
	columna = params.columna;
	mArt.getConsultaPorNombre(columna, filtro, function (consulta){
		res.send(consulta);
	});
}

function getVerArt(req, res){
	params = req.params;
	id = params.id;
	mArt.getArticuloPorIdconJoin(id, function (docs){
		//console.log("docs[0]")
		res.render('articulosver',{
			pagename: 'Ver Articulo',
			art: docs[0],
		});
	});
}

function getArtporCdFabrica2(req, res){
	params = req.params;
	cdfabrica = params.cdfabrica;
	console.log("cd de cArt "+cdfabrica);
	mArt.getArtporCdFabrica2(cdfabrica, function (art){
		res.send(art);
	});
}

function printTicket(req, res){
	params = req.params;
	id = params.id;
	mArt.getArticuloPorId(id, function (art){
		if( art[0].Cdfabrica.length <= 12 ){
			res.render('articuloimprimir',{
				pagename: 'Imprimir Articulo',
				art: art[0]
			});
		}else{
			res.render("error", {
				error: "Maximo 12 digitos para imprimir Codigo de Fabrica."
			});
		}
	});
}