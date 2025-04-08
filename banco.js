import { Sequelize } from "sequelize";
// configuração do banco de dados
const sequelize = new Sequelize('biblioteca2025', 'postgres', '#Felipe123', {
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',
    define: {
        timestamps: false,
        freezeTableName: true
    }
  });
  export default sequelize; // exportando a conexão com o banco de dados