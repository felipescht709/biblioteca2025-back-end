import express from "express";
import banco from "./banco.js";
import editora from "./controller/EditoraController.js";

try {
    await banco.authenticate();
    console.log('Conexão com o banco de dados realizada com sucesso.');
  } catch (error) {
    console.error('Erro ao conectar com o banco de dados:', error);
  }
const app = express();
app.use(express.json());
app.get('/teste', (req, res)=>{
    res.send("teste ok.");
});
// rotas crud da tabela editora
// listar todas as editoras
app.get('/editora', editora.listar);

// selecionar editora by id
app.get('/editora/:id', editora.selecionar); 

// create editora
app.post('/editora', editora.inserir);

// update editora
app.put('/editora/:id', editora.alterar);

// delete editora
app.delete('/editora/:id', editora.excluir);

app.listen(3000, ()=>{    console.log("Servidor rodando na porta 3000")});
