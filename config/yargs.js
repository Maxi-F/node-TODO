const descripcion = {
    alias: 'd',
    demand: true,
    desc: 'Descripcion de la tarea por hacer.'
}

const completado = {
    alias: 'c',
    demand: true,
    default: true,
    desc: 'Marca como completado o pendiente una tarea.'
}

const opcionesCrearyBorrar = {
    descripcion
}

const opcionesActualizar = {
    descripcion,
    completado
}

const argv = require('yargs')
    .command('crear', 'Crear un elemento por hacer', opcionesCrearyBorrar)
    .command('actualizar', 'Actualiza el estado completado de una tarea', opcionesActualizar)
    .command('borrar', 'Borrar un elemento por hacer', opcionesCrearyBorrar)
    .help()
    .argv;


module.exports = {
    argv
};
/*
const argv ....

comando crear 'Crear un elemento por hacer'
    --descripcion -d

comando actualizar 'Actualiza el estado completado de una tarea'
    --descripcion -d
    --completado -c true
*/