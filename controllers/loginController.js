const bcrypt = require('bcryptjs');
const db = require('../config/db');
const { gerarToken } = require('../utils/auth');

const login = (req, res) => {
  const { email, senha } = req.body;

  // Verificar se o email e senha foram fornecidos
  if (!email || !senha) {
    return res.status(400).json({ erro: 'Informe e-mail e senha' });
  }

  // Consulta ao banco de dados
  const sql = 'SELECT * FROM usuarios WHERE email = ? AND ativo = 1';
  db.query(sql, [email], async (err, results) => {
    if (err) {
      return res.status(500).json({ erro: 'Erro interno ao buscar usuário' });
    }

    // Verificar se o usuário foi encontrado
    const usuario = results[0];
    if (!usuario) {
      return res.status(401).json({ erro: 'Usuário não encontrado ou inativo' });
    }

    // Verificar se a senha fornecida é correta
    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
    if (!senhaCorreta) {
      return res.status(401).json({ erro: 'Senha incorreta' });
    }

    // Gerar o token JWT
    const token = gerarToken({
      id: usuario.id,
      email: usuario.email,
      role: usuario.role,
      empresa_id: usuario.empresa_id,
    });

    // Retornar a resposta com sucesso
    res.json({
      mensagem: 'Login realizado com sucesso',
      token, // Retornar o token JWT gerado
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        role: usuario.role,
        empresa_id: usuario.empresa_id
      }
    });
  });
};

module.exports = { login };
