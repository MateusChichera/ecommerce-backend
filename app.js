const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const app = express();

const db = require('./config/db');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const { verificarToken } = require('./utils/auth');
const autenticarEmpresa = require('./utils/AutenticarEmpresa');

// Carregar variáveis de ambiente
dotenv.config();

// Habilita CORS para permitir requisições do frontend
app.use(cors({
  origin: 'http://localhost:3001',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));

// Middlewares padrão
app.use(bodyParser.json());
app.use(express.json());

// Rotas
const LoginRoutes = require('./routes/loginRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');
const empresaRoutes = require('./routes/empresaRoutes');
const produtoRoutes = require('./routes/produtoRoutes');

app.use('/api/login', LoginRoutes);
app.use('/api/usuario', verificarToken, usuarioRoutes);
app.use('/api/empresa', verificarToken, empresaRoutes);
app.use('/api/produto', produtoRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
