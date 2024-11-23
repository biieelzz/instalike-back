import 'dotenv/config';
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbConfig.js";

// Conecta ao banco de dados usando a string de conexão fornecida pela variável de ambiente STRING_CONEXAO.
// O resultado da conexão é armazenado na variável conexao.
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

// Função assíncrona para obter todos os posts do banco de dados.
export async function getTodosPosts() {
    // Seleciona o banco de dados chamado "imersao-instabytes" dentro da conexão estabelecida.
    const db = conexao.db("imersao-instabytes");
    
    // Seleciona a coleção "posts" dentro do banco de dados.
    const colecao = db.collection("posts");

    // Executa uma consulta para encontrar todos os documentos (posts) na coleção e retorna os resultados como um array.
    return colecao.find().toArray();
}

export async function criarPost(novoPost) {
    // Seleciona o banco de dados chamado "imersao-instabytes" dentro da conexão estabelecida.
    const db = conexao.db("imersao-instabytes");
    
    // Seleciona a coleção "posts" dentro do banco de dados.
    const colecao = db.collection("posts");

    // Executa uma consulta para encontrar todos os documentos (posts) na coleção e retorna os resultados como um array.
    return colecao.insertOne(novoPost);
}

export async function atualizarPost(id, novoPost) {
    // Seleciona o banco de dados chamado "imersao-instabytes" dentro da conexão estabelecida.
    const db = conexao.db("imersao-instabytes");
    
    // Seleciona a coleção "posts" dentro do banco de dados.
    const colecao = db.collection("posts");

    // Criando um obejto para o Mongo entender e guardar o ID do post.
    const objID = ObjectId.createFromHexString(id);

    // Executa um update no post do ID em questão.
    return colecao.updateOne({_id: new ObjectId(objID)}, {$set: novoPost});
}