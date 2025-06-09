import express, { urlencoded } from "express";

import {engine} from "express-handlebars";

import {conexao} from"./db.js"

import fileupload from"express-fileupload"

import {cadastro} from"./databese_mysql.js"

import fs from"fs"


//para poder usar o __dirname
import path from 'path';
import { fileURLToPath } from 'url';

const cadastrar = new cadastro();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//pega o erro e mostra ele de forma mais detalhada e conecta com o banco de dados


const app = express();

app.use(fileupload());

//trata os dados da requisicao como json
app.use(express.json());

// faz que express endenda os dados enviados pelo formulario
app.use(urlencoded({extended:false}))

app.use("/imagem", express.static("./imagem"))

// estou dizendo que a rota /bootstrap = express.static("./node_modules/bootstrap/dist")
app.use("/bootstrap", express.static("./node_modules/bootstrap/dist"));

app.use("/css", express.static("./css"))

//O Express-Handlebars é um template engine usado com o framework Express.js 
// (Node.js) para gerar HTML dinâmico a partir de templates (arquivos .hbs ou .handlebars).

// Configurar o Handlebars
app.engine('handlebars', engine({
    helpers: {
      // Função auxiliar para verificar igualdade
      condicionalIgualdade: function (parametro1, parametro2, options) {
        return parametro1 === parametro2 ? options.fn(this) : options.inverse(this);
      }
    }
  }));
app.set('view engine', 'handlebars');
app.set('views', './views');

app.get("/", (req,res) =>{

    const sql =`select * from produtos`

        conexao.query(sql, (erro, retorno) => {
        if(erro) throw erro;
        res.render("formulario",{produtos: retorno})
        })
        
})



    // rota principal com a situacao
app.get("/:situacao", (req,res) =>{

    const sql =`select * from produtos`

        conexao.query(sql, (erro, retorno) => {
        if(erro) throw erro;
        res.render("formulario",{produtos: retorno, situacao:req.params.situacao})
        })
        
})

app.post("/cadastrar", (req,res) =>{
    
    try{
        const {nome, valor} = req.body;
    const imagem = req.files.imagem.name


        if(nome == "" || valor == "" || isNaN(valor)){
                res.redirect("/falhaCadastro")
        }else{
     

    cadastrar.create(nome, valor, imagem);
      //envia o arquivo para pasta/pegar a pasta e coloca o arquivo dentro
    req.files.imagem.mv(__dirname + '/imagem/' + req.files.imagem.name)
        res.redirect("/okCadastro");
    
        }
    
    }catch(erro){
    res.redirect("/falhaCadastro")
    }
   






});

app.get("/atualizarFormulario/:id" , (req, res) =>{

    const id = req.params.id;

            const sql = `select * from produtos where codigo = ${id}`

           conexao.query(sql, (erro, retorno)=>{

            if(erro) throw erro;
                res.render("atualizarFormulario", {produtos: retorno[0]})
                //const {nome, valor} = req.body;
                //const imagem = req.files.imagem.name;

            // cadastrar.update(id, nome, valor,imagem);
                    
            });


})


conexao.connect((error) =>{
    if(error){
        throw error;
    }else{
        console.log("conexao feita com sucesso!!!")
    }
})

app.get("/remove/:codigo&:imagem", (req,res) =>{
    const codigo = req.params.codigo
    
    try{
            cadastrar.destroy(codigo);

        fs.unlink(__dirname+ "/imagem/" + req.params.imagem, (erro) =>{
            console.log("erro ao carregar a imagem")
        });

        res.redirect("/okRemover")
    }catch(erro){
        res.redirect("/falhaRemover");
    }

})


app.post("/atualizar", (req,res) =>{
console.log(req.body)
    const {nome, valor,nomeImagem,codigo} = req.body;


    if(nome == "" || valor == "" || isNaN(valor)){
        res.redirect("/falhaAtualizar");

    }else{
try{
        const imagem = req.files.imagem.name;
        console.log(imagem);

         const sql = `update produtos set nome = "${nome}", valor = ${valor}, imagem = "${imagem}" where codigo =${codigo}`
         
       

    conexao.query(sql, (erro, retorno) =>{
        if(erro) throw erro;

    })
            //apagando imagem antiga do diretorio
      fs.unlink(__dirname + "/imagem/" + nomeImagem, (erro) => {
        console.log("erro ao carregar a imagem")


    })

        //colocando a nova imagem no diretorio
        req.files.imagem.mv(__dirname+'/imagem/' + req.files.imagem.name);

    }catch(erro){
      
         const sql = `update produtos set nome = "${nome}", valor = ${valor} where codigo =${codigo}`

         conexao.query(sql, (erro, retorno) =>{
            if(erro) throw erro;
         })
    }
        res.redirect("/okAtualizar");
    }
        


});


app.listen(3000,() => console.log("server ativado!!"));