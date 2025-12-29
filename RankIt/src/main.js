import "./styles.css";
import { FIELDS } from "./js/config.js";
import { loadField } from "./js/ranking.js";
import { goToFieldPage } from "./js/navigation.js";
import { applySearchFilter } from "./js/ui.js";

/* expose for inline HTML */
window.goToFieldPage = goToFieldPage;
window.loadField = loadField;
window.applySearchFilter = applySearchFilter;

document.addEventListener("DOMContentLoaded", () => {
  const fieldList = document.getElementById("field-list");
  Object.keys(FIELDS).forEach(f => {
    const card = document.createElement("div");
    card.className = "p-6 bg-white rounded-xl shadow hover:shadow-lg cursor-pointer";
    card.innerHTML = `<h3 class="text-xl font-bold">${f}</h3>`;
    card.onclick = () => loadField(f);
    fieldList.appendChild(card);
  });
});

