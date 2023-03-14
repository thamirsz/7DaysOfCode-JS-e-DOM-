
function checkValidity(){
let nameField = document.querySelector('#name');
let birthdate = document.querySelector('#birthdate');
// Adiciona um ouvinte de evento de entrada ao campo de entrada de nome
nameField.addEventListener('input', () => {
  nameField.setCustomValidity(""); // remove qualquer mensagem de erro personalizada existente
  const name = nameField.value; 
  const nameRegex = /^[a-zA-Z\s]*$/; 

  // Verifica se o valor do campo de entrada de nome não corresponde à expressão regular
  if (!nameRegex.test(name)){
    nameField.setCustomValidity("Insira apenas letras e espaços"); // define uma mensagem de erro personalizada
  }
});

nameField.addEventListener('change', () => {
  if (nameField.checkValidity()) {
    nameField.setCustomValidity(""); // remove qualquer mensagem de erro personalizada existente se o valor do campo for válido
  }
});
 
}


// função para exibir os dados salvos em uma tabela

function exibirDados() {
  const tbody = document.querySelector('.pessoas-js tbody');
  tbody.innerHTML = '';

  const pessoas = JSON.parse(localStorage.getItem('pessoas')) || [];
  pessoas.forEach((pessoa, index) => {
    const tr = document.createElement('tr');
    const tdNome = document.createElement('td');
    const tdAniversario = document.createElement('td');
    const tdBotoes = document.createElement('td');

    tdNome.textContent = pessoa.nome;
    tdAniversario.textContent = pessoa   .birthdate;

    const btnExcluir = document.createElement('button');
    btnExcluir.textContent = 'Excluir';
    btnExcluir.addEventListener('click', () => {
      pessoas.splice(index, 1);
      localStorage.setItem('pessoas', JSON.stringify(pessoas));
      exibirDados();
    });

    const btnEditar = document.createElement('button');
    btnEditar.textContent = 'Editar';
    btnEditar.addEventListener('click', () => {
      editIndex = index;
      fillFormWithPersonData(pessoa);
    });

    tdBotoes.appendChild(btnEditar);
    tdBotoes.appendChild(btnExcluir);
    tr.appendChild(tdNome);
    tr.appendChild(tdAniversario);
    tr.appendChild(tdBotoes);
    tbody.appendChild(tr);
  });
}

let editIndex = -1;

function fillFormWithPersonData(person) {
  const form = document.querySelector('.js-form');
  form.elements.name.value = person.nome;
  form.elements.birthdate.value = person.birthdate;
}

function handleFormSubmit(event) {
  event.preventDefault();

  const form = event.target;
  const nome = form.elements.name.value;
  const birthdate = form.elements.birthdate.value;

  const pessoa = { nome, birthdate };

  let pessoas = JSON.parse(localStorage.getItem('pessoas')) || [];

  if (editIndex === -1) {
    pessoas.push(pessoa);
  } else {
    pessoas[editIndex] = pessoa;
    editIndex = -1;
  }

  localStorage.setItem('pessoas', JSON.stringify(pessoas));

  exibirDados();

  form.reset();
} 

// função para lidar com o envio do formulário

// adiciona um ouvinte de eventos para o envio do formulário
const form = document.querySelector('.js-form');
form.addEventListener('submit', handleFormSubmit);

// exibe os dados salvos em uma tabela quando a página é carregada
document.addEventListener('DOMContentLoaded', exibirDados);
