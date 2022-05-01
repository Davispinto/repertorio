const { Console } = require("console");
const { Pool } = require("pg");

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "repertorio",
    password: "graficas014",
    port: 5432,
    max: 20,
    idleTimeoutMillis: 5000,
    connectionTimeoutMillis: 2000,
});

//insertar en la base datos

const insertar = async (datos) => {
    const consulta = {
        text: "insert into repertorio (cancion, artista, tono) values ($1, $2, $3) RETURNING *;",
        values: datos,
    };
    try {
        const result = await pool.query(consulta);
        return result;
    } catch (error) {
        console.log(error.code);
        return error;
    }
};

//leer repertorio
const consultar = async () => {
    try {
        const result = await pool.query("select * from repertorio");
        return result;
    } catch (error) {
        console.log(error.code);
        return error;
    }
};

//editar
const editar = async (datos) => {
    const editando = {
        text: "update repertorio set cancion=$2, artista=$3, tono=$4 where id=$1 RETURNING*",
        values: datos,
    };
    try {
        const resultadosEditar = await pool.query(editando);
        return resultadosEditar;
    } catch (error) {
        console.log(error);
        return error;
    }
};

//eliminar
const eliminando = async (id) => {
    try {
        const resultado = await pool.query(`delete from  repertorio  where id=${id}`);
        return resultado;
    } catch (error) {
        console.log(error);
        return error;
    }
};
module.exports = { insertar, consultar, editar, eliminando };