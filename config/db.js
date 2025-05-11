const mysql = require('mysql2');
const dotenv = require('dotenv');

// Carregar variáveis de ambiente
dotenv.config();

// Criar conexão com o MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Conectar ao banco
db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao MySQL:', err);
  } else {
    console.log('Conectado ao MySQL');
  }
});

module.exports = db;
