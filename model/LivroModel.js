import { DataTypes } from "sequelize";
import banco from "../banco.js";

// mapeamento da tabela livro
export default banco.define(
    'livro',
    {
      idlivro: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      titulo: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      edicao: {
        type: DataTypes.STRING(40),
        allowNull: true,
      },
        paginas: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      publicacao: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
    foto: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    localizacao: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    resumo: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    ativo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    condicaofisica: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    emprestado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    ideditora: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'editora',
            key: 'ideditora'
        }
    },
    idcategoria: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'categoria',
            key: 'idcategoria'
        }
    },
}
);
