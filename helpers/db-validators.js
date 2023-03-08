const Categoria = require('../models/categoria');
const Role = require('../models/role')
const Usuario = require('../models/usuario')


/* 
    Validaciones para usuarios
 */

const RolValidator = async(rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if( !existeRol ){
        throw new Error(`El rol ${ rol } no esta registrado en la Base de Datos`)
    }
}

const EmailExiste = async(correo = '') => {
    
    const existeEmail = await Usuario.findOne({ correo })
    if(existeEmail){
        throw new Error(`El correo ${ correo }, ya esta registrado`)
        }
}

const UsuarioExistePorId = async( id ) => {
    
    const existeUsuario = await Usuario.findById(id)
    if(!existeUsuario){
        throw new Error(`El ID: ${ id } no existe`)
    }
}


/* 
    Validaciones para Categorias
*/

const CategoriaExistePorId = async( id ) => {
    
    const existeCategoria = await Categoria.findById(id)
    if(!existeCategoria){
        throw new Error(`La categoria con el id: ${ id }, no existe`)
    }
}

/* const CategoriaExistePorNombre = async( nombre  = "", id) => {

    const existeCategoria = await Usuario.findOne({ nombre })
    if(existeCategoria){
        throw new Error(`Ya existe una categoria con el nombre: ${ nombre }`)
        }
} */

const categoriaActiva = async (id = '') => {
    const existeCategoria = await Categoria.findById(id);
    if (!existeCategoria.estado) {
        throw new Error(`La categoria ${existeCategoria.nombre} no existe`);
    }
}



module.exports = {
    RolValidator,
    EmailExiste,
    UsuarioExistePorId,
    CategoriaExistePorId,
    //CategoriaExistePorNombre,
    categoriaActiva
}