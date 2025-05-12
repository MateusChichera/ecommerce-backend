const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produtoController');
const autenticarEmpresa = require('../utils/AutenticarEmpresa');

// ✅ Rota pública - sem autenticação
router.get('/:id', produtoController.getProdutosByEmpresaId);

// 🔒 Rota protegida - com autenticação
router.post('/criar', autenticarEmpresa, produtoController.criarProduto);

module.exports = router;
