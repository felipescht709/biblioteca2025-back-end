import { DataTypes } from "sequelize";
import banco from "../banco.js";

// mapeamento da tabela funcionario
export default banco.define(
    'funcionario',
    {
      idfuncionario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      nomefuncionario: {
        type: DataTypes.STRING(60),
        allowNull: false,
      },
      cpf: {
        type: DataTypes.STRING(15),
        allowNull: false,
      },
        email: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      telefone: {
        type: DataTypes.STRING(15),
        allowNull: true
      },
      nascimento: {
        type: DataTypes.DATE,
        allowNull: true
      },
      salario: {
        type: DataTypes.DECIMAL(11, 2),
        allowNull: false
      },
      contratacao: {
        type: DataTypes.DATE,
        allowNull: false
      },
      demissao: { 
        type: DataTypes.DATE,
        allowNull: true
      },
      ativo: {
        type: DataTypes.BOOLEAN,
        allowNull: true
      },
      senha: {
        type: DataTypes.STRING(100),
        allowNull: true
      },
      token:{
        type: DataTypes.STRING(100),
        allowNull: true
      },
}
);

