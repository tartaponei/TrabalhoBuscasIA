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
    Heurística: distância retangular entre partida e destino

    Se duas tiverem o mesmo custo, o primeiro em sentido 
    contra-trigonométrico é escolhido.
*/

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

// function a_estrela() {
//     var roboObj = Iniciar();

//     function executarMovimentacao() {
//         if (matrizInicial[fimX][fimY] !== encontrada) { /// se o robo não tiver chegado
//             VerificarMovimentosAEstrela(matrizInicial, roboObj);
//             setTimeout(executarMovimentacao, 500);
//         }
//     }

//     setTimeout(executarMovimentacao, 500);
// }

function a_estrela() {
    Rodar("a estrela");
}

//a_estrela();