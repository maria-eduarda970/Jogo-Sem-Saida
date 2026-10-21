
const canvas = document.getElementById("jogo");
const ctx = canvas.getContext("2d");

const TAMANHO = 40;
const TOTAL_COLUNAS = 15;
const TOTAL_LINHAS = 15;

// # representa parede; espaço representa corredor.
const MAPA_INICIAL = [
  "###############",
  "#             #",
  "# ### ##### # #",
  "# #       # # #",
  "# # ##### # # #",
  "# # #     #   #",
  "#   # ### ### #",
  "### # #       #",
  "#   # # ##### #",
  "# ### #       #",
  "#     ##### # #",
  "# ###       # #",
  "#   #######   #",
  "#             #",
  "###############"
];

class Personagem {
  constructor(coluna, linha) {
    this.coluna = coluna;
    this.linha = linha;
  }

  podeAndar(coluna, linha) {
    if (
      linha < 0 ||
      linha >= TOTAL_LINHAS ||
      coluna < 0 ||
      coluna >= TOTAL_COLUNAS
    ) {
      return false;
    }

    return jogo.mapa[linha][coluna] !== "#";
  }
}

class Ladrao extends Personagem {
  desenhar() {
    const x = this.coluna * TAMANHO;
    const y = this.linha * TAMANHO;

    // Pernas
    ctx.fillStyle = "#111827";
    ctx.fillRect(x + 12, y + 25, 6, 11);
    ctx.fillRect(x + 23, y + 25, 6, 11);

    // Corpo e braços
    ctx.fillStyle = "#202020";
    ctx.fillRect(x + 10, y + 15, 21, 15);
    ctx.fillRect(x + 4, y + 17, 8, 5);
    ctx.fillRect(x + 29, y + 17, 7, 5);

    // Cabeça
    ctx.fillStyle = "#e8b58a";
    ctx.beginPath();
    ctx.arc(x + 20, y + 12, 9, 0, Math.PI * 2);
    ctx.fill();

    // Gorro e máscara
    ctx.fillStyle = "#111";
    ctx.fillRect(x + 10, y + 3, 20, 7);
    ctx.fillRect(x + 12, y + 12, 16, 5);

    // Olhos
    ctx.fillStyle = "#fff";
    ctx.fillRect(x + 14, y + 10, 3, 3);
    ctx.fillRect(x + 23, y + 10, 3, 3);
  }
}

class Policial extends Personagem {
  constructor(coluna, linha, cor) {
    super(coluna, linha);
    this.cor = cor;
    this.passo = 4;
  }

  desenhar() {
    const x = this.coluna * TAMANHO;
    const y = this.linha * TAMANHO;

    // Pernas e botas
    ctx.fillStyle = "#172554";
    ctx.fillRect(x + 12, y + 27, 6, 8);
    ctx.fillRect(x + 23, y + 27, 6, 8);

    ctx.fillStyle = "#111827";
    ctx.fillRect(x + 10, y + 33, 9, 5);
    ctx.fillRect(x + 22, y + 33, 9, 5);

    // Braços do uniforme
    ctx.fillStyle = this.cor;
    ctx.fillRect(x + 5, y + 17, 7, 14);
    ctx.fillRect(x + 29, y + 17, 7, 14);

    ctx.fillStyle = "#e8b58a";
    ctx.fillRect(x + 5, y + 28, 7, 4);
    ctx.fillRect(x + 29, y + 28, 7, 4);

    // Camisa/uniforme
    ctx.fillStyle = this.cor;
    ctx.fillRect(x + 10, y + 14, 21, 16);

    // Cinto e fivela
    ctx.fillStyle = "#172554";
    ctx.fillRect(x + 10, y + 27, 21, 4);

    ctx.fillStyle = "#facc15";
    ctx.fillRect(x + 19, y + 27, 4, 4);

    // Cabeça
    ctx.fillStyle = "#e8b58a";
    ctx.beginPath();
    ctx.arc(x + 20, y + 12, 8, 0, Math.PI * 2);
    ctx.fill();

    // Orelhas
    ctx.fillRect(x + 11, y + 10, 3, 5);
    ctx.fillRect(x + 26, y + 10, 3, 5);

    // Boné policial
    ctx.fillStyle = "#172554";
    ctx.fillRect(x + 10, y + 4, 20, 6);
    ctx.fillRect(x + 7, y + 8, 26, 3);

    // Emblema do boné
    ctx.fillStyle = "#facc15";
    ctx.fillRect(x + 17, y + 5, 6, 3);

    // Olhos e nariz
    ctx.fillStyle = "#111827";
    ctx.fillRect(x + 16, y + 12, 2, 2);
    ctx.fillRect(x + 23, y + 12, 2, 2);
    ctx.fillRect(x + 19, y + 15, 2, 2);

    // Distintivo no peito
    ctx.fillStyle = "#facc15";
    ctx.beginPath();
    ctx.moveTo(x + 14, y + 17);
    ctx.lineTo(x + 19, y + 18);
    ctx.lineTo(x + 18, y + 24);
    ctx.lineTo(x + 14, y + 22);
    ctx.closePath();
    ctx.fill();

    // Bolso e rádio
    ctx.strokeStyle = "#dbeafe";
    ctx.lineWidth = 1;
    ctx.strokeRect(x + 23, y + 18, 5, 5);

    ctx.fillStyle = "#111827";
    ctx.fillRect(x + 29, y + 19, 3, 7);
    ctx.fillRect(x + 30, y + 17, 1, 2);
  }
}

