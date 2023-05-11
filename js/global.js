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

const vazia = "*";
const obstaculo = "□";
const meta = "x";
const robo = "■";
const encontrada = "●";
var encontradoSt = false;

const custoMaximo = 1000;
const numLinhasMatriz = 10;
const numColunasMatriz = 10;

const fimX = 9;
const fimY = 9;
const inicioX = 0;
const inicioY = 0

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
    return [(Math.floor(Math.random() * numLinhasMatriz)), (Math.floor(Math.random() * numColunasMatriz))];
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
    for (var i = 0; i < numLinhasMatriz; i++) {
        var linha = "";
        for (var p = 0; p < numColunasMatriz; p++) {
            linha += matriz[i][p] + "  ";
        }
        console.log(linha);
    }
}

function Iniciar() {
    for (var i = 0; i < numLinhasMatriz; i++) {
        var vetor = [];
        for (var p = 0; p < numColunasMatriz; p++) {
            vetor.push(vazia)
        }
        matrizInicial.push(vetor);
    }

    criarObstaculos(matrizInicial);

    var roboObj = new Robo(0, 0, 0, "O");

    matrizInicial[inicioX][inicioX] = robo;
    matrizInicial[fimY][fimY] = meta;

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

function EscolherMovimento(roboObj, matriz, custos) {
    var valoresCustos = [];

    for (var direcao in custos) {
        valoresCustos.push(custos[direcao]);
        //console.log(custos[direcao]);
    }

    var menorValor = Math.min.apply(Math, valoresCustos);
    //console.log(menor);

    var menorCusto = PegarMenorCusto(custos, menorValor); // pega a key

    //console.log(menorCusto);
    roboObj.movimento = menorCusto[0];
    console.log(menorCusto[0]);
    console.log(roboObj.movimento);

    matriz[roboObj.posX][roboObj.posY] = vazia;

    RealizarMovimento(roboObj);

    console.log(roboObj.posX + ", " + roboObj.posY);
    matriz[roboObj.posX][roboObj.posY] = robo;

    console.clear();
    console.log("\n");
    console.log(custos);
    Exibir(matrizInicial);

    roboObj.passos += 1;

    if (roboObj.posY == fimY && roboObj.posX == fimX) {
        matriz[fimX][fimY] = encontrada; 
        console.clear();
        Exibir(matriz);
        Encontrado(roboObj.passos);
    }
}

function PegarMenorCusto(custos, menor) {
    return Object.keys(custos).filter(i => custos[i] == menor && custos[i] < custoMaximo)
}

function ChecarPosicao(posAChecar) {
    custo = 0;

    if(posAChecar == obstaculo) {
        custo += custoMaximo; console.log(custo);
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

    // if (robo.movimento == "L") {
    //     robo.posY += 1;
    //     robo.anterior = "O";
    //     robo.direcao = robo.movimentos.L;
    //     //console.log(robo.movimento.L);
    // }

    robo.posX += movimentos[robo.movimento].posicaoX;
    robo.posY += movimentos[robo.movimento].posicaoY;
    robo.anterior = movimentos[robo.movimento].anterior;
    robo.direcao = movimentos[robo.movimento].direcao;
}

//export {Iniciar, matrizInicial};
//module.exports = Iniciar;
////module.exports = matrizInicial;