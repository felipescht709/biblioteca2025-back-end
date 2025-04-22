import Emprestimo from "../model/EmprestimoModel.js";
import livro from "../model/LivroModel.js";
import usuario from "../model/UsuarioModel.js";
import moment from "moment";

async function listar (req, res){
    const respostaBanco =  await Emprestimo.findAll();
    res.json(respostaBanco);
}
async function selecionar (req, res){       
    const id= req.params.id;
    const respostaBanco =  await livro.findByPk(id);
    res.json(respostaBanco);
}
async function emprestar (req, res){
    // lendo os parametros
    const idlivro = req.body.idlivro;
    const idusuario = req.body.idusuario; 
    if (!idlivro) {
        return res.status(422).json({ error: 'O parâmetro idlivro é obrigatório' });
    }  
    if (!idusuario) {
        return res.status(422).json({ error: 'O parâmetro idusuario é obrigatório' });
    }
    
    const livrobanco = await livro.findByPk(idlivro);
    if (!livrobanco) {
        return res.status(404).json({ error: 'Livro não encontrado' });
    }
    const usuariobanco = await usuario.findByPk(idusuario); 
    if (!usuariobanco) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    if (livrobanco.inativo) {
        return res.status(422).json({ error: 'Este livro está inativo.' });
    }
    if (livrobanco.emprestado) {
        return res.status(422).json({ error: 'Este livro já está emprestado.' });
    }
    
    const emprestimo = moment().format('YYYY-MM-DD');
    const vencimento = moment().add(15, 'days').format('YYYY-MM-DD');

    const respostaBanco =  await Emprestimo.create({idlivro, idusuario, emprestimo, vencimento});

    const emprestado = true;
    await livro.update({emprestado}, {where: {idlivro}});

    res.json(respostaBanco);

    res.send("livro emprestado com sucesso.");
    
}

async function devolver(req, res) {
    const id_emprestimo = req.body.id_emprestimo;
    if (!id_emprestimo) {
      return res
        .status(422)
        .json({ error: "O parâmetro id_emprestimo é obrigatório." });
    }
  
    const emprestimoBanco = await Emprestimo.findByPk(id_emprestimo);
    if (!emprestimoBanco) {
      return res.status(404).json({ error: "Empréstimo não encontrado." });
    }
  
    if (emprestimoBanco.devolucao !== null) {
      return res.status(422).json({ message: "O empréstimo já foi devolvido." });
    }
  
    const devolucao = moment().format("YYYY-MM-DD");
    const respostabanco = await Emprestimo.update(
      { devolucao },
      { where: { id_emprestimo } }
    );
  
    const id_livro = emprestimoBanco.id_livro;
    const emprestado = false;
    await livro.update({ emprestado }, { where: { id_livro } }); 
    res.status(200).json(respostabanco);
  }
  
export default {listar, selecionar, emprestar, devolver};