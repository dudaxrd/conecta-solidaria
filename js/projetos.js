export const projetos = [
    {
        id: "alimentar",
        nome: "Projeto Alimentar",
        status: "Ativo",
        descricao: "Arrecadação e distribuição de alimentos para famílias em situação de vulnerabilidade social."
    },
    {
        id: "educacional",
        nome: "Projeto Educacional",
        status: "Ativo",
        descricao: "Atividades educativas e arrecadação de materiais escolares para crianças e adolescentes."
    }
];

export function gerarCardsProjetos() {
    return projetos.map(function (projeto) {
        return `
            <article id="${projeto.id}">
                <h3>
                    ${projeto.nome}
                    <span class="badge">${projeto.status}</span>
                </h3>

                <p>${projeto.descricao}</p>
            </article>
        `;
    }).join("");
}