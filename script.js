// Array que guarda as pessoas cadastradas
var pessoasStorage = []
// Evento que puxa os dados do localstorage assim que a pagina carrega
window.addEventListener('load',()=>{
    // Recupera os dados do localstorage
    pessoasStorage = JSON.parse(localStorage.getItem('pessoas')) || []
    // Exibe na tabela
    // Para cada pessoa registrada no array executa a função
    for(i = 0; i < pessoasStorage.length;i++){
        ExibirPessoa(pessoasStorage[i],i)
    }
})

// Seleciona os formulários
const form = document.querySelector('.form')

//Adiciona o evento de envio
form.addEventListener('submit',(event)=> {
    // Previne o recarregamento da página ao adicionar uma pessoa
    event.preventDefault()
    // Captura o valor do campo nome
    let nomePessoa = form.querySelector('#campo_nome').value
    // Captura o valor do campo nascimento
    let nascimentoPessoa = form.querySelector('#campo_nascimento').value
    // Cria um objeto com os dados da pessoa
    let novaPessoa = {
        nome:nomePessoa,
        nascimento:nascimentoPessoa
    }
    // Adiciona a pessoa no array
    let indice = pessoasStorage.push(novaPessoa) - 1
    console.log("nova pessoa na casa: ",indice ," pessoa: ", novaPessoa)
    // Exibe a pessoa na tabela
    ExibirPessoa(novaPessoa,indice)
    // Atualiza o array
    localStorage.setItem('pessoas',JSON.stringify(pessoasStorage))

    // Limpa os campos
    form.querySelector('#campo_nome').value = ''
    form.querySelector('#campo_nascimento').value = ''
})

// Função para exibir as pessoas na tabela
function ExibirPessoa(pessoa,indice){
    // Seleciona o tbody da tabela
    let conteudo_tabela = document.querySelector('.conteudo-tabela');
    // Cria uma nova linha
    let novaLinha = document.createElement('tr');
    novaLinha.dataset.index = indice
    // Cria uma nova célula
    let tdNome = document.createElement('td');
    // Atribui o valor da célula com o nome do objeto
    tdNome.textContent = pessoa.nome;
    // Cria a segunda célula
    let tdNascimento = document.createElement('td');
    // Formata o valor para DD-MM-AAAA
    const [ano,mes,dia] = pessoa.nascimento.split("-");
    const nascimentoFormatado = `${dia}/${mes}/${ano}`
    // Atribui o valor da célula com a data de nascimento do objeto
    tdNascimento.textContent = nascimentoFormatado
    // Cria uma célula para guardar o botão de editar e remover
    let tdEditar = document.createElement('td');
    let tdRemover = document.createElement('td');
    // Cria os botões
    let btnEditar = document.createElement('button');
    let btnRemover = document.createElement('button')
    // Adiciona os textos
    btnEditar.textContent = "Editar";
    btnRemover.textContent = "Remover"
    // Adiciona as classe
    btnEditar.classList.add('btn_editar');
    btnRemover.classList.add('btn_remover')
    // Adiciona uma função para editar os dados
    btnEditar.addEventListener('click', function(){
        editarPessoa(indice,pessoa.nome,pessoa.nascimento)
    })
    // Adiciona uma função para remover os dados
    btnRemover.addEventListener('click',function(){
        removerPessoa(indice)
    })
    // Adiciona o botão a célula
    tdEditar.appendChild(btnEditar)
    tdRemover.appendChild(btnRemover)
    // Adiciona as 3 células na nova linha
    novaLinha.appendChild(tdNome);
    novaLinha.appendChild(tdNascimento);
    novaLinha.appendChild(tdEditar);
    novaLinha.appendChild(tdRemover)
    // Adiciona a nova linha no tbody
    conteudo_tabela.appendChild(novaLinha);
}
// ---
var form_editar = document.querySelector('#form_editar');

function editarPessoa(indice, nome, nascimento) {
    
    // Exibe o form de edição
    form_editar.classList.add('ativo');

    let campo_id = form_editar.querySelector('#id_usuario')
    campo_id.value = indice
    // Preenche os campos de edição
    let campo_nome = form_editar.querySelector('#campo_nome_editar');
    campo_nome.value = nome;

    let campo_nascimento = form_editar.querySelector('#campo_nascimento_editar');
    campo_nascimento.value = nascimento;
}

function removerPessoa(indice){
    // Atualiza a tabela
    let conteudo_tabela = document.querySelector('.conteudo-tabela');
    let linha = conteudo_tabela.querySelector(`tr[data-index="${indice}"]`);

    // Remove a linha
    linha.remove();
    // Remove a pessoa do array
    pessoasStorage.splice(indice,1)
    // Atualiza o array
    localStorage.setItem('pessoas',JSON.stringify(pessoasStorage));
}

// Adiciona o event listener apenas uma vez
form_editar.addEventListener('submit', (event) => {
    event.preventDefault();

    // Seleciona os campos
    let campo_id = form_editar.querySelector('#id_usuario')
    let campo_nome = form_editar.querySelector('#campo_nome_editar');
    let campo_nascimento = form_editar.querySelector('#campo_nascimento_editar');

    // Captura os novos valores
    let indiceEmEdicao = campo_id.value
    let novoNome = campo_nome.value;
    let novoNascimento = campo_nascimento.value;

    // Atualiza o array no índice necessário
    pessoasStorage[indiceEmEdicao].nome = novoNome;
    pessoasStorage[indiceEmEdicao].nascimento = novoNascimento;

    // Atualiza o localStorage
    localStorage.setItem('pessoas', JSON.stringify(pessoasStorage));

    // Formata o valor para DD-MM-AAAA
    const [ano,mes,dia] = novoNascimento.split("-");
    const nascimentoFormatado = `${dia}/${mes}/${ano}`

    // Atualiza a tabela
    let conteudo_tabela = document.querySelector('.conteudo-tabela');
    let linha = conteudo_tabela.querySelector(`tr[data-index="${indiceEmEdicao}"]`);
    if (linha) {
        linha.children[0].textContent = novoNome;
        linha.children[1].textContent = nascimentoFormatado;
    }

    // Limpa os campos
    campo_id.value = ''
    campo_nome.value = ''
    campo_nascimento = ''

    // Esconde o form de edição
    form_editar.classList.remove('ativo'); 
});
