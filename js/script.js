import { gerarCardsProjetos } from "./projetos.js";
import { configurarFormulario } from "./formulario.js";

/* Menu hambúrguer */
const botaoMenu = document.querySelector(".menu-toggle");
const menu = document.querySelector("nav");

if (botaoMenu && menu) {
    botaoMenu.addEventListener("click", function () {
        menu.classList.toggle("ativo");
    });
}

/* Navegação SPA */
const conteudo = document.getElementById("conteudo");

function carregarPagina() {
    const rota = window.location.hash || "#inicio";

    if (!conteudo) {
        return;
    }

    /* Página inicial */
    if (rota === "#inicio") {
        conteudo.innerHTML = `
            <section>
                <h2>Quem somos</h2>

                <img src="../imagens/voluntarios.png"
                    alt="Voluntários participando de uma ação solidária"
                    width="600">

                <p>
                    A Conecta Solidária é uma ONG que busca apoiar pessoas e comunidades por meio de ações sociais e projetos solidários.
                </p>
            </section>

            <section>
                <h2>Nossa Missão</h2>

                <p>
                    Nossa missão é conectar pessoas que desejam ajudar a iniciativas que promovem solidariedade e transformação social.
                </p>
            </section>

            <section>
                <h2>Entre em Contato</h2>
                <p>E-mail: contato@conectasolidaria.org</p>
                <p>Telefone: (11) 99999-9999</p>
            </section>
        `;
    }

    /* Página de projetos */
    if (rota === "#projetos") {
        const cardsProjetos = gerarCardsProjetos();

        conteudo.innerHTML = `
            <section>
                <h2>Nossos Projetos</h2>

                <div class="alerta">
                    <strong>Atenção!</strong>
                    Estamos recebendo doações de alimentos e materiais escolares para nossos projetos.
                </div>

                <div class="grid">
                    ${cardsProjetos}
                </div>
            </section>

            <section>
                <h2>Voluntariado</h2>

                <p>
                    Os voluntários podem participar das ações da Conecta Solidária,
                    ajudando na organização e realização dos projetos sociais.
                </p>

                <p>
                    Para participar, acesse a página de cadastro e escolha a opção Voluntário.
                </p>

                <a href="#cadastro">Quero ser voluntário</a>
            </section>

            <section>
                <h2>Doações</h2>

                <p>
                    As doações ajudam a manter os projetos e as ações realizadas pela Conecta Solidária.
                </p>

                <p>
                    Para contribuir, acesse a página de cadastro e escolha a opção Doador.
                </p>

                <a href="#cadastro">Quero fazer uma doação</a>
            </section>
        `;
    }

    /* Página de cadastro */
    if (rota === "#cadastro") {
        conteudo.innerHTML = `
            <section>
                <h2>Como Participar</h2>

                <p>
                    Preencha o formulário abaixo para se cadastrar e participar das ações da Conecta Solidária.
                </p>

                <form id="formulario-cadastro" novalidate>
                    <fieldset>
                        <legend>Dados pessoais</legend>

                        <label for="nome">Nome completo:</label>
                        <input type="text" id="nome" name="nome" required>

                        <br><br>

                        <label for="email">E-mail:</label>
                        <input type="email" id="email" name="email" required>

                        <br><br>

                        <label for="nascimento">Data de nascimento:</label>
                        <input type="date" id="nascimento" name="nascimento" required>

                        <br><br>

                        <label for="cpf">CPF:</label>
                        <input type="text" id="cpf" name="cpf"
                            placeholder="000.000.000-00"
                            maxlength="14" required>

                        <br><br>

                        <label for="telefone">Telefone:</label>
                        <input type="tel" id="telefone" name="telefone"
                            placeholder="(00) 00000-0000"
                            maxlength="15" required>
                    </fieldset>

                    <br>

                    <fieldset>
                        <legend>Endereço</legend>

                        <label for="cep">CEP:</label>
                        <input type="text" id="cep" name="cep"
                            placeholder="00000-000"
                            maxlength="9" required>

                        <br><br>

                        <label for="endereco">Endereço:</label>
                        <input type="text" id="endereco" name="endereco" required>

                        <br><br>

                        <label for="cidade">Cidade:</label>
                        <input type="text" id="cidade" name="cidade" required>

                        <br><br>

                        <label for="estado">Estado:</label>
                        <input type="text" id="estado" name="estado" required>
                    </fieldset>

                    <br>

                    <fieldset>
                        <legend>Participação</legend>

                        <p>Como deseja participar?</p>

                        <input type="radio" id="voluntario"
                            name="participacao" value="voluntario" required>
                        <label for="voluntario">Voluntário</label>

                        <input type="radio" id="doador"
                            name="participacao" value="doador">
                        <label for="doador">Doador</label>

                        <div id="erro-participacao"></div>
                    </fieldset>

                    <br>

                    <button type="submit">Cadastrar</button>
                </form>

                <p id="historico-cadastros"></p>
            </section>
        `;

        configurarFormulario();
    }
}

window.addEventListener("hashchange", carregarPagina);

carregarPagina();