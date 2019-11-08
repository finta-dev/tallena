//Dependecies
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    site: {type: mongoose.Types.ObjectId, required: true},
    company: {type: mongoose.Types.ObjectId, required: true},
    //ID numerico para que puedan saber facilmente la orden
    //Tipo de operacion: picking, fast picking, consolidados, no disponible, etc. (Como objeto "configuracion" a partir de un mongo-modelo de configuraciones)
    status: {type: String, required: true}, //autorizar, preparar, controlar, remitir, despachar, pausado, cancelado.
    destination: {type: mongoose.Types.ObjectId, required: true},
    priority: {type: Number, required: true, default: 50},
    scheduledDate: {type: Date},
    comment: {type: String},

    dock: {type: mongoose.Types.ObjectId}, //Averiguar si es propiedad de la subOrder o de la Order

    // PENSAR LA APERTURA POR GRUPO PICKING, Y OTRAS!!
    // Tal vez reemplazar el array detalle por un array de sub-ordenes separadas por el criterio de separación (grupo picking, cantidad, etc) en el objeto 
    // "tipo de operación" y poner como defecto en ese campo "ninguno".

    // El array de subOrders esta bueno para la apertura por el criterio que quieras, PERO HAY QUE PENSAR LA APERTURA POR PICKING Y TRASLADO.

    subOrders:[
        {
            title: {type: String, required: true}, //Descripcion del grupo picking / linea / criterio de separacion. Por ejemplo: Congelados, Secos, etc (grupo picking). 
            assignedTo: {type: mongoose.Types.ObjectId},
            details:[
                {
                    sku: {type: mongoose.Types.ObjectId, required: true}, 
                    quantity: {type: Number, required: true, min: 1}
                },
            ],
        }
    ],

    externals:{
        tracking:{
            url: {type: String},
            code: {type: String}
        },
        order:{
            id: {type: String}
        },
        invoice:{
            id: {type: String},
        },
        delivery:{
            id: {type: String}
        }
    },

    events: {type: Array},

    createdBy: {type: mongoose.Types.ObjectId, required: true, default: null},
    updatedBy: {type: mongoose.Types.ObjectId, required: true, default: null},
})