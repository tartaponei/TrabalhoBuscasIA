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
R1: ir pro leste
R2: ir pro sudeste
R3: ir pro sul
R4: ir pro sudoeste
R5: ir pro oeste
R6: ir pro noroeste
R7: ir pro norte
R8: ir pro nordeste
*/

var vazia = "*";
var obstaculo = "□";
var meta = "x";
var robo = "■";
var encontrada = "●";
var encontradoSt = false;

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
            SE: 315,
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

function Encontrado(passos) {
    console.log("\nO ROBÔ CONSEGUIU :)");
    console.log(passos + " passos foram dados");
}

function calcularCustoDirecao(robo, matriz, direcao) {
    var linha = robo.posX;
    var coluna = robo.posY;
    let custo = 0;

    console.log("\ndirecao: " + direcao);
    console.log("direcao do robo: " + robo.direcao);
    console.log(linha + ", " + coluna);
    console.log("anterior: " + robo.anterior);

    if (direcao == "O") {
        if (coluna == 0) {
            custo += 1000; // pra não passar da borda da direita
            console.log("O não dá");
            console.log(custo);
            return custo;
        }

        if (robo.anterior == "O") {
            custo += 500;
        }

        var posAChecar = matriz[linha][coluna - 1];
        console.log(posAChecar);

        if (posAChecar == obstaculo) {
            custo += 1000;
            console.log(custo)
        }

        else if (posAChecar == vazia) {
            custo += 0;
            console.log(custo)
        }

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
            custo += 1000; // pra não passar da borda de cima
            console.log("N não dá");
            return custo;
        }

        if (robo.anterior == "N") {
            custo += 500;
        }

        var posAChecar = matriz[linha - 1][coluna];
        
        if (posAChecar == obstaculo) {
            custo += 1000;
            console.log(custo)
        }

        else if (posAChecar == vazia) {
            custo += 0;
            console.log(custo)
        }

        if (robo.direcao == 0) custo += 2;
        else if (robo.direcao == 45) custo += 1;
        else if (robo.direcao == 90) custo += 0;
        else if (robo.direcao == 135) custo += 1;
        else if (robo.direcao == 180) custo += 2;
        else if (robo.direcao == 225) custo += 3;
        else if (robo.direcao == 270) custo += 4;
        else if (robo.direcao == 315) custo += 3;
    }

    if (direcao == "L") {
        if (coluna == 9) {
            custo += 1000; // pra não passar da borda da direita
            console.log("L não dá");
            return custo;
        }

        if (robo.anterior == "L") {
            custo += 500;
        }

        var posAChecar = matriz[linha][coluna + 1];
        console.log(posAChecar);

        //console.log(posAChecar == obstaculo);

        if(posAChecar == obstaculo) {
            custo += 1000; console.log(custo);
        }

        else if(posAChecar == vazia) {
            custo += 0;
        }

        if (robo.direcao == 0) custo += 0;
        else if (robo.direcao == 45) custo += 1;
        else if (robo.direcao == 90) custo += 2;
        else if (robo.direcao == 135) custo += 3;
        else if (robo.direcao == 180) custo += 4;
        else if (robo.direcao == 225) custo += 3;
        else if (robo.direcao == 270) custo += 2;
        else if (robo.direcao == 315) custo += 1;
    }

    if (direcao == "S") {
        if (linha == 9) {
            custo += 1000; // pra não passar da borda de baixo
            console.log("S não dá");
            return custo;
        }

        if (robo.anterior == "S") {
            custo += 500;
        }

        var posAChecar = matriz[linha + 1][coluna];

        if (posAChecar == obstaculo) {
            custo += 1000;
            console.log(custo);
        }

        else if (posAChecar == vazia) {
            custo += 0;
            console.log(custo);
        }

        if (robo.direcao == 0) {
            custo = custo + 2;
            console.log(custo);
        }
        else if (robo.direcao == 45) custo += 3;
        else if (robo.direcao == 90) custo += 4;
        else if (robo.direcao == 135) custo += 3;
        else if (robo.direcao == 180) custo += 2;
        else if (robo.direcao == 225) custo += 1;
        else if (robo.direcao == 270) custo += 0;
        else if (robo.direcao == 315) custo += 1;
    }

    if (direcao == "SL") {
        if (coluna == 9 || linha == 9) {
            custo += 1000; // pra não passar da borda da direita e de baixo
            console.log("SL não dá");
            return custo;
        }

        if (robo.anterior == "SL") {
            custo += 500;
        }

        console.log(posAChecar);

        var posAChecar = matriz[linha+1][coluna+1];

        //console.log(posAChecar == obstaculo);

        if(posAChecar == obstaculo) {
            custo += 1000; console.log(custo);
        }
        else if(posAChecar == vazia) {
            custo += 0;
        }

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
            custo += 1000; // pra não passar da borda da direita e de baixo
            console.log("SO não dá");
            return custo;
        }

        if (robo.anterior == "SO") {
            custo += 500;
        }

        console.log(posAChecar);

        var posAChecar = matriz[linha+1][coluna-1];

        //console.log(posAChecar == obstaculo);

        if(posAChecar == obstaculo) {
            custo += 1000; console.log(custo);
        }
        else if(posAChecar == vazia) {
            custo += 0;
        }

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
            custo += 1000; // pra não passar da borda da direita e de baixo
            console.log("NO não dá");
            return custo;
        }

        if (robo.anterior == "NO") {
            custo += 500;
        }

        console.log(posAChecar);

        var posAChecar = matriz[linha-1][coluna-1];

        //console.log(posAChecar == obstaculo);

        if(posAChecar == obstaculo) {
            custo += 1000; console.log(custo);
        }
        else if(posAChecar == vazia) {
            custo += 0;
        }

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
        if (coluna == 9 || linha == 0) {
            custo += 1000; // pra não passar da borda da direita e de baixo
            console.log("NL não dá");
            return custo;
        }

        if (robo.anterior == "NL") {
            custo += 500;
        }

        console.log(posAChecar);

        var posAChecar = matriz[linha-1][coluna+1];

        //console.log(posAChecar == obstaculo);

        if(posAChecar == obstaculo) {
            custo += 1000; console.log(custo);
        }
        else if(posAChecar == vazia) {
            custo += 0;
        }

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


