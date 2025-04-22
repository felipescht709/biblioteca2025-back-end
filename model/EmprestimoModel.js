import { DataTypes } from "sequelize";
import banco from "../banco.js";

// mapeamento da tabela emprestimo
export default banco.define(
    'emprestimo',
    {
      idemprestimo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      idlivro: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      idusuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
        emprestimo: {
        type: DataTypes.DATEONLY,
        allowNull: false
      },
      vencimento: {
        type: DataTypes.DATEONLY,
        allowNull: false
      },
      devolucao: {
        type: DataTypes.DATEONLY,
        allowNull: true
      },
      observacao: {
        type: DataTypes.TEXT,
        allowNull: true
    },
}
);
