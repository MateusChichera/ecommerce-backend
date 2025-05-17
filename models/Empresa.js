const db = require('../config/db');
const crypto = require('crypto'); // Para gerar o client_id e client_secret de forma aleatória

const Empresa = {
  // Cadastrar uma nova empresa
   criar:({id_erp, razao_social, nome_fantasia, cnpj, telefone, endereco, numero, complemento, bairro, cidade, uf, cep, horario_funcionamento, taxa_entrega = 0,slug }) => {
  return new Promise((resolve, reject) => {
    // Verificar se os campos obrigatórios estão presentes
    if (!razao_social || !nome_fantasia || !cnpj || !telefone || !endereco || !horario_funcionamento || !slug) {
      return reject(new Error('Campos obrigatórios não preenchidos'));
    }

    const client_secret = crypto.randomBytes(32).toString('hex');

    // Log para depuração
    console.log('client_secret:', client_secret);

    const query = `
      INSERT INTO empresas (id_erp, razao_social, nome_fantasia, cnpj, telefone, endereco, numero, complemento, bairro, cidade, uf, cep, horario_funcionamento, taxa_entrega,slug, client_secret)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?, ?)
    `;

    db.query(query, [id_erp, razao_social, nome_fantasia, cnpj, telefone, endereco, numero, complemento, bairro, cidade, uf, cep, horario_funcionamento, taxa_entrega,slug, client_secret], (err, result) => {
      if (err) {
        console.error('Erro na execução da query:', err);
        return reject(err);
      }
      resolve({
        id: result.insertId,
        id_erp,
        razao_social,
        nome_fantasia,
        cnpj,
        telefone,
        endereco,
        numero,
        complemento,
        bairro,
        cidade,
        uf,
        cep,
        horario_funcionamento,
        taxa_entrega,
        slug,
        client_secret
      });
    });
  });
},

  // Editar uma empresa
  editar: (id, dados) => {
    return new Promise((resolve, reject) => {
      const campos = [];
      const valores = [];

      for (let campo in dados) {
        campos.push(`${campo} = ?`);
        valores.push(dados[campo]);
      }

      const query = `
        UPDATE empresas SET ${campos.join(', ')}, data_atualizacao = CURRENT_TIMESTAMP
        WHERE id = ?
      `;
      valores.push(id);

      db.query(query, valores, (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  },

  // Excluir uma empresa
  excluir: (id) => {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM empresas WHERE id = ?', [id], (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  },

  // Buscar uma empresa por ID
  buscarPorId: (id) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM empresas WHERE id = ?', [id], (err, results) => {
        if (err) return reject(err);
        resolve(results[0] || null);
      });
    });
  },

  // Listar todas as empresas
  buscarTodas: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT id,razao_social,nome_fantasia FROM empresas', (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  },
};

module.exports = Empresa;
