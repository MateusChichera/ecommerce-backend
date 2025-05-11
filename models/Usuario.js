const db = require('../config/db');


const Usuario = {
  // Cadastrar um novo usuário
  criar: ({ empresa_id, nome, email, senha, role, ativo = true }) => {
    return new Promise((resolve, reject) => {
      const query = `
        INSERT INTO usuarios (empresa_id, nome, email, senha, role, ativo)
        VALUES (?, ?, ?, ?, ?, ?)
      `;
      db.query(query, [empresa_id, nome, email, senha, role, ativo], (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  },

  // Editar um usuário
  editar: (id, dados) => {
    return new Promise((resolve, reject) => {
      const campos = [];
      const valores = [];

      for (let campo in dados) {
        campos.push(`${campo} = ?`);
        valores.push(dados[campo]);
      }

      const query = `
        UPDATE usuarios SET ${campos.join(', ')}, data_atualizacao = CURRENT_TIMESTAMP
        WHERE id = ?
      `;
      valores.push(id);

      db.query(query, valores, (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  },

  // Excluir um usuário
  excluir: (id) => {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM usuarios WHERE id = ?', [id], (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  },

  // Buscar um usuário por ID
  buscarPorId: (id) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM usuarios WHERE id = ?', [id], (err, results) => {
        if (err) return reject(err);
        resolve(results[0] || null);
      });
    });
  },

  // Buscar todos os usuários da empresa
  listarPorEmpresa: (empresa_id) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM usuarios WHERE empresa_id = ?', [empresa_id], (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  },
};

module.exports = Usuario;
