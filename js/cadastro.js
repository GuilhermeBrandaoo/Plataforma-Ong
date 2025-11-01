const form = document.querySelector("#form_ong")
const nameInput = document.querySelector("#nome_ong")
const emailInput = document.querySelector("#email_ong")
const cnpjInput = document.querySelector("#cnpj_ong")
const telefoneInput = document.querySelector("#telefone_ong")
const passwordInput = document.querySelector("#senha_ong")


document.getElementById('cnpj_ong').addEventListener('input', function(e) {
	var value = e.target.value;
	var rawValue = value.replace(/\D/g, ''); // Remove tudo que não é número

	// Verifica se o CNPJ tem 15 dígitos e se o primeiro dígito é '0'
	if (rawValue.length === 15 && rawValue.startsWith('0')) {
		// Verifica se, ao remover o '0', o restante é um CNPJ válido
		var potentialCNPJ = rawValue.substring(1);
		// Atualiza rawValue para o CNPJ sem o '0' inicial
		if (validaCNPJ(potentialCNPJ)) rawValue = potentialCNPJ;
	}

	var cnpjPattern = rawValue
					.replace(/^(\d{2})(\d)/, '$1.$2') // Adiciona ponto após o segundo dígito
					.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3') // Adiciona ponto após o quinto dígito
					.replace(/\.(\d{3})(\d)/, '.$1/$2') // Adiciona barra após o oitavo dígito
					.replace(/(\d{4})(\d)/, '$1-$2') // Adiciona traço após o décimo segundo dígito
					.replace(/(-\d{2})\d+?$/, '$1'); // Impede a entrada de mais de 14 dígitos
	e.target.value = cnpjPattern;
});

form.addEventListener("submit", (event) => {
    event.preventDefault();

    // Verifica se o nome está vazio
    if(nameInput.value == "") {
        alert("Por favor, preencha o nome")
        return;
    }

    // Verifica se o email está preenchido e é válido
    if(emailInput.value === "" || !isEmailValid(emailInput.value)) {
        alert("Email invalido")
        return;
    }

    // Verifica se o CNPJ é válido
    if (cnpjInput.value === "" || !isCNPJValid(cnpjInput.value)) {
        alert("CNPJ inválido. Verifique o número digitado.")
        return;
    }


    
    //Verifica se está preenchida
    if(!validatePassword(passwordInput.value, 8)) {
        alert("Senha precisa de no minimo 8 digitos")
        return;
    }

    // Se todos os campos estiverem corretamente preenchidos, envie o form
    alert("Cadastro realizado com sucesso!");
    form.submit();
})

// Função que valida email
function isEmailValid(email) {
    const emailRegex = new RegExp(
        /^[a-zA-Z-0-9._-]+@[a-zA-Z-0-9._-]+\.[a-zA-Z]{2,}$/ 

    )

    if (emailRegex.test(email)) {
        return true;
    } 
    return false;
}

function validatePassword (password, minDigits) {
    if (password.length >= minDigits) {
        return true;
    }
    return false
}

function isCNPJValid(cnpj) {
    // Remove tudo que não for número
    cnpj = cnpj.replace(/[^\d]+/g, '');

    // Verifica se tem 14 dígitos
    if (cnpj.length !== 14) {
        return false;
    }

    // Verifica se todos os dígitos são iguais (ex: 00000000000000)
    if (/^(\d)\1+$/.test(cnpj)) {
        return false;
    }

    // Cálculo dos dígitos verificadores
    let tamanho = cnpj.length - 2
    let numeros = cnpj.substring(0, tamanho)
    let digitos = cnpj.substring(tamanho)
    let soma = 0
    let pos = tamanho - 7

    for (let i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--
        if (pos < 2) pos = 9
    }

    let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11
    if (resultado != digitos.charAt(0)) return false

    tamanho = tamanho + 1
    numeros = cnpj.substring(0, tamanho)
    soma = 0
    pos = tamanho - 7

    for (let i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--
        if (pos < 2) pos = 9
    }

    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11
    if (resultado != digitos.charAt(1)) return false

    return true
}

const vform = document.querySelector("#form_voluntario")
const vnameInput = document.querySelector("#nome_voluntario")
const vemailInput = document.querySelector("#email_voluntario")
const vcpfInput = document.querySelector("#cpf")
const vcepInput = document.querySelector("#cep")
const vestadoInput = document.querySelector("#estado_voluntario")
const vcidadeInput = document.querySelector("#cidade")
const vtelefoneInput = document.querySelector("#telefone")
const vpasswordInput = document.querySelector("#senha_voluntario")

const cepInput = document.querySelector("#cep");

cepInput.addEventListener("input", function(e) {
    let value = e.target.value.replace(/\D/g, "").substring(0, 8);

    if (value.length > 5) {
        value = value.substring(0, 5) + "-" + value.substring(5);
    }

    e.target.value = value;
});



