import { obterCadastros, salvarCadastro } from "./storage.js";

export function configurarFormulario() {
    const formulario = document.getElementById("formulario-cadastro");
    const cpf = document.getElementById("cpf");
    const telefone = document.getElementById("telefone");
    const cep = document.getElementById("cep");
    const historicoCadastros = document.getElementById("historico-cadastros");

    function atualizarHistorico() {
        const cadastrosSalvos = obterCadastros();

        historicoCadastros.textContent =
            "Cadastros realizados: " + cadastrosSalvos.length;
    }

    atualizarHistorico();

    /* Máscara do CPF */
    cpf.addEventListener("input", function () {
        let valor = cpf.value.replace(/\D/g, "").slice(0, 11);

        valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
        valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
        valor = valor.replace(/(\d{3})(\d{1,2})$/, "$1-$2");

        cpf.value = valor;
    });

    /* Máscara do telefone */
    telefone.addEventListener("input", function () {
        let valor = telefone.value.replace(/\D/g, "").slice(0, 11);

        valor = valor.replace(/^(\d{2})(\d)/, "($1) $2");
        valor = valor.replace(/(\d{5})(\d{1,4})$/, "$1-$2");

        telefone.value = valor;
    });

    /* Máscara do CEP */
    cep.addEventListener("input", function () {
        let valor = cep.value.replace(/\D/g, "").slice(0, 8);

        valor = valor.replace(/(\d{5})(\d)/, "$1-$2");

        cep.value = valor;
    });

    function mostrarErro(campo, mensagem) {
        campo.classList.remove("campo-sucesso");
        campo.classList.add("campo-erro");

        let mensagemErro = document.querySelector(
            `.mensagem-erro[data-campo="${campo.id}"]`
        );

        if (!mensagemErro) {
            mensagemErro = document.createElement("span");
            mensagemErro.classList.add("mensagem-erro");
            mensagemErro.dataset.campo = campo.id;
            mensagemErro.setAttribute("role", "alert");
            campo.insertAdjacentElement("afterend", mensagemErro);
        }

        mensagemErro.textContent = mensagem;
    }

    function mostrarSucesso(campo) {
        campo.classList.remove("campo-erro");
        campo.classList.add("campo-sucesso");

        const mensagemErro = document.querySelector(
            `.mensagem-erro[data-campo="${campo.id}"]`
        );

        if (mensagemErro) {
            mensagemErro.remove();
        }
    }

    formulario.addEventListener("submit", function (event) {
        event.preventDefault();

        let formularioValido = true;

        const nome = document.getElementById("nome");
        const email = document.getElementById("email");
        const nascimento = document.getElementById("nascimento");
        const endereco = document.getElementById("endereco");
        const cidade = document.getElementById("cidade");
        const estado = document.getElementById("estado");

        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const regexCpf = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
        const regexTelefone = /^\(\d{2}\) \d{5}-\d{4}$/;
        const regexCep = /^\d{5}-\d{3}$/;

        if (nome.value.trim() === "") {
            mostrarErro(nome, "Preencha o nome completo.");
            formularioValido = false;
        } else {
            mostrarSucesso(nome);
        }

        if (!regexEmail.test(email.value.trim())) {
            mostrarErro(email, "Digite um e-mail válido.");
            formularioValido = false;
        } else {
            mostrarSucesso(email);
        }

        if (nascimento.value === "") {
            mostrarErro(nascimento, "Informe a data de nascimento.");
            formularioValido = false;
        } else {
            mostrarSucesso(nascimento);
        }

        if (!regexCpf.test(cpf.value)) {
            mostrarErro(cpf, "Digite um CPF no formato 000.000.000-00.");
            formularioValido = false;
        } else {
            mostrarSucesso(cpf);
        }

        if (!regexTelefone.test(telefone.value)) {
            mostrarErro(
                telefone,
                "Digite um telefone no formato (00) 00000-0000."
            );
            formularioValido = false;
        } else {
            mostrarSucesso(telefone);
        }

        if (!regexCep.test(cep.value)) {
            mostrarErro(cep, "Digite um CEP no formato 00000-000.");
            formularioValido = false;
        } else {
            mostrarSucesso(cep);
        }

        if (endereco.value.trim() === "") {
            mostrarErro(endereco, "Preencha o endereço.");
            formularioValido = false;
        } else {
            mostrarSucesso(endereco);
        }

        if (cidade.value.trim() === "") {
            mostrarErro(cidade, "Preencha a cidade.");
            formularioValido = false;
        } else {
            mostrarSucesso(cidade);
        }

        if (estado.value.trim() === "") {
            mostrarErro(estado, "Preencha o estado.");
            formularioValido = false;
        } else {
            mostrarSucesso(estado);
        }

        const participacao = document.querySelector(
            'input[name="participacao"]:checked'
        );

        const erroParticipacao =
            document.getElementById("erro-participacao");

        erroParticipacao.setAttribute("role", "alert");

        if (!participacao) {
            erroParticipacao.textContent =
                "Escolha uma forma de participação.";

            erroParticipacao.classList.add("mensagem-erro");
            formularioValido = false;
        } else {
            erroParticipacao.textContent = "";
            erroParticipacao.classList.remove("mensagem-erro");
        }

        if (formularioValido) {
            const cadastro = {
                nome: nome.value,
                email: email.value,
                nascimento: nascimento.value,
                cpf: cpf.value,
                telefone: telefone.value,
                cep: cep.value,
                endereco: endereco.value,
                cidade: cidade.value,
                estado: estado.value,
                participacao: participacao.value
            };

            salvarCadastro(cadastro);

            atualizarHistorico();

            Swal.fire({
                icon: "success",
                title: "Cadastro realizado!",
                text: "Seu cadastro foi realizado com sucesso.",
                confirmButtonText: "OK"
            });
        }
    });
}