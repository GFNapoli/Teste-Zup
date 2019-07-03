veja = JSON.parse(window.localStorage.getItem("veja"));
onde = window.localStorage.getItem("pagina");
function ajeitaNome(nome){
    return nome.charAt(0).toUpperCase()+nome.slice(1);
}
function ajeitacidade(cidade,estado){
    var cidadeNome = cidade.charAt(0).toUpperCase()+cidade.slice(1);
    for(var i=0, j=cidadeNome.length;i<j;i++){
        if(cidadeNome.charAt(i) === " "){
            var paraMaiusculo = cidadeNome.charAt(i+1).toUpperCase();
            var pegaComeco = cidadeNome.slice(0,i+1);
            var pegaFim = cidadeNome.slice(i+2);
            cidadeNome = pegaComeco+paraMaiusculo+pegaFim; 
        }
    }
    switch(estado){
        case 'minas gerais':
            cidadeNome+=" - MG";
            break;
        case 'são paulo':
            cidadeNome+=" - SP";
            break;
        case 'rio de janeiro':
            cidadeNome+=" - RJ";
            break;
        case 'acre':
            cidadeNome+=" - Ac";
            break;
        case 'alagoas':
            cidadeNome+=" - AL";
            break;
        case 'amapá':
            cidadeNome+=" - AP";
            break;
        case 'amazonas':
            cidadeNome+=" - AM";
            break;
        case 'bahia':
            cidadeNome+=" - BA";
            break;
        case 'ceará':
            cidadeNome+=" - CE";
            break;
        case 'espírito santo':
            cidadeNome+=" - ES";
            break;
        case 'goiás':
            cidadeNome+=" - GO";
            break;
        case 'maranhão':
            cidadeNome+=" - MA";
            break;
        case 'mato grosso':
            cidadeNome+=" - MT";
            break;
        case 'mato grosso do sul':
            cidadeNome+=" - MS";
            break;
        case 'pará':
            cidadeNome+=" - PA";
            break;
        case 'paraíba':
            cidadeNome+=" - PB";
            break;
        case 'paraná':
            cidadeNome+=" - PR";
            break;
        case 'pernambuco':
            cidadeNome+=" - PE";
            break;
        case 'piauí':
            cidadeNome+=" - PI";
            break;
        case 'rio grande do norte':
            cidadeNome+=" - RN";
            break;
        case 'rio grande do sul':
            cidadeNome+=" - RS";
            break;
        case 'rondônia':
            cidadeNome+=" - RO";
            break;
        case 'santa catarina':
            cidadeNome+=" - SC";
            break;
        case 'sergipe':
            cidadeNome+=" - SE";
            break;
        case 'tocantins':
            cidadeNome+=" - TO";
            break;
        case 'distrito federal':
            cidadeNome+=" - DF";
            break;
        case 'roraima':
            cidadeNome+=" - RR";
            break;
    }
    return cidadeNome;
}
function volta(){
    window.localStorage.removeItem("veja");
    if(onde ==="1"){
        window.localStorage.removeItem("pagina");
        window.location.href = "index.html";
    }
    if(onde ==="4"){
        window.localStorage.removeItem("pagina");
        window.location.href = "atendidos.html";
    }
    if(onde =="3"){
        window.localStorage.removeItem("pagina");
        window.location.href = "lixeira.html";
    }
}
function monta(){
    var listaPessoa = document.getElementById("perfil");
    var nome = ajeitaNome(veja.name.first);
    var sobre = ajeitaNome(veja.name.last)
    var cidade = ajeitacidade(veja.location.city, veja.location.state);
    listaPessoa.innerText = '';
    listaPessoa.insertAdjacentHTML("beforeend",
    "<li id=\"FotoCandidato\">" +
    "<img src=\""+veja.picture.large+"\"alt=\"Foto Pessoa\">" +" </li>"+
    "<li id=\"NomeCandidato\">Nome: "+nome +"&nbsp;"+ sobre+" </li>"+
    "<li id=\"EmailCandidato\">Email: "+veja.email+" </li>"+
    "<li id=\"TelCandidato\">Telefone: "+veja.cell+" </li>"+
    "<li id=\"CidadeCandidato\">"+cidade+"</li>"+
    "<li id=\"idade\">Idade: "+veja.dob.age+"</li>"+
    "<li id=\"username\">Usuario: "+veja.login.username+"</li>"+
    "<li id=\"senha\">Senha: "+veja.login.password+"</li>"
    );
}
monta();