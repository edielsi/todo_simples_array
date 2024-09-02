let nomes = []

let nome = document.getElementById('nome')
let telefone = document.getElementById('telefone')
let email = document.getElementById('email')
let genero = document.getElementById('genero')
let dt_nasc = document.getElementById('dt_nasc')

let id_tmp = document.getElementById('id_tmp');


let homens = 0;
let mulheres = 0;


let btn_cadastrar = document.getElementById('btn_cadastrar');
btn_cadastrar.addEventListener('click', (e) => {
    e.preventDefault();
    //validacao kaleo
    if (nome.value == "" || telefone.value == "" || email.value == "") {

        nome.classList.add('border')
        nome.classList.add('border-danger')

        let msg = document.getElementById('mensagens');
        msg.classList.remove('d-none');
        setTimeout(() => {
            msg.classList.add('d-none');

            nome.classList.remove('border')
            nome.classList.remove('border-danger')

        }, 3000);
    } else {
        if (id_tmp.value == "") {
            nomes.push(
                [
                    nome.value,
                    telefone.value,
                    email.value,
                    genero.value,
                    dt_nasc.value
                ])

        } else {
            nomes[id_tmp.value][0] = nome.value
            nomes[id_tmp.value][1] = telefone.value
            nomes[id_tmp.value][2] = email.value
            nomes[id_tmp.value][3] = genero.value
            nomes[id_tmp.value][4] = dt_nasc.value
        }
        atualizar_lista();
        nome.value = ""
        telefone.value = ""
        email.value = ""
    }

    drawChart()
})

function atualizar_lista() {
    let lista = document.getElementById('lista');
    lista.innerHTML = "";

    homens = 0;
    mulheres = 0;

    nomes.forEach((nm, index) => {

        switch (nm[3]) {
            case 'M':
                homens++
                break;
            case 'F':
                mulheres++
                break;
        }

        lista.innerHTML += `
        <tr>
            <td>${nm[0]}</td>
            <td>${nm[1]}</td>
            <td>${nm[2]}</td>
            <td>${nm[3]}</td>
            <td>${nm[4]}</td>
            <td>
            <button class="btn btn-warning" onclick="editar(${index})">
                <i class="bi bi-pencil-square"></i>
            </button>

            <button class="btn btn-danger" onclick="apagar(${index})">
                <i class="bi bi-trash3"></i></i>
            </button>
            </td>
        </tr>`
    });

    id_tmp.value = ""
}

function editar(indice) {
    console.log("estamos editando o indice: " + indice)

    nome.value = nomes[indice][0]
    telefone.value = nomes[indice][1]
    email.value = nomes[indice][2]

    btn_cadastrar.classList.remove('btn-warning')
    btn_cadastrar.classList.add('btn-info')

    id_tmp.value = indice;
}

function apagar(indice) {
    let confirmacao = confirm('Deseja realmente excluir o item ' + nomes[indice] + " ?")

    if (confirmacao) {
        //apagar
        nomes.splice(indice, 1);
        atualizar_lista();

        drawChart()
    } else {
        //cancelar a exclusão
        alert("Exclusão cancelada")
    }


}

atualizar_lista()

//CRUD

//C = CRIAR
//R = RECUPERAR (LISTAR)
//U = UPDATE (ATUALIZAR)
//D = DELETE (APAGAR)

//grafico google
google.charts.load("current", { packages: ["corechart"] });
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
    var data = google.visualization.arrayToDataTable([
        ['Genero', 'Quantidade'],
        ['Homens', homens],
        ['Mulheres', mulheres]
    ]);

    var options = {
        title: 'Proporção por genero',
        pieHole: 0.4,
    };

    var chart = new google.visualization.PieChart(document.getElementById('donutchart'));
    chart.draw(data, options);
}
