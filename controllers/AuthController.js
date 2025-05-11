const bcrypt = require('bcryptjs');
const db = require('../config/db');
const { gerarToken } = require('../utils/auth');

const login = (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ erro: 'Informe e-mail e senha' });
  }

  const query = 'SELECT * FROM usuarios WHERE email = ? AND ativo = 1';
  db.query(query, [email], async (err, results) => {
    if (err) return res.status(500).json({ erro: 'Erro interno' });
    const usuario = results[0];
    if (!usuario) return res.status(401).json({ erro: 'Usuário não encontrado' });

    const senhaConfere = await bcrypt.compare(senha, usuario.senha);
    if (!senhaConfere) return res.status(401).json({ erro: 'Senha inválida' });

    const token = gerarToken({ id: usuario.id, role: usuario.role, empresa_id: usuario.empresa_id });

    res.json({
      token,
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