class Bolsa {
  constructor(coluna, linha) {
    this.coluna = coluna;
    this.linha = linha;
    this.coletada = false;
  }

  desenhar() {
    if (this.coletada) return;

    const x = this.coluna * TAMANHO;
    const y = this.linha * TAMANHO;

    ctx.fillStyle = "#9a5b2e";
    ctx.beginPath();
    ctx.moveTo(x + 10, y + 13);
    ctx.quadraticCurveTo(x + 5, y + 20, x + 10, y + 31);
    ctx.quadraticCurveTo(x + 20, y + 37, x + 30, y + 31);
    ctx.quadraticCurveTo(x + 35, y + 20, x + 30, y + 13);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = "#d6b477";
    ctx.fillRect(x + 12, y + 10, 16, 5);

    ctx.fillStyle = "#facc15";
    ctx.font = "bold 17px Arial";
    ctx.textAlign = "center";
    ctx.fillText("$", x + 20, y + 28);
  }
}

class Bombinha {
  constructor(coluna, linha) {
    this.coluna = coluna;
    this.linha = linha;
    this.coletada = false;
  }

  desenhar() {
    if (this.coletada) return;

    const x = this.coluna * TAMANHO + 20;
    const y = this.linha * TAMANHO + 22;

    ctx.fillStyle = "#202020";
    ctx.beginPath();
    ctx.arc(x, y, 9, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = "#facc15";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(x + 4, y - 7);
    ctx.lineTo(x + 9, y - 13);
    ctx.stroke();

    ctx.fillStyle = "#fb923c";
    ctx.beginPath();
    ctx.arc(x + 10, y - 14, 3, 0, Math.PI * 2);
    ctx.fill();
  }
}

class Bonus {
  constructor(coluna, linha) {
    this.coluna = coluna;
    this.linha = linha;
    this.ativo = true;
  }

  desenhar() {
    if (!this.ativo) return;

    const x = this.coluna * TAMANHO;
    const y = this.linha * TAMANHO;

    ctx.fillStyle = "#b45309";
    ctx.fillRect(x + 5, y + 11, 30, 20);

    ctx.fillStyle = "#fbbf24";
    ctx.fillRect(x + 5, y + 7, 30, 6);
    ctx.fillRect(x + 17, y + 15, 6, 9);

    ctx.fillStyle = "#fff7ed";
    ctx.font = "bold 10px Arial";
    ctx.textAlign = "center";
    ctx.fillText("$", x + 20, y + 25);
  }
}

class Jogo {
  constructor() {
    this.mapa = MAPA_INICIAL.map(linha => linha.split(""));
    this.pontuacao = 0;
    this.fase = 1;
    this.vidas = 3;
    this.tempoBombinha = 0;
    this.jogoAtivo = true;
    this.bonus = null;
    this.controle = null;
    this.reiniciarFase();
  }

  reiniciarFase() {
    this.mapa = MAPA_INICIAL.map(linha => linha.split(""));

    this.ladrao = new Ladrao(1, 1);

    this.policiais = [
      new Policial(13, 1, "#2563eb"),
      new Policial(13, 13, "#dc2626")
    ];

    this.bolsas = [];
    this.bombinhas = [];
    this.bonus = null;
    this.tempoBombinha = 0;
    this.passosPolicia = 0;

    // Coloca objetos somente em corredores livres.
    const lugares = [];

    for (let linha = 1; linha < TOTAL_LINHAS - 1; linha++) {
      for (let coluna = 1; coluna < TOTAL_COLUNAS - 1; coluna++) {
        if (
          this.mapa[linha][coluna] === "#" ||
          (coluna === 1 && linha === 1) ||
          (coluna === 13 && linha === 1) ||
          (coluna === 13 && linha === 13)
        ) {
          continue;
        }

        lugares.push({ coluna, linha });
      }
    }

    // Distribuição das bolsas e das bombas.
    lugares.forEach((lugar, i) => {
      if (i % 3 === 0) {
        this.bolsas.push(new Bolsa(lugar.coluna, lugar.linha));
      }

      if (i % 17 === 0) {
        this.bombinhas.push(new Bombinha(lugar.coluna, lugar.linha));
      }
    });

    this.atualizarPlacar();
    this.mensagem("Colete todas as bolsas e fuja dos policiais!");
    this.desenhar();
  }

