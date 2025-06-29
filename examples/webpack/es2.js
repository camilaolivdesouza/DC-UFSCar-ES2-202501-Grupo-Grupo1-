import { addDays, eachQuarterOfInterval } from 'date-fns';

function formatDate(date) {
  if (!(date instanceof Date) || isNaN(date)) return "Data inválida";
  return date.toLocaleDateString("pt-BR");
}

// --- ADD DAYS ---

// Exemplo rápido 1: 01/09/2014 + 10 dias
const quickAddDays1 = new Date(2014, 8, 1); // Setembro (correto)
document.getElementById("quickAddDays1").textContent = formatDate(addDays(quickAddDays1, 10));

// Exemplo rápido 2: 25/12/2023 + 5 dias
const quickAddDays2 = new Date(2023, 11, 25); // Dezembro (correto)
document.getElementById("quickAddDays2").textContent = formatDate(addDays(quickAddDays2, 5));

// Exemplo rápido 3: 15/02/2022 - 7 dias
const quickAddDays3 = new Date(2022, 1, 15); // Fevereiro (correto)
document.getElementById("quickAddDays3").textContent = formatDate(addDays(quickAddDays3, -7));

// Formulário AddDays
document.getElementById("addDaysForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const dateStr = document.getElementById("addDays-date").value;
  const amount = parseInt(document.getElementById("addDays-amount").value, 10);
  const resultDiv = document.getElementById("addDaysResult");

  if (!dateStr || isNaN(amount)) {
    resultDiv.textContent = "Preencha todos os campos corretamente.";
    return;
  }

  // Corrigido: cria a data como local
  const [year, day, month] = dateStr.split('-').map(Number);
  const date = new Date(year, month - 1, day);

  const result = addDays(date, amount);
  resultDiv.textContent = `Resultado: ${formatDate(result)}`;
});

// Formulario AddDays Alternativo
document.getElementById("addDaysFormAlt").addEventListener("submit", function (e) {
  e.preventDefault();
  const dateStr = document.getElementById("ddDays-date-alt").value;
  const amount = parseInt(document.getElementById("addDays-amount-alt").value, 10);
  const resultDiv = document.getElementById("addDaysResultAlt");

  if (!dateStr || isNaN(amount)) {
    resultDiv.textContent = "Preencha todos os campos corretamente.";
    return;
  }

  // Corrigido: cria a data como local
  const [year, day, month] = dateStr.split('-').map(Number);
  const date = new Date(year, month - 1, day);

  const result = addDays(date, amount);
  resultDiv.textContent = `Resultado: ${formatDate(result)}`;
});

// --- EACH QUARTER OF INTERVAL ---

// Função utilitária para exibir lista de datas formatadas
function formatQuarterList(dates) {
  if (!Array.isArray(dates) || dates.length === 0) return "Nenhum trimestre encontrado.";
  return dates.map(formatDate).join(" | ");
}

// Exemplo rápido 1: 06/02/2014 a 10/08/2014
const quickQuarter1 = eachQuarterOfInterval({
  start: new Date(2014, 1, 6),
  end: new Date(2014, 7, 10)
});
document.getElementById("quickQuarter1").textContent = formatQuarterList(quickQuarter1);

// Exemplo rápido 2: 15/05/2020 a 20/12/2020
const quickQuarter2 = eachQuarterOfInterval({
  start: new Date(2020, 4, 15),
  end: new Date(2020, 11, 20)
});
document.getElementById("quickQuarter2").textContent = formatQuarterList(quickQuarter2);

// Formulário EachQuarterOfInterval
document.getElementById("eachQuarterForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const startStr = document.getElementById("quarter-start").value;
  const endStr = document.getElementById("quarter-end").value;
  const resultDiv = document.getElementById("eachQuarterResult");

  if (!startStr || !endStr) {
    resultDiv.textContent = "Preencha todos os campos corretamente.";
    return;
  }

  // Corrigido: cria as datas como local
  const [startYear,startDay, startMonth] = startStr.split('-').map(Number);
  const [endYear, endDay, endMonth] = endStr.split('-').map(Number);
  const start = new Date(startYear, startMonth - 1, startDay);
  const end = new Date(endYear, endMonth - 1, endDay);

  const quarters = eachQuarterOfInterval({ start, end });
  resultDiv.textContent = `Trimestres encontrados: ${formatQuarterList(quarters)}`;
});

//USO DAS FUNÇÕES ALTERADAS

// Exemplo ALternativo 1: 06/02/2014 a 10/08/2014
const quickQuarterAlt1 = eachQuarterOfInterval({
  start: new Date(2014, 1, 6),
  end: new Date(2014, 7, 10)
});
document.getElementById("quickQuarter1Alt").textContent = formatQuarterList(quickQuarterAlt1);

// Exemplo rápido 2: 15/05/2020 a 20/12/2020
const quickQuarterAlt2 = eachQuarterOfInterval({
  start: '2020-04-15',
  end: new Date(2020, 11, 20)
});
document.getElementById("quickQuarter2Alt").textContent = formatQuarterList(quickQuarterAlt2);

// Formulário EachQuarterOfInterval ALternativo
document.getElementById("eachQuarterFormAlt").addEventListener("submit", function (e) {
  e.preventDefault();
  const startStr = document.getElementById("quarter-start-alt").value;
  const endStr = document.getElementById("quarter-end-alt").value;
  const resultDiv = document.getElementById("eachQuarterResultAlt");
  const max = parseInt(document.getElementById("max-quarters").value, 10) || undefined;


  if (!startStr || !endStr) {
    resultDiv.textContent = "Preencha todos os campos corretamente.";
    return;
  }

  const [startYear,startDay, startMonth] = startStr.split('-').map(Number);
  const [endYear, endDay, endMonth] = endStr.split('-').map(Number);
  const start = new Date(startYear, startMonth - 1, startDay);
  const end = new Date(endYear, endMonth - 1, endDay);

  const quarters = eachQuarterOfInterval({ start, end }, { max });
  resultDiv.textContent = `Trimestres encontrados: ${formatQuarterList(quarters)}`;
});