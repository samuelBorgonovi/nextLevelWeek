const express = require("express")
const server = express()

//pegar o banco de dados
const db = require("./database/db")

//configurar pasta publica
server.use(express.static("public"))

//habiliar o uso do req.body na nossa aplicacao
server.use(express.urlencoded({ extended: true }))

//utlilizando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})


//configurar caminhos da minha aplicacao
//pagina inicial
//req: requisicao
//res: resposta

server.get("/", (req, res) => {
    return res.render("index.html", { title: "Um titulo" })
})



server.get("/create-point", (req, res) => {

    //req.query:query strings da nossa url
    //console.log(req.query)


    return res.render("create-point.html",{saved: true})
})

server.post("/savepoint", (req, res) => {

    //req.body e o corpo do nosso formulario
    //console.log(req.body)

    //inserir dados no anco de dados
    const query = `
    INSERT INTO places (
        image,
        name,
        address,
        address2,
        state,
        city,
        items

    ) VALUES (?,?,?,?,?,?,?);
`
    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items

    ]

    function afterInsertData(err) {
        if (err) {
            return console.log(err)
        }

        console.log("Cadastrado com sucesso")
        console.log(this)

        return res.render("create-point.html", {saved: true})
        
    }

    db.run(query, values, afterInsertData)

})

server.get("/search", (req, res) => {

    //pegar os dados do banco de dados
    db.all(`SELECT * FROM places`, function (err, rows) {
        if (err) {
            return console.log(err)
        }

        const total = rows.length

        //mostrar a pagina html com dados do bd
        return res.render("search-results.html", { places: rows, total })
    })
})

//ligar o servidor
server.listen(3000)