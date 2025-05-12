const db = require('../config/db.js'); // Supondo que o arquivo de conexão seja db.js

// Exemplo de função que utiliza async/await com a consulta
const autenticarEmpresa = async (req, res, next) => {
  const { items } = req.body;
  const clientSecret = req.headers['x-client-secret'];

  if (!items || !items.listHelper || items.listHelper.length === 0) {
    return res.status(401).json({ erro: 'Não foi encontrado nenhum item na requisição' });
  }

  const idLoja = items.listHelper[0]?.idLoja;

  console.log('ID Loja:', idLoja);
    console.log('Client Secret:', clientSecret);
  
  if (!idLoja || !clientSecret) {
    return res.status(401).json({ erro: 'Empresa ID e client secret são obrigatórios' });
  }

  try {
    // Usando db.promise() para garantir que a consulta retorne uma Promise
    const [rows] = await db.promise().query(
      'SELECT * FROM empresas WHERE id = ? AND client_secret = ?',
      [idLoja, clientSecret]
    );

    if (rows.length === 0) {
      return res.status(403).json({ erro: 'Autenticação falhou: empresa ou segredo inválido' });
    }

    req.empresa = rows[0]; // Armazenando a empresa na requisição
    next();

  } catch (err) {
    console.error('Erro ao autenticar empresa:', err);
    return res.status(500).json({ erro: 'Erro interno na autenticação da empresa' });
  }
};


module.exports = autenticarEmpresa;
