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

// rotas crud da tabela autor
import autor from "./controller/AutorController.js";
// listar todos os autores
app.get('/autor', autor.listar);
// selecionar autor by id
app.get('/autor/:id', autor.selecionar);
// create autor
app.post('/autor', autor.inserir);
// update autor
app.put('/autor/:id', autor.alterar);
// delete autor
app.delete('/autor/:id', autor.excluir);

// rotas crud da tabela livro
import livro from "./controller/LivroController.js";
// listar todos os livros
app.get('/livro', livro.listar);
 //selecionar livro by id
app.get('/livro/:id', livro.selecionar);
// create livro
app.post('/livro', livro.inserir);
// update livro
app.put('/livro/:id', livro.alterar);
// delete livro
app.delete('/livro/:id', livro.excluir);

// rotas crud da tabela categoria
import categoria from "./controller/CategoriaController.js";
// listar todas as categorias
app.get('/categoria', categoria.listar);
// selecionar categoria by id
app.get('/categoria/:id', categoria.selecionar);
// create categoria
app.post('/categoria', categoria.inserir);
// update categoria
app.put('/categoria/:id', categoria.alterar);
// delete categoria
app.delete('/categoria/:id', categoria.excluir);

// rotas crud da tabela usuario
import usuario from "./controller/UsuarioController.js";
// listar todos os usuarios
app.get('/usuario', usuario.listar);
// selecionar usuario by id
app.get('/usuario/:id', usuario.selecionar);
// create usuario
app.post('/usuario', usuario.inserir);
// update usuario
app.put('/usuario/:id', usuario.alterar);
// delete usuario
app.delete('/usuario/:id', usuario.excluir);

app.listen(3000, ()=>{    console.log("Servidor rodando na porta 3000")});
