
function checkValidity(){
let nameField = document.querySelector('#name');
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

    // recupera os dados salvos localmente e exibe-os em uma tabela
    const pessoas = JSON.parse(localStorage.getItem('pessoas')) || [];
    pessoas.forEach((pessoa, index) => {
      const tr = document.createElement('tr');
      const tdNome = document.createElement('td');
      const tdAniversario = document.createElement('td');
      const tdExcluir = document.createElement('td'); // nova coluna para o botão de excluir
      
      tdNome.textContent = pessoa.nome;
      
    const data = new Date(pessoa.aniversario);
    // formata a data para o formato "DD/MM/AAAA"
    tdAniversario.textContent = data.toLocaleDateString('pt-BR');

      // cria um botão de "Excluir" para cada linha
      const btnExcluir = document.createElement('button');
      btnExcluir.textContent = 'Excluir';
      btnExcluir.addEventListener('click', () => {
        // remove o item selecionado da tabela e dos dados salvos no armazenamento local
        pessoas.splice(index, 1);
        localStorage.setItem('pessoas', JSON.stringify(pessoas));
        exibirDados(); // atualiza a tabela após a exclusão
      });

    tdExcluir.appendChild(btnExcluir); // adiciona o botão à nova coluna
    tr.appendChild(tdNome);
    tr.appendChild(tdAniversario);  
    tr.appendChild(tdExcluir); // adiciona a nova coluna à linha
    tbody.appendChild(tr);
  });
}
// função para lidar com o envio do formulário
function handleFormSubmit(event) {
  // impede o comportamento padrão do formulário
  event.preventDefault();

  // coleta os valores do formulário
  const form = event.target;
  const nome = form.elements.name.value;
  const aniversario = form.elements.birthdate.value;

  // cria um objeto pessoa com os valores coletados
  const pessoa = { nome, aniversario };

  // recupera os dados salvos localmente e adiciona a nova pessoa
  const pessoas = JSON.parse(localStorage.getItem('pessoas')) || [];
  pessoas.push(pessoa);

  // salva os dados localmente
  localStorage.setItem('pessoas', JSON.stringify(pessoas));

  // exibe os dados salvos em uma tabela
  exibirDados();

  // reseta o formulário
  form.reset();
};

// adiciona um ouvinte de eventos para o envio do formulário
const form = document.querySelector('.js-form');
form.addEventListener('submit', handleFormSubmit);

// exibe os dados salvos em uma tabela quando a página é carregada
document.addEventListener('DOMContentLoaded', exibirDados);


