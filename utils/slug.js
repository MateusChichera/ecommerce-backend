function gerarSlug(nomeFantasia, cnpj) {
    const slugBase = nomeFantasia
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, '')  // remove acentos
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')      // espaços/especiais por hífen
        .replace(/^-+|-+$/g, '');         // remove hífens extras

    const cnpjInicio = cnpj.replace(/\D/g, '').substring(0, 4); // Pega os 4 primeiros dígitos do CNPJ
    return `${slugBase}-${cnpjInicio}`;
}

module.exports = { gerarSlug };
