const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET || 'chave_super_secreta';

const gerarToken = (payload) => {
  return jwt.sign(payload, secret, { expiresIn: '8h' });
};

const verificarToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).json({ erro: 'Token não fornecido' });

  const [, token] = authHeader.split(' ');

  try {
    const decoded = jwt.verify(token, secret);
    req.usuario = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ erro: 'Token inválido ou expirado' });
  }
};

module.exports = { gerarToken, verificarToken };
