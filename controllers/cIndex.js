//requiriendo modelo mensaje.js:
var mUsuarios = require('../models/mUsuarios');
var mAyuda = require('../models/mAyuda');
//requiriendo la conection string
var mViajes = require('../models/mViajes');

module.exports = {
	getInicio: getInicio,
	getError: getError,
    getAyuda: getAyuda,
    AyudaVer: AyudaVer
}

function getInicio(req, res){
    mViajes.getAll(function(viajes){
        // console.log(viajes)
        res.render('inicio', {
            pagename: 'enRuta',
            viajes: viajes
        });
    });
}

function getError(req, res) {
	res.render('error',{
        pagename: 'Error',
	});
}

function getAyuda(req, res){
    mAyuda.getAll(function (ayudas){
        res.render('ayuda',{
            pagename: 'Ayuda',
            ayudas: ayudas
        });
    });
}

function AyudaVer(req, res){
    params = req.params;
    id = params.id;
    mAyuda.getAyuda(id, function (ayuda){
        //ayuda = ayuda[0];
        console.log(ayuda[0].texto);
        res.render('ayudaver',{
            pagename: 'Ver Ayuda de ' + ayuda[0].titulo,
            ayuda: ayuda[0]
        });
    });
}