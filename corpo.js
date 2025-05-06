const treinos = {
  segunda: { nome: "Glúteos + Posterior de Coxa", exercicios: ["1 - Cadeira abdutora - 5x15", "2 - Abdução de quadril - 3x12", "3 - Agachamento sumô - 3x10", "4 - Stiff - 3x12", "5 - Good Morning no Super Squat - 3x15", "6 - Elevação Pelvica - 3x12", "7 - Cadeira Flexora - 4x10", "Esteira - 15 minutos"] },
  terca: { nome: "Superiores + Abdômen", exercicios: ["1 - Puxada frontal - 3x12", "2 - Remada baixa (Triângulo) - 3x12", "3 - Elevação lateral com halteres - 3x12", "4 - Desenvolvimento - 3x12", "5 - Rosca direta - 3x12", "6 - Rosca martelo - 3x12", "7 - Tríceps corda - 3x12", "8 - Tríceps barra - 3x12", "9 - Abdominal curto - 3x15", "Esteira - 20 minutos"] },
  quarta: { nome: "Quadríceps", exercicios: ["1 - Cadeira extensora - 4x12", "2 - Agachamento livre - 3x10", "3 - Leg press 45° - 3x12", "4 - Agachamento com halteres - 3x10", "5 - Cadeira adutora - 3x15", "6 - Panturrilha no leg press - 3x15", "7 - Panturrilha máquina - 3x20", "Esteira - 20 minutos"] },
  sexta: { nome: "Glúteos + Posterior de Coxa", exercicios: ["1 - Cadeira abdutora - 5x15", "2 - Coice na polia - 3x12", "3 - Mesa flexora - 4x12", "4 - Stiff - 3x12", "5 - Cadeira flexora - 3x10", "6 - Elevação Pelvica - 3x12", "7 - Panturrilha na máquina - 4x10", "Bike - 20 minutos"] },
};

function mostrarTreino(dia) {
  const treino = treinos[dia];
  const container = document.getElementById("treino-dia");

  if (!treino) {
    container.innerHTML = "<p>Treino não definido para esse dia.</p>";
    return;
  }

  const salvos = JSON.parse(localStorage.getItem(`treino-${dia}`)) || {};
  const agora = new Date();

  let html = `<h2>${treino.nome}</h2><div>`;

  treino.exercicios.forEach((ex, i) => {
    const marcadoEm = salvos[i];
    let checked = "";

    if (marcadoEm) {
      const dataMarcada = new Date(marcadoEm);
      const diffHoras = (agora - dataMarcada) / (1000 * 60 * 60);
      if (diffHoras < 24) {
        checked = "checked";
      } else {
        delete salvos[i]; // remove se já passou 24h
        localStorage.setItem(`treino-${dia}`, JSON.stringify(salvos));
      }
    }

    html += `
      <div class="exercicio">
        <label>
          <input type="checkbox" id="${dia}-ex-${i}" ${checked} onchange="salvarMarcado('${dia}', ${i}, this.checked)">
          ${ex}
        </label>
      </div>
    `;
  });

  html += `</div>`;
  container.innerHTML = html;
}

function salvarMarcado(dia, index, marcado) {
  const salvos = JSON.parse(localStorage.getItem(`treino-${dia}`)) || {};

  if (marcado) {
    salvos[index] = new Date().toISOString(); // salva com data
  } else {
    delete salvos[index];
  }

  localStorage.setItem(`treino-${dia}`, JSON.stringify(salvos));
}

