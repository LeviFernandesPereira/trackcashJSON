var page = ''
if (window.location.hash === '' && Number.isInteger(window.location.hash.substring(1)) == false)
    page = '1'
else
    page = window.location.hash.substring(1)
var requestURL = 'https://sistema.trackcash.com.br/api/qa/payments?page=' + page
var jqxhr = $.getJSON(requestURL).done(function (e) {
    montarTabela(e)
})

var avancar = document.querySelector('.avancar')
var voltar = document.querySelector('.voltar')
var textopag = document.querySelector('.textpag')
textopag.textContent = page
if(page == 127)
    $(".avancar").prop('disabled', true);
if(page == 1)
    $(".voltar").prop('disabled', true);

avancar.addEventListener('click', function () {

    var resposta = jqxhr.responseJSON
    var nPagina = parseInt(resposta.current_page) + 1
    var pagina = '#' + nPagina
    window.location.href = pagina
    window.location.reload()
})

voltar.addEventListener('click', function () {
    var resposta = jqxhr.responseJSON
    var nPagina = parseInt(resposta.current_page) - 1
    var pagina = '#' + nPagina
    window.location.href = pagina
    window.location.reload()
})

function montarTabela(data) {
    data = data.data
    for (let i = 0; i < data.length; i++) {
        var myTr = document.createElement('tr')
        document.querySelector('table').appendChild(myTr)

        myTr.appendChild(criarLinha(data[i].id));
        myTr.appendChild(criarLinha(data[i].id_store));
        myTr.appendChild(criarLinha(data[i].id_channel));
        myTr.appendChild(criarLinha(data[i].id_account));
        myTr.appendChild(criarLinha(data[i].date));
        myTr.appendChild(criarLinha(data[i].prev));
        myTr.appendChild(criarLinha(data[i].ful === 'null' ? data[i].ful : 'null'));
        myTr.appendChild(criarLinha(data[i].created_at));
        myTr.appendChild(criarLinha(data[i].updated_at));
    }
}

function criarLinha(row) {
    var myTd = ''
    myTd = document.createElement('td');
    myTd.textContent = row;
    if (row === 'null')
        myTd.classList.add('alert')
    return myTd
}