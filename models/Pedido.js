const db = require('../config/db');

const Pedido = {
  criar: ({ cliente_id, empresa_id, status, valor_total, metodo_pagamento }) => {
    return new Promise((resolve, reject) => {
      const query = `
        INSERT INTO pedidos (cliente_id, empresa_id, status, valor_total, metodo_pagamento)
        VALUES (?, ?, ?, ?, ?)
      `;
      db.query(query, [cliente_id, empresa_id, status, valor_total, metodo_pagamento], (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  },
};

module.exports = Pedido;
