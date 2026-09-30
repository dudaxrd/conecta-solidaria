export function obterCadastros() {
    return JSON.parse(
        localStorage.getItem("cadastros")
    ) || [];
}

export function salvarCadastro(cadastro) {
    const cadastrosSalvos = obterCadastros();

    cadastrosSalvos.push(cadastro);

    localStorage.setItem(
        "cadastros",
        JSON.stringify(cadastrosSalvos)
    );
}