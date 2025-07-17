// Array que guarda as pessoas cadastradas
var pessoasStorage = []
// Evento que puxa os dados do localstorage assim que a pagina carrega
window.addEventListener('load',()=>{
    // Recupera os dados do localstorage
    pessoasStorage = JSON.parse(localStorage.getItem('pessoas')) || []
    // Exibe na tabela
    // Para cada pessoa registrada no array executa a função
    for(i = 0; i < pessoasStorage.length;i++){
        ExibirPessoa(pessoasStorage[i])
    }
})

// Seleciona o formulário
const form = document.querySelector('.form')
//Adiciona o evento de envio
form.addEventListener('submit',(event)=>{
    // Previne o recarregamento da página ao adicionar uma pessoa
    event.preventDefault()
    // Captura o valor do campo nome
    let nomePessoa = form.querySelector('#campo_nome').value
    // Captura o valor do campo nascimento
    let nascimentoPessoa = form.querySelector('#campo_nascimento').value
    // Exibe os dados capturados no console
    let novaPessoa = {
        nome:nomePessoa,
        nascimento:nascimentoPessoa
    }
    // Adiciona a pessoa no array
    pessoasStorage.push(novaPessoa)
    // Exibe a pessoa na tabela
    ExibirPessoa(novaPessoa)
    // Atualiza o array
    localStorage.setItem('pessoas',JSON.stringify(pessoasStorage))
})

// Função para exibir as pessoas na tabela
function ExibirPessoa(pessoa){
    // Seleciona o tbody da tabela
    let conteudo_tabela = document.querySelector('.conteudo-tabela');
    // Cria uma nova linha
    let novaLinha = document.createElement('tr');
    // Cria uma nova célula
    let tdNome = document.createElement('td');
    // Atribui o valor da célula com o nome do objeto
    tdNome.textContent = pessoa.nome;
    // Cria a segunda célula
    let tdNascimento = document.createElement('td');
    // Atribui o valor da célula com a data de nascimento do objeto
    tdNascimento.textContent = pessoa.nascimento;
    // Adiciona as 2 células na nova linha
    novaLinha.appendChild(tdNome)
    novaLinha.appendChild(tdNascimento)
    // Adiciona a nova linha no tbody
    conteudo_tabela.appendChild(novaLinha);
}