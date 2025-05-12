const Produto = require('../models/Produto.js');

// Criar um novo produto a partir de um JSON
exports.criarProduto = async (req, res) => {
  try {
    // Verifica se o arquivo JSON foi enviado corretamente
    const { items } = req.body; // Assume que o JSON é enviado no corpo da requisição

    if (!items || !Array.isArray(items.listHelper)) {
      return res.status(400).json({ mensagem: 'JSON inválido, a lista de produtos não foi fornecida' });
    }

    // Itera sobre os itens e faz o insert no banco
    for (let item of items.listHelper) {
      // Coleta os campos do JSON e os mapeia para os campos da tabela 'produtos'
      const {
        nome,
        categoria,
        codigoBarra,
        departamento,
        descricao,
        idLoja,
        marca,
        plu,
        quantidadeAtacado,
        quantidadeEstoqueAtual,
        quantidadeEstoqueMinimo,
        subCategoria,
        unidade,
        validadeProxima,
        valor,
        valorAtacado,
        valorCompra,
        valorPromocao,
        volume,
      } = item;

      // Ajusta a lógica do JSON para os campos da tabela 'produtos'
      const produtoData = {
        empresa_id: idLoja,  // Aqui estou considerando que 'idLoja' será o 'empresa_id'
        nome,
        secao: departamento,  // Mapeando o 'departamento' para 'secao'
        descricao,
        preco: valor,  // Mapeando 'valor' para 'preco'
        custo: valorCompra,  // Mapeando 'valorCompra' para 'custo'
        ean: codigoBarra,  // Mapeando 'codigoBarra' para 'ean'
        disponivel: 1,  // Considerando disponível, caso o valor não venha como ativo ou falso
        codigo_externo: plu,  // Mapeando 'plu' para 'codigo_externo'
        imagem_url: '',  // O JSON não possui 'imagem_url', você pode optar por deixá-lo vazio ou ajustar conforme necessário
        preco_promocional: valorPromocao || null,  // Preço promocional
        preco_atacado: valorAtacado || null,  // Preço atacado
        estoque_atual: quantidadeEstoqueAtual || 0,  // Quantidade em estoque atual
        estoque_minimo: quantidadeEstoqueMinimo || 0,  // Quantidade em estoque mínimo
        unidade_medida: unidade || 'UNID',  // Unidade de medida
      };
      console.log('Produto a ser inserido:', produtoData);
      // Chama o método da model para salvar no banco
      const resultado = await Produto.criar(produtoData);

      // Caso não queira retornar todos os dados, apenas o ID do novo produto
      console.log('Produto inserido com sucesso:', resultado);
    }

    res.status(201).json({
      mensagem: 'Produtos criados com sucesso'
    });

  } catch (error) {
    console.error('Erro ao criar produto:', error);
    res.status(500).json({ mensagem: 'Erro ao criar produto', erro: error.message });
  }
}

// Atualizar produto (aqui você pode adaptar conforme sua necessidade, caso tenha um campo de atualização no JSON)
exports.atualizarProduto = async (req, res) => {
  const { id } = req.params;
  try {
    await Produto.editar(id, req.body);  // Método para editar o produto
    res.status(200).json({ mensagem: 'Produto atualizado com sucesso' });
  } catch (error) {
    console.error('Erro ao atualizar produto:', error);
    res.status(500).json({ mensagem: 'Erro ao atualizar produto', erro: error.message });
  }
}

// Buscar produto por ID
exports.getProdutoById = async (req, res) => {
  const { id } = req.params;
  try {
    const produto = await Produto.buscarPorId(id);  // Método para buscar produto por ID
    if (!produto) {
      return res.status(404).json({ mensagem: 'Produto não encontrado' });
    }
    res.status(200).json(produto);
  } catch (error) {
    console.error('Erro ao buscar produto:', error);
    res.status(500).json({ mensagem: 'Erro ao buscar produto', erro: error.message });
  }
}

// Buscar produtos por empresa_id
exports.getProdutosByEmpresaId = async (req, res) => {
  const empresa_slug = req.params.slug;
  try {
    const produtos = await Produto.buscarPorEmpresaId(empresa_slug);  // Método para buscar produtos por empresa_id
    if (!produtos || produtos.length === 0) {
      return res.status(404).json({ mensagem: 'Nenhum produto encontrado para esta empresa' });
    }
    res.status(200).json(produtos);
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    res.status(500).json({ mensagem: 'Erro ao buscar produtos', erro: error.message });
  }
}