  moverLadrao(dx, dy) {
    if (!this.jogoAtivo) return;

    const novaColuna = this.ladrao.coluna + dx;
    const novaLinha = this.ladrao.linha + dy;

    if (this.ladrao.podeAndar(novaColuna, novaLinha)) {
      this.ladrao.coluna = novaColuna;
      this.ladrao.linha = novaLinha;

      this.verificarColetas();
      this.verificarColisao();
      this.desenhar();
    }
  }

  verificarColetas() {
    for (const bolsa of this.bolsas) {
      if (
        !bolsa.coletada &&
        bolsa.coluna === this.ladrao.coluna &&
        bolsa.linha === this.ladrao.linha
      ) {
        bolsa.coletada = true;
        this.pontuacao += 100;
      }
    }

    for (const bomba of this.bombinhas) {
      if (
        !bomba.coletada &&
        bomba.coluna === this.ladrao.coluna &&
        bomba.linha === this.ladrao.linha
      ) {
        bomba.coletada = true;
        this.tempoBombinha = Date.now() + 6000;

        this.mensagem(
          "Bombinha ativada! Policiais desnorteados por 6 segundos."
        );
      }
    }

    if (
      this.bonus &&
      this.bonus.ativo &&
      this.bonus.coluna === this.ladrao.coluna &&
      this.bonus.linha === this.ladrao.linha
    ) {
      this.bonus.ativo = false;
      this.pontuacao += 500;
      this.mensagem("Maleta coletada: +500 pontos!");
    }

    const restantes = this.bolsas.filter(
      bolsa => !bolsa.coletada
    ).length;

    if (restantes === 0) {
      this.fase++;
      this.pontuacao += 500;

      this.mensagem("Fase concluída! Avançando para a próxima...");
      this.atualizarPlacar();

      setTimeout(() => {
        if (this.jogoAtivo) {
          this.reiniciarFase();
        }
      }, 900);
    }

    this.atualizarPlacar();
  }

  // NOVA MOVIMENTAÇÃO: policiais perseguem pelo caminho mais curto.
  moverPoliciais() {
    if (!this.jogoAtivo) return;

    const desnorteados = Date.now() < this.tempoBombinha;

    for (const policial of this.policiais) {
      // Quando a bomba está ativa, os policiais ficam desorientados.
      if (desnorteados) {
        if (Math.random() < 0.7) continue;

        const aleatorias = [
          { dx: 0, dy: -1 },
          { dx: 0, dy: 1 },
          { dx: -1, dy: 0 },
          { dx: 1, dy: 0 }
        ].filter(d =>
          policial.podeAndar(
            policial.coluna + d.dx,
            policial.linha + d.dy
          )
        );

        if (aleatorias.length > 0) {
          const escolha =
            aleatorias[Math.floor(Math.random() * aleatorias.length)];

          policial.coluna += escolha.dx;
          policial.linha += escolha.dy;
        }

        continue;
      }

      // Busca o caminho mais curto até o ladrão.
      const fila = [{
        coluna: policial.coluna,
        linha: policial.linha,
        primeiroPasso: null
      }];

      const visitados = new Set([
        `${policial.coluna},${policial.linha}`
      ]);

      const direcoes = [
        { dx: 0, dy: -1 },
        { dx: 0, dy: 1 },
        { dx: -1, dy: 0 },
        { dx: 1, dy: 0 }
      ];

      let proximoPasso = null;

      while (fila.length > 0) {
        const atual = fila.shift();

        if (
          atual.coluna === this.ladrao.coluna &&
          atual.linha === this.ladrao.linha
        ) {
          proximoPasso = atual.primeiroPasso;
          break;
        }

        for (const direcao of direcoes) {
          const coluna = atual.coluna + direcao.dx;
          const linha = atual.linha + direcao.dy;
          const chave = `${coluna},${linha}`;

          if (
            !policial.podeAndar(coluna, linha) ||
            visitados.has(chave)
          ) {
            continue;
          }

          visitados.add(chave);

          fila.push({
            coluna,
            linha,
            primeiroPasso: atual.primeiroPasso || {
              coluna,
              linha
            }
          });
        }
      }

      if (proximoPasso) {
        policial.coluna = proximoPasso.coluna;
        policial.linha = proximoPasso.linha;
      }
    }

    this.verificarColisao();
    this.desenhar();
  }

