const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedidoController');

// Definir as rotas
router.post('/criar', pedidoController.criarPedido);
router.get('/:id', pedidoController.getPedidoById);

module.exports = router;
