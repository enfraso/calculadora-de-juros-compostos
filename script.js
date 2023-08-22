function calcularJuros() {
            var capitalInicial = parseFloat(document.getElementById("capitalInicial").value);
            var taxaJuros = parseFloat(document.getElementById("taxaJuros").value);
            var tempo = parseFloat(document.getElementById("tempo").value);
            var tipoTempo = document.getElementById("tipoTempo").value;
            var tipoJuros = document.getElementById("tipoJuros").value;

            if (tipoTempo === 'meses') {
                if (tipoJuros === 'anual') {
                    taxaJuros = taxaJuros / 12;
                }
            } else if (tipoTempo === 'anos') {
                if (tipoJuros === 'mensal') {
                    taxaJuros = taxaJuros * 12;
                }
            }

            taxaJuros = taxaJuros / 100;
            var montante = capitalInicial * Math.pow((1 + taxaJuros), tempo);

            document.getElementById("resultado").textContent = "Montante: R$" + montante.toFixed(2);
        
		}
		 
		
        function salvarCalculo() {
  var data = new Date().toLocaleString();
  var capitalInicial = document.getElementById("capitalInicial").value;
  var taxaJuros = document.getElementById("taxaJuros").value;
  var tipoJuros = document.getElementById("tipoJuros").value;
  var tempo = document.getElementById("tempo").value;
  var tipoTempo = document.getElementById("tipoTempo").value;
  var montante = parseFloat(document.getElementById("resultado").textContent.split("R$")[1]);

  var historicoItem = {
    data: data,
    capitalInicial: capitalInicial,
    taxaJuros: taxaJuros,
    tipoJuros: tipoJuros,
    tempo: tempo,
    tipoTempo: tipoTempo,
    montante: montante.toFixed(2)
  };

  // Recupera os itens do histórico do cache
  var historico = localStorage.getItem("historico");
  if (historico) {
    historico = JSON.parse(historico);
  } else {
    historico = [];
  }

  // Adiciona o novo item ao histórico
  historico.push(historicoItem);

  // Salva o histórico no cache
  localStorage.setItem("historico", JSON.stringify(historico));

  // Atualiza a exibição do histórico
  exibirHistorico();
}

function exibirHistorico() {
  // Recupera os itens do histórico do cache
  var historico = localStorage.getItem("historico");
  if (historico) {
    historico = JSON.parse(historico);

    var historicoElement = document.getElementById("historico");
    historicoElement.innerHTML = "";

    // Cria os elementos do histórico
    for (var i = 0; i < historico.length; i++) {
      var historicoItem = historico[i];

      var historicoItemElement = document.createElement("div");
      historicoItemElement.className = "historico-item";
      historicoItemElement.innerHTML = `<strong>Data:</strong> ${historicoItem.data}<br>
                                         <strong>Capital Inicial:</strong> ${historicoItem.capitalInicial}<br>
                                         <strong>Taxa de Juros:</strong> ${historicoItem.taxaJuros}% ${historicoItem.tipoJuros}<br>
                                         <strong>Tempo:</strong> ${historicoItem.tempo} ${historicoItem.tipoTempo}<br>
                                         <strong>Montante:</strong> R${historicoItem.montante}
                                         <button onclick="deletarItem(${i})">Deletar</button>`;

      historicoElement.appendChild(historicoItemElement);
    }
  }
}

function deletarItem(index) {
  // Recupera os itens do histórico do cache
  var historico = localStorage.getItem("historico");
  if (historico) {
    historico = JSON.parse(historico);

    // Remove o item do histórico
    historico.splice(index, 1);

    // Salva o histórico atualizado no cache
    localStorage.setItem("historico", JSON.stringify(historico));

    // Atualiza a exibição do histórico
    exibirHistorico();
  }
}

// Exibe o histórico ao carregar a página
window.onload = exibirHistorico;