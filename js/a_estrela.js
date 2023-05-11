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
H: distância retangular entre partida e destino
R1: tentar ir pro leste
R2: tentar ir pro sudeste
R3: tentar ir pro sul
R4: tentar ir pro sudoeste
R5: tentar ir pro oeste
R6: tentar ir pro noroeste
R7: tentar ir pro norte
R8: tentar ir pro nordeste
*/

/*

const vazia = "*";
const obstaculo = "□";
const meta = "x";
const robo = "■";
const encontrada = "●";
var encontradoSt = false;
const custoMaximo = 1000;
const bordaDireita = 9;
const bordaInferior = 9;

var matrizInicial = [];

class Robo {
    constructor(posX, posY, direcao, anterior) {
        this.posX = posX;
        this.posY = posY;
        this.anterior = anterior;
        this.direcao = direcao;
        this.passos = 0;

        this.movimentos = {
            N: 90,
            NL: 45,
            L: 0,
            SL: 315,
            S: 270,
            SO: 225,
            O: 180,
            NO: 135
        };

        this.movimento = "";
    }
}

function pegarPosAleatoria(matriz) {
    return [(Math.floor(Math.random() * 10)), (Math.floor(Math.random() * 10))];
}

function gerarNumeroAleatorio(max) {
    return Math.floor(Math.random() * max) + 1;
}

function criarObstaculos(matriz) {
    var numObstaculos = gerarNumeroAleatorio(40);

    for (var i = 0; i < numObstaculos; i++) {
        var gerados = [];

        var escolha = pegarPosAleatoria(matriz);

        while (gerados.includes(escolha)) {
            escolha = pegarPosAleatoria(matriz);
        }

        if (!matriz.includes(escolha)) {
            gerados.push(escolha);

            matriz[escolha[0]][escolha[1]] = obstaculo;
        }
    }
}

function Exibir(matriz) {
    for (var i = 0; i < 10; i++) {
        var linha = "";
        for (var p = 0; p < 10; p++) {
            linha += matriz[i][p] + "  ";
        }
        console.log(linha);
    }
}

function Iniciar() {
    for (var i = 0; i < 10; i++) {
        matrizInicial.push([vazia, vazia, vazia, vazia, vazia, vazia, vazia, vazia, vazia, vazia]);
    }

    criarObstaculos(matrizInicial);

    var roboObj = new Robo(0, 0, 0, "O");

    matrizInicial[0][0] = robo;
    matrizInicial[9][9] = meta;

    console.log("\n");

    Exibir(matrizInicial);

    return roboObj;
}

function Atualizar() {
    Exibir(matrizInicial);
}

function Encontrado(passos) {
    console.log("\nO ROBÔ CONSEGUIU :)");
    console.log(passos + " passos foram dados");
}

function ChecarPosicao(posAChecar) {
    custo = 0;

    if(posAChecar == obstaculo) {
        custo += 1000; console.log(custo);
    }

    else if(posAChecar == vazia) {
        custo += 0;
    }

    return custo;
}

function RealizarMovimento(robo) {
    const movimentos = {
        L: {posicaoX: 0, posicaoY: 1, anterior: "O", direcao: robo.movimentos.L},
        S: {posicaoX: 1, posicaoY: 0, anterior: "N", direcao: robo.movimentos.S},
        O: {posicaoX: 0, posicaoY: -1, anterior: "L", direcao: robo.movimentos.O},
        N: {posicaoX: -1, posicaoY: 0, anterior: "S", direcao: robo.movimentos.N},
        SL: {posicaoX: 1, posicaoY: 1, anterior: "NO", direcao: robo.movimentos.SL},
        SO: {posicaoX: 1, posicaoY: -1, anterior: "NL", direcao: robo.movimentos.SO},
        NL: {posicaoX: -1, posicaoY: 1, anterior: "SO", direcao: robo.movimentos.NL},
        NO: {posicaoX: -1, posicaoY: -1, anterior: "SL", direcao: robo.movimentos.NO},
    };

    robo.posX += movimentos[robo.movimento].posicaoX;
    robo.posY += movimentos[robo.movimento].posicaoY;
    robo.anterior = movimentos[robo.movimento].anterior;
    robo.direcao = movimentos[robo.movimento].direcao;
}

*/

//import { Iniciar, matrizInicial } from "./global.js";

//const global= require("./global");
//const Iniciar = require('./global');
//const matrizInicial = require('matrizInicial');

function CalcularDistanciaRet(linha, coluna) {
        var distanciaLinha = numLinhasMatriz - linha;
        console.log("distancia x: " + distanciaLinha);
        var distanciaColuna = numColunasMatriz - coluna;
        console.log("distancia y: " + distanciaColuna);

        return distanciaColuna + distanciaLinha;
}