vform.addEventListener("submit", (event) => {
    event.preventDefault();

    // Verifica se o nome está vazio
    if(vnameInput.value.trim() == "") {
        alert("Por favor, preencha o nome")
        return;
    }

    if (vemailInput.value === "" || !isEmailValid(vemailInput.value)) {
    alert("E-mail inválido");
    return;
    }

    if (vcpfInput.value === "" || !isCPFValid(vcpfInput.value)) {
        alert("CPF invalido")
        return
    }

    if (vpasswordInput.value.length < 8) {
        alert("A senha deve ter pelo menos 8 caracteres");
        return;
    }

     // Valida o CEP
    if (!isCEPValid(vcepInput.value.trim())) {
        alert("CEP inválido");
        return;
    }

    if (vestadoInput.value === "") {
        alert("Por favor, selecione o estado")
    }

    if (vcidadeInput.value.trim() === "") {
     alert("Por favor, preencha o nome da cidade");
    return;
    }

    if (vtelefoneInput.value === "" || !isTelefoneValid(vtelefoneInput.value)) {
        alert("Telefone inválido. Use o formato (XX)XXXXX-XXXX");
        return;
    }



    alert("Cadastro de voluntário realizado com sucesso!");
     vform.submit();
})

function isCPFValid(cpf) {
  cpf = cpf.replace(/[^\d]+/g, '');

  if (cpf.length !== 11) return false;
  if (/^(\d)\1+$/.test(cpf)) return false;

  let soma = 0;
  let resto;

  for (let i = 1; i <= 9; i++) soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
  resto = (soma * 10) % 11;
  if ((resto === 10) || (resto === 11)) resto = 0;
  if (resto !== parseInt(cpf.substring(9, 10))) return false;

  soma = 0;
  for (let i = 1; i <= 10; i++) soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
  resto = (soma * 10) % 11;
  if ((resto === 10) || (resto === 11)) resto = 0;
  if (resto !== parseInt(cpf.substring(10, 11))) return false;

  return true;
}

function isCEPValid(cep) {
    // Remove traço antes de validar números
    const onlyNumbers = cep.replace(/\D/g, '');
    return onlyNumbers.length === 8; // CEP válido tem exatamente 8 dígitos
}

function isTelefoneValid(telefone) {
  const telefoneRegex = /^\(?\d{2}\)?[\s-]?\d{4,5}-?\d{4}$/;
  return telefoneRegex.test(telefone);
}



// Seleções 
const btnOng = document.querySelector('#btnOng');
const btnVol = document.querySelector('#btnVoluntario');
const formOng = document.querySelector('#form_ong');
const formVol = document.querySelector('#form_voluntario');

function setFormDisabled(formElement, disabled) {
  // desabilita todos os controles 
  const controls = formElement.querySelectorAll('input, select, textarea, button');
  controls.forEach(el => {
    // evite desabilitar botões que não sejam de envio se quiser
    el.disabled = disabled;
    // acessibilidade
    el.setAttribute('aria-disabled', disabled ? 'true' : 'false');
    // opcional: remover foco se estiver desabilitando
    if (disabled) el.blur();
  });

  // adiciona/remove classe para estilizar (ex.: opacidade)
  if (disabled) {
    formElement.classList.add('disabled');
    formElement.setAttribute('aria-hidden', 'true');
  } else {
    formElement.classList.remove('disabled');
    formElement.removeAttribute('aria-hidden');
  }
}

// Inicial: opcional — por exemplo, mostrar ambos habilitados
setFormDisabled(formOng, false);
setFormDisabled(formVol, false);

// Eventos dos botões
btnOng.addEventListener('click', () => {
  setFormDisabled(formOng, false);   // habilita ONG
  setFormDisabled(formVol, true);    // desabilita voluntário
  // opcional: colocar foco no primeiro input do formOng
  const first = formOng.querySelector('input, select, textarea');
  if (first) first.focus();
});

btnVol.addEventListener('click', () => {
  setFormDisabled(formVol, false);   // habilita voluntário
  setFormDisabled(formOng, true);    // desabilita ONG
  const first = formVol.querySelector('input, select, textarea');
  if (first) first.focus();
});


// Depois das validações da ONG
const novaOng = {
  nome: nameInput.value,
  email: emailInput.value,
  cnpj: cnpjInput.value,
  telefone: telefoneInput.value,
  senha: passwordInput.value
};

// Pega as ONGs salvas no localStorage 
let ongs = JSON.parse(localStorage.getItem("ongs")) || [];

// Adiciona a nova ONG no array
ongs.push(novaOng);

// Salva de volta no localStorage
localStorage.setItem("ongs", JSON.stringify(ongs));

alert("Cadastro de ONG realizado com sucesso!");
form.reset(); // limpa o formulário

// Depois das validações do voluntário
const novoVoluntario = {
  nome: vnameInput.value,
  email: vemailInput.value,
  cpf: vcpfInput.value,
  cep: vcepInput.value,
  estado: vestadoInput.value,
  cidade: vcidadeInput.value,
  telefone: vtelefoneInput.value,
  senha: vpasswordInput.value
};

let voluntarios = JSON.parse(localStorage.getItem("voluntarios")) || [];
voluntarios.push(novoVoluntario);
localStorage.setItem("voluntarios", JSON.stringify(voluntarios));

alert("Cadastro de voluntário realizado com sucesso!");
vform.reset();

const ongExiste = ongs.some(ong => ong.email === emailInput.value || ong.cnpj === cnpjInput.value);

if (ongExiste) {
  alert("Já existe uma ONG cadastrada com este e-mail ou CNPJ.");
  return;
}

const voluntarioExiste = voluntarios.some(vol => vol.email === vemailInput.value || vol.cpf === vcpfInput.value);

if (voluntarioExiste) {
  alert("Já existe um voluntário com este e-mail ou CPF.");
  return;
}
