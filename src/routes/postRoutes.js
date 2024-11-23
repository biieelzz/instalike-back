import express from "express";
import multer from "multer";
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../controllers/postsController.js";
import cors from "cors";

const corsOptions = {
    origin: "http://localhost:8000",
    optionsSuccessStatus: 200
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})

const upload = multer({dest: "./uploads" , storage});
// Caso esteja no linux ou MAC, comentar a linha acima e utilizar a linha abaixo
// const upload = multer({dest: "./uploads"});

const routes = (app) => {
    // Habilita o middleware para analisar o corpo das requisições que contém dados no formato JSON.
    // Isso é essencial para receber dados de formulários ou de outras APIs.
    app.use(express.json());

    app.use(cors(corsOptions));

    // Rota HTTP GET para a URL /posts.
    app.get("/posts", listarPosts);

    // Rota POST para criar um post.
    app.post("/posts", postarNovoPost);

    // Rota para upload de imagens (assumindo uma única imagem chamada "imagem").
    app.post("/upload", upload.single("imagem"), uploadImagem);

    app.put("/upload/:id", atualizarNovoPost)
}

export default routes;