function calcularCustoAEstrela(robo, matriz, direcao) {
    var linha = robo.posX;
    var coluna = robo.posY;
    let custo = 0;

    console.log("\ndirecao: " + direcao);
    console.log("direcao do robo: " + robo.direcao);
    console.log(linha + ", " + coluna);
    console.log("anterior: " + robo.anterior);

    if (direcao == "O") {
        if (coluna == 0) {
            custo += custoMaximo; // pra não passar da borda da direita
            console.log("O não dá");
            return custo;
        }

        if (robo.anterior == "O") {
            custo += custoMaximo / 2;
        }

        var linhaAChecar = linha;
        var colunaAChecar = coluna - 1;

        var posAChecar = matriz[linhaAChecar][colunaAChecar];

        var distanciaRet = CalcularDistanciaRet(linhaAChecar, colunaAChecar); //h(N)

        custo += ChecarPosicao(posAChecar);

        custo += distanciaRet;
        console.log(distanciaRet);

        if (robo.direcao == 0) custo += 4;
        else if (robo.direcao == 45) custo += 3;
        else if (robo.direcao == 90) custo += 2;
        else if (robo.direcao == 135) custo += 1;
        else if (robo.direcao == 180) custo += 0;
        else if (robo.direcao == 225) custo += 1;
        else if (robo.direcao == 270) custo += 2;
        else if (robo.direcao == 315) custo += 3;
    }

    if (direcao == "N") {
        if (linha == 0) {
            custo += custoMaximo; // pra não passar da borda da direita
            console.log("N não dá");
            return custo;
        }

        if (robo.anterior == "N") {
            custo += custoMaximo / 2;
        }

        var linhaAChecar = linha - 1;
        var colunaAChecar = coluna;

        var posAChecar = matriz[linhaAChecar][colunaAChecar];

        var distanciaRet = CalcularDistanciaRet(linhaAChecar, colunaAChecar);

        custo += ChecarPosicao(posAChecar);

        custo += distanciaRet;

        if (robo.direcao == 0) custo += 2;
        else if (robo.direcao == 45) custo += 1;
        else if (robo.direcao == 90) custo += 0;
        else if (robo.direcao == 135) custo += 1;
        else if (robo.direcao == 180) custo += 2;
        else if (robo.direcao == 225) custo += 3;
        else if (robo.direcao == 270) custo += 4;
        else if (robo.direcao == 315) custo += 3;
    }

    if (direcao == "S") {
        if (linha == 9) {
            custo += custoMaximo; // pra não passar da borda da direita
            console.log("S não dá");
            return custo;
        }

        if (robo.anterior == "S") {
            custo += custoMaximo / 2;
        }

        var linhaAChecar = linha + 1;
        var colunaAChecar = coluna;

        var posAChecar = matriz[linhaAChecar][colunaAChecar];

        var distanciaRet = CalcularDistanciaRet(linhaAChecar, colunaAChecar);

        custo += ChecarPosicao(posAChecar);

        custo += distanciaRet;

        if (robo.direcao == 0) custo = custo + 2;
        else if (robo.direcao == 45) custo += 3;
        else if (robo.direcao == 90) custo += 4;
        else if (robo.direcao == 135) custo += 3;
        else if (robo.direcao == 180) custo += 2;
        else if (robo.direcao == 225) custo += 1;
        else if (robo.direcao == 270) custo += 0;
        else if (robo.direcao == 315) custo += 1;
    }

    if (direcao == "L") {
        if (coluna == 9) {
            custo += custoMaximo; // pra não passar da borda da direita
            console.log("L não dá");
            return custo;
        }

        if (robo.anterior == "L") {
            custo += custoMaximo / 2;
        }

        var linhaAChecar = linha;
        var colunaAChecar = coluna + 1;

        var posAChecar = matriz[linhaAChecar][colunaAChecar];

        var distanciaRet = CalcularDistanciaRet(linhaAChecar, colunaAChecar);

        custo += ChecarPosicao(posAChecar);

        custo += distanciaRet;

        if (robo.direcao == 0) custo += 0;
        else if (robo.direcao == 45) custo += 1;
        else if (robo.direcao == 90) custo += 2;
        else if (robo.direcao == 135) custo += 3;
        else if (robo.direcao == 180) custo += 4;
        else if (robo.direcao == 225) custo += 3;
        else if (robo.direcao == 270) custo += 2;
        else if (robo.direcao == 315) custo += 1;
    }

    if (direcao == "SL") {
        if (coluna == 9 || linha == 9) {
            custo += custoMaximo; // pra não passar da borda da direita
            console.log("SL não dá");
            return custo;
        }

        if (robo.anterior == "SL") {
            custo += custoMaximo / 2;
        }

        var linhaAChecar = linha + 1;
        var colunaAChecar = coluna + 1;

        var posAChecar = matriz[linhaAChecar][colunaAChecar];

        var distanciaRet = CalcularDistanciaRet(linhaAChecar, colunaAChecar);

        custo += ChecarPosicao(posAChecar);

        custo += distanciaRet;

        if (robo.direcao == 0) custo += 1;
        else if (robo.direcao == 45) custo += 2;
        else if (robo.direcao == 90) custo += 3;
        else if (robo.direcao == 135) custo += 4;
        else if (robo.direcao == 180) custo += 3;
        else if (robo.direcao == 225) custo += 2;
        else if (robo.direcao == 270) custo += 1;
        else if (robo.direcao == 315) custo += 0;
    }

    if (direcao == "SO") {
        if (coluna == 0 || linha == 9) {
            custo += custoMaximo; // pra não passar da borda da direita
            console.log("SO não dá");
            return custo;
        }

        if (robo.anterior == "SO") {
            custo += custoMaximo / 2;
        }

        var linhaAChecar = linha + 1;
        var colunaAChecar = coluna - 1;

        var posAChecar = matriz[linhaAChecar][colunaAChecar];

        var distanciaRet = CalcularDistanciaRet(linhaAChecar, colunaAChecar);

        custo += ChecarPosicao(posAChecar);

        custo += distanciaRet;

        if (robo.direcao == 0) custo += 3;
        else if (robo.direcao == 45) custo += 4;
        else if (robo.direcao == 90) custo += 3;
        else if (robo.direcao == 135) custo += 2;
        else if (robo.direcao == 180) custo += 1;
        else if (robo.direcao == 225) custo += 0;
        else if (robo.direcao == 270) custo += 1;
        else if (robo.direcao == 315) custo += 2;
    }

    if (direcao == "NO") {
        if (coluna == 0 || linha == 0) {
            custo += custoMaximo; // pra não passar da borda da direita
            console.log("NO não dá");
            return custo;
        }

        if (robo.anterior == "NO") {
            custo += custoMaximo / 2;
        }

        var linhaAChecar = linha - 1;
        var colunaAChecar = coluna - 1;

        var posAChecar = matriz[linhaAChecar][colunaAChecar];

        var distanciaRet = CalcularDistanciaRet(linhaAChecar, colunaAChecar);

        custo += ChecarPosicao(posAChecar);

        custo += distanciaRet;

        if (robo.direcao == 0) custo += 3;
        else if (robo.direcao == 45) custo += 2;
        else if (robo.direcao == 90) custo += 1;
        else if (robo.direcao == 135) custo += 0;
        else if (robo.direcao == 180) custo += 1;
        else if (robo.direcao == 225) custo += 2;
        else if (robo.direcao == 270) custo += 3;
        else if (robo.direcao == 315) custo += 4;
    }

    if (direcao == "NL") {
        if (coluna == 0 || linha == 0) {
            custo += custoMaximo; // pra não passar da borda da direita
            console.log("NL não dá");
            return custo;
        }

        if (robo.anterior == "NL") {
            custo += custoMaximo / 2;
        }

        var linhaAChecar = linha - 1;
        var colunaAChecar = coluna + 1;

        var posAChecar = matriz[linhaAChecar][colunaAChecar];

        var distanciaRet = CalcularDistanciaRet(linhaAChecar, colunaAChecar);

        custo += ChecarPosicao(posAChecar);

        custo += distanciaRet;

        if (robo.direcao == 0) custo += 1;
        else if (robo.direcao == 45) custo += 0;
        else if (robo.direcao == 90) custo += 1;
        else if (robo.direcao == 135) custo += 2;
        else if (robo.direcao == 180) custo += 3;
        else if (robo.direcao == 225) custo += 4;
        else if (robo.direcao == 270) custo += 3;
        else if (robo.direcao == 315) custo += 2;
    }

    console.log(custo);

    return custo;
}

