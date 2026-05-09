const statusText = document.getElementById("statusText");
const instructionText = document.getElementById("instructionText");
const cardContent = document.getElementById("cardContent");
const btnRegistrar = document.getElementById("btnRegistrar");
const btnDiagnostico = document.getElementById("btnDiagnostico");
const btnRegistrarDeNovo = document.getElementById("btnRegistrarDeNovo");

const defaultInstructionText = 'Aperte em registrar para guardar e calcular as suas informacoes. <br> em seguida aperte em diagnostico para ver o seu resultado';
const defaultCardText = 'Carregando...';

function updateCard(text) {
  cardContent.innerHTML = text;
}

function setStatus(text) {
  statusText.innerText = text;
}

function hideInstruction() {
  instructionText.innerHTML = '';
}

btnRegistrar.addEventListener("click", async () => {
  const nivelFocoValue = parseInt(document.getElementById("nivel_foco").value);
  const tempoMinutosValue = parseInt(document.getElementById("tempo_minutos").value);
  const categoriaValue = document.getElementById("categoria").value;
  const data = {
    nivel_foco: nivelFocoValue,
    tempo_minutos: tempoMinutosValue,
    comentario: document.getElementById("comentario").value,
    categoria: categoriaValue,
    tags: document.getElementById("tags").value
      .split(",")
      .map(tag => tag.trim())
      .filter(Boolean)
  };

  if (!nivelFocoValue || isNaN(nivelFocoValue) || !tempoMinutosValue || isNaN(tempoMinutosValue) || !categoriaValue) {
    setStatus("não foi possível registrar");
    updateCard(`<p class="text-red-600">Preencha o nível de foco, tempo e categoria antes de registrar.</p>`);
    return;
  }

  try {
    const res = await fetch("http://127.0.0.1:8000/registro_foco", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(data)
    });
    const json = await res.json();
    hideInstruction();
    setStatus("registrado com sucesso");
    updateCard(`
      <p class="text-xl text-green-600 font-black">✔ Registro salvo</p>
      <p class="mt-3 text-base">Categoria: ${data.categoria || 'sem categoria'}</p>
      <p>Tags: ${data.tags.length ? data.tags.join(', ') : 'sem tags'}</p>
      <p class="mt-3 text-sm text-gray-600">${data.comentario || 'Nenhum comentário'}</p>
    `);
  } catch (error) {
    setStatus("erro ao registrar");
    updateCard(`<p class="text-red-600">Erro ao registrar: ${error.message || error}</p>`);
  }
});

btnDiagnostico.addEventListener("click", async () => {
  try {
    const res = await fetch("http://127.0.0.1:8000/diagnostico-produtividade");
    if (!res.ok) {
      const err = await res.json();
      setStatus("erro no diagnóstico");
      updateCard(`<p class="text-red-600">Erro: ${err.detail}</p>`);
      return;
    }
    const json = await res.json();
    hideInstruction();
    setStatus("diagnóstico pronto");
    updateCard(`
      <p class="text-xl font-black">Diagnóstico</p>
      <p class="mt-3 text-base">Média de foco: <span class="text-pink-600">${json.media_nivel_foco}</span></p>
      <p>Tempo total: <span class="text-pink-600">${json.tempo_total_minutos} min</span></p>
      <p class="mt-3 italic text-green-600">"${json.feedback}"</p>
    `);
  } catch (error) {
    setStatus("erro no diagnóstico");
    updateCard(`<p class="text-red-600">Erro ao buscar diagnóstico: ${error.message || error}</p>`);
  }
});

btnRegistrarDeNovo.addEventListener("click", () => {
  document.getElementById("nivel_foco").value = "";
  document.getElementById("tempo_minutos").value = "";
  document.getElementById("comentario").value = "";
  document.getElementById("categoria").value = "";
  document.getElementById("tags").value = "";
  setStatus("1 of 23 cards_loaded");
  instructionText.innerHTML = defaultInstructionText;
  updateCard(defaultCardText);
});

setStatus("");
updateCard(defaultCardText);
