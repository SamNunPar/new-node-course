const mongoose = require('mongoose')



const dbConnection = async() => {

    try {

        await mongoose.connect( process.env.DB_URL )

        console.log('Conectado a la base de datos')
        
    } catch (error) {
        console.log(error)
        throw new Error('Error en la coneccion a base de datos')
    }

}



module.exports = {
    dbConnection
}