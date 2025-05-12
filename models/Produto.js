const db = require('../config/db');

const Produto = {
    // Cadastrar ou atualizar um produto
    criar: ({ empresa_id, nome, secao, descricao, preco, custo, ean, disponivel, codigo_externo, imagem_url, preco_promocional, preco_atacado, estoque_atual, estoque_minimo, unidade_medida }) => {
        return new Promise((resolve, reject) => {



            // Primeiro, verificar se o produto já existe para a empresa
            const queryCheck = `
                SELECT * FROM produtos WHERE empresa_id = ? AND codigo_externo = ?
            `;
            
            db.query(queryCheck, [empresa_id, codigo_externo], (err, results) => {
                if (err) {
                    console.error('Erro ao verificar produto existente:', err);
                    return reject(err);
                }

                // Se o produto já existir, fazer o update
                if (results.length > 0) {
                    const queryUpdate = `
                        UPDATE produtos SET 
                            nome = ?, secao = ?, descricao = ?, preco = ?, custo = ?, ean = ?, disponivel = ?, 
                            imagem_url = ?, preco_promocional = ?, preco_atacado = ?, 
                            estoque_atual = ?, estoque_minimo = ?, unidade_medida = ?
                        WHERE empresa_id = ? AND codigo_externo = ?
                    `;

                    db.query(queryUpdate, [
                        nome, secao, descricao, preco, custo, ean, disponivel, 
                        imagem_url, preco_promocional, preco_atacado, 
                        estoque_atual, estoque_minimo, unidade_medida,
                        empresa_id, codigo_externo
                    ], (err, result) => {
                        if (err) {
                            console.error('Erro ao atualizar produto:', err);
                            return reject(err);
                        }
                        resolve({
                            id: results[0].id, // ID do produto que foi atualizado
                            empresa_id,
                            nome,
                            secao,
                            descricao,
                            preco,
                            custo,
                            ean,
                            disponivel,
                            codigo_externo,
                            imagem_url,
                            preco_promocional,
                            preco_atacado,
                            estoque_atual,
                            estoque_minimo,
                            unidade_medida
                        });
                    });
                } else {
                    // Caso o produto não exista, fazer o insert
                    const queryInsert = `
                        INSERT INTO produtos (
                            empresa_id, nome, secao, descricao, preco, custo, ean, disponivel, 
                            codigo_externo, imagem_url, preco_promocional, preco_atacado, 
                            estoque_atual, estoque_minimo, unidade_medida
                        )
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                    `;

                    db.query(queryInsert, [
                        empresa_id, nome, secao, descricao, preco, custo, ean, disponivel,
                        codigo_externo, imagem_url, preco_promocional, preco_atacado,
                        estoque_atual, estoque_minimo, unidade_medida
                    ], (err, result) => {
                        if (err) {
                            console.error('Erro ao inserir produto:', err);
                            return reject(err);
                        }
                        resolve({
                            id: result.insertId, // ID do produto que foi inserido
                            empresa_id,
                            nome,
                            secao,
                            descricao,
                            preco,
                            custo,
                            ean,
                            disponivel,
                            codigo_externo,
                            imagem_url,
                            preco_promocional,
                            preco_atacado,
                            estoque_atual,
                            estoque_minimo,
                            unidade_medida
                        });
                    });
                }
            });
        });
    }
};

// Exemplo de função para buscar produtos por empresa_id
Produto.buscarPorEmpresaId = (empresa_id) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM produtos WHERE empresa_id = ?';
        db.query(query, [empresa_id], (err, results) => {
            if (err) {
                console.error('Erro ao buscar produtos:', err);
                return reject(err);
            }
            resolve(results);
        });
    });
};

module.exports = Produto;
