// Seleciona o formulário
const form = document.querySelector('.form')
//Adiciona o evento de envio
form.addEventListener('submit',(event)=>{
    event.preventDefault()
    // Captura o valor do campo nome
    let nome = form.querySelector('#campo_nome').value
    // Captura o valor do campo nascimento
    let nascimento = form.querySelector('#campo_nascimento').value
    // Exibe os dados capturados no console
    console.log(nome)
    console.log(nascimento)
})


