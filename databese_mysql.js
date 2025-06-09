import { conexao } from "./db.js";
import express from"express"

const app = express();

export class cadastro{

    
    list(){

       

    }
    create(nome,valor,imagem){

      const sql = `insert into produtos (nome,valor,imagem) values ('${nome}','${valor}','${imagem}')`;

      //executa o codigo sql e da um retorno ou erro
      conexao.query(sql, (erro, retorno) =>{
        if(erro) throw erro;

        console.log(retorno);
      });

    }
    

      destroy(codigo){
        console.log(codigo);
        const sql = `delete from produtos where codigo = ${codigo}`

        conexao.query(sql, (erro, retorno) =>{
        if(erro) throw erro;

        console.log(retorno);
      });

      }


}