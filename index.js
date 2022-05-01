const http = require("http");
const fs = require('fs');
const url = require('url')
const port = 3000;
const { insertar, consultar, editar, eliminando } = require("./baseDatos")

http.createServer(async (req, res) => {
    if (req.url == "/" && req.method === "GET") {
        res.setHeader("content-type", "text/html");
        res.end(fs.readFileSync("index.html", "UTF8"));
    }

    // if (req.url == '/estilos') {
    //     res.writeHead(200, { 'Content-Type': 'text/css' })
    //     fs.readFile(__dirname + '/assets/estilos.css', (err, css) => {
    //         res.end(css);
    //     })
    // }

    //agregar
    if ((req.url == "/cancion" && req.method == "POST")) {
        let body = "";
        req.on("data", (chunk) => {
            body += chunk
        })
        req.on("end", async () => {
            const datos = Object.values(JSON.parse(body));
            const respuesta = await insertar(datos);
            console.log(respuesta);
            res.end(JSON.stringify(respuesta));
        })
    }

    //consultar
    if (req.url == "/canciones" && req.method === "GET") {
        const registros = await consultar();
        console.log("prueba", registros)
        res.end(JSON.stringify(registros.rows));
    }

    //editar
    if ((req.url == "/cancion" && req.method == "PUT")) {
        let body = "";
        req.on("data", (chunk) => {
            body += chunk            
        })
        req.on("end", async () => {
            const actualizar = Object.values(JSON.parse(body));
            const actualizando = await editar(actualizar);
            res.end(JSON.stringify(actualizando));
        })
    }

    //eliminar
    if (req.url.startsWith("/cancion?") && req.method == "DELETE") {
        const { id } = url.parse(req.url, true).query;
        const respuesta = await eliminando(id);
        res.end(JSON.stringify(respuesta));
    }

}).listen(3000, () => console.log(`servidor activo puerto: ${port}`));