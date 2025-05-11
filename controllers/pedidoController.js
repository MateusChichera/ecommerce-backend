const Pedido = require('../models/Pedido');

exports.criarPedido = async (req, res) => {
  try {
    const novoPedido = await Pedido.criar(req.body);
    res.status(201).json({ message: 'Pedido criado com sucesso', pedidoId: novoPedido.insertId });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar o pedido' });
  }
};
