import livro from "../model/LivroModel.js";

async function listar (req, res){
    const respostaBanco =  await livro.findAll();
    res.json(respostaBanco);
}
async function selecionar (req, res){
    const id= req.params.id;
    const respostaBanco =  await livro.findByPk(id);
    res.json(respostaBanco);
}
async function inserir (req, res){
    const respostaBanco =  await livro.create(req.body);
    res.json(respostaBanco);
}
async function alterar (req, res) {
    const titulo = req.body.titulo;
    const edicao = req.body.edicao;
    const paginas = req.body.paginas;
    const publicacao = req.body.publicacao;
    const foto = req.body.foto;
    const localizacao = req.body.localizacao;
    const resumo = req.body.resumo;
    const ativo = req.body.ativo;
    const condicaofisica = req.body.condicaofisica;
    const emprestado = req.body.emprestado;
    const idlivro= req.params.id;
    const respostaBanco =  await livro.update(
        {titulo, edicao, paginas, publicacao, foto, localizacao, resumo, ativo, condicaofisica, emprestado},
        {where: {idlivro}});
    res.json(respostaBanco);
}
async function excluir (req, res) { 
    const idlivro= req.params.id;
    const respostaBanco =  await livro.destroy({where: {idlivro}});
    res.json(respostaBanco);
  }

async function listarDisponiveis(req, res) {
    try {
        const livrosDisponiveis = await livro.findAll({
            where: {
                ativo: true,
                emprestado: false,
            },
        });

        res.status(200).json(livrosDisponiveis);
    } catch (error) {
        console.error("Erro ao listar livros disponíveis:", error);
        res.status(500).json({ error: "Erro ao listar livros disponíveis para empréstimo." });
    }
}

export default {listar, selecionar, inserir, alterar, excluir, listarDisponiveis};