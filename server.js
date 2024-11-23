// Importa as dependências necessárias: Express para criar o servidor e a função para conectar ao banco de dados.
import express from "express";
import routes from "./src/routes/postRoutes.js";

// Cria uma instância do Express, que será o núcleo da nossa aplicação web.
const app = express();
app.use(express.static("uploads"));
routes(app);

// Inicia o servidor Express na porta 3000 e exibe uma mensagem no console quando o servidor estiver pronto.
app.listen(3000, () => {
    console.log("Servidor escutando...");
});