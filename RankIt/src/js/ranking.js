//import { FIELDS, rawData, PARAMS, weights } from "./config.js";
//import { renderTable, renderPriorityButtons } from "./ui.js";
import {
  FIELDS,
  rawData,
  PARAMS,
  weights,
  fullRankedData,
  lastRankedData
} from "./config.js";

import { renderTable, renderPriorityButtons } from "./ui.js";



export async function loadField(field) {
  document.getElementById("field-page").classList.add("hidden");
  document.getElementById("ranking-page").classList.remove("hidden");
  document.getElementById("selected-title").innerText = field + " Rankings";

  const res = await fetch("/" + FIELDS[field]);
  const text = await res.text();

  Papa.parse(text, {
    header: true,
    skipEmptyLines: true,
    complete: r => {

      rawData.length = 0;
      r.data.forEach(d => {
        let o = {};
        Object.keys(d).forEach(k => {
          if (k === "Name" || k === "State") o[k] = d[k];
          else o[k] = parseFloat(d[k]);
        });
        rawData.push(o);
      });

      initParams();
      applyDefaultWeights();
      calculateRanking();
    }
  });
}

function initParams() {
  PARAMS.length = 0;
  Object.keys(rawData[0]).forEach(k => {
    if (k !== "Name" && k !== "State") PARAMS.push(k);
  });
  renderPriorityButtons();
}

function applyDefaultWeights() {
  const w = 1 / PARAMS.length;
  PARAMS.forEach(p => weights[p] = w);
}

function calculateRanking() {
  let stats = {};

  PARAMS.forEach(p => {
    const v = rawData.map(d => d[p]).filter(n => typeof n === "number");
    stats[p] = {
      min: Math.min(...v),
      max: Math.max(...v)
    };
  });

  // ✅ DECLARE ranked FIRST
  const ranked = rawData
    .map(d => {
      let s = 0;

      PARAMS.forEach(p => {
        if (typeof d[p] !== "number") return;
        const n =
          (d[p] - stats[p].min) /
          (stats[p].max - stats[p].min + 1e-9);

        d["Norm_" + p] = +n.toFixed(5);
        s += n * weights[p];
      });

      d.Score = +s.toFixed(5);
      return d;
    })
    .sort((a, b) => b.Score - a.Score);

  // ✅ NOW SAFE TO USE ranked
  ranked.forEach((d, i) => (d.Rank = i + 1));

  fullRankedData.length = 0;
  lastRankedData.length = 0;

  ranked.forEach(d => {
    fullRankedData.push(d);
    lastRankedData.push(d);
  });

  renderTable(lastRankedData);
}

import { customMode } from "./config.js";

export function toggleCustomMode() {
  const section = document.getElementById("priority-section");
  if (!section) return;

  section.classList.toggle("hidden");
}

window.recalculateRanking = calculateRanking;
window.toggleCustomMode = toggleCustomMode;