function Movimentar(matriz, roboObj, algoritmo) {
    var custos = { // estão na ordem de prioridade
        L: 0,
        SL: 0,
        S: 0,
        SO: 0,
        O: 0,
        NO: 0,
        N: 0,
        NL: 0,
        X: 10000 // ficar parado
    }

    if (algoritmo == "vizinho mais proximo") {
        custos.L = calcularCustoDirecao(roboObj, matrizInicial, "L");
        custos.S = calcularCustoDirecao(roboObj, matrizInicial, "S");
        custos.O = calcularCustoDirecao(roboObj, matrizInicial, "O");
        custos.N = calcularCustoDirecao(roboObj, matrizInicial, "N");
        custos.SL = calcularCustoDirecao(roboObj, matrizInicial, "SL");
        custos.SO = calcularCustoDirecao(roboObj, matrizInicial, "SO");
        custos.NO = calcularCustoDirecao(roboObj, matrizInicial, "SL");
        custos.NL = calcularCustoDirecao(roboObj, matrizInicial, "SL");

        var valoresCustos = [];

        for (var direcao in custos) {
            valoresCustos.push(custos[direcao]);
            //console.log(custos[direcao]);
        }

        var menor = Math.min.apply(Math, valoresCustos);
        //console.log(menor);

        var menorCusto = Object.keys(custos).filter(i => custos[i] == menor && custos[i] < 1000);

        //console.log(menorCusto);
        roboObj.movimento = menorCusto[0];
        console.log(menorCusto[0]);
        console.log(roboObj.movimento);

        matriz[roboObj.posX][roboObj.posY] = vazia;

        if (roboObj.movimento == "L") {
            roboObj.posY += 1;
            roboObj.anterior = "O";
            roboObj.direcao = roboObj.movimentos.L;
            console.log(roboObj.movimento.L);
        }

        else if (roboObj.movimento == "S") {
            roboObj.posX += 1;
            roboObj.anterior = "N";
            roboObj.direcao = roboObj.movimentos.S;
        }

        else if (roboObj.movimento == "O") {
            roboObj.posY -= 1;
            roboObj.anterior = "L";
            roboObj.direcao = roboObj.movimentos.O;
        }

        else if (roboObj.movimento == "N") {
            roboObj.posX -= 1;
            roboObj.anterior = "S";
            roboObj.direcao = roboObj.movimentos.N;
        }

        else if (roboObj.movimento == "SL") {
            roboObj.posX += 1;
            roboObj.posY += 1;
            roboObj.anterior = "NO";
            roboObj.direcao = roboObj.movimentos.SL;
        }

        else if (roboObj.movimento == "SO") {
            roboObj.posX += 1;
            roboObj.posY -= 1;
            roboObj.anterior = "NL";
            roboObj.direcao = roboObj.movimentos.SO;
        }

        else if (roboObj.movimento == "NL") {
            roboObj.posX -= 1;
            roboObj.posY += 1;
            roboObj.anterior = "SO";
            roboObj.direcao = roboObj.movimentos.NL;
        }

        else if (roboObj.movimento == "NO") {
            roboObj.posX -= 1;
            roboObj.posY -= 1;
            roboObj.anterior = "SL";
            roboObj.direcao = roboObj.movimentos.NO;
        }

        console.log(roboObj.posX + ", " + roboObj.posY);
        matriz[roboObj.posX][roboObj.posY] = robo;

        console.clear();
        console.log("\n");
        console.log(custos);
        Exibir(matrizInicial);

        roboObj.passos += 1;

        if (roboObj.posY == 9 && roboObj.posX == 9) {
            matriz[9][9] = encontrada; 
            console.clear();
            Exibir(matriz);
            Encontrado(roboObj.passos);
        }
    }

    else if (algoritmo == "a*") {

    }
}

function Atualizar() {
    Exibir(matrizInicial);
}

function main() {
    var roboObj = Iniciar();

    function executarMovimentacao() {
        if (matrizInicial[9][9] !== encontrada) { /// se o robo não tiver chegado
            Movimentar(matrizInicial, roboObj, "vizinho mais proximo");
            setTimeout(executarMovimentacao, 500);
        }
    }

    setTimeout(executarMovimentacao, 500);
}

//main();