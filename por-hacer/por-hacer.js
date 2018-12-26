const fs = require('fs');
const colors = require('colors');

let listadoPorHacer = [];

const guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer);

    fs.writeFile('DataBase/data.json', data, (err) => {
        if (err)
            throw new Error(err);
    })
}

const cargarDB = () => {

    try {
        listadoPorHacer = require('../DataBase/data.json');
    } catch (error) {
        listadoPorHacer = [];
    }
}

const getListado = () => {
    cargarDB();
    return listadoPorHacer;
}

const crear = (descripcion) => {
    cargarDB();

    let porHacer = {
        descripcion,
        completado: false
    };

    listadoPorHacer.push(porHacer);

    guardarDB();

    return porHacer;
}

const indexDeLaTarea = (descripcion) => {
    let indexTarea = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);
    return indexTarea;
}

const ejecutarCambio = (indexTarea, funcion, ...args) => {
    funcion(indexTarea, args);
}

const actualizarCompletado = (indexTarea, [completado]) => {
    listadoPorHacer[indexTarea].completado = completado;
}

const borrarTarea = (indexTarea, []) => {
    listadoPorHacer.splice(indexTarea, 1);
}

const realizarCambios = (descripcion, funcion, ...args) => {
    cargarDB();
    let indexTarea = indexDeLaTarea(descripcion);
    if (indexTarea < 0) return false;
    ejecutarCambio(indexTarea, funcion, args);
    guardarDB();
    return true;
}

const actualizar = (descripcion, completado = true) => realizarCambios(descripcion, actualizarCompletado, completado)

const borrar = (descripcion) => realizarCambios(descripcion, borrarTarea)

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}