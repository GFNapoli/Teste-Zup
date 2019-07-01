var dataResponse = [];
var lixo = [];
var todos = [];
var appConstants={
    pessoaLista: 'ListaPessoa'
}
function MandaVeja(n){
    window.localStorage.setItem("veja", JSON.stringify(dataResponse.results[n]));
    window.localStorage.setItem("pagina","4");
    window.location.href = "veja.html";
}
function MandaLixo(n){
    todos = JSON.parse(window.localStorage.getItem("vizualizar"));
    var j = todos.results.length;
    for(var i = 0; i<j; i++){
        if(dataResponse.results[n].email===todos.results[i].email){
            lixo = JSON.parse(window.localStorage.getItem("lixeira"));
            lixo.results.push(dataResponse.results[n]);
            window.localStorage.removeItem("lixeira");
            window.localStorage.setItem("lixeira", JSON.stringify(lixo));
            todos.results.splice(i,1);
            window.localStorage.removeItem("vizualizar");
            window.localStorage.setItem("vizualizar", JSON.stringify(todos));
        }
    }
}
function MandaTodos(n){
    lixo = JSON.parse(window.localStorage.getItem("lixeira"));
    var j = lixo.results.length;
    for(var i = 0; i<j; i++){
        if(dataResponse.results[n].email===lixo.results[i].email){
            todos = JSON.parse(window.localStorage.getItem("vizualizar"));
            todos.results.push(dataResponse.results[n]);
            window.localStorage.removeItem("vizualizar");
            window.localStorage.setItem("vizualizar", JSON.stringify(todos));
            lixo.results.splice(i,1);
            window.localStorage.removeItem("lixeira");
            window.localStorage.setItem("lixeira", JSON.stringify(lixo));
        }
    }
}
function filterNome(nome) {
    var inputSearchElement = document.getElementById("search");
    var inputSearchValue = inputSearchElement.value;
    return nome.name.first.toUpperCase().includes(inputSearchValue.toUpperCase())
}
function onFilterLPessoas() {
    var dataResponseFilter = dataResponse.results;
    dataResponseFilter = dataResponseFilter.filter(filterNome);
    renderList(dataResponseFilter);
}
function setOnFilterPessoas(){
    var searchElement = document.getElementById("search");
    searchElement.addEventListener('keyup', onFilterLPessoas);
}
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
function perfilUser(usuario){
    var perfil = document.getElementById("ImagemUser");
    perfil.innerText='';
    perfil.insertAdjacentHTML("beforeend",
    "<img id=\"imagemPerfil\" src=\""+usuario[0].picture.medium+"\"alt=\"Foto Usuario\">");
}
function RenderCandidatos (listatributos,i) {
    var pessoa = '';
    var nome = ajeitaNome(listatributos.name.first);
    var cidade = ajeitacidade(listatributos.location.city, listatributos.location.state);
    pessoa = "<li  onclick = \" MandaVeja("+i+")\" class=\"FotoCandidato\">" +
            "<img  onclick = \" MandaVeja("+i+")\" src=\""+listatributos.picture.medium+"\"alt=\"Foto Pessoa\">" +" </li>"+
            "<li  onclick = \" MandaVeja("+i+")\" class=\"NomeCandidato\">"+nome+" </li>"+
            "<li  onclick = \" MandaVeja("+i+")\" class=\"EmailCandidato\">"+listatributos.email+" </li>"+
            "<li  onclick = \" MandaVeja("+i+")\" class=\"TelCandidato\">"+listatributos.cell+" </li>"+
            "<li  onclick = \" MandaVeja("+i+")\" class=\"CidadeCandidato\">"+cidade+"</li>"+
            "<li class=\"BotoesCandidato\"><i class=\"fas fa-trash\" onclick = \"MandaLixo("+i+")\"></i> </li>"+
            "<li class=\"BotoesCandidato2\"><i class=\"fas fa-border-none\" onclick = \"MandaTodos("+i+")\"></i> </li>";
    return pessoa;
}
function renderList (listSection) {
    var listaPessoas = document.getElementById(appConstants.pessoaLista);
    listaPessoas.innerText = '';
    if(listSection && listSection.length > 0){
        for(var i=0; i<listSection.length; i++) {
            if(i===0){
                listaPessoas.insertAdjacentHTML("beforeend",
                "<section class=\"PsecaoCandidato\">" +
                "<ul>"+RenderCandidatos(listSection[i],i)+"</ul>" +
                "</section>"
            );
            }
            else{
                listaPessoas.insertAdjacentHTML("beforeend",
                "<section class=\"secaoCandidato\">" +
                "<ul>"+RenderCandidatos(listSection[i],i)+"</ul>" +
                "</section>"
                );
            }
        }
    }
}
function checadados(){
    if(window.localStorage.length===0){
        return false;
    }
    else{
        dataResponse = JSON.parse(window.localStorage.getItem("visto"));
        var user = JSON.parse(window.localStorage.getItem("userMain"));
        renderList(dataResponse.results);
        perfilUser(user.results);
        setOnFilterPessoas();
    }
}
checadados();