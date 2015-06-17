var mChk1 = require('../models/mChk1');
var mChk2 = require('../models/mChk2');

module.exports = {
	getLista: getLista,
	getAlta: getAlta,
	postAlta: postAlta,
	getModificar: getModificar,
	postModificar: postModificar,
	getDel: getDel
};

function getLista(req, res) {
	params = req.params;
	idchk1 = params.id;

	mChk1.getById(idchk1, function (chk1){
		mChk2.getAllByChk1Id(idchk1, function (chk2s){
	  		res.render('chk2lista', {
				pagename: 'Contenido de ',
				chk2s: chk2s,
				chk1: chk1[0]
			});
	  	});
	});  	
}

function getAlta(req, res){
	params = req.params;
	id = params.id;

	res.render('chk2alta',{
		pagename: "Alta de CheckList",
		idchk1: id
	});
}

function postAlta(req, res){
	params = req.body;
	idchk1 = params.chk1;
	detalle = params.detalle;
	orden = params.orden;
	titulo = params.titulo;

	if (titulo == "on")
		titulo = 1;
	else
		titulo = 0;

	mChk2.insert(idchk1, detalle, orden, titulo, function(){
		res.redirect('chk2lista/'+idchk1);
	});
}

function getModificar(req, res){
	params = req.params;
	idchk2 = params.id;

	mChk2.getChk2ById(idchk2 ,function (chk2){
		//console.log(chk2)
		res.render('chk2modificar',{
			chk2: chk2[0],
			pagename: 'Modificar'
		});
	});
}

function postModificar(req, res){
	params = req.body;
	chk2id = params.chk2id;
	chk1id = params.chk1;
	orden = params.orden;
	detalle = params.detalle;
	titulo = params.titulo;

	if (titulo == "on")
		titulo = 1;
	else
		titulo = 0;
	
	mChk2.update(chk2id, chk1id, detalle, orden, titulo, function (){
		res.redirect('chk2lista/'+idchk1);
	});
}

function getDel(req, res){
	params = req.params;
	id = params.id;
	mChk2.getChk2ById(id, function (chk2){
		mChk2.del(id, function(){
			res.redirect('chk2lista/'+chk2[0].id_chk1_fk);
		});
	});
}