import funcionario from "../model/FuncionarioModel.js";

async function listar(req, res) {
    const respostaBanco = await funcionario.findAll();
    res.json(respostaBanco);
}

async function selecionar(req, res) {
    const id = req.params.id;
    const respostaBanco = await funcionario.findByPk(id);
    res.json(respostaBanco);
}

async function inserir(req, res) {
    const { nomefuncionario, cpf, email, salario, contratacao,  } = req.body;

    // Validação de campos obrigatórios
    if (!nomefuncionario || !cpf || !email || !salario || !contratacao) {
        return res.status(422).json({
            error: "Os campos nomefuncionario, cpf, email, salario e contratacao são obrigatórios.",
        });
    }

    const respostaBanco = await funcionario.create({ nomefuncionario, cpf, email, salario, contratacao });
    res.json(respostaBanco);
}

async function alterar(req, res) {
    const { nomefuncionario, cpf, email, salario, contratacao } = req.body;
    const idfuncionario = req.params.id;

    // Validação de campos obrigatórios
    if (!nomefuncionario || !cpf || !email || !salario || !contratacao) {
        return res.status(422).json({
            error: "Os campos nomefuncionario,cpf, email, salario e contratacao são obrigatórios.",
        });
    }

    const respostaBanco = await funcionario.update(
        { nomefuncionario, cpf, email, salario, contratacao },
        { where: { idfuncionario } }
    );
    res.json(respostaBanco);
}
export default { listar, selecionar, inserir, alterar};