function VerificarMovimentosAEstrela(matriz, robo) {
    var custos = { // estão na ordem de prioridade
        L: 0,
        SL: 0,
        S: 0,
        SO: 0,
        O: 0,
        NO: 0,
        N: 0,
        NL: 0,
        X: custoMaximo // ficar parado
    }

    custos.L = calcularCustoAEstrela(robo, matrizInicial, "L");
    custos.S = calcularCustoAEstrela(robo, matrizInicial, "S");
    custos.O = calcularCustoAEstrela(robo, matrizInicial, "O");
    custos.N = calcularCustoAEstrela(robo, matrizInicial, "N");
    custos.SL = calcularCustoAEstrela(robo, matrizInicial, "SL");
    custos.SO = calcularCustoAEstrela(robo, matrizInicial, "SO");
    custos.NO = calcularCustoAEstrela(robo, matrizInicial, "NO");
    custos.NL = calcularCustoAEstrela(robo, matrizInicial, "NL");

    EscolherMovimento(robo, matriz, custos);
}

function a_estrela() {
    var roboObj = Iniciar();

    function executarMovimentacao() {
        if (matrizInicial[fimX][fimY] !== encontrada) { /// se o robo não tiver chegado
            VerificarMovimentosAEstrela(matrizInicial, roboObj);
            setTimeout(executarMovimentacao, 500);
        }
    }

    setTimeout(executarMovimentacao, 500);
}

//a_estrela();