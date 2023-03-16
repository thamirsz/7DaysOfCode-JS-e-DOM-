function checkValidity() {
  let nameField = document.querySelector('#name');
  let nameError = document.querySelector('#name + .error-message');
  let birthField = document.querySelector('birthdate');

  nameField.addEventListener('input', () => {
    nameField.setCustomValidity(""); // remove qualquer mensagem de erro personalizada existente
    const name = nameField.value; 
    const nameRegex = /^[A-Za-z ]*$/; // permite apenas letras e espaços em branco
    
    if (!nameRegex.test(name)){
      nameField.setCustomValidity("Insira apenas letras e espaços"); // define uma mensagem de erro personalizada
      nameError.textContent = "Insira apenas letras e espaços"; // exibe a mensagem de erro personalizada
      nameError.style.display = 'block'; // exibe a mensagem de erro
    } else {
      nameError.style.display = 'none'; // oculta a mensagem de erro
    }
  });
  
}



// função para exibir os dados salvos em uma tabela

function exibirDados() {
  const tbody = document.querySelector('.pessoas-js tbody');
  // Limpa o conteúdo do tbody
  tbody.innerHTML = '';

  // Obtém as pessoas do localStorage ou uma lista vazia se não existir
  const pessoas = JSON.parse(localStorage.getItem('pessoas')) || [];

  // Para cada pessoa no array de pessoas, cria uma nova linha na tabela e adiciona os botões de excluir e editar
  pessoas.forEach((pessoa, index) => {
    const tr = document.createElement('tr');
    const tdNome = document.createElement('td');
    tdNome.classList.add('tabela-nome')
    const tdAniversario = document.createElement('td');
    tdAniversario.classList.add('tabela-aniversario')
    const tdBotoes = document.createElement('td');


    // Adiciona os valores dos atributos 'nome' e 'birthdate' da pessoa nas células correspondentes
    tdNome.textContent = pessoa.nome;
    tdAniversario.textContent = pessoa.birthdate;
     
      // Formata a data de aniversário no formato DD/MM/AAAA
      const dataAniversario = new Date(pessoa.birthdate);
      const dia = dataAniversario.getDate().toString().padStart(2, '0');
      const mes = (dataAniversario.getMonth() + 1).toString().padStart(2, '0');
      const ano = dataAniversario.getFullYear().toString();
      tdAniversario.textContent = `${dia}/${mes}/${ano}`;
  

    // Cria o botão de excluir e adiciona um listener para removê-la do array de pessoas e do localStorage
    const btnExcluir = document.createElement('button');
    btnExcluir.classList.add('botao', 'botao-excluir')
    btnExcluir.textContent = 'Excluir';
    btnExcluir.addEventListener('click', () => {
      pessoas.splice(index, 1);
      localStorage.setItem('pessoas', JSON.stringify(pessoas));
      exibirDados();
    });

    // Cria o botão de editar e adiciona um listener para preencher o formulário com os dados da pessoa selecionada
    const btnEditar = document.createElement('button');
    btnEditar.classList.add('botao', 'botao-editar')
    btnEditar.textContent = 'Editar';
    btnEditar.addEventListener('click', () => {
      editIndex = index;
      fillFormWithPersonData(pessoa);
    });

    // Adiciona os botões de editar e excluir na célula correspondente
    tdBotoes.appendChild(btnEditar);
    tdBotoes.appendChild(btnExcluir);

    // Adiciona as células na linha criada e a linha no tbody da tabela
    tr.appendChild(tdNome);
    tr.appendChild(tdAniversario);
    tr.appendChild(tdBotoes);
    tbody.appendChild(tr);
  });
}


let editIndex = -1; // variável que guarda o índice da pessoa que será editada, inicialmente é -1


function fillFormWithPersonData(person) {
  const form = document.querySelector('.js-form');
  form.elements.name.value = person.nome; // preenche o campo de nome do formulário com o nome da pessoa que será editada
  form.elements.birthdate.value = person.birthdate; // preenche o campo de data de nascimento do formulário com a data de nascimento da pessoa que será editada
}

  // função para lidar com o envio do formulário
function handleFormSubmit(event) {
  event.preventDefault(); 

  const form = event.target; // obtém o formulário que foi submetido
  const nome = form.elements.name.value; // obtém o valor do campo de nome do formulário
  const birthdate = form.elements.birthdate.value; // obtém o valor do campo de data de nascimento do formulário


  const pessoa = { nome, birthdate };

  let pessoas = JSON.parse(localStorage.getItem('pessoas')) || []; // obtém as pessoas que já foram cadastradas ou cria um array vazio

  if (editIndex === -1) { // se não houver um índice de edição, ou seja, se for um novo cadastro
    pessoas.push(pessoa); // adiciona a nova pessoa ao array de pessoas
  } else { // caso contrário, se houver um índice de edição
    pessoas[editIndex] = pessoa; // substitui a pessoa editada no array de pessoas
    editIndex = -1; // reseta o índice de edição para -1
  }

  localStorage.setItem('pessoas', JSON.stringify(pessoas)); // salva as pessoas no localStorage em formato JSON
  
  exibirDados(); 

  form.reset(); // reseta o formulário para que possa ser usado novamente
}

checkValidity();

// adiciona um ouvinte de eventos para o envio do formulário
const form = document.querySelector('.js-form');
form.addEventListener('submit', handleFormSubmit);

// exibe os dados salvos em uma tabela quando a página é carregada
document.addEventListener('DOMContentLoaded', exibirDados);
