const express = require ('express');
const router = express.Router ();   
const usuarioController = require ('../controllers/usuarioController');




router.post ('/criar', usuarioController.criarUsuario);
router.get ('/:id', usuarioController.getUsuarioById);
router.put ('/:id', usuarioController.atualizarUsuario);
router.delete ('/:id', usuarioController.deletarUsuario);


module.exports = router;