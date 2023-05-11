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

function CalcularDistanciaRet(linha, coluna) {
        var distanciaLinha = 9 - linha;
        var distanciaColuna = 9 - coluna;

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

        var distanciaRet = CalcularDistanciaRet(linhaAChecar, colunaAChecar);

        custo += ChecarPosicao(posAChecar);

        custo += distanciaRet;

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

    console.log(custo);

    return custo;
}

function EscolherMovimento(matriz, roboObj, algoritmo) {
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

    custos.L = calcularCustoAEstrela(roboObj, matrizInicial, "L");
    custos.S = calcularCustoAEstrela(roboObj, matrizInicial, "S");
    custos.O = calcularCustoAEstrela(roboObj, matrizInicial, "O");
    custos.N = calcularCustoAEstrela(roboObj, matrizInicial, "N");
    custos.SL = calcularCustoAEstrela(roboObj, matrizInicial, "SL");
    custos.SO = calcularCustoAEstrela(roboObj, matrizInicial, "SO");
    custos.NO = calcularCustoAEstrela(roboObj, matrizInicial, "NO");
    custos.NL = calcularCustoAEstrela(roboObj, matrizInicial, "NL");

    // custos.L = CalcularCustoGPT(roboObj, matrizInicial, "L");
    // custos.S = CalcularCustoGPT(roboObj, matrizInicial, "S");
    // custos.O = CalcularCustoGPT(roboObj, matrizInicial, "O");
    // custos.N = CalcularCustoGPT(roboObj, matrizInicial, "N");
    // custos.SL = CalcularCustoGPT(roboObj, matrizInicial, "SL");
    // custos.SO = CalcularCustoGPT(roboObj, matrizInicial, "SO");
    // custos.NO = CalcularCustoGPT(roboObj, matrizInicial, "SL");
    // custos.NL = CalcularCustoGPT(roboObj, matrizInicial, "SL");

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

    RealizarMovimento(roboObj);

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

function a_estrela() {
    var roboObj = Iniciar();

    function executarMovimentacao() {
        if (matrizInicial[9][9] !== encontrada) { /// se o robo não tiver chegado
            EscolherMovimento(matrizInicial, roboObj, "a estrela");
            setTimeout(executarMovimentacao, 500);
        }
    }

    setTimeout(executarMovimentacao, 500);
}