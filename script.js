var appConstants={
    pessoaLista: 'ListaPessoa'
}
var dataResponse = [];
function teste1(){
    alert("click");
}
function filterNome(nome) {
    var inputSearchElement = document.getElementById("search");
    var inputSearchValue = inputSearchElement.value;
    return nome.name.first.toUpperCase().includes(inputSearchValue.toUpperCase())
}
function onFilterLPessoas() {
    var dataResponseFilter = JSON.parse(JSON.stringify(dataResponse.results));
    console.log(dataResponseFilter);
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
function RenderCandidatos (listatributos) {
    var pessoa = '';
    var nome = ajeitaNome(listatributos.name.first)
    var cidade = ajeitacidade(listatributos.location.city, listatributos.location.state);
    pessoa = "<li class=\"FotoCandidato\">" +
            "<img src=\""+listatributos.picture.medium+"\"alt=\"Foto Pessoa\">" +" </li>"+
            "<li class=\"NomeCandidato\">"+nome+" </li>"+
            "<li class=\"EmailCandidato\">"+listatributos.email+" </li>"+
            "<li class=\"TelCandidato\">"+listatributos.cell+" </li>"+
            "<li class=\"CidadeCandidato\">"+cidade+"</li>"+
            "<li class=\"BotoesCandidato\"><i class=\"fas fa-trash\" onclick = \"teste1()\"></i> </li>"+
            "<li class=\"BotoesCandidato2\"><i class=\"fas fa-border-none\" onclick = \"teste1()\"></i> </li>"+
            "<li class=\"BotoesCandidato3\"><i class=\"fas fa-check\" onclick = \"teste1()\"></i> </li>";
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
                "<ul>"+RenderCandidatos(listSection[i])+"</ul>" +
                "</section>"
            );
            }
            else{
                listaPessoas.insertAdjacentHTML("beforeend",
                "<section class=\"secaoCandidato\">" +
                "<ul>"+RenderCandidatos(listSection[i])+"</ul>" +
                "</section>"
                );
            }
        }
    }
}
function processRequest(response) {
    try {
        return JSON.parse(response);
    } catch (e) {
        return null
    }
}
function doRequest() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            var response = processRequest(this.responseText);
            dataResponse = response;
            console.log(dataResponse.results);
            renderList(dataResponse.results);
            setOnFilterPessoas();
        }
    };
    xhttp.open("GET", "https://randomuser.me/api/?page=3&results=10&seed=abc&nat=br");
    xhttp.send();
}
doRequest();