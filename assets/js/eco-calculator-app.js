(() => {
  const mount = document.getElementById("eco-app-mount");
  if (!mount) return;

  const TEXTILE_FACTORS = {
    waterLitersPerKg: 562.5,
    co2KgPerKg: 16.875,
    rawMaterialsKgPerKg: 24.4375
  };

  const PLASTIC_FACTORS = {
    pet: {
      label: "PET",
      co2SavedKgPerKg: 1.168,
      energySavedKwhPerKg: 5.011
    },
    hdpe: {
      label: "HDPE",
      co2SavedKgPerKg: 0.86,
      energySavedKwhPerKg: 6.009
    },
    pp: {
      label: "PP",
      co2SavedKgPerKg: 0.893,
      energySavedKwhPerKg: 5.588
    },
    mixed: {
      label: "Mixed plastics",
      co2SavedKgPerKg: 1.047,
      energySavedKwhPerKg: 5.51
    }
  };

  const ITEM_LIBRARY = {
    textile: [
      { key: "tshirt", label: "T-shirt", defaultWeightKg: 0.2 },
      { key: "shirt", label: "Shirt / blouse", defaultWeightKg: 0.25 },
      { key: "jeans", label: "Jeans / trousers", defaultWeightKg: 0.6 },
      { key: "dress", label: "Dress", defaultWeightKg: 0.45 },
      { key: "hoodie", label: "Jacket / hoodie", defaultWeightKg: 0.75 },
      { key: "bedsheet", label: "Bedsheet", defaultWeightKg: 0.7 },
      { key: "shoes", label: "Shoes (pair)", defaultWeightKg: 1.0 }
    ],
    plastic: [
      { key: "pet-500", label: "PET bottle 500ml", defaultWeightKg: 0.02, polymer: "pet" },
      { key: "pet-1500", label: "PET bottle 1.5L", defaultWeightKg: 0.035, polymer: "pet" },
      { key: "hdpe-bottle", label: "HDPE bottle / container", defaultWeightKg: 0.06, polymer: "hdpe" },
      { key: "pp-container", label: "PP takeaway container", defaultWeightKg: 0.025, polymer: "pp" },
      { key: "jerrycan", label: "HDPE jerrycan", defaultWeightKg: 0.12, polymer: "hdpe" },
      { key: "shopping-bag", label: "Plastic shopping bag", defaultWeightKg: 0.008, polymer: "mixed" },
      { key: "sachet-pack", label: "Sachet / flexible plastic pack", defaultWeightKg: 0.003, polymer: "mixed" }
    ]
  };

  const state = {
    activePanel: "items",
    nextId: 1,
    itemEntries: [],
    weightEntries: []
  };

  function createFocusSnapshot(element) {
    if (!element || !element.hasAttribute("data-field")) return null;

    const snapshot = {
      group: element.getAttribute("data-entry-group"),
      id: element.getAttribute("data-entry-id"),
      field: element.getAttribute("data-field"),
      tagName: element.tagName
    };

    if (typeof element.selectionStart === "number" && typeof element.selectionEnd === "number") {
      snapshot.selectionStart = element.selectionStart;
      snapshot.selectionEnd = element.selectionEnd;
    }

    return snapshot;
  }

  function restoreFocus(snapshot) {
    if (!snapshot) return;

    const selector = `[data-entry-group="${snapshot.group}"][data-entry-id="${snapshot.id}"][data-field="${snapshot.field}"]`;
    const element = mount.querySelector(selector);
    if (!element) return;

    element.focus({ preventScroll: true });

    if (
      snapshot.tagName === "INPUT" &&
      typeof snapshot.selectionStart === "number" &&
      typeof element.setSelectionRange === "function"
    ) {
      try {
        element.setSelectionRange(snapshot.selectionStart, snapshot.selectionEnd);
      } catch (error) {
        // Ignore unsupported input selection cases.
      }
    }
  }

  function getLibraryItem(material, key) {
    return ITEM_LIBRARY[material].find((item) => item.key === key) || ITEM_LIBRARY[material][0];
  }

  function safeNumber(value) {
    const parsed = Number.parseFloat(value);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
  }

  function formatNumber(value, digits = 1) {
    return new Intl.NumberFormat("en-US", {
      maximumFractionDigits: digits,
      minimumFractionDigits: value && value < 10 ? Math.min(digits, 1) : 0
    }).format(value);
  }

  function addItemEntry(material) {
    const firstItem = ITEM_LIBRARY[material][0];
    state.itemEntries.push({
      id: state.nextId++,
      material,
      itemKey: firstItem.key,
      label: firstItem.label,
      polymer: firstItem.polymer || "",
      quantity: 1,
      unitWeightKg: firstItem.defaultWeightKg
    });
    render();
  }

  function addWeightEntry() {
    state.weightEntries.push({
      id: state.nextId++,
      label: "Sorted textile batch",
      weightKg: 1
    });
    render();
  }

  function removeEntry(group, id) {
    state[group] = state[group].filter((entry) => entry.id !== id);
    render();
  }

  function resetAll() {
    state.itemEntries = [];
    state.weightEntries = [];
    render();
  }

  function normalizeQuantity(value) {
    return Math.max(1, Math.round(safeNumber(value)) || 1);
  }

  function normalizePositive(value) {
    return safeNumber(value);
  }

  function updateItemEntry(id, field, value, options = {}) {
    const entry = state.itemEntries.find((item) => item.id === id);
    if (!entry) return;
    const shouldRender = options.shouldRender !== false;
    const shouldCommit = options.commit === true;

    if (field === "itemKey") {
      const item = getLibraryItem(entry.material, value);
      entry.itemKey = item.key;
      entry.label = item.label;
      entry.unitWeightKg = item.defaultWeightKg;
      entry.polymer = item.polymer || "";
      if (shouldRender) render(options);
      return;
    }

    if (field === "quantity") {
      entry.quantity = shouldCommit ? normalizeQuantity(value) : value;
      if (shouldRender) render(options);
      return;
    }

    if (field === "unitWeightKg") {
      entry.unitWeightKg = shouldCommit ? normalizePositive(value) : value;
      if (shouldRender) render(options);
      return;
    }
  }

  function updateWeightEntry(id, field, value, options = {}) {
    const entry = state.weightEntries.find((item) => item.id === id);
    if (!entry) return;
    const shouldRender = options.shouldRender !== false;
    const shouldCommit = options.commit === true;

    if (field === "label") {
      entry.label = value;
      if (shouldRender) render(options);
      return;
    }

    if (field === "weightKg") {
      entry.weightKg = shouldCommit ? normalizePositive(value) : value;
      if (shouldRender) render(options);
    }
  }

  function calculateTotals() {
    const totals = {
      textileKg: 0,
      plasticKg: 0,
      textileItems: 0,
      plasticItems: 0,
      waterLiters: 0,
      co2Kg: 0,
      energyKwh: 0,
      rawMaterialsKg: 0,
      divertedKg: 0,
      rows: []
    };

    state.itemEntries.forEach((entry) => {
      const quantity = normalizeQuantity(entry.quantity);
      const unitWeightKg = safeNumber(entry.unitWeightKg);
      const totalWeightKg = quantity * unitWeightKg;
      const row = {
        kind: "item",
        label: entry.label,
        material: entry.material,
        quantity,
        totalWeightKg,
        waterLiters: 0,
        co2Kg: 0,
        energyKwh: 0,
        rawMaterialsKg: 0
      };

      if (entry.material === "textile") {
        row.waterLiters = totalWeightKg * TEXTILE_FACTORS.waterLitersPerKg;
        row.co2Kg = totalWeightKg * TEXTILE_FACTORS.co2KgPerKg;
        row.rawMaterialsKg = totalWeightKg * TEXTILE_FACTORS.rawMaterialsKgPerKg;
        totals.textileKg += totalWeightKg;
        totals.textileItems += quantity;
      } else {
        const polymerFactor = PLASTIC_FACTORS[entry.polymer] || PLASTIC_FACTORS.mixed;
        row.co2Kg = totalWeightKg * polymerFactor.co2SavedKgPerKg;
        row.energyKwh = totalWeightKg * polymerFactor.energySavedKwhPerKg;
        totals.plasticKg += totalWeightKg;
        totals.plasticItems += quantity;
      }

      totals.waterLiters += row.waterLiters;
      totals.co2Kg += row.co2Kg;
      totals.energyKwh += row.energyKwh;
      totals.rawMaterialsKg += row.rawMaterialsKg;
      totals.rows.push(row);
    });

    state.weightEntries.forEach((entry) => {
      const weightKg = safeNumber(entry.weightKg);
      const row = {
        kind: "weight",
        label: entry.label || "Textile weight entry",
        material: "textile",
        quantity: 1,
        totalWeightKg: weightKg,
        waterLiters: weightKg * TEXTILE_FACTORS.waterLitersPerKg,
        co2Kg: weightKg * TEXTILE_FACTORS.co2KgPerKg,
        energyKwh: 0,
        rawMaterialsKg: weightKg * TEXTILE_FACTORS.rawMaterialsKgPerKg
      };

      totals.textileKg += weightKg;
      totals.waterLiters += row.waterLiters;
      totals.co2Kg += row.co2Kg;
      totals.rawMaterialsKg += row.rawMaterialsKg;
      totals.rows.push(row);
    });

    totals.divertedKg = totals.textileKg + totals.plasticKg;
    return totals;
  }

  function renderItemOptions(material, selectedKey) {
    return ITEM_LIBRARY[material]
      .map((item) => `<option value="${item.key}"${item.key === selectedKey ? " selected" : ""}>${item.label}</option>`)
      .join("");
  }

  function renderItemEntries(material) {
    const entries = state.itemEntries.filter((entry) => entry.material === material);
    const title = material === "textile" ? "Textile items" : "Plastic items";
    const description =
      material === "textile"
        ? "Use counted garments, footwear, or household textiles. Default unit weights can be edited."
        : "Use counted recyclable plastic items. Polymer assumptions drive the CO2 and energy estimate.";

    return `
      <section class="eco-calc-entry-group">
        <div class="eco-calc-entry-group-header">
          <div>
            <h3>${title}</h3>
            <p>${description}</p>
          </div>
          <button type="button" class="eco-calc-mini-btn" data-action="add-item" data-material="${material}">Add ${material === "textile" ? "textile" : "plastic"} item</button>
        </div>
        ${
          entries.length
            ? `<div class="eco-calc-entry-list">
                ${entries
                  .map(
                    (entry) => `
                      <article class="eco-calc-entry-card">
                        <div class="eco-calc-entry-grid">
                          <label>
                            <span>Item type</span>
                            <select data-entry-group="itemEntries" data-entry-id="${entry.id}" data-field="itemKey">
                              ${renderItemOptions(material, entry.itemKey)}
                            </select>
                          </label>
                          <label>
                            <span>Quantity</span>
                            <input type="number" min="1" step="1" value="${entry.quantity}" data-entry-group="itemEntries" data-entry-id="${entry.id}" data-field="quantity">
                          </label>
                          <label>
                            <span>Unit weight (kg)</span>
                            <input type="number" min="0" step="0.001" value="${entry.unitWeightKg}" data-entry-group="itemEntries" data-entry-id="${entry.id}" data-field="unitWeightKg">
                          </label>
                          <div class="eco-calc-entry-meta">
                            <strong>${formatNumber(entry.quantity * safeNumber(entry.unitWeightKg), 3)} kg</strong>
                            <span>${material === "plastic" ? (PLASTIC_FACTORS[entry.polymer] || PLASTIC_FACTORS.mixed).label : "Textile average"}</span>
                          </div>
                        </div>
                        <button type="button" class="eco-calc-remove-btn" data-action="remove-item" data-entry-id="${entry.id}">Remove</button>
                      </article>
                    `
                  )
                  .join("")}
              </div>`
            : `<div class="eco-calc-empty">No ${material} items added yet.<div class="eco-calc-empty-actions"><button type="button" class="eco-calc-mini-btn" data-action="add-item" data-material="${material}">Add first ${material === "textile" ? "textile" : "plastic"} item</button></div></div>`
        }
      </section>
    `;
  }

  function renderWeightEntries() {
    return `
      <section class="eco-calc-entry-group">
        <div class="eco-calc-entry-group-header">
          <div>
            <h3>Weighted textile batches</h3>
            <p>Use this for sorted or collected textile batches that are already weighed in kilograms.</p>
          </div>
          <button type="button" class="eco-calc-mini-btn" data-action="add-weight">Add textile weight</button>
        </div>
        ${
          state.weightEntries.length
            ? `<div class="eco-calc-entry-list">
                ${state.weightEntries
                  .map(
                    (entry) => `
                      <article class="eco-calc-entry-card">
                        <div class="eco-calc-entry-grid eco-calc-entry-grid-weight">
                          <label>
                            <span>Batch label</span>
                            <input type="text" value="${entry.label}" data-entry-group="weightEntries" data-entry-id="${entry.id}" data-field="label">
                          </label>
                          <label>
                            <span>Weight (kg)</span>
                            <input type="number" min="0" step="0.01" value="${entry.weightKg}" data-entry-group="weightEntries" data-entry-id="${entry.id}" data-field="weightKg">
                          </label>
                          <div class="eco-calc-entry-meta">
                            <strong>${formatNumber(safeNumber(entry.weightKg), 2)} kg</strong>
                            <span>Textile-only weight method</span>
                          </div>
                        </div>
                        <button type="button" class="eco-calc-remove-btn" data-action="remove-weight" data-entry-id="${entry.id}">Remove</button>
                      </article>
                    `
                  )
                  .join("")}
              </div>`
            : `<div class="eco-calc-empty">No textile weight entries added yet.<div class="eco-calc-empty-actions"><button type="button" class="eco-calc-mini-btn" data-action="add-weight">Add first textile weight</button></div></div>`
        }
      </section>
    `;
  }

  function renderBreakdownRows(rows) {
    if (!rows.length) {
      return `<tr><td colspan="6" class="eco-calc-table-empty">Add items or textile weight to generate a breakdown.</td></tr>`;
    }

    return rows
      .map(
        (row) => `
          <tr>
            <td>${row.label}</td>
            <td>${row.material === "textile" ? "Textile" : "Plastic"}</td>
            <td>${row.kind === "item" ? row.quantity : "Weighted batch"}</td>
            <td>${formatNumber(row.totalWeightKg, 3)} kg</td>
            <td>${formatNumber(row.co2Kg, 2)} kg CO2e</td>
            <td>${row.material === "textile" ? `${formatNumber(row.waterLiters, 0)} L water` : `${formatNumber(row.energyKwh, 2)} kWh`}</td>
          </tr>
        `
      )
      .join("");
  }

  function render(options = {}) {
    const totals = calculateTotals();

    mount.innerHTML = `
      <section class="eco-calc-tool">
        <div class="eco-calc-tool-grid">
          <div class="eco-calc-tool-panel">
            <div class="eco-calc-tabs" role="tablist" aria-label="Calculator methods">
              <button type="button" class="eco-calc-tab${state.activePanel === "items" ? " is-active" : ""}" data-action="tab" data-panel="items" role="tab" aria-selected="${state.activePanel === "items"}">Add Item</button>
              <button type="button" class="eco-calc-tab${state.activePanel === "weight" ? " is-active" : ""}" data-action="tab" data-panel="weight" role="tab" aria-selected="${state.activePanel === "weight"}">Add Weight (kg)</button>
            </div>

            <div class="eco-calc-panel-note">
              <strong>Standard published factors</strong>
              <p>Textiles use European Environment Agency 2020 per-kg averages. Plastic recycling uses U.S. EPA WARM screening factors for PET, HDPE, PP, and mixed plastics. Item weights are editable.</p>
            </div>

            <div class="eco-calc-panel-body">
              <div class="${state.activePanel === "items" ? "" : "is-hidden"}" data-panel-view="items">
                ${renderItemEntries("textile")}
                ${renderItemEntries("plastic")}
              </div>
              <div class="${state.activePanel === "weight" ? "" : "is-hidden"}" data-panel-view="weight">
                ${renderWeightEntries()}
              </div>
            </div>

            <div class="eco-calc-actions">
              <button type="button" class="eco-calc-reset-btn" data-action="reset">Reset all</button>
            </div>
          </div>

          <aside class="eco-calc-results">
            <div class="eco-calc-results-header">
              <h3>Estimated impact</h3>
              <p>These results show the potential environmental value kept in circular flow when textiles and plastics are separated from mixed waste.</p>
            </div>
            <div class="eco-calc-results-grid">
              <article class="eco-calc-result-card">
                <span>Total material separated</span>
                <strong>${formatNumber(totals.divertedKg, 2)} kg</strong>
                <small>${formatNumber(totals.textileKg, 2)} kg textile + ${formatNumber(totals.plasticKg, 2)} kg plastic</small>
              </article>
              <article class="eco-calc-result-card">
                <span>Water footprint represented</span>
                <strong>${formatNumber(totals.waterLiters, 0)} L</strong>
                <small>Textile calculation only</small>
              </article>
              <article class="eco-calc-result-card">
                <span>CO2e avoided / represented</span>
                <strong>${formatNumber(totals.co2Kg, 2)} kg</strong>
                <small>Textiles + recyclable plastics</small>
              </article>
              <article class="eco-calc-result-card">
                <span>Energy saved</span>
                <strong>${formatNumber(totals.energyKwh, 2)} kWh</strong>
                <small>Plastic recycling estimate</small>
              </article>
              <article class="eco-calc-result-card">
                <span>Primary raw materials linked to textiles</span>
                <strong>${formatNumber(totals.rawMaterialsKg, 2)} kg</strong>
                <small>Textile production factor</small>
              </article>
              <article class="eco-calc-result-card">
                <span>Items counted</span>
                <strong>${totals.textileItems + totals.plasticItems}</strong>
                <small>${totals.textileItems} textile items + ${totals.plasticItems} plastic items</small>
              </article>
            </div>
            <p class="eco-calc-results-footnote">All results are screening estimates intended for awareness and ESG reporting support, not audited lifecycle declarations.</p>
          </aside>
        </div>

        <section class="eco-calc-breakdown">
          <div class="eco-calc-breakdown-header">
            <h3>Breakdown</h3>
            <p>Each row uses either an editable default item weight or a direct textile weight entry.</p>
          </div>
          <div class="eco-calc-table-wrap">
            <table class="eco-calc-table">
              <thead>
                <tr>
                  <th>Entry</th>
                  <th>Material</th>
                  <th>Quantity</th>
                  <th>Weight</th>
                  <th>CO2e</th>
                  <th>Water / Energy</th>
                </tr>
              </thead>
              <tbody>
                ${renderBreakdownRows(totals.rows)}
              </tbody>
            </table>
          </div>
        </section>

        <section class="eco-calc-methodology">
          <div class="eco-calc-methodology-header">
            <h3>Methodology used in this calculator</h3>
            <p>The formulas are shown so the assumptions remain visible and easy to audit.</p>
          </div>
          <div class="eco-calc-methodology-grid">
            <article>
              <h4>Textiles</h4>
              <ul>
                <li>Water = textile kg x 562.5 liters</li>
                <li>CO2e = textile kg x 16.875 kg CO2e</li>
                <li>Raw materials = textile kg x 24.4375 kg</li>
              </ul>
            </article>
            <article>
              <h4>Plastics</h4>
              <ul>
                <li>PET recycling CO2e = plastic kg x 1.168</li>
                <li>HDPE recycling CO2e = plastic kg x 0.86</li>
                <li>PP recycling CO2e = plastic kg x 0.893</li>
                <li>Energy uses polymer-specific recycling savings in kWh per kg</li>
              </ul>
            </article>
            <article>
              <h4>Sources</h4>
              <ul>
                <li><a href="https://www.eea.europa.eu/en/topics/in-depth/textiles" target="_blank" rel="noopener">European Environment Agency textiles impact averages</a></li>
                <li><a href="https://www.epa.gov/waste-reduction-model/documentation-chapters-greenhouse-gas-emission-energy-and-economic-factors" target="_blank" rel="noopener">U.S. EPA WARM documentation</a></li>
              </ul>
            </article>
          </div>
        </section>
      </section>
    `;

    restoreFocus(options.focusSnapshot);
  }

  mount.addEventListener("click", (event) => {
    const button = event.target.closest("[data-action]");
    if (!button) return;

    const action = button.getAttribute("data-action");

    if (action === "tab") {
      state.activePanel = button.getAttribute("data-panel") || "items";
      render();
      return;
    }

    if (action === "add-item") {
      addItemEntry(button.getAttribute("data-material") || "textile");
      return;
    }

    if (action === "add-weight") {
      addWeightEntry();
      return;
    }

    if (action === "remove-item") {
      removeEntry("itemEntries", Number.parseInt(button.getAttribute("data-entry-id"), 10));
      return;
    }

    if (action === "remove-weight") {
      removeEntry("weightEntries", Number.parseInt(button.getAttribute("data-entry-id"), 10));
      return;
    }

    if (action === "reset") {
      resetAll();
    }
  });

  mount.addEventListener("input", (event) => {
    const field = event.target.getAttribute("data-field");
    const group = event.target.getAttribute("data-entry-group");
    const entryId = Number.parseInt(event.target.getAttribute("data-entry-id"), 10);

    if (!field || !group || !entryId) return;

    if (group === "itemEntries") {
      updateItemEntry(entryId, field, event.target.value, {
        commit: false,
        focusSnapshot: createFocusSnapshot(event.target)
      });
      return;
    }

    if (group === "weightEntries") {
      updateWeightEntry(entryId, field, event.target.value, {
        commit: false,
        focusSnapshot: createFocusSnapshot(event.target)
      });
    }
  });

  mount.addEventListener("change", (event) => {
    const field = event.target.getAttribute("data-field");
    const group = event.target.getAttribute("data-entry-group");
    const entryId = Number.parseInt(event.target.getAttribute("data-entry-id"), 10);

    if (!field || !group || !entryId) return;

    if (group === "itemEntries") {
      updateItemEntry(entryId, field, event.target.value, { commit: true });
      return;
    }

    if (group === "weightEntries") {
      updateWeightEntry(entryId, field, event.target.value, { commit: true });
    }
  });

  render();
})();
