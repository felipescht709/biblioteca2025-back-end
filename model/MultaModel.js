import { DataTypes } from "sequelize";
import banco from "../banco.js";

export default banco.define(
    'multa',
{
    idmulta: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    idemprestimo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "emprestimo",
            key: "idemprestimo",
        },
    },
    valor: {
        type: DataTypes.DECIMAL(11, 2),
        allowNull: false,
        defaultValue: 0,
    },
    vencimento: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    pagamento: {
        type: DataTypes.DATE,
        allowNull: true,
    },
});
