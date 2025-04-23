import Emprestimo from "../model/EmprestimoModel.js";
import livro from "../model/LivroModel.js";
import usuario from "../model/UsuarioModel.js";
import moment from "moment";
import Multa from "../model/MultaModel.js"; 

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
  const idemprestimo = req.params.id; 
  if (!idemprestimo) {
      return res
          .status(422)
          .json({ error: "O parâmetro idemprestimo é obrigatório." });
  }

  const emprestimoBanco = await Emprestimo.findByPk(idemprestimo);
  if (!emprestimoBanco) {
      return res.status(404).json({ error: "Empréstimo não encontrado." });
  }

  if (emprestimoBanco.devolucao !== null) {
      return res.status(422).json({ message: "O empréstimo já foi devolvido." });
  }

  const devolucao = moment().format("YYYY-MM-DD");
  const vencimento = emprestimoBanco.vencimento; // Data de vencimento do empréstimo
  const diasAtraso = moment(devolucao).diff(moment(vencimento), "days");

  // Verifica se há atraso
  if (diasAtraso > 0) {
      const valorMulta = diasAtraso * 2.5; // R$ 2,50 por dia de atraso
      const vencimentoMulta = moment(devolucao).add(30, "days").format("YYYY-MM-DD");

      // Registra a multa na tabela
      await Multa.create({
          idemprestimo: idemprestimo,
          valor: valorMulta,
          vencimento: vencimentoMulta,
      });
  }

  // Atualiza a devolução no banco
  const respostabanco = await Emprestimo.update(
      { devolucao },
      { where: { idemprestimo } }
  );

  // Atualiza o status do livro para disponível
  const idlivro = emprestimoBanco.idlivro;
  const emprestado = false;
  await livro.update({ emprestado }, { where: { idlivro } });

  res.status(200).json({
      message: "Devolução realizada com sucesso.",
      multa: diasAtraso > 0 ? { diasAtraso, valor: diasAtraso * 2.5 } : null,
  });
}

async function listarPendentes(req, res) {
    try {
        const multasPendentes = await Multa.findAll({
            where: {
                pagamento: null, 
            },
        });

        res.status(200).json(multasPendentes);
    } catch (error) {
        console.error("Erro ao listar multas pendentes:", error);
        res.status(500).json({ error: "Erro ao listar multas pendentes." });
    }
}

export default {listar, selecionar, emprestar, devolver,listarPendentes };




