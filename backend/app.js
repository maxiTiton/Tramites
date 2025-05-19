const express = require('express');
const { Sequelize, DataTypes, Op, where } = require('sequelize');
const cors = require('cors');

// Configura la aplicación Express
const app = express();
app.use(express.json());
app.use(cors());

// Configura la conexión Sequelize (base de datos SQLite en memoria)
const sequelize = new Sequelize('sqlite::memory:');

// Define el modelo Paquete
const Tramite = sequelize.define('Tramite', {
    titular: DataTypes.STRING,
    dni: DataTypes.STRING,
    tipo: DataTypes.STRING,
    fechaInicio: DataTypes.TEXT,
    fechaCierre: DataTypes.TEXT,
    prioritario: DataTypes.TEXT,
    osbservaciones: DataTypes.TEXT,
    }, 
{ timestamps: false });


// Inicializa la base de datos e inserta datos de muestra
async function inicializarBaseDeDatos() {
    await sequelize.sync({ force: true });
    await Tramite.bulkCreate([
        { titular: 'Titular Test01', dni: 25639888, tipo: 'Exp01', fechaInicio: '01/03/2024', fechaCierre:'', prioritario: 'S', osbservaciones: 'Usa audífono' },
        { titular: 'Titular Test11', dni: 25639889, tipo: 'Exp010', fechaInicio: '01/03/2024', fechaCierre:'', prioritario: 'S', osbservaciones: 'Usa audífono' },
        { titular: 'perez', dni: 25639860, tipo: 'Exp010', fechaInicio: '11/04/2024', fechaCierre:'01/05/2024', prioritario: 'S', osbservaciones: 'Usa audífono' },
        { titular: 'Titular Test21', dni: 25639861, tipo: 'Exp010', fechaInicio: '01/03/2024', fechaCierre:'', prioritario: 'S', osbservaciones: 'Usa audífono' },
        { titular: 'Titular Test33', dni: 25639836, tipo: 'Exp01', fechaInicio: '01/04/2024', fechaCierre:'', prioritario: 'S', osbservaciones: 'Usa audífono' },
        { titular: 'Titular Test55', dni: 25639887, tipo: 'Exp01', fechaInicio: '01/05/2024', fechaCierre:'', prioritario: 'N', osbservaciones: 'Usa audífono' },
        { titular: 'Titular Test18', dni: 25639877, tipo: 'Exp09', fechaInicio: '10/03/2024', fechaCierre:'', prioritario: 'N', osbservaciones: 'Usa audífono' },
        { titular: 'Titular Test06', dni: 25639833, tipo: 'Exp09', fechaInicio: '11/03/2024', fechaCierre:'', prioritario: 'N', osbservaciones: 'Usa audífono' },
        { titular: 'Titular Test04', dni: 25639811, tipo: 'Exp01 X', fechaInicio: '12/03/2024', fechaCierre:'13/05/2024', prioritario: 'S', osbservaciones: 'Usa audífono' },
       
    ]);
}


// Endpoint para buscar según el criterio indicado por enunciado.
// app.get('/tramites', async (req, res) => {
//     try {
//         const nombreTitular = req.query.titular
//         if (nombreTitular) {
//             const lst = await Tramite.findAll({
//                 where: {
//                     titular: {
//                         [Op.like]: `%${nombreTitular}`
//                     }, prioritario: {
//                         [Op.like]: 'S'
//                     }
//                 },
//                 order:[['dni', 'ASC']]
//             });
//             res.json(lst);
//         } else {
//             const lst = await Tramite.findAll();
//             res.json(lst);
//         }

//     } catch (error){
//         res.status(500).json({message: 'Error'})
//     }
// });

// Endpoint para buscar según el criterio indicado por enunciado.
app.get('/tramites/titulares', async (req, res) => {
    if (req.query.titular != undefined && req.query.titular !== '') {
        const nombreTitular = req.query.titular;
        const lst = await Tramite.findAll({
            where: {
                titular: {
                    [Op.like]: `%${nombreTitular}`
                },
                prioritario: {
                    [Op.like]: 'S'
                }
            },
            order:[['dni', 'ASC']]
        })
        res.json(lst);
    } else {
        res.status(500).json({message: 'Error'})
    }

});

// Endpoint para obtener todos los paquetes
app.get('/tramites', async (_, res) => {
    try {
        const lst = await Tramite.findAll();
        res.json(lst);
    } catch (error) {
        res.status(500).json({message: 'Error al recuperar museos'})
    }
});


// Inicia el servidor
inicializarBaseDeDatos().then(() => {
    app.listen(4000, () => console.log('Servidor corriendo en http://localhost:4000'));
});


// app.delete('/productos/:id', async(req, res) => {
//     const id = req.params.id
//     const eliminado = await service.remove(id)
//     if(!eliminado){
//         res.status(404).send({mensaje: 'PRODUCTO NO ENCONTRADO'})
//     }
//     res.json(eliminado)
// });

// app.post('/productos', async(req, res) => {
//     const data  = req.body
//     const nuevo = await service.create(data)
//     res.json(nuevo) // Genera una respuesta con un objeto JSON código 200 OK                   
// });

// cd backend
// npm install -D nodemon (en bash)
// donde dice test pongo , "dev": "nodemon app.js"
// npm run dev

// para probar ruta con params en backend: http://localhost:3001/museos/consulta/rio cuarto
// (sin los dos puntos)
// pata probar ruta con query en backend: http://localhost:4000/tramites/titulares?titular=perez