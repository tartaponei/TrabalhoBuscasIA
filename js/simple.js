/* 
0 = branco, célula vazia -> *
1 = azul, contém um obstáculo -> □
2 = laranja, contém a meta -> x
3 = verde, contém o robô -> ■
4 = vermelha, meta encontrada -> ●
*/

/* 
Ficar parado = 1000
Girar 45º = 1
Bater em um obstáculo = 1000
Seguir na direção atual = 0
*/

/*
R1: ir pro oeste
R2: ir pro nordeste
R3: ir pro norte
R4: ir pro noroeste
R5: ir pro oeste
R6: ir pro sudoeste
R7: ir pro sul
R8: ir pro sudeste
*/

var vazia = "*";
var obstaculo = "□";
var meta = "x";
var robo = "■";
var encontrado = "●";

var matrizInicial = [];

function pegarPosAleatoria(matriz) {
    return [(Math.floor(Math.random()*10)), (Math.floor(Math.random()*10))];   
}

function gerarNumeroAleatorio(max) {
    return Math.floor(Math.random() * max) + 1;
}

function criarObstaculos(matriz) {
    var numObstaculos = gerarNumeroAleatorio(30);

    for(var i = 0; i < numObstaculos; i++) {
        var gerados = [];

        var escolha = pegarPosAleatoria(matriz);

        while (gerados.includes(escolha)) {
            escolha = pegarPosAleatoria(matriz);
        }

        if(!matriz.includes(escolha)) {
            gerados.push(escolha);

            matriz[escolha[0]][escolha[1]] = obstaculo;
        }
    }
}

function Exibir(matriz) {
    for(var i = 0; i < 10; i++) {
        var linha = "";
        for(var p = 0; p < 10; p++) {
            linha+=matriz[i][p]+"  ";
        }
        console.log(linha);
    }
}

function Iniciar() {
    for(var i = 0; i < 10; i ++) {
        matrizInicial.push([vazia,vazia,vazia,vazia,vazia,vazia,vazia,vazia,vazia,vazia]);
    }

    criarObstaculos(matrizInicial);
    matrizInicial[0][0] = robo;
    matrizInicial[9][9] = meta;

    console.log("\n");

    Exibir(matrizInicial);

    var robo = new Robo(0, 0);
}

function Ecnontrado() {

}

function calcularCustoDirecao(robo, matriz, direcao){
    var linha = robo.posX;
    var coluna = robo.posY;
    var custo = 0;

    var posAChecar = matriz[linha][coluna+1];

    if(direcao == "O") {
        switch(posAChecar) {
            case obstaculo : custo += 1000;
            case vazia : custo += 0;
            case meta : Encontrado();
        }

        if (robo.direcao == 0) custo += 0;
        if (robo.direcao == 45) custo += 1;
        if (robo.direcao == 90) custo += 2;
        if (robo.direcao == 135) custo += 3;
        if (robo.direcao == 180) custo += 4;
        if (robo.direcao == 225) custo += 5;
        if (robo.direcao == 270) custo += 6;
        if (robo.direcao == 315) custo += 7;
    }
}

class Robo {
    constructor(posX, posY) {
        this.posX = posX;
        this.posY = posY;
        var direcao = 0;
        
        var movimento = {
            N : 90,
            NL: 45,
            L: 0,
            SE: 315,
            S: 270,
            SO: 225,
            O: 180,
            NO: 135
        }

      }
      
}

function Movimentar(matriz, robo, algoritmo) {
    var custos = {
        N : 0,
        NL: 0,
        L: 0,
        SE: 0,
        S: 0,
        SO: 0,
        O: 0,
        NO: 0
    }

    if(algoritmo == "vizinho mais próximo") {
        custos.O = calcularCustoDirecao(robo, matrizInicial, "O");
        var valoresCustos = [];

        for (var direcao in custos) {
            valoresCustos.push(custos[direcao]);
        }
        
        var menorCusto = Object.keys(custos).find(key => custos[key] === Math.min(valoresCustos));

        robo.movimento = menorCusto;

        matriz[robo.posX][robo.posY] = vazia;

        if(robo.movimento = "O") {
            robo.posY += 1;
        }

        matriz[robo.posX][robo.posY] = robo;
    }
    else if(algoritmo == "a*") {

    }
}

function Atualizar() {
    Exibir(matrizInicial);
}

Iniciar();

while(matrizInicial[9][9] != robo) {
    Movimentar(matrizInicial, robo, "vizinho mais proximo");
    setInterval(Atualizar, 100);
}



