const Usuario = require('../models/Usuario.js');
const bcrypt = require('bcrypt');

// Criar um novo usuário
exports.criarUsuario = async (req, res) => {
  try {
    const { nome, email, senha, empresa_id, role, ativo } = req.body;

    // Verifica se todos os campos obrigatórios foram enviados
    if (!nome || !email || !senha) {
      return res.status(400).json({ mensagem: 'Nome, e-mail e senha são obrigatórios' });
    }

    // Criptografar a senha
    const hashedSenha = await bcrypt.hash(senha, 10);

    // Criar o usuário
    const resultado = await Usuario.criar({
      empresa_id,
      nome,
      email,
      senha: hashedSenha,
      role,
      ativo
    });

    res.status(201).json({
      mensagem: 'Usuário criado com sucesso',
      usuarioId: resultado.insertId
    });

  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    res.status(500).json({ mensagem: 'Erro ao criar usuário', erro: error.message });
  }
};

// Buscar usuário por ID
exports.getUsuarioById = async (req, res) => {
  const { id } = req.params;
  try {
    const usuario = await Usuario.buscarPorId(id);
    if (!usuario) {
      return res.status(404).json({ mensagem: 'Usuário não encontrado' });
    }
    res.status(200).json(usuario);
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    res.status(500).json({ mensagem: 'Erro ao buscar usuário', erro: error.message });
  }
};

// Atualizar usuário
exports.atualizarUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    await Usuario.editar(id, req.body);
    res.status(200).json({ mensagem: 'Usuário atualizado com sucesso' });
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    res.status(500).json({ mensagem: 'Erro ao atualizar usuário', erro: error.message });
  }
};

// Deletar usuário
exports.deletarUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    await Usuario.excluir(id);
    res.status(200).json({ mensagem: 'Usuário excluído com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar usuário:', error);
    res.status(500).json({ mensagem: 'Erro ao deletar usuário', erro: error.message });
  }
};
