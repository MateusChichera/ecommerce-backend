const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const app = express();
const cors = require('cors');
const db = require('./config/db');
const cookieParser = require('cookie-parser');
const session = require('express-session');

// Importando os métodos de autenticação da pasta utils
const { verificarToken } = require('./utils/auth');

// Carregar variáveis de ambiente
dotenv.config();

// Middleware para analisar JSON
app.use(bodyParser.json());

// Rotas
const LoginRoutes = require('./routes/loginRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');
const empresaRoutes = require('./routes/empresaRoutes');

// Rota de login (não protegida)
app.use('/api/login', LoginRoutes);

// Rotas de usuário (protegidas com o middleware verificarToken)
app.use('/api/usuario', verificarToken, usuarioRoutes);
app.use('/api/empresa', verificarToken, empresaRoutes);

// Definindo a porta
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
