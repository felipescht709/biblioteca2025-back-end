import express from "express";
import { Sequelize, DataTypes } from "sequelize";
const sequelize = new Sequelize('biblioteca2025', 'postgres', '#Felipe123', {
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',
    define: {
        timestamps: false,
        freezeTableName: true
    }
  });
const Editora = sequelize.define(
    'editora',
    {
      ideditora: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      nomeeditora: {
        type: DataTypes.STRING(60),
        allowNull: false,
      },
      cnpj: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      endereco: {
        type: DataTypes.TEXT,
        allowNull: true
      },
    }
  );

try {
    await sequelize.authenticate();
    console.log('Conexão com o banco de dados realizada com sucesso.');
  } catch (error) {
    console.error('Erro ao conectar com o banco de dados:', error);
  }
const app = express();
app.use(express.json());
app.get('/teste', (req, res)=>{
    res.send("teste ok.");
});
// rotas crud da tabela editora
app.get('/editora', async  (req, res)=>{
        const respostaBanco =  await Editora.findAll();
        res.json(respostaBanco);
});
app.get('/editora/:id', async  (req, res)=>{
    const id= req.params.id;
    const respostaBanco =  await Editora.findByPk(id);
    res.json(respostaBanco);
});



app.listen(3000, ()=>{    console.log("Servidor rodando na porta 3000")});
