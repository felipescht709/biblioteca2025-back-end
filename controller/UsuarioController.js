import usuario from "../model/UsuarioModel.js";

async function listar (req, res){
    const respostaBanco =  await usuario.findAll();
    res.json(respostaBanco);
}
async function selecionar (req, res){
    const id= req.params.id;
    const respostaBanco =  await usuario.findByPk(id);
    res.json(respostaBanco);
}
async function inserir (req, res){
    const respostaBanco =  await usuario.create(req.body);
    res.json(respostaBanco);
}
async function alterar (req, res) {
    const nomeusuario = req.body.nomeusuario;
    const email = req.body.email;
    const senha = req.body.senha;
    const foto = req.body.foto;
    const ativo = req.body.ativo;
    const idusuario= req.params.id;
    const respostaBanco =  await usuario.update(
        {nomeusuario, email, senha, foto, ativo},
        {where: {idusuario}});
    res.json(respostaBanco);
}
async function excluir (req, res) {
    const idusuario= req.params.id;
    const respostaBanco =  await usuario.destroy({where: {idusuario}});
    res.json(respostaBanco);
  }

export default {listar, selecionar, inserir, alterar, excluir};
