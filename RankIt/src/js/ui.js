import { PARAMS, priorityOrder, weights } from "./config.js";

/* ================= TABLE ================= */
export function renderTable(data) {
  const body = document.getElementById("ranking-body");
  body.innerHTML = "";

  data.forEach(d => {
    let row = `
      <tr class="border-b hover:bg-[#f4e3a42b] transition">
        <td class="p-4 font-extrabold">#${d.Rank}</td>
        <td class="p-4 font-medium">${d.Name}</td>
        <td class="p-4 text-gray-500">${d.State}</td>
        <td class="p-4">
          <span class="bg-[#eebd092b] px-3 py-1 rounded-full text-sm font-semibold">
            ${d.Score}
          </span>
        </td>
    `;
    PARAMS.forEach(p => row += `<td class="p-4">${d["Norm_" + p]}</td>`);
    row += "</tr>";
    body.innerHTML += row;
  });
}



import { fullRankedData, lastRankedData } from "./config.js";

export function applySearchFilter() {
  const search = document
    .getElementById("search-input")
    .value
    .trim()
    .toLowerCase();

  // ✅ When search is empty → restore original ranking
  if (search === "") {
    lastRankedData.length = 0;
    fullRankedData.forEach(d => lastRankedData.push(d));
    renderTable(lastRankedData);
    return;
  }

  // ✅ Always filter from FULL list
  const filtered = fullRankedData.filter(d =>
    d.Name.toLowerCase().includes(search)
  );

  lastRankedData.length = 0;
  filtered.forEach(d => lastRankedData.push(d));

  renderTable(lastRankedData);
}


/* ================= PRIORITY UI ================= */
export function renderPriorityButtons() {
  const c = document.getElementById("priority-buttons");
  c.innerHTML = "";

  PARAMS.forEach(p => {
    const idx = priorityOrder.indexOf(p);
    const btn = document.createElement("button");

    btn.className =
      "px-5 py-2 rounded-xl border " +
      (idx >= 0 ? "bg-[#ffedc4]" : "bg-gray-100");

    btn.innerHTML =
      p + (idx >= 0 ? ` <span class="ml-2 font-bold">(${idx + 1})</span>` : "");

    btn.onclick = () => togglePriority(p);
    c.appendChild(btn);
  });
}

/* ================= PRIORITY LOGIC ================= */
function togglePriority(p) {
  const i = priorityOrder.indexOf(p);
  if (i >= 0) priorityOrder.splice(i, 1);
  else priorityOrder.push(p);

  renderPriorityButtons();

  if (priorityOrder.length > 0) {
    applyPriorityWeights();
  } else {
    applyDefaultWeights();
  }

  window.recalculateRanking(); // 🔥 THIS WAS MISSING EFFECT
}

function applyDefaultWeights() {
  const w = 1 / PARAMS.length;
  PARAMS.forEach(p => weights[p] = w);
}

function applyPriorityWeights() {
  const N = PARAMS.length;
  const d = (N * (N + 1)) / 2;

  PARAMS.forEach(p => weights[p] = 0);

  priorityOrder.forEach((p, i) => {
    weights[p] = (N - i) / d;
  });
}
