/**
 * Mahesh & Company — Admin panel logic
 * Password default: SHA-256 of "atul@2026"
 */
(function () {
  "use strict";

  const DEFAULT_PASSWORD_HASH =
    "6f700ebee414e6077deee12e48394e359baa07d24f8b801077a5729d69afd939";

  const LS = {
    LOGGED_IN: "mc_admin_logged_in",
    PASSWORD_HASH: "mc_password_hash",
    PRODUCTS: "mc_products",
    BILLS: "mc_bills",
    ACTIVITY: "mc_activity",
    BILL_COUNTER: "mc_bill_counter",
    GOATCOUNTER_CODE: "mc_goatcounter_code",
    GOATCOUNTER_TOKEN: "mc_goatcounter_token",
    ADMIN_OPENS: "mc_admin_opens",
  };

  const DEFAULT_GC_CODE = "mahesh-company";

  const APP_VERSION = "1.0.0";

  /** @type {ReturnType<typeof qs>} */
  let pendingConfirmResolve = null;

  function qs(sel, root = document) {
    return root.querySelector(sel);
  }
  function qsa(sel, root = document) {
    return Array.from(root.querySelectorAll(sel));
  }

  async function sha256Hex(message) {
    const enc = new TextEncoder().encode(message);
    const buf = await crypto.subtle.digest("SHA-256", enc);
    return Array.from(new Uint8Array(buf))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  }

  function getPasswordHash() {
    return localStorage.getItem(LS.PASSWORD_HASH) || DEFAULT_PASSWORD_HASH;
  }

  function initDefaultPasswordHash() {
    if (!localStorage.getItem(LS.PASSWORD_HASH)) {
      localStorage.setItem(LS.PASSWORD_HASH, DEFAULT_PASSWORD_HASH);
    }
  }

  function isLoggedIn() {
    return localStorage.getItem(LS.LOGGED_IN) === "1";
  }

  function setLoggedIn(v) {
    if (v) localStorage.setItem(LS.LOGGED_IN, "1");
    else localStorage.removeItem(LS.LOGGED_IN);
  }

  function getProducts() {
    try {
      const raw = localStorage.getItem(LS.PRODUCTS);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  function saveProducts(list) {
    localStorage.setItem(LS.PRODUCTS, JSON.stringify(list));
  }

  function getBills() {
    try {
      const raw = localStorage.getItem(LS.BILLS);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  function saveBills(list) {
    localStorage.setItem(LS.BILLS, JSON.stringify(list));
  }

  function getActivity() {
    try {
      const raw = localStorage.getItem(LS.ACTIVITY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  function pushActivity(message) {
    const log = getActivity();
    log.unshift({
      t: Date.now(),
      message,
    });
    localStorage.setItem(LS.ACTIVITY, JSON.stringify(log.slice(0, 10)));
  }

  function incrementAdminOpens() {
    const n = parseInt(localStorage.getItem(LS.ADMIN_OPENS) || "0", 10);
    localStorage.setItem(LS.ADMIN_OPENS, String(n + 1));
  }

  function getAdminOpens() {
    return parseInt(localStorage.getItem(LS.ADMIN_OPENS) || "0", 10);
  }

  function nextBillNumber() {
    let n = parseInt(localStorage.getItem(LS.BILL_COUNTER) || "0", 10);
    n += 1;
    localStorage.setItem(LS.BILL_COUNTER, String(n));
    const y = new Date().getFullYear();
    return `MC-${y}-${String(n).padStart(4, "0")}`;
  }

  function uid() {
    return crypto.randomUUID ? crypto.randomUUID() : "id-" + Date.now() + "-" + Math.random().toString(36).slice(2);
  }

  const toastEl = qs("#toast");
  let toastTimer = null;

  function showToast(message, type = "success") {
    if (!toastEl) return;
    toastEl.textContent = message;
    toastEl.classList.remove("hidden", "success", "error");
    toastEl.classList.add(type === "error" ? "error" : "success");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastEl.classList.add("hidden");
    }, 3200);
  }

  function showScreen(name) {
    const login = qs("#loginScreen");
    const main = qs("#mainApp");
    [login, main].forEach((el) => {
      if (!el) return;
      el.classList.add("hidden");
      el.setAttribute("aria-hidden", "true");
    });
    const map = { login, main };
    const el = map[name];
    if (el) {
      el.classList.remove("hidden");
      el.setAttribute("aria-hidden", "false");
    }
  }

  function openModal(id) {
    const m = qs("#" + id);
    if (!m) return;
    m.classList.remove("hidden");
    m.setAttribute("aria-hidden", "false");
  }

  function closeModal(id) {
    const m = qs("#" + id);
    if (!m) return;
    m.classList.add("hidden");
    m.setAttribute("aria-hidden", "true");
  }

  function confirmDialog(title, message) {
    return new Promise((resolve) => {
      pendingConfirmResolve = resolve;
      const t = qs("#confirmDialogTitle");
      const msg = qs("#confirmDialogMessage");
      const dlg = qs("#confirmDialog");
      if (t) t.textContent = title;
      if (msg) msg.textContent = message;
      if (dlg) {
        dlg.classList.remove("hidden");
        dlg.setAttribute("aria-hidden", "false");
      }
    });
  }

  function closeConfirm(result) {
    const dlg = qs("#confirmDialog");
    if (dlg) {
      dlg.classList.add("hidden");
      dlg.setAttribute("aria-hidden", "true");
    }
    if (pendingConfirmResolve) {
      pendingConfirmResolve(result);
      pendingConfirmResolve = null;
    }
  }

  /* ---------- Login ---------- */
  const loginForm = qs("#loginForm");
  const loginError = qs("#loginError");

  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (loginError) loginError.textContent = "";
      const pw = (qs("#adminPassword") && qs("#adminPassword").value) || "";
      const hash = await sha256Hex(pw);
      if (hash !== getPasswordHash()) {
        if (loginError) loginError.textContent = "Incorrect password.";
        return;
      }
      setLoggedIn(true);
      incrementAdminOpens();
      showScreen("main");
      bootMainApp();
    });
  }

  qs("#toggleLoginPassword")?.addEventListener("click", () => {
    const inp = qs("#adminPassword");
    if (!inp) return;
    const show = inp.type === "password";
    inp.type = show ? "text" : "password";
    const i = qs("#toggleLoginPassword i");
    if (i) {
      i.className = show ? "fas fa-eye-slash" : "fas fa-eye";
    }
  });

  /* ---------- Main app bootstrap ---------- */
  async function bootMainApp() {
    await seedProductsFromJson();
    renderDashboard();
    fetchVisitorStats();
    fetchDetailedAnalytics();
    renderProducts();
    renderBills();
    initGoatcounterSettings();
    switchTab("dashboard");
    qs("#appVersionInfo").textContent = "App version " + APP_VERSION;
  }

  async function seedProductsFromJson() {
    const existing = getProducts();
    if (existing.length > 0) return;
    try {
      const resp = await fetch("data/products.json");
      if (!resp.ok) return;
      const data = await resp.json();
      saveProducts(data);
      pushActivity("Products seeded from catalog (" + data.length + " items).");
    } catch (e) {
      console.warn("Could not seed products:", e);
    }
  }

  function switchTab(tab) {
    qsa(".nav-tab").forEach((btn) => {
      const on = btn.getAttribute("data-tab") === tab;
      btn.classList.toggle("active", on);
      btn.toggleAttribute("aria-current", on ? "page" : false);
    });
    qsa(".app-section").forEach((sec) => {
      const match = sec.getAttribute("data-section") === tab;
      sec.classList.toggle("hidden", !match);
    });
    const fab = qs("#productFab");
    if (fab) fab.classList.toggle("hidden", tab !== "products");
  }

  qsa(".nav-tab").forEach((btn) => {
    btn.addEventListener("click", () => {
      switchTab(btn.getAttribute("data-tab"));
    });
  });

  qs("#headerLogoutBtn")?.addEventListener("click", () => logout());
  qs("#settingsLogoutBtn")?.addEventListener("click", () => logout());

  function logout() {
    setLoggedIn(false);
    showScreen("login");
    const pw = qs("#adminPassword");
    if (pw) pw.value = "";
    showToast("Logged out.", "success");
  }

  /* ---------- Dashboard ---------- */
  function renderDashboard() {
    const products = getProducts();
    let inStock = 0;
    let outStock = 0;
    let low = 0;
    products.forEach((p) => {
      const qty = Number(p.stockQty) || 0;
      if (p.inStock && qty > 0) inStock += 1;
      else outStock += 1;
      if (p.inStock && qty > 0 && qty < 3) low += 1;
    });
    const st = {
      statTotalProducts: products.length,
      statInStock: inStock,
      statOutStock: outStock,
      statLowStock: low,
      statAdminOpens: getAdminOpens(),
    };
    Object.keys(st).forEach((id) => {
      const el = qs("#" + id);
      if (el) el.textContent = String(st[id]);
    });
    const logEl = qs("#activityLog");
    if (logEl) {
      const items = getActivity();
      if (!items.length) {
        logEl.innerHTML = '<li class="muted">No activity yet.</li>';
      } else {
        logEl.innerHTML = items
          .map((a) => {
            const d = new Date(a.t);
            return (
              "<li><span class=\"activity-time\">" +
              d.toLocaleString() +
              "</span>" +
              escapeHtml(a.message) +
              "</li>"
            );
          })
          .join("");
      }
    }
  }

  /* ---------- Visitor Stats (GoatCounter) ---------- */
  function getGcCode() {
    return localStorage.getItem(LS.GOATCOUNTER_CODE) || DEFAULT_GC_CODE;
  }

  async function fetchVisitorStats() {
    const code = getGcCode();
    if (!code) {
      showVisitorError(true);
      return;
    }
    const base = "https://" + code + ".goatcounter.com/counter/";
    const paths = [
      "/mahesh-company-website/",
      "/mahesh-company-website/index.html",
      "/"
    ];
    let found = false;
    let totalCount = 0;
    let uniqueCount = 0;
    for (const path of paths) {
      try {
        const resp = await fetch(base + encodeURIComponent(path) + ".json");
        if (!resp.ok) continue;
        const data = await resp.json();
        const c = parseInt(String(data.count).replace(/,/g, ""), 10) || 0;
        const u = parseInt(String(data.count_unique).replace(/,/g, ""), 10) || 0;
        if (c > totalCount) totalCount = c;
        if (u > uniqueCount) uniqueCount = u;
        found = true;
      } catch (e) {
        continue;
      }
    }
    const totalEl = qs("#statTotalVisits");
    const uniqueEl = qs("#statUniqueVisitors");
    if (totalEl) totalEl.textContent = String(totalCount);
    if (uniqueEl) uniqueEl.textContent = String(uniqueCount);
    showVisitorError(!found);
  }

  function showVisitorError(show) {
    const el = qs("#visitorError");
    if (el) el.classList.toggle("hidden", !show);
  }

  async function fetchDetailedAnalytics() {
    const code = getGcCode();
    const token = localStorage.getItem(LS.GOATCOUNTER_TOKEN) || "";
    const detailsWrap = qs("#analyticsDetails");
    if (!code || !token || !detailsWrap) {
      if (detailsWrap) detailsWrap.classList.add("hidden");
      return;
    }
    const apiBase = "https://" + code + ".goatcounter.com/api/v0/stats/";
    const headers = { "Authorization": "Bearer " + token };
    detailsWrap.classList.remove("hidden");

    const endpoints = [
      { key: "detailLocations", path: "locations" },
      { key: "detailSystems", path: "systems" },
      { key: "detailBrowsers", path: "browsers" },
      { key: "detailReferrers", path: "toprefs" },
    ];

    for (const ep of endpoints) {
      const listEl = qs("#" + ep.key);
      if (!listEl) continue;
      try {
        const resp = await fetch(apiBase + ep.path, { headers });
        if (!resp.ok) {
          listEl.innerHTML = '<li class="muted">Could not load.</li>';
          continue;
        }
        const data = await resp.json();
        let items = [];
        if (ep.path === "toprefs") {
          items = Array.isArray(data) ? data : (data.rows || data.refs || []);
        } else {
          items = Array.isArray(data) ? data : (data.stats || data.rows || []);
        }
        if (ep.path === "toprefs") {
          items = items.slice(0, 8).map(function(r) {
            return { name: r.name || r.ref || "Direct", count: r.count || 0 };
          });
        } else {
          items = items.slice(0, 8).map(function(r) {
            return { name: r.name || r.id || "Unknown", count: r.count || 0 };
          });
        }
        if (!items.length) {
          listEl.innerHTML = '<li class="muted">No data yet.</li>';
          continue;
        }
        const maxCount = Math.max(1, items[0].count || 1);
        listEl.innerHTML = items.map(function(item) {
          const pct = Math.round((item.count / maxCount) * 100);
          return '<li>' +
            '<span class="detail-name">' + escapeHtml(item.name) + '</span>' +
            '<div class="detail-bar-wrap"><div class="detail-bar" style="width:' + pct + '%"></div></div>' +
            '<span class="detail-count">' + escapeHtml(String(item.count)) + '</span>' +
            '</li>';
        }).join("");
      } catch (e) {
        listEl.innerHTML = '<li class="muted">Error loading data.</li>';
      }
    }
  }

  qs("#dashAddProduct")?.addEventListener("click", () => {
    switchTab("products");
    openProductModal(null);
  });
  qs("#dashNewBill")?.addEventListener("click", () => openBillModal(null));

  /* ---------- Products ---------- */
  let productFilter = "all";
  let productSearch = "";

  qs("#productSearch")?.addEventListener("input", (e) => {
    productSearch = (e.target.value || "").toLowerCase().trim();
    renderProducts();
  });

  qsa(".chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      qsa(".chip").forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");
      productFilter = chip.getAttribute("data-filter") || "all";
      renderProducts();
    });
  });

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function formatMoney(n) {
    const x = Number(n);
    if (Number.isNaN(x)) return "₹0.00";
    return "₹" + x.toFixed(2);
  }

  function renderProducts() {
    const list = qs("#productList");
    if (!list) return;
    let products = getProducts();
    if (productFilter !== "all") {
      products = products.filter((p) => p.category === productFilter);
    }
    if (productSearch) {
      products = products.filter((p) =>
        (p.name || "").toLowerCase().includes(productSearch)
      );
    }
    if (!products.length) {
      list.innerHTML = '<p class="muted">No products found.</p>';
      return;
    }
    list.innerHTML = products
      .map((p) => {
        const img =
          p.imageUrl && p.imageUrl.trim()
            ? '<img class="product-thumb" src="' +
              escapeHtml(p.imageUrl) +
              '" alt="" loading="lazy" />'
            : '<div class="product-thumb placeholder" aria-hidden="true"><i class="fas fa-image"></i></div>';
        const badge =
          p.badge && p.badge !== "none"
            ? '<span class="prod-badge">' +
              escapeHtml(p.badgeText || p.badge) +
              "</span>"
            : "";
        return (
          '<article class="product-card" data-id="' +
          escapeHtml(p.id) +
          '">' +
          img +
          '<div class="product-body">' +
          "<p class=\"product-name\">" +
          escapeHtml(p.name) +
          "</p>" +
          badge +
          '<p class="cat-tag">' +
          escapeHtml(p.category) +
          "</p>" +
          '<p class="product-meta">' +
          formatMoney(p.price) +
          " · Stock: <strong>" +
          escapeHtml(String(p.stockQty ?? 0)) +
          "</strong></p>" +
          "</div>" +
          '<div class="product-actions">' +
          '<label class="visually-hidden" for="stock-toggle-' +
          escapeHtml(p.id) +
          '">In stock</label>' +
          '<input type="checkbox" class="toggle-input stock-toggle" id="stock-toggle-' +
          escapeHtml(p.id) +
          '" data-id="' +
          escapeHtml(p.id) +
          '" ' +
          (p.inStock ? "checked" : "") +
          " />" +
          '<div class="row-actions">' +
          '<button type="button" class="icon-btn edit-product" data-id="' +
          escapeHtml(p.id) +
          '" aria-label="Edit"><i class="fas fa-pen"></i></button>' +
          '<button type="button" class="icon-btn delete-product" data-id="' +
          escapeHtml(p.id) +
          '" aria-label="Delete"><i class="fas fa-trash"></i></button>' +
          "</div></div></article>"
        );
      })
      .join("");

    list.querySelectorAll(".edit-product").forEach((btn) => {
      btn.addEventListener("click", () => openProductModal(btn.getAttribute("data-id")));
    });
    list.querySelectorAll(".delete-product").forEach((btn) => {
      btn.addEventListener("click", () => deleteProduct(btn.getAttribute("data-id")));
    });
    list.querySelectorAll(".stock-toggle").forEach((cb) => {
      cb.addEventListener("change", () => {
        const id = cb.getAttribute("data-id");
        const all = getProducts();
        const ix = all.findIndex((x) => x.id === id);
        if (ix === -1) return;
        all[ix].inStock = cb.checked;
        saveProducts(all);
        pushActivity("Stock toggle: " + (all[ix].name || id));
        renderDashboard();
        showToast("Stock updated.", "success");
      });
    });
  }

  function openProductModal(id) {
    const form = qs("#productForm");
    const title = qs("#productModalTitle");
    if (title) title.textContent = id ? "Edit Product" : "Add Product";
    if (form) form.reset();
    const hid = qs("#productId");
    if (hid) hid.value = "";
    if (id) {
      const p = getProducts().find((x) => x.id === id);
      if (!p) return;
      if (hid) hid.value = p.id;
      qs("#productName").value = p.name || "";
      qs("#productCategory").value = p.category || "thresher";
      qs("#productPrice").value = p.price ?? "";
      qs("#productOriginalPrice").value = p.originalPrice ?? "";
      qs("#productImageUrl").value = p.imageUrl || "";
      qs("#productDescription").value = p.description || "";
      qs("#productFeatures").value = Array.isArray(p.features)
        ? p.features.join(", ")
        : p.features || "";
      qs("#productBadge").value = p.badge || "none";
      qs("#productBadgeText").value = p.badgeText || "";
      qs("#productStockQty").value = p.stockQty ?? 0;
      qs("#productInStock").checked = !!p.inStock;
    } else {
      qs("#productInStock").checked = true;
      qs("#productStockQty").value = 0;
    }
    openModal("productModal");
  }

  qs("#productForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const idField = qs("#productId");
    const existingId = idField && idField.value;
    const name = qs("#productName").value.trim();
    if (!name) {
      showToast("Name is required.", "error");
      return;
    }
    const product = {
      id: existingId || uid(),
      name,
      category: qs("#productCategory").value,
      price: parseFloat(qs("#productPrice").value) || 0,
      originalPrice: parseFloat(qs("#productOriginalPrice").value) || 0,
      imageUrl: qs("#productImageUrl").value.trim(),
      description: qs("#productDescription").value.trim(),
      features: qs("#productFeatures").value
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      badge: qs("#productBadge").value,
      badgeText: qs("#productBadgeText").value.trim(),
      stockQty: parseInt(qs("#productStockQty").value, 10) || 0,
      inStock: qs("#productInStock").checked,
    };
    let list = getProducts();
    if (existingId) {
      list = list.map((x) => (x.id === existingId ? product : x));
      pushActivity("Product updated: " + name);
    } else {
      list.push(product);
      pushActivity("Product added: " + name);
    }
    saveProducts(list);
    closeModal("productModal");
    renderProducts();
    renderDashboard();
    showToast("Product saved.", "success");
  });

  async function deleteProduct(id) {
    const ok = await confirmDialog("Delete product?", "This cannot be undone.");
    if (!ok) return;
    const list = getProducts().filter((x) => x.id !== id);
    saveProducts(list);
    pushActivity("Product deleted.");
    renderProducts();
    renderDashboard();
    showToast("Product deleted.", "success");
  }

  qs("#productFab")?.addEventListener("click", () => openProductModal(null));

  qsa("[data-close-modal]").forEach((btn) => {
    btn.addEventListener("click", () => {
      closeModal(btn.getAttribute("data-close-modal"));
    });
  });

  qs("#confirmDialogOk")?.addEventListener("click", () => closeConfirm(true));
  qs("#confirmDialogCancel")?.addEventListener("click", () => closeConfirm(false));

  /* ---------- Bills ---------- */
  let billLineCounter = 0;
  let editingBillId = null;
  let lastPreviewBill = null;

  function updateCatalogDatalist() {
    let dl = qs("#catalog-datalist");
    if (!dl) {
      dl = document.createElement("datalist");
      dl.id = "catalog-datalist";
      document.body.appendChild(dl);
    }
    dl.innerHTML = getProducts()
      .map((p) => '<option value="' + escapeHtml(p.name) + '"></option>')
      .join("");
  }

  function addBillLineRow(data) {
    const wrap = qs("#billLineItems");
    if (!wrap) return;
    const idx = billLineCounter++;
    const row = document.createElement("div");
    row.className = "line-item";
    row.dataset.lineIndex = String(idx);
    row.innerHTML =
      '<div class="line-item-head"><strong>Item</strong>' +
      '<button type="button" class="icon-btn remove-line" aria-label="Remove item"><i class="fas fa-times"></i></button></div>' +
      '<div class="line-item-grid">' +
      '<div><label class="field-label">Product name</label>' +
      '<input type="text" class="input-control line-name" list="catalog-datalist" placeholder="Name or pick from catalog" value="' +
      escapeHtml(data?.productName || "") +
      '" /></div>' +
      '<div><label class="field-label">Qty</label>' +
      '<input type="number" class="input-control line-qty" min="0" step="1" inputmode="numeric" value="' +
      (data?.qty ?? 1) +
      '" /></div>' +
      '<div><label class="field-label">Unit price (₹)</label>' +
      '<input type="number" class="input-control line-price" min="0" step="0.01" inputmode="decimal" value="' +
      (data?.unitPrice ?? 0) +
      '" /></div>' +
      '<div><label class="field-label">Discount (₹)</label>' +
      '<input type="number" class="input-control line-discount" min="0" step="0.01" inputmode="decimal" value="' +
      (data?.discount ?? 0) +
      '" /></div>' +
      "</div>" +
      '<p class="line-total muted">Line total: <strong class="line-total-val">₹0.00</strong></p>';
    wrap.appendChild(row);
    row.querySelector(".remove-line")?.addEventListener("click", () => {
      row.remove();
      recalcBillTotals();
    });
    qsa(".line-name, .line-qty, .line-price, .line-discount", row).forEach((inp) => {
      inp.addEventListener("input", recalcBillTotals);
    });
    recalcBillTotals();
  }

  function collectLineItems() {
    const wrap = qs("#billLineItems");
    if (!wrap) return [];
    return qsa(".line-item", wrap).map((row) => {
      const qty = parseFloat(qs(".line-qty", row).value) || 0;
      const unitPrice = parseFloat(qs(".line-price", row).value) || 0;
      const discount = parseFloat(qs(".line-discount", row).value) || 0;
      const productName = (qs(".line-name", row).value || "").trim();
      const gross = qty * unitPrice;
      const lineTotal = Math.max(0, gross - discount);
      return { productName, qty, unitPrice, discount, lineTotal, gross };
    });
  }

  function recalcBillTotals() {
    const wrap = qs("#billLineItems");
    if (wrap) {
      qsa(".line-item", wrap).forEach((row) => {
        const qty = parseFloat(qs(".line-qty", row).value) || 0;
        const unitPrice = parseFloat(qs(".line-price", row).value) || 0;
        const discount = parseFloat(qs(".line-discount", row).value) || 0;
        const gross = qty * unitPrice;
        const lineTotal = Math.max(0, gross - discount);
        const tv = qs(".line-total-val", row);
        if (tv) tv.textContent = formatMoney(lineTotal);
      });
    }
    const lines = collectLineItems();
    let subtotal = 0;
    let discTot = 0;
    lines.forEach((l) => {
      subtotal += l.gross;
      discTot += l.discount;
    });
    const grand = Math.max(0, subtotal - discTot);
    const s1 = qs("#billSubtotal");
    const s2 = qs("#billDiscountTotal");
    const s3 = qs("#billGrandTotal");
    if (s1) s1.textContent = formatMoney(subtotal);
    if (s2) s2.textContent = formatMoney(discTot);
    if (s3) s3.textContent = formatMoney(grand);
  }

  function openBillModal(billOrId) {
    updateCatalogDatalist();
    editingBillId = null;
    const form = qs("#billForm");
    form?.reset();
    qs("#billId").value = "";
    qs("#billLineItems").innerHTML = "";
    billLineCounter = 0;
    let bill = null;
    if (typeof billOrId === "string") {
      bill = getBills().find((b) => b.id === billOrId) || null;
      editingBillId = billOrId;
    } else if (billOrId && typeof billOrId === "object") {
      bill = billOrId;
    }
    const title = qs("#billModalTitle");
    if (title) title.textContent = bill ? "Edit Bill" : "New Bill";
    if (bill) {
      qs("#billId").value = bill.id;
      qs("#billCustomerName").value = bill.customerName || "";
      qs("#billCustomerPhone").value = bill.phone || "";
      qs("#billCustomerAddress").value = bill.address || "";
      qs("#billPaymentMethod").value = bill.paymentMethod || "Cash";
      qs("#billPaymentStatus").value = bill.paymentStatus || "Unpaid";
      qs("#billNotes").value = bill.notes || "";
      (bill.lineItems || []).forEach((li) =>
        addBillLineRow({
          productName: li.productName,
          qty: li.qty,
          unitPrice: li.unitPrice,
          discount: li.discount,
        })
      );
    } else {
      addBillLineRow({});
    }
    recalcBillTotals();
    openModal("billModal");
  }

  qs("#billAddLineItem")?.addEventListener("click", () => addBillLineRow({}));

  qs("#billsNewBillBtn")?.addEventListener("click", () => openBillModal(null));

  qs("#billForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const lines = collectLineItems().filter((l) => l.productName);
    if (!lines.length) {
      showToast("Add at least one line item with a name.", "error");
      return;
    }
    const customerName = qs("#billCustomerName").value.trim();
    if (!customerName) {
      showToast("Customer name is required.", "error");
      return;
    }
    let subtotal = 0;
    let discTot = 0;
    lines.forEach((l) => {
      subtotal += l.gross;
      discTot += l.discount;
    });
    const grandTotal = Math.max(0, subtotal - discTot);
    const id = qs("#billId").value || uid();
    const existing = getBills().find((b) => b.id === id);
    const billNumber = existing ? existing.billNumber : nextBillNumber();
    const bill = {
      id,
      billNumber,
      customerName,
      phone: qs("#billCustomerPhone").value.trim(),
      address: qs("#billCustomerAddress").value.trim(),
      lineItems: lines.map(({ productName, qty, unitPrice, discount, lineTotal }) => ({
        productName,
        qty,
        unitPrice,
        discount,
        lineTotal,
      })),
      subtotal,
      discountTotal: discTot,
      grandTotal,
      paymentMethod: qs("#billPaymentMethod").value,
      paymentStatus: qs("#billPaymentStatus").value,
      notes: qs("#billNotes").value.trim(),
      date: existing ? existing.date : Date.now(),
    };
    let list = getBills().filter((b) => b.id !== id);
    list.push(bill);
    saveBills(list);
    pushActivity(
      existing ? "Bill updated: " + billNumber : "Bill created: " + billNumber
    );
    closeModal("billModal");
    renderBills();
    renderDashboard();
    showToast("Bill saved.", "success");
  });

  function billToStatusClass(st) {
    if (st === "Paid") return "paid";
    if (st === "Partial") return "partial";
    return "unpaid";
  }

  function renderBills() {
    const list = qs("#billsList");
    if (!list) return;
    const bills = getBills().sort((a, b) => (b.date || 0) - (a.date || 0));
    if (!bills.length) {
      list.innerHTML = '<p class="muted">No bills yet.</p>';
      return;
    }
    list.innerHTML = bills
      .map((b) => {
        const d = new Date(b.date || Date.now());
        const st = billToStatusClass(b.paymentStatus);
        return (
          '<article class="bill-card" data-id="' +
          escapeHtml(b.id) +
          '">' +
          '<div class="bill-card-top">' +
          "<div>" +
          '<div class="bill-no">' +
          escapeHtml(b.billNumber) +
          "</div>" +
          '<div class="bill-date">' +
          d.toLocaleDateString() +
          "</div>" +
          "</div>" +
          '<span class="status-pill ' +
          st +
          '">' +
          escapeHtml((b.paymentStatus || "").toLowerCase()) +
          "</span>" +
          "</div>" +
          "<p><strong>" +
          escapeHtml(b.customerName) +
          "</strong></p>" +
          "<p>Total: " +
          formatMoney(b.grandTotal) +
          "</p>" +
          '<div class="bill-card-actions">' +
          '<button type="button" class="btn btn-secondary btn-sm view-bill" data-id="' +
          escapeHtml(b.id) +
          '"><i class="fas fa-eye"></i> View</button>' +
          '<button type="button" class="btn btn-secondary btn-sm edit-bill" data-id="' +
          escapeHtml(b.id) +
          '"><i class="fas fa-pen"></i> Edit</button>' +
          '<button type="button" class="btn btn-secondary btn-sm share-bill" data-id="' +
          escapeHtml(b.id) +
          '"><i class="fas fa-share-nodes"></i> Share</button>' +
          "</div></article>"
        );
      })
      .join("");

    list.querySelectorAll(".view-bill").forEach((btn) => {
      btn.addEventListener("click", () => {
        const b = getBills().find((x) => x.id === btn.getAttribute("data-id"));
        if (b) fillInvoicePreview(b);
      });
    });
    list.querySelectorAll(".edit-bill").forEach((btn) => {
      btn.addEventListener("click", () => openBillModal(btn.getAttribute("data-id")));
    });
    list.querySelectorAll(".share-bill").forEach((btn) => {
      btn.addEventListener("click", () => {
        const b = getBills().find((x) => x.id === btn.getAttribute("data-id"));
        if (b) shareBillWhatsapp(b);
      });
    });
  }

  function fillInvoicePreview(b) {
    lastPreviewBill = b;
    qs("#invBillNo").textContent = b.billNumber;
    qs("#invDate").textContent = new Date(b.date || Date.now()).toLocaleString();
    qs("#invCustomerName").textContent = b.customerName;
    qs("#invCustomerPhone").textContent = b.phone ? "Phone: " + b.phone : "";
    qs("#invCustomerAddress").textContent = b.address || "";
    const tbody = qs("#invItemsBody");
    const items = b.lineItems || [];
    tbody.innerHTML = items
      .map((line, i) => {
        return (
          "<tr><td>" +
          (i + 1) +
          "</td><td>" +
          escapeHtml(line.productName) +
          "</td><td>" +
          escapeHtml(String(line.qty)) +
          "</td><td>" +
          formatMoney(line.unitPrice) +
          "</td><td>" +
          formatMoney(line.discount) +
          "</td><td>" +
          formatMoney(line.lineTotal) +
          "</td></tr>"
        );
      })
      .join("");
    qs("#invSubtotal").textContent = formatMoney(b.subtotal);
    qs("#invDiscount").textContent = formatMoney(b.discountTotal);
    qs("#invGrand").textContent = formatMoney(b.grandTotal);
    qs("#invPayMethod").textContent = b.paymentMethod || "—";
    qs("#invPayStatus").textContent = b.paymentStatus || "—";
    const notesEl = qs("#invNotes");
    if (notesEl) {
      notesEl.textContent = b.notes ? "Notes: " + b.notes : "";
    }
    openModal("billPreviewModal");
  }

  function buildBillFromForm() {
    const lines = collectLineItems().filter((l) => l.productName);
    let subtotal = 0;
    let discTot = 0;
    lines.forEach((l) => {
      subtotal += l.gross;
      discTot += l.discount;
    });
    const grandTotal = Math.max(0, subtotal - discTot);
    return {
      id: "preview",
      billNumber: "DRAFT",
      customerName: qs("#billCustomerName").value.trim(),
      phone: qs("#billCustomerPhone").value.trim(),
      address: qs("#billCustomerAddress").value.trim(),
      lineItems: lines.map(({ productName, qty, unitPrice, discount, lineTotal }) => ({
        productName,
        qty,
        unitPrice,
        discount,
        lineTotal,
      })),
      subtotal,
      discountTotal: discTot,
      grandTotal,
      paymentMethod: qs("#billPaymentMethod").value,
      paymentStatus: qs("#billPaymentStatus").value,
      notes: qs("#billNotes").value.trim(),
      date: Date.now(),
    };
  }

  qs("#billPreviewPdfBtn")?.addEventListener("click", () => {
    const draft = buildBillFromForm();
    if (!draft.customerName) {
      showToast("Enter customer name to preview.", "error");
      return;
    }
    if (!draft.lineItems.length) {
      showToast("Add line items to preview.", "error");
      return;
    }
    draft.billNumber = "PREVIEW";
    lastPreviewBill = draft;
    fillInvoicePreview(draft);
  });

  qs("#billDownloadPdfBtn")?.addEventListener("click", () => {
    const area = qs("#billPrintArea");
    if (!area || typeof html2pdf === "undefined") {
      showToast("PDF library not loaded.", "error");
      return;
    }
    const opt = {
      margin: 8,
      filename:
        (lastPreviewBill && lastPreviewBill.billNumber
          ? lastPreviewBill.billNumber
          : "invoice") + ".pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };
    html2pdf().set(opt).from(area).save().then(() => showToast("PDF downloaded.", "success"));
  });

  qs("#billPrintBtn")?.addEventListener("click", () => {
    window.print();
  });

  function shareBillWhatsapp(b) {
    const text =
      "Mahesh & Company — Invoice " +
      b.billNumber +
      "\nCustomer: " +
      b.customerName +
      "\nTotal: " +
      formatMoney(b.grandTotal) +
      "\nStatus: " +
      b.paymentStatus;
    const url = "https://wa.me/?text=" + encodeURIComponent(text);
    window.open(url, "_blank", "noopener,noreferrer");
  }

  qs("#billWhatsappShareBtn")?.addEventListener("click", () => {
    if (lastPreviewBill) shareBillWhatsapp(lastPreviewBill);
  });

  /* ---------- Settings ---------- */
  qs("#passwordChangeForm")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const cur = qs("#currentPassword").value;
    const n1 = qs("#newPassword").value;
    const n2 = qs("#confirmPassword").value;
    if ((await sha256Hex(cur)) !== getPasswordHash()) {
      showToast("Current password is wrong.", "error");
      return;
    }
    if (!n1 || n1.length < 4) {
      showToast("New password too short.", "error");
      return;
    }
    if (n1 !== n2) {
      showToast("New passwords do not match.", "error");
      return;
    }
    const nh = await sha256Hex(n1);
    localStorage.setItem(LS.PASSWORD_HASH, nh);
    qs("#passwordChangeForm").reset();
    pushActivity("Admin password changed.");
    showToast("Password updated.", "success");
  });

  /* ---------- GoatCounter Settings ---------- */
  function initGoatcounterSettings() {
    const code = getGcCode();
    const token = localStorage.getItem(LS.GOATCOUNTER_TOKEN) || "";
    const hint = qs("#goatcounterHint");
    const tokenHint = qs("#goatcounterTokenHint");
    const input = qs("#goatcounterCode");
    const tokenInput = qs("#goatcounterToken");
    if (hint) {
      hint.textContent = code ? "Current: " + code + ".goatcounter.com" : "Not set.";
    }
    if (input) input.value = code || "";
    if (tokenHint) {
      tokenHint.textContent = token ? "Token saved (last 4: ..." + token.slice(-4) + ")" : "No token saved.";
    }
    if (tokenInput) tokenInput.value = "";
  }

  qs("#goatcounterForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const code = (qs("#goatcounterCode").value || "").trim().toLowerCase().replace(/[^a-z0-9-]/g, "");
    if (!code) {
      showToast("Enter a valid site code.", "error");
      return;
    }
    localStorage.setItem(LS.GOATCOUNTER_CODE, code);
    const tokenVal = (qs("#goatcounterToken").value || "").trim();
    if (tokenVal) {
      localStorage.setItem(LS.GOATCOUNTER_TOKEN, tokenVal);
    }
    initGoatcounterSettings();
    fetchVisitorStats();
    fetchDetailedAnalytics();
    pushActivity("GoatCounter settings updated.");
    showToast("GoatCounter settings saved.", "success");
  });

  qs("#toggleGcToken")?.addEventListener("click", () => {
    const inp = qs("#goatcounterToken");
    if (!inp) return;
    const show = inp.type === "password";
    inp.type = show ? "text" : "password";
    const i = qs("#toggleGcToken i");
    if (i) i.className = show ? "fas fa-eye-slash" : "fas fa-eye";
  });

  qs("#clearAllDataBtn")?.addEventListener("click", async () => {
    const ok = await confirmDialog(
      "Clear all data?",
      "Products, bills, activity, and session data on this device will be removed. Your password will reset to the default."
    );
    if (!ok) return;
    [
      LS.PRODUCTS,
      LS.BILLS,
      LS.ACTIVITY,
      LS.BILL_COUNTER,
      LS.PASSWORD_HASH,
      LS.LOGGED_IN,
      LS.GOATCOUNTER_CODE,
      LS.GOATCOUNTER_TOKEN,
      LS.ADMIN_OPENS,
    ].forEach((k) => localStorage.removeItem(k));
    initDefaultPasswordHash();
    showScreen("login");
    showToast("Local data cleared.", "success");
  });

  /* ---------- Init ---------- */
  initDefaultPasswordHash();

  if (isLoggedIn()) {
    showScreen("main");
    bootMainApp();
  } else {
    showScreen("login");
  }
})();
