const Empresa = require('../models/Empresa.js');



//Criar uma nova empresa

exports.criarEmpresa = async (req, res) => {
  try {
    const {id_erp, razao_social, nome_fantasia, cnpj, telefone, endereco, numero, complemento, bairro, cidade, uf, cep, horario_funcionamento, taxa_entrega } = req.body;

    // Verifica se todos os campos obrigatórios foram enviados
    if (!razao_social || !nome_fantasia || !cnpj || !telefone || !endereco || !horario_funcionamento) {
      return res.status(400).json({ mensagem: 'Razão social, nome fantasia, CNPJ, telefone e endereço são obrigatórios' });

    }

    // Criar a empresa
    const resultado = await Empresa.criar({
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
        taxa_entrega
    });

    res.status(201).json({
      mensagem: 'Empresa criada com sucesso',
      empresaId: resultado.insertId
    });

  } catch (error) {
    console.error('Erro ao criar empresa:', error);
    res.status(500).json({ mensagem: 'Erro ao criar empresa', erro: error.message });
  }
}

// Atualizar empresa
exports.atualizarEmpresa = async (req, res) => {
  const { id } = req.params;
  try {
    await Empresa.editar(id, req.body);
    res.status(200).json({ mensagem: 'Empresa atualizada com sucesso' });
  } catch (error) {
    console.error('Erro ao atualizar empresa:', error);
    res.status(500).json({ mensagem: 'Erro ao atualizar empresa', erro: error.message });
  }
}
// Buscar empresa por ID
exports.getEmpresaById = async (req, res) => {
  const { id } = req.params;
  try {
    const empresa = await Empresa.buscarPorId(id);
    if (!empresa) {
      return res.status(404).json({ mensagem: 'Empresa não encontrada' });
    }
    res.status(200).json(empresa);
  } catch (error) {
    console.error('Erro ao buscar empresa:', error);
    res.status(500).json({ mensagem: 'Erro ao buscar empresa', erro: error.message });
  }
}