  verificarColisao() {
    if (Date.now() < this.tempoBombinha) return;

    for (const policial of this.policiais) {
      if (
        policial.coluna === this.ladrao.coluna &&
        policial.linha === this.ladrao.linha
      ) {
        this.vidas--;
        this.atualizarPlacar();

        if (this.vidas <= 0) {
          this.jogoAtivo = false;
          this.mensagem(
            "Fim de jogo! Clique em Reiniciar jogo para tentar novamente."
          );
        } else {
          this.mensagem(
            "A polícia pegou você! Cuidado: perdeu uma vida."
          );

          this.ladrao.coluna = 1;
          this.ladrao.linha = 1;

          this.policiais[0].coluna = 13;
          this.policiais[0].linha = 1;

          this.policiais[1].coluna = 13;
          this.policiais[1].linha = 13;
        }

        break;
      }
    }
  }

  atualizarPlacar() {
    document.getElementById("pontuacao").textContent =
      this.pontuacao;

    document.getElementById("fase").textContent =
      this.fase;

    document.getElementById("vidas").textContent =
      this.vidas;

    document.getElementById("bolsas").textContent =
      this.bolsas
        ? this.bolsas.filter(b => !b.coletada).length
        : 0;
  }

  mensagem(texto) {
    document.getElementById("mensagem").textContent = texto;
  }

  desenharMapa() {
    for (let linha = 0; linha < TOTAL_LINHAS; linha++) {
      for (let coluna = 0; coluna < TOTAL_COLUNAS; coluna++) {
        const x = coluna * TAMANHO;
        const y = linha * TAMANHO;

        if (this.mapa[linha][coluna] === "#") {
          ctx.fillStyle = "#243b64";
          ctx.fillRect(x, y, TAMANHO, TAMANHO);

          ctx.strokeStyle = "#42649a";
          ctx.lineWidth = 2;
          ctx.strokeRect(
            x + 3,
            y + 3,
            TAMANHO - 6,
            TAMANHO - 6
          );
        } else {
          ctx.fillStyle = "#080d1c";
          ctx.fillRect(x, y, TAMANHO, TAMANHO);
        }
      }
    }
  }

  desenhar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    this.desenharMapa();

    this.bolsas.forEach(b => b.desenhar());
    this.bombinhas.forEach(b => b.desenhar());

    if (this.bonus) {
      this.bonus.desenhar();
    }

    this.ladrao.desenhar();
    this.policiais.forEach(p => p.desenhar());

    if (Date.now() < this.tempoBombinha) {
      ctx.fillStyle = "#fde047";
      ctx.font = "bold 13px Arial";
      ctx.textAlign = "left";
      ctx.fillText("BOMBINHA ATIVA!", 8, 18);
    }
  }

  reiniciarTudo() {
    this.pontuacao = 0;
    this.fase = 1;
    this.vidas = 3;
    this.jogoAtivo = true;

    this.reiniciarFase();
  }
}

const jogo = new Jogo();

// Controles do ladrão: setas ou teclas WASD.
document.addEventListener("keydown", function(event) {
  const tecla = event.key.toLowerCase();

  const movimentos = {
    arrowup: [0, -1],
    w: [0, -1],
    arrowdown: [0, 1],
    s: [0, 1],
    arrowleft: [-1, 0],
    a: [-1, 0],
    arrowright: [1, 0],
    d: [1, 0]
  };

  if (movimentos[tecla]) {
    event.preventDefault();

    jogo.moverLadrao(
      movimentos[tecla][0],
      movimentos[tecla][1]
    );
  }
});

// POLICIAIS MAIS RÁPIDOS: um movimento a cada 250 milissegundos.
setInterval(() => jogo.moverPoliciais(), 250);

// A maleta aparece em um corredor aleatório por tempo limitado.
setInterval(() => {
  if (!jogo.jogoAtivo || (jogo.bonus && jogo.bonus.ativo)) {
    return;
  }

  const livres = [];

  for (let linha = 1; linha < TOTAL_LINHAS - 1; linha++) {
    for (let coluna = 1; coluna < TOTAL_COLUNAS - 1; coluna++) {
      if (
        jogo.mapa[linha][coluna] !== "#" &&
        !(jogo.ladrao.coluna === coluna &&
          jogo.ladrao.linha === linha)
      ) {
        livres.push({ coluna, linha });
      }
    }
  }

  if (livres.length === 0) return;

  const lugar = livres[Math.floor(Math.random() * livres.length)];

  jogo.bonus = new Bonus(lugar.coluna, lugar.linha);
  jogo.mensagem("Uma maleta apareceu! Colete-a para ganhar 500 pontos.");
  jogo.desenhar();

  setTimeout(() => {
    if (jogo.bonus) {
      jogo.bonus.ativo = false;
      jogo.desenhar();
    }
  }, 7000);
}, 15000);

document.getElementById("reiniciar").addEventListener("click", function() {
  jogo.reiniciarTudo();
});
