
//class contato

class contato {
        constructor(nome, sobrenome, email, cpf, telefone, contatoTipo){
                this.nome = nome;
                this.sobrenome = sobrenome;
                this.email = email;
                this.cpf = cpf;
                this.telefone = telefone;
                this.contatoTipo = contatoTipo;
        }
}

function Post(form) {
   
    if(form && form.preventDefault) form.preventDefault();

    let data = new contato(form.elements.namedItem("nome").value,
                        form.elements.namedItem("sobrenome").value,
                        form.elements.namedItem("email").value,
                        form.elements.namedItem("cpf").value,
                        form.elements.namedItem("telefone").value,
                        form.elements.namedItem("contato").value);

    
    alert('Obrigado(a) ' + data.nome + '! Seus dados foram recebidos.');

    
    form.reset();
    return false;
}

function Enviar() {

    var nome = document.getElementById("nomeid");

    if (nome.value != "") {
        alert('Obrigado sr(a) ' + nome.value + ' os seus dados foram encaminhados com sucesso');
    }

}