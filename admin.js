(function () {
  "use strict";

  const DEFAULT_PASSWORD_HASH =
    "6f700ebee414e6077deee12e48394e359baa07d24f8b801077a5729d69afd939";

  const LS = {
    LOGGED_IN: "mc_admin_logged_in",
    LOGIN_TIME: "mc_admin_login_time",
    PASSWORD_HASH: "mc_password_hash",
    PRODUCTS: "mc_products",
    BILLS: "mc_bills",
    ACTIVITY: "mc_activity",
    BILL_COUNTER: "mc_bill_counter",
    GOATCOUNTER_CODE: "mc_goatcounter_code",
    GOATCOUNTER_TOKEN: "mc_goatcounter_token",
    GITHUB_TOKEN: "mc_github_token",
    GITHUB_REPO: "mc_github_repo",
    GITHUB_DEVICE: "mc_github_device",
    GITHUB_TOKEN_STATUS: "mc_github_token_status",
    GITHUB_TOKEN_SAVED: "mc_github_token_saved",
    ADMIN_OPENS: "mc_admin_opens",
    LOGIN_ATTEMPTS: "mc_login_attempts",
    LOCKOUT_UNTIL: "mc_lockout_until",
    PENDING_SYNC: "mc_pending_sync",
    STOCK_TRANSACTIONS: "mc_stock_transactions",
    SALES_BILLS: "mc_sales_bills",
    SALES_BILL_COUNTER: "mc_sales_bill_counter",
    PAYMENTS: "mc_payments",
  };

  const DEFAULT_GITHUB_REPO = "nikitasomani14/mahesh-company-website";

  const DEFAULT_GC_CODE = "mahesh-company";
  const APP_VERSION = "1.2.0";
  const MAX_LOGIN_ATTEMPTS = 5;
  const LOCKOUT_DURATION_MS = 5 * 60 * 1000;
  const SESSION_TIMEOUT_MS = 60 * 60 * 1000;

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

  function markPendingSync() {
    localStorage.setItem(LS.PENDING_SYNC, "1");
    updateUnsyncedBanner();
  }

  function clearPendingSync() {
    localStorage.removeItem(LS.PENDING_SYNC);
    updateUnsyncedBanner();
  }

  function hasPendingSync() {
    return localStorage.getItem(LS.PENDING_SYNC) === "1";
  }

  function updateUnsyncedBanner() {
    var banner = qs("#unsyncedBanner");
    if (!banner) return;
    if (hasPendingSync()) {
      banner.classList.remove("hidden");
    } else {
      banner.classList.add("hidden");
    }
  }

  function detectDeviceName() {
    var ua = navigator.userAgent || "";
    if (/iPad/i.test(ua)) return "iPad";
    if (/iPhone/i.test(ua)) return "iPhone";
    if (/Android.*Mobile/i.test(ua)) return "Android Phone";
    if (/Android/i.test(ua)) return "Android Tablet";
    if (/Macintosh|Mac OS/i.test(ua)) return "Mac";
    if (/Windows/i.test(ua)) return "Windows PC";
    if (/Linux/i.test(ua)) return "Linux PC";
    return "Unknown Device";
  }

  var autoSyncTimer = null;

  function autoSyncProducts() {
    markPendingSync();
    var token = localStorage.getItem(LS.GITHUB_TOKEN) || "";
    if (!token) {
      showToast("Product saved locally. Add GitHub token in Settings to sync online.", "info");
      return;
    }
    clearTimeout(autoSyncTimer);
    autoSyncTimer = setTimeout(function() {
      syncProductsToGithub();
    }, 2000);
  }

  var autoBillSyncTimer = null;

  function autoSyncBills() {
    var token = localStorage.getItem(LS.GITHUB_TOKEN) || "";
    if (!token) {
      showToast("Bill saved locally. Add GitHub token in Settings to sync across devices.", "info");
      return;
    }
    clearTimeout(autoBillSyncTimer);
    autoBillSyncTimer = setTimeout(function() {
      syncBillsToGithub();
    }, 2000);
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
    toastEl.classList.remove("hidden", "success", "error", "info");
    var cls = type === "error" ? "error" : type === "info" ? "info" : "success";
    toastEl.classList.add(cls);
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

  /* ---------- Brute-force protection ---------- */
  function getLoginAttempts() {
    return parseInt(localStorage.getItem(LS.LOGIN_ATTEMPTS) || "0", 10);
  }
  function setLoginAttempts(n) {
    localStorage.setItem(LS.LOGIN_ATTEMPTS, String(n));
  }
  function getLockoutUntil() {
    return parseInt(localStorage.getItem(LS.LOCKOUT_UNTIL) || "0", 10);
  }
  function setLockoutUntil(ts) {
    localStorage.setItem(LS.LOCKOUT_UNTIL, String(ts));
  }
  function isLockedOut() {
    const until = getLockoutUntil();
    if (!until) return false;
    if (Date.now() < until) return true;
    localStorage.removeItem(LS.LOCKOUT_UNTIL);
    setLoginAttempts(0);
    return false;
  }
  function getRemainingLockoutSeconds() {
    const until = getLockoutUntil();
    if (!until || Date.now() >= until) return 0;
    return Math.ceil((until - Date.now()) / 1000);
  }

  /* ---------- Session timeout (auto-logout) ---------- */
  let sessionCheckInterval = null;
  function startSessionTimer() {
    localStorage.setItem(LS.LOGIN_TIME, String(Date.now()));
    clearInterval(sessionCheckInterval);
    sessionCheckInterval = setInterval(checkSessionTimeout, 60000);
  }
  function refreshSessionTimer() {
    if (isLoggedIn()) {
      localStorage.setItem(LS.LOGIN_TIME, String(Date.now()));
    }
  }
  function checkSessionTimeout() {
    if (!isLoggedIn()) return;
    const loginTime = parseInt(localStorage.getItem(LS.LOGIN_TIME) || "0", 10);
    if (Date.now() - loginTime > SESSION_TIMEOUT_MS) {
      logout();
      showToast("Session expired. Please login again.", "error");
    }
  }
  document.addEventListener("click", refreshSessionTimer);
  document.addEventListener("keydown", refreshSessionTimer);

  /* ---------- Login ---------- */
  const loginForm = qs("#loginForm");
  const loginError = qs("#loginError");

  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (loginError) loginError.textContent = "";
      if (isLockedOut()) {
        var secs = getRemainingLockoutSeconds();
        if (loginError) loginError.textContent = "Too many failed attempts. Try again in " + secs + " seconds.";
        return;
      }
      const pw = (qs("#adminPassword") && qs("#adminPassword").value) || "";
      const hash = await sha256Hex(pw);
      if (hash !== getPasswordHash()) {
        var attempts = getLoginAttempts() + 1;
        setLoginAttempts(attempts);
        if (attempts >= MAX_LOGIN_ATTEMPTS) {
          setLockoutUntil(Date.now() + LOCKOUT_DURATION_MS);
          if (loginError) loginError.textContent = "Account locked for 5 minutes due to too many failed attempts.";
        } else {
          var remaining = MAX_LOGIN_ATTEMPTS - attempts;
          if (loginError) loginError.textContent = "Incorrect password. " + remaining + " attempt(s) remaining.";
        }
        return;
      }
      setLoginAttempts(0);
      localStorage.removeItem(LS.LOCKOUT_UNTIL);
      setLoggedIn(true);
      startSessionTimer();
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
  function migratePhoneNumbers() {
    var changed = false;
    var namePhoneMap = {};
    var salesBills = getSalesBills();
    salesBills.forEach(function(b) {
      if (b.phone && b.customerName) namePhoneMap[b.customerName.toUpperCase()] = b.phone;
    });
    getBills().forEach(function(b) {
      if (b.phone && b.customerName && !namePhoneMap[b.customerName.toUpperCase()]) {
        namePhoneMap[b.customerName.toUpperCase()] = b.phone;
      }
    });

    salesBills.forEach(function(b) {
      if (!b.phone) {
        var key = (b.customerName || "").toUpperCase();
        if (namePhoneMap[key]) {
          b.phone = namePhoneMap[key];
        } else {
          b.phone = "9" + Math.floor(100000000 + Math.random() * 900000000).toString();
          if (key) namePhoneMap[key] = b.phone;
        }
        changed = true;
      }
    });
    if (changed) saveSalesBills(salesBills);

    var bills = getBills();
    var billsChanged = false;
    bills.forEach(function(b) {
      if (!b.phone) {
        var key = (b.customerName || "").toUpperCase();
        if (namePhoneMap[key]) {
          b.phone = namePhoneMap[key];
        } else {
          b.phone = "9" + Math.floor(100000000 + Math.random() * 900000000).toString();
          if (key) namePhoneMap[key] = b.phone;
        }
        billsChanged = true;
      }
    });
    if (billsChanged) saveBills(bills);
  }

  async function bootMainApp() {
    await seedProductsFromJson();
    await seedBillsFromJson();
    await seedSalesBillsFromJson();
    await seedPaymentsFromJson();
    migratePhoneNumbers();
    renderDashboard();
    fetchVisitorStats();
    fetchDetailedAnalytics();
    renderProducts();
    renderBills();
    renderProfitSection();
    renderLedger();
    renderSalesBillsList();
    initGoatcounterSettings();
    initGithubSettings();
    updateUnsyncedBanner();
    switchTab("dashboard");
    qs("#appVersionInfo").textContent = "App version " + APP_VERSION;
    validateGithubTokenBackground();
  }

  async function seedProductsFromJson() {
    try {
      var catalogData = null;

      var token = localStorage.getItem(LS.GITHUB_TOKEN) || "";
      var repo = getGithubRepo();
      if (token && repo && repo.includes("/")) {
        try {
          var apiUrl = "https://api.github.com/repos/" + repo + "/contents/data/products.json";
          var apiResp = await fetch(apiUrl, {
            headers: {
              "Authorization": "Bearer " + token,
              "Accept": "application/vnd.github.v3+json"
            }
          });
          if (apiResp.ok) {
            var fileData = await apiResp.json();
            if (fileData.content) {
              var decoded = decodeURIComponent(escape(atob(fileData.content.replace(/\n/g, ""))));
              catalogData = JSON.parse(decoded);
            }
          }
        } catch (e) {
          console.warn("GitHub API fetch failed, falling back to local:", e);
        }
      }

      if (!catalogData) {
        var resp = await fetch("data/products.json", { cache: "no-store" });
        if (!resp.ok) return;
        catalogData = await resp.json();
      }

      var existing = getProducts();

      if (existing.length === 0) {
        saveProducts(catalogData);
        pushActivity("Products seeded from catalog (" + catalogData.length + " items).");
        return;
      }

      var catalogMap = {};
      catalogData.forEach(function(p) { catalogMap[String(p.id)] = p; });

      var existingIds = {};
      existing.forEach(function(p) { existingIds[String(p.id)] = true; });

      var changed = false;
      var updatedCount = 0;
      var syncFields = ["name","category","costPrice","price","originalPrice",
        "imageUrl","stockQty","inStock","description","features","badges",
        "badge","badgeText","rating","reviews"];

      existing.forEach(function(local) {
        var remote = catalogMap[String(local.id)];
        if (!remote) return;
        var updated = false;
        syncFields.forEach(function(f) {
          if (remote[f] !== undefined && JSON.stringify(local[f]) !== JSON.stringify(remote[f])) {
            local[f] = remote[f];
            updated = true;
          }
        });
        if (updated) { updatedCount++; changed = true; }
      });

      var newProducts = catalogData.filter(function(p) {
        return !existingIds[String(p.id)];
      });

      if (newProducts.length > 0) {
        existing = existing.concat(newProducts);
        changed = true;
      }

      if (changed) {
        saveProducts(existing);
        var msgs = [];
        if (updatedCount > 0) msgs.push("Updated " + updatedCount + " product(s)");
        if (newProducts.length > 0) msgs.push("Added " + newProducts.length + " new product(s)");
        pushActivity(msgs.join("; ") + " from catalog.");
      }
    } catch (e) {
      console.warn("Could not seed products:", e);
    }
  }

  async function seedBillsFromJson() {
    try {
      var remoteBills = null;

      var token = localStorage.getItem(LS.GITHUB_TOKEN) || "";
      var repo = getGithubRepo();
      if (token && repo && repo.includes("/")) {
        try {
          var apiUrl = "https://api.github.com/repos/" + repo + "/contents/data/bills.json";
          var apiResp = await fetch(apiUrl, {
            headers: {
              "Authorization": "Bearer " + token,
              "Accept": "application/vnd.github.v3+json"
            }
          });
          if (apiResp.ok) {
            var fileData = await apiResp.json();
            if (fileData.content) {
              var decoded = decodeURIComponent(escape(atob(fileData.content.replace(/\n/g, ""))));
              remoteBills = JSON.parse(decoded);
            }
          }
        } catch (e) {
          console.warn("GitHub API bills fetch failed, falling back to local:", e);
        }
      }

      if (!remoteBills) {
        try {
          var resp = await fetch("data/bills.json", { cache: "no-store" });
          if (resp.ok) remoteBills = await resp.json();
        } catch (e) { /* ignore */ }
      }

      if (!Array.isArray(remoteBills) || remoteBills.length === 0) return;

      var localBills = getBills();

      if (localBills.length === 0) {
        saveBills(remoteBills);
        pushActivity("Bills seeded from cloud (" + remoteBills.length + " bills).");
      } else {
        var localMap = {};
        localBills.forEach(function(b) { localMap[b.id] = true; });

        var newBills = remoteBills.filter(function(b) { return !localMap[b.id]; });

        var remoteMap = {};
        remoteBills.forEach(function(b) { remoteMap[b.id] = b; });
        localBills.forEach(function(local) {
          var remote = remoteMap[local.id];
          if (!remote) return;
          var fields = ["customerName","phone","address","lineItems","subtotal",
            "discountTotal","grandTotal","paymentMethod","paymentStatus","notes"];
          fields.forEach(function(f) {
            if (remote[f] !== undefined && JSON.stringify(local[f]) !== JSON.stringify(remote[f])) {
              local[f] = remote[f];
            }
          });
        });

        if (newBills.length > 0) {
          localBills = localBills.concat(newBills);
        }

        saveBills(localBills);
        if (newBills.length > 0) {
          pushActivity("Synced " + newBills.length + " new bill(s) from cloud.");
        }
      }

      var maxRemoteNum = 0;
      remoteBills.forEach(function(b) {
        if (b.billNumber) {
          var parts = String(b.billNumber).split("-");
          var n = parseInt(parts[parts.length - 1], 10);
          if (!isNaN(n) && n > maxRemoteNum) maxRemoteNum = n;
        }
      });
      var localCounter = parseInt(localStorage.getItem(LS.BILL_COUNTER) || "0", 10);
      if (maxRemoteNum > localCounter) {
        localStorage.setItem(LS.BILL_COUNTER, String(maxRemoteNum));
      }
    } catch (e) {
      console.warn("Could not seed bills:", e);
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
    
    // Refresh data when switching to profit tab
    if (tab === "profit") {
      renderProfitSection();
      renderLedger();
    }
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
    let totalCostValue = 0;
    let totalSellingValue = 0;
    let productsWithCost = 0;
    let totalMargin = 0;
    
    products.forEach((p) => {
      const qty = Number(p.stockQty) || 0;
      const costPrice = Number(p.costPrice) || 0;
      const sellingPrice = Number(p.price) || 0;
      
      if (p.inStock && qty > 0) inStock += 1;
      else outStock += 1;
      if (p.inStock && qty > 0 && qty < 3) low += 1;
      
      // Calculate profit stats for in-stock items
      if (qty > 0) {
        totalSellingValue += sellingPrice * qty;
        if (costPrice > 0) {
          totalCostValue += costPrice * qty;
          productsWithCost++;
          totalMargin += ((sellingPrice - costPrice) / costPrice) * 100;
        }
      }
    });
    
    const potentialProfit = totalSellingValue - totalCostValue;
    const avgMargin = productsWithCost > 0 ? (totalMargin / productsWithCost).toFixed(1) : 0;
    
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
    
    // Update profit stats
    const costEl = qs("#statTotalCost");
    const sellingEl = qs("#statTotalSelling");
    const profitEl = qs("#statPotentialProfit");
    const marginEl = qs("#statAvgMargin");
    
    if (costEl) costEl.textContent = "₹" + totalCostValue.toLocaleString("en-IN");
    if (sellingEl) sellingEl.textContent = "₹" + totalSellingValue.toLocaleString("en-IN");
    if (profitEl) {
      profitEl.textContent = "₹" + potentialProfit.toLocaleString("en-IN");
      if (potentialProfit > 0) {
        profitEl.style.color = "var(--success, #22c55e)";
      } else if (potentialProfit < 0) {
        profitEl.style.color = "var(--danger, #ef4444)";
      }
    }
    if (marginEl) marginEl.textContent = avgMargin + "%";
    
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
    const token = localStorage.getItem(LS.GOATCOUNTER_TOKEN) || "";
    var found = false;

    if (token) {
      found = await fetchVisitorStatsViaApi(code, token);
    }
    if (!found) {
      found = await fetchVisitorStatsViaPublic(code);
    }
    showVisitorError(!found);
  }

  async function fetchVisitorStatsViaApi(code, token) {
    try {
      var headers = { "Authorization": "Bearer " + token };
      var totalCount = 0;
      var uniqueCount = 0;

      var hitsResp = await fetch(
        "https://" + code + ".goatcounter.com/api/v0/stats/hits",
        { headers: headers }
      );
      if (hitsResp.ok) {
        var hitsData = await hitsResp.json();
        if (hitsData && Array.isArray(hitsData.hits)) {
          hitsData.hits.forEach(function(h) {
            totalCount += parseInt(String(h.count || 0), 10);
          });
        }
        if (hitsData && typeof hitsData.total === "number") {
          if (hitsData.total > totalCount) totalCount = hitsData.total;
        }
      }

      var totalResp = await fetch(
        "https://" + code + ".goatcounter.com/api/v0/stats/total",
        { headers: headers }
      );
      if (totalResp.ok) {
        var totData = await totalResp.json();
        var apiTotal = parseInt(String(totData.total || 0), 10);
        var apiUnique = parseInt(String(totData.total_unique || 0), 10);
        if (apiTotal > totalCount) totalCount = apiTotal;
        uniqueCount = apiUnique;
        if (uniqueCount === 0 && apiTotal > 0) uniqueCount = apiTotal;
      }

      var totalEl = qs("#statTotalVisits");
      var uniqueEl = qs("#statUniqueVisitors");
      if (totalEl) totalEl.textContent = String(totalCount);
      if (uniqueEl) uniqueEl.textContent = String(uniqueCount);
      return totalCount > 0 || uniqueCount > 0;
    } catch (e) {
      return false;
    }
  }

  async function fetchVisitorStatsViaPublic(code) {
    var base = "https://" + code + ".goatcounter.com/counter/";
    var paths = [
      "/mahesh-company-website/",
      "/mahesh-company-website/index.html",
      "/"
    ];
    var found = false;
    var totalCount = 0;
    var uniqueCount = 0;
    for (var i = 0; i < paths.length; i++) {
      try {
        var resp = await fetch(base + encodeURIComponent(paths[i]) + ".json");
        if (!resp.ok) continue;
        var data = await resp.json();
        var c = parseInt(String(data.count).replace(/,/g, ""), 10) || 0;
        var u = parseInt(String(data.count_unique).replace(/,/g, ""), 10) || 0;
        if (c > totalCount) totalCount = c;
        if (u > uniqueCount) uniqueCount = u;
        found = true;
      } catch (e) {
        continue;
      }
    }
    var totalEl = qs("#statTotalVisits");
    var uniqueEl = qs("#statUniqueVisitors");
    if (totalEl) totalEl.textContent = String(totalCount);
    if (uniqueEl) uniqueEl.textContent = String(uniqueCount);
    return found;
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

  /* ---------- Help ---------- */
  qs("#headerHelpBtn")?.addEventListener("click", () => openModal("helpModal"));

  qs("#dashAddProduct")?.addEventListener("click", () => {
    switchTab("products");
    openProductModal(null);
  });
  qs("#dashNewBill")?.addEventListener("click", () => openBillModal(null));

  /* ---------- Image Upload ---------- */
  let pendingImageDataUrl = "";

  function resizeImage(file, maxDim, quality) {
    return new Promise(function(resolve, reject) {
      var reader = new FileReader();
      reader.onerror = function() { reject(new Error("File read failed")); };
      reader.onload = function() {
        var img = new Image();
        img.onerror = function() { reject(new Error("Invalid image")); };
        img.onload = function() {
          var w = img.width;
          var h = img.height;
          if (w > maxDim || h > maxDim) {
            if (w > h) { h = Math.round(h * maxDim / w); w = maxDim; }
            else { w = Math.round(w * maxDim / h); h = maxDim; }
          }
          var canvas = document.createElement("canvas");
          canvas.width = w;
          canvas.height = h;
          canvas.getContext("2d").drawImage(img, 0, 0, w, h);
          resolve(canvas.toDataURL("image/jpeg", quality || 0.7));
        };
        img.src = reader.result;
      };
      reader.readAsDataURL(file);
    });
  }

  function updateImagePreview(src) {
    var box = qs("#imagePreviewBox");
    if (!box) return;
    if (src && src.trim()) {
      box.innerHTML = '<img src="' + escapeHtml(src) + '" alt="Preview" />';
    } else {
      box.innerHTML = '<i class="fas fa-image" aria-hidden="true"></i><span>No image</span>';
    }
  }

  qs("#productImageFile")?.addEventListener("change", async function(e) {
    var file = e.target.files && e.target.files[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      showToast("Image too large (max 10 MB).", "error");
      e.target.value = "";
      return;
    }
    try {
      var dataUrl = await resizeImage(file, 400, 0.7);
      pendingImageDataUrl = dataUrl;
      qs("#productImageUrl").value = "";
      updateImagePreview(dataUrl);
      showToast("Photo added.", "success");
    } catch (err) {
      showToast("Could not read image.", "error");
    }
    e.target.value = "";
  });

  qs("#productImageUrl")?.addEventListener("input", function() {
    var val = qs("#productImageUrl").value.trim();
    if (val) {
      pendingImageDataUrl = "";
      updateImagePreview(val);
    }
  });

  qs("#removeProductImage")?.addEventListener("click", function() {
    pendingImageDataUrl = "";
    qs("#productImageUrl").value = "";
    updateImagePreview("");
    showToast("Image removed.", "success");
  });

  /* ---------- Badges ---------- */
  let pendingBadges = [];

  function renderBadgeChips() {
    var list = qs("#badgesList");
    if (!list) return;
    if (!pendingBadges.length) {
      list.innerHTML = '<span class="muted" style="font-size:0.82rem">No badges added.</span>';
      return;
    }
    list.innerHTML = pendingBadges.map(function(b, i) {
      return '<span class="badge-chip badge-chip--' + escapeHtml(b.type) + '">' +
        escapeHtml(b.text) +
        '<button type="button" class="badge-remove" data-badge-idx="' + i + '" aria-label="Remove badge">' +
        '<i class="fas fa-times"></i></button></span>';
    }).join("");
    list.querySelectorAll(".badge-remove").forEach(function(btn) {
      btn.addEventListener("click", function() {
        var idx = parseInt(btn.getAttribute("data-badge-idx"), 10);
        pendingBadges.splice(idx, 1);
        renderBadgeChips();
      });
    });
  }

  qs("#addBadgeBtn")?.addEventListener("click", function() {
    var typeEl = qs("#badgeTypeSelect");
    var textEl = qs("#badgeTextInput");
    var type = typeEl ? typeEl.value : "sale";
    var text = textEl ? textEl.value.trim() : "";
    if (!text) {
      showToast("Enter badge text.", "error");
      return;
    }
    pendingBadges.push({ type: type, text: text });
    if (textEl) textEl.value = "";
    renderBadgeChips();
  });

  function badgesFromLegacy(p) {
    var arr = [];
    if (Array.isArray(p.badges)) {
      arr = p.badges.slice();
    } else if (p.badge && p.badge !== "none") {
      arr.push({ type: p.badge, text: p.badgeText || p.badge });
    }
    return arr;
  }

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
        var badgeArr = badgesFromLegacy(p);
        const badge = badgeArr.map(function(b) {
          return '<span class="prod-badge">' + escapeHtml(b.text) + '</span>';
        }).join(" ");
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
        autoSyncProducts();
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
    pendingImageDataUrl = "";
    if (id) {
      const p = getProducts().find((x) => x.id === id);
      if (!p) return;
      if (hid) hid.value = p.id;
      qs("#productName").value = p.name || "";
      qs("#productCategory").value = p.category || "thresher";
      qs("#productCostPrice").value = p.costPrice ?? "";
      qs("#productPrice").value = p.price ?? "";
      qs("#productOriginalPrice").value = p.originalPrice ?? "";
      updateProfitPreview();
      var imgSrc = p.imageUrl || "";
      if (imgSrc && imgSrc.startsWith("data:")) {
        pendingImageDataUrl = imgSrc;
        qs("#productImageUrl").value = "";
      } else {
        qs("#productImageUrl").value = imgSrc;
      }
      qs("#productDescription").value = p.description || "";
      qs("#productFeatures").value = Array.isArray(p.features)
        ? p.features.join(", ")
        : p.features || "";
      pendingBadges = badgesFromLegacy(p);
      renderBadgeChips();
      qs("#productStockQty").value = p.stockQty ?? 0;
      qs("#productInStock").checked = !!p.inStock;
      updateImagePreview(imgSrc);
    } else {
      pendingBadges = [];
      renderBadgeChips();
      qs("#productInStock").checked = true;
      qs("#productStockQty").value = 0;
      qs("#productCostPrice").value = "";
      updateImagePreview("");
      updateProfitPreview();
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
    var costPrice = parseFloat(qs("#productCostPrice").value) || 0;
    var price = parseFloat(qs("#productPrice").value) || 0;
    var originalPrice = parseFloat(qs("#productOriginalPrice").value) || 0;

    var badges = pendingBadges.slice();
    var hasSale = badges.some(function(b) { return b.type === "sale"; });
    if (!hasSale && originalPrice > 0 && price > 0 && price < originalPrice) {
      var discountPct = Math.round((1 - price / originalPrice) * 100);
      if (discountPct >= 1) {
        badges.unshift({ type: "sale", text: discountPct + "% OFF" });
      }
    }

    var primaryBadge = badges.length > 0 ? badges[0] : null;

    const product = {
      id: existingId || uid(),
      name,
      category: qs("#productCategory").value,
      costPrice: costPrice,
      price: price,
      originalPrice: originalPrice,
      imageUrl: pendingImageDataUrl || qs("#productImageUrl").value.trim(),
      description: qs("#productDescription").value.trim(),
      features: qs("#productFeatures").value
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      badge: primaryBadge ? primaryBadge.type : null,
      badgeText: primaryBadge ? primaryBadge.text : null,
      badges: badges,
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
    autoSyncProducts();
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
    autoSyncProducts();
  }

  function updateDiscountBadgePreview() {
    var price = parseFloat(qs("#productPrice").value) || 0;
    var originalPrice = parseFloat(qs("#productOriginalPrice").value) || 0;
    var hint = qs("#saleBadgeHint");
    if (!hint) return;

    if (originalPrice > 0 && price > 0 && price < originalPrice) {
      var discountPct = Math.round((1 - price / originalPrice) * 100);
      var hasSale = pendingBadges.some(function(b) { return b.type === "sale"; });
      if (discountPct >= 1 && !hasSale) {
        hint.textContent = "A \"sale\" badge (" + discountPct + "% OFF) will be added automatically on save.";
      } else if (hasSale) {
        hint.textContent = "";
      } else {
        hint.textContent = "";
      }
    } else {
      hint.textContent = "";
    }
  }

  qs("#productPrice")?.addEventListener("input", updateDiscountBadgePreview);
  qs("#productOriginalPrice")?.addEventListener("input", updateDiscountBadgePreview);

  // Profit preview for product form
  function updateProfitPreview() {
    var costPrice = parseFloat(qs("#productCostPrice")?.value) || 0;
    var sellingPrice = parseFloat(qs("#productPrice")?.value) || 0;
    var previewEl = qs("#profitPreview");
    var profitEl = qs("#profitPerUnit");
    var marginEl = qs("#profitMargin");
    
    if (!previewEl || !profitEl || !marginEl) return;
    
    if (costPrice > 0 && sellingPrice > 0) {
      var profit = sellingPrice - costPrice;
      var margin = ((profit / costPrice) * 100).toFixed(1);
      profitEl.textContent = "₹" + profit.toLocaleString("en-IN");
      marginEl.textContent = "(" + margin + "% margin)";
      previewEl.classList.remove("hidden");
      if (profit > 0) {
        profitEl.style.color = "var(--success, #22c55e)";
      } else if (profit < 0) {
        profitEl.style.color = "var(--danger, #ef4444)";
      } else {
        profitEl.style.color = "inherit";
      }
    } else {
      previewEl.classList.add("hidden");
    }
  }
  
  qs("#productCostPrice")?.addEventListener("input", updateProfitPreview);
  qs("#productPrice")?.addEventListener("input", updateProfitPreview);

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
    const nameInput = qs(".line-name", row);
    if (nameInput) {
      nameInput.addEventListener("input", function () {
        const val = nameInput.value.trim();
        const match = getProducts().find(
          (p) => p.name && p.name.toLowerCase() === val.toLowerCase()
        );
        if (match && match.price) {
          const priceInput = qs(".line-price", row);
          if (priceInput) {
            priceInput.value = match.price;
            recalcBillTotals();
          }
        }
      });
    }
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
    if (typeof renderSalesBillsList === "function") renderSalesBillsList();
    showToast("Bill saved.", "success");
    autoSyncBills();
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

  /* ---------- GitHub Settings ---------- */
  function getGithubRepo() {
    return localStorage.getItem(LS.GITHUB_REPO) || DEFAULT_GITHUB_REPO;
  }

  function initGithubSettings() {
    const repo = getGithubRepo();
    const token = localStorage.getItem(LS.GITHUB_TOKEN) || "";
    const device = localStorage.getItem(LS.GITHUB_DEVICE) || "";
    const tokenStatus = localStorage.getItem(LS.GITHUB_TOKEN_STATUS) || "";
    const tokenSaved = localStorage.getItem(LS.GITHUB_TOKEN_SAVED) || "";

    const repoInput = qs("#githubRepo");
    const repoHint = qs("#githubRepoHint");
    const tokenHint = qs("#githubTokenHint");
    const tokenInput = qs("#githubToken");
    const statusCard = qs("#githubTokenStatusCard");

    if (repoInput) repoInput.value = repo;
    if (tokenHint) {
      if (token) {
        var hint = "Token saved (last 4: ..." + token.slice(-4) + ")";
        if (device) hint += " · " + device;
        tokenHint.textContent = hint;
      } else {
        tokenHint.textContent = "No token saved on this device.";
      }
    }
    if (tokenInput) tokenInput.value = "";

    if (statusCard) {
      if (token) {
        var savedDate = tokenSaved ? new Date(tokenSaved).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "Unknown";
        var isValid = tokenStatus === "valid";
        var isInvalid = tokenStatus === "invalid";
        var statusIcon = isValid ? "fa-circle-check" : isInvalid ? "fa-circle-xmark" : "fa-circle-question";
        var statusColor = isValid ? "#22c55e" : isInvalid ? "#ef4444" : "#f59e0b";
        var statusText = isValid ? "Valid — sync is working" : isInvalid ? "Invalid — token expired or no repo access" : "Not verified yet";

        statusCard.innerHTML =
          '<div class="token-status-row">' +
            '<div class="token-status-item"><i class="fas fa-mobile-screen-button"></i> <strong>Device:</strong> ' + escapeHtml(device || detectDeviceName()) + '</div>' +
            '<div class="token-status-item"><i class="fas ' + statusIcon + '" style="color:' + statusColor + '"></i> <strong>Status:</strong> ' + statusText + '</div>' +
            '<div class="token-status-item"><i class="fas fa-calendar"></i> <strong>Saved:</strong> ' + savedDate + '</div>' +
            '<div class="token-status-item"><i class="fas fa-key"></i> <strong>Token:</strong> ....' + token.slice(-4) + '</div>' +
          '</div>';
        statusCard.classList.remove("hidden");
      } else {
        statusCard.innerHTML = '<p class="muted"><i class="fas fa-info-circle"></i> No GitHub token saved on this device. Set up a token below to enable sync.</p>';
        statusCard.classList.remove("hidden");
      }
    }
  }

  qs("#githubForm")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const repo = (qs("#githubRepo").value || "").trim();
    if (!repo || !repo.includes("/")) {
      showToast("Enter a valid owner/repo (e.g. user/my-website).", "error");
      return;
    }
    const tokenVal = (qs("#githubToken").value || "").trim();
    var tokenToUse = tokenVal || localStorage.getItem(LS.GITHUB_TOKEN) || "";

    if (tokenToUse) {
      showToast("Verifying token...", "info");
      var authHeaders = {
        "Authorization": "Bearer " + tokenToUse,
        "Accept": "application/vnd.github.v3+json"
      };
      try {
        var userResp = await fetch("https://api.github.com/user", { headers: authHeaders });
        if (userResp.status === 401) {
          showToast("Token is invalid or expired. Create a new one at github.com/settings/tokens/new", "error");
          return;
        }
        var userData = userResp.ok ? await userResp.json() : null;
        var tokenUser = userData ? userData.login : "unknown";
        var repoOwner = repo.split("/")[0];

        if (tokenUser.toLowerCase() !== repoOwner.toLowerCase()) {
          showToast("Wrong account! Token belongs to '" + tokenUser + "' but repo is owned by '" + repoOwner + "'. Log in as '" + repoOwner + "' on GitHub and create the token there.", "error");
          return;
        }

        var repoResp = await fetch("https://api.github.com/repos/" + repo, { headers: authHeaders });
        if (repoResp.status === 404) {
          showToast("Token can see your account (" + tokenUser + ") but cannot access this repo. Make sure you created a Classic token with 'repo' scope checked.", "error");
          return;
        }
        if (repoResp.status === 403) {
          showToast("Token doesn't have 'repo' permission. Create a new Classic token with the 'repo' scope checked.", "error");
          return;
        }

        var contentsResp = await fetch("https://api.github.com/repos/" + repo + "/contents/data/products.json", { headers: authHeaders });
        if (contentsResp.status === 404) {
          showToast("Token can access the repo but can't find products.json. Check if the file exists.", "error");
          return;
        }
        if (!contentsResp.ok) {
          showToast("Token verified for account '" + tokenUser + "' but got error " + contentsResp.status + ". Try creating a new Classic token.", "error");
          return;
        }
      } catch (err) {
        showToast("Could not verify token (network error). Settings saved anyway.", "info");
      }
    }

    localStorage.setItem(LS.GITHUB_REPO, repo);
    if (tokenVal) {
      localStorage.setItem(LS.GITHUB_TOKEN, tokenVal);
      localStorage.setItem(LS.GITHUB_DEVICE, detectDeviceName());
      localStorage.setItem(LS.GITHUB_TOKEN_SAVED, new Date().toISOString());
      localStorage.setItem(LS.GITHUB_TOKEN_STATUS, "valid");
    }
    initGithubSettings();
    pushActivity("GitHub sync settings updated.");
    showToast("GitHub settings saved and verified!", "success");
  });

  async function validateGithubTokenBackground() {
    var token = localStorage.getItem(LS.GITHUB_TOKEN) || "";
    if (!token) return;
    var repo = getGithubRepo();
    if (!repo || !repo.includes("/")) return;
    try {
      var testUrl = "https://api.github.com/repos/" + repo + "/contents/data/products.json";
      var resp = await fetch(testUrl, {
        headers: {
          "Authorization": "Bearer " + token,
          "Accept": "application/vnd.github.v3+json"
        }
      });
      if (resp.ok) {
        localStorage.setItem(LS.GITHUB_TOKEN_STATUS, "valid");
      } else if (resp.status === 401 || resp.status === 403 || resp.status === 404) {
        localStorage.setItem(LS.GITHUB_TOKEN_STATUS, "invalid");
      }
      if (!localStorage.getItem(LS.GITHUB_DEVICE)) {
        localStorage.setItem(LS.GITHUB_DEVICE, detectDeviceName());
      }
      if (!localStorage.getItem(LS.GITHUB_TOKEN_SAVED)) {
        localStorage.setItem(LS.GITHUB_TOKEN_SAVED, new Date().toISOString());
      }
      initGithubSettings();
    } catch (e) {
      // network error, keep existing status
    }
  }

  qs("#toggleGhToken")?.addEventListener("click", () => {
    const inp = qs("#githubToken");
    if (!inp) return;
    const show = inp.type === "password";
    inp.type = show ? "text" : "password";
    const i = qs("#toggleGhToken i");
    if (i) i.className = show ? "fas fa-eye-slash" : "fas fa-eye";
  });

  /* ---------- GitHub Sync ---------- */
  let isSyncing = false;

  function setSyncButtonState(busy) {
    var btns = [qs("#dashSyncBtn"), qs("#productsSyncBtn")];
    btns.forEach(function(btn) {
      if (!btn) return;
      if (busy) {
        btn.disabled = true;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin" aria-hidden="true"></i> Syncing…';
      } else {
        btn.disabled = false;
        btn.innerHTML = '<i class="fas fa-cloud-arrow-up" aria-hidden="true"></i> Update Live Website';
      }
    });
    var prodBtn = qs("#productsSyncBtn");
    if (prodBtn && !busy) {
      prodBtn.innerHTML = '<i class="fas fa-cloud-arrow-up" aria-hidden="true"></i> Update Live';
    }
  }

  async function syncProductsToGithub() {
    if (isSyncing) return;
    var token = localStorage.getItem(LS.GITHUB_TOKEN) || "";
    if (!token) {
      showToast("Set your GitHub token in Settings first.", "error");
      return;
    }
    var repo = getGithubRepo();
    if (!repo || !repo.includes("/")) {
      showToast("Set your GitHub repository in Settings first.", "error");
      return;
    }

    isSyncing = true;
    setSyncButtonState(true);

    var products = getProducts();
    var cleanProducts = products.map(function(p) {
      return {
        id: p.id,
        name: p.name,
        category: p.category,
        costPrice: p.costPrice || 0,
        price: p.price,
        originalPrice: p.originalPrice,
        imageUrl: p.imageUrl,
        rating: p.rating || 0,
        reviews: p.reviews || 0,
        badge: p.badge || null,
        badgeText: p.badgeText || null,
        badges: Array.isArray(p.badges) ? p.badges : [],
        inStock: !!p.inStock,
        stockQty: p.stockQty || 0,
        description: p.description || "",
        features: Array.isArray(p.features) ? p.features : []
      };
    });

    var jsonContent = JSON.stringify(cleanProducts, null, 2) + "\n";
    var apiBase = "https://api.github.com/repos/" + repo + "/contents/data/products.json";
    var headers = {
      "Authorization": "Bearer " + token,
      "Accept": "application/vnd.github.v3+json",
      "Content-Type": "application/json"
    };

    var encoded = btoa(unescape(encodeURIComponent(jsonContent)));
    var maxRetries = 3;

    try {
      for (var attempt = 0; attempt < maxRetries; attempt++) {
        var getResp = await fetch(apiBase, { headers: headers });
        var sha = "";
        if (getResp.ok) {
          var fileData = await getResp.json();
          sha = fileData.sha || "";
        } else if (getResp.status === 401 || getResp.status === 403) {
          localStorage.setItem(LS.GITHUB_TOKEN_STATUS, "invalid");
          initGithubSettings();
          showToast("GitHub token is invalid or expired. Check Settings.", "error");
          isSyncing = false;
          setSyncButtonState(false);
          return;
        } else if (getResp.status === 404) {
          localStorage.setItem(LS.GITHUB_TOKEN_STATUS, "invalid");
          initGithubSettings();
          showToast("Repo not found. Your token may not have access. Use a Classic token with 'repo' scope.", "error");
          isSyncing = false;
          setSyncButtonState(false);
          return;
        }

        var putBody = {
          message: "Update products from admin panel",
          content: encoded
        };
        if (sha) {
          putBody.sha = sha;
        }

        var putResp = await fetch(apiBase, {
          method: "PUT",
          headers: headers,
          body: JSON.stringify(putBody)
        });

        if (putResp.ok) {
          clearPendingSync();
          localStorage.setItem(LS.GITHUB_TOKEN_STATUS, "valid");
          pushActivity("Products synced to live website (" + products.length + " items).");
          renderDashboard();
          showToast("Live website updated! Changes will appear in ~30 seconds.", "success");
          return;
        } else if (putResp.status === 409 && attempt < maxRetries - 1) {
          await new Promise(function(r) { setTimeout(r, 1000); });
          continue;
        } else if (putResp.status === 401 || putResp.status === 403) {
          localStorage.setItem(LS.GITHUB_TOKEN_STATUS, "invalid");
          initGithubSettings();
          showToast("GitHub token is invalid or expired. Check Settings.", "error");
          return;
        } else if (putResp.status === 404) {
          localStorage.setItem(LS.GITHUB_TOKEN_STATUS, "invalid");
          initGithubSettings();
          showToast("Repo not found. Your token may not have access. Use a Classic token with 'repo' scope.", "error");
          return;
        } else if (putResp.status === 409) {
          showToast("Sync conflict. Please try again in a few seconds.", "error");
          return;
        } else {
          var errData = null;
          try { errData = await putResp.json(); } catch (e) { /* ignore */ }
          var errMsg = (errData && errData.message) ? errData.message : "Unknown error";
          showToast("Sync failed: " + errMsg, "error");
          return;
        }
      }
    } catch (e) {
      showToast("Network error. Check your internet connection.", "error");
    } finally {
      isSyncing = false;
      setSyncButtonState(false);
    }
  }

  qs("#dashSyncBtn")?.addEventListener("click", function() { syncProductsToGithub(); });
  qs("#productsSyncBtn")?.addEventListener("click", function() { syncProductsToGithub(); });
  qs("#bannerSyncBtn")?.addEventListener("click", function() { syncProductsToGithub(); });

  /* ---------- Bills GitHub Sync ---------- */
  var isBillSyncing = false;

  async function syncBillsToGithub() {
    if (isBillSyncing) return;
    var token = localStorage.getItem(LS.GITHUB_TOKEN) || "";
    if (!token) return;
    var repo = getGithubRepo();
    if (!repo || !repo.includes("/")) return;

    isBillSyncing = true;

    var bills = getBills();
    var cleanBills = bills.map(function(b) {
      return {
        id: b.id,
        billNumber: b.billNumber,
        customerName: b.customerName,
        phone: b.phone || "",
        address: b.address || "",
        lineItems: Array.isArray(b.lineItems) ? b.lineItems : [],
        subtotal: b.subtotal || 0,
        discountTotal: b.discountTotal || 0,
        grandTotal: b.grandTotal || 0,
        paymentMethod: b.paymentMethod || "Cash",
        paymentStatus: b.paymentStatus || "Unpaid",
        notes: b.notes || "",
        date: b.date || Date.now()
      };
    });

    var jsonContent = JSON.stringify(cleanBills, null, 2) + "\n";
    var apiBase = "https://api.github.com/repos/" + repo + "/contents/data/bills.json";
    var headers = {
      "Authorization": "Bearer " + token,
      "Accept": "application/vnd.github.v3+json",
      "Content-Type": "application/json"
    };

    var encoded = btoa(unescape(encodeURIComponent(jsonContent)));
    var maxRetries = 3;

    try {
      for (var attempt = 0; attempt < maxRetries; attempt++) {
        var getResp = await fetch(apiBase, { headers: headers });
        var sha = "";
        if (getResp.ok) {
          var fileData = await getResp.json();
          sha = fileData.sha || "";
        } else if (getResp.status === 401 || getResp.status === 403) {
          showToast("GitHub token invalid — bills not synced.", "error");
          isBillSyncing = false;
          return;
        } else if (getResp.status === 404) {
          sha = "";
        }

        var putBody = {
          message: "Update bills from admin panel",
          content: encoded
        };
        if (sha) {
          putBody.sha = sha;
        }

        var putResp = await fetch(apiBase, {
          method: "PUT",
          headers: headers,
          body: JSON.stringify(putBody)
        });

        if (putResp.ok) {
          pushActivity("Bills synced to cloud (" + bills.length + " bills).");
          isBillSyncing = false;
          return;
        } else if (putResp.status === 409 && attempt < maxRetries - 1) {
          await new Promise(function(r) { setTimeout(r, 1000); });
          continue;
        } else {
          var errData = null;
          try { errData = await putResp.json(); } catch (e) { /* ignore */ }
          var errMsg = (errData && errData.message) ? errData.message : "Unknown error";
          console.warn("Bills sync failed:", errMsg);
          isBillSyncing = false;
          return;
        }
      }
    } catch (e) {
      console.warn("Bills sync network error:", e);
    } finally {
      isBillSyncing = false;
    }
  }

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
      LS.GITHUB_TOKEN,
      LS.GITHUB_REPO,
      LS.GITHUB_DEVICE,
      LS.GITHUB_TOKEN_STATUS,
      LS.GITHUB_TOKEN_SAVED,
      LS.ADMIN_OPENS,
      LS.STOCK_TRANSACTIONS,
    ].forEach((k) => localStorage.removeItem(k));
    initDefaultPasswordHash();
    showScreen("login");
    showToast("Local data cleared.", "success");
  });

  /* ---------- Profit & Stock Section ---------- */
  let profitSortBy = "name";
  let profitCategoryFilter = "";
  let profitSearchQuery = "";

  function renderProfitSection() {
    const products = getProducts();
    let totalCost = 0;
    let totalSelling = 0;
    let productsWithCost = 0;
    let totalMarginSum = 0;
    const missingCostProducts = [];

    // Calculate totals
    products.forEach((p) => {
      const qty = Number(p.stockQty) || 0;
      const cost = Number(p.costPrice) || 0;
      const sell = Number(p.price) || 0;

      if (qty > 0) {
        totalSelling += sell * qty;
        if (cost > 0) {
          totalCost += cost * qty;
          productsWithCost++;
          totalMarginSum += ((sell - cost) / cost) * 100;
        }
      }
      if (!cost && p.name) {
        missingCostProducts.push(p);
      }
    });

    const totalProfit = totalSelling - totalCost;
    const avgMargin = productsWithCost > 0 ? (totalMarginSum / productsWithCost).toFixed(1) : 0;

    // Update summary cards
    const costEl = qs("#profitStatCost");
    const sellEl = qs("#profitStatSelling");
    const profitEl = qs("#profitStatProfit");
    const marginEl = qs("#profitStatMargin");

    if (costEl) costEl.textContent = "₹" + totalCost.toLocaleString("en-IN");
    if (sellEl) sellEl.textContent = "₹" + totalSelling.toLocaleString("en-IN");
    if (profitEl) profitEl.textContent = "₹" + totalProfit.toLocaleString("en-IN");
    if (marginEl) marginEl.textContent = avgMargin + "%";

    // Show missing cost warning
    const warningEl = qs("#noCostPriceWarning");
    const missingList = qs("#missingCostList");
    if (warningEl && missingList) {
      if (missingCostProducts.length > 0) {
        warningEl.style.display = "block";
        missingList.innerHTML = missingCostProducts
          .slice(0, 10)
          .map((p) => '<li data-id="' + p.id + '">' + escapeHtml(p.name) + '</li>')
          .join("");
        missingList.querySelectorAll("li").forEach((li) => {
          li.addEventListener("click", () => openQuickEdit(li.getAttribute("data-id")));
        });
      } else {
        warningEl.style.display = "none";
      }
    }

    // Filter and sort products
    let filtered = products.filter((p) => {
      if (profitCategoryFilter && p.category !== profitCategoryFilter) return false;
      if (profitSearchQuery) {
        const q = profitSearchQuery.toLowerCase();
        if (!(p.name || "").toLowerCase().includes(q)) return false;
      }
      return true;
    });

    // Sort
    filtered.sort((a, b) => {
      const aCost = Number(a.costPrice) || 0;
      const bCost = Number(b.costPrice) || 0;
      const aProfit = (Number(a.price) || 0) - aCost;
      const bProfit = (Number(b.price) || 0) - bCost;
      const aMargin = aCost > 0 ? ((aProfit / aCost) * 100) : 0;
      const bMargin = bCost > 0 ? ((bProfit / bCost) * 100) : 0;
      const aStock = Number(a.stockQty) || 0;
      const bStock = Number(b.stockQty) || 0;

      switch (profitSortBy) {
        case "profit-high": return bProfit - aProfit;
        case "profit-low": return aProfit - bProfit;
        case "margin-high": return bMargin - aMargin;
        case "margin-low": return aMargin - bMargin;
        case "stock-high": return bStock - aStock;
        case "stock-low": return aStock - bStock;
        default: return (a.name || "").localeCompare(b.name || "");
      }
    });

    // Render table
    const tbody = qs("#profitTableBody");
    if (!tbody) return;

    if (filtered.length === 0) {
      tbody.innerHTML = '<tr><td colspan="8" style="text-align:center;padding:20px;color:var(--muted);">No products found</td></tr>';
      return;
    }

    tbody.innerHTML = filtered.map((p) => {
      const cost = Number(p.costPrice) || 0;
      const sell = Number(p.price) || 0;
      const stock = Number(p.stockQty) || 0;
      const profitUnit = sell - cost;
      const margin = cost > 0 ? ((profitUnit / cost) * 100).toFixed(1) : 0;
      const totalProfitProduct = profitUnit * stock;

      let profitClass = "profit-zero";
      if (profitUnit > 0) profitClass = "profit-positive";
      else if (profitUnit < 0) profitClass = "profit-negative";

      let stockClass = "stock-badge--ok";
      let stockText = stock;
      if (stock === 0) {
        stockClass = "stock-badge--out";
        stockText = "Out";
      } else if (stock < 3) {
        stockClass = "stock-badge--low";
      }

      return '<tr>' +
        '<td class="profit-col-name" data-label="Product"><span class="product-name">' + escapeHtml(p.name || "Unnamed") + '</span><span class="category-badge">' + (p.category || "—") + '</span></td>' +
        '<td class="text-right" data-label="Cost Price">' + (cost > 0 ? "₹" + cost.toLocaleString("en-IN") : '<span style="color:var(--muted)">Not set</span>') + '</td>' +
        '<td class="text-right" data-label="Selling Price">₹' + sell.toLocaleString("en-IN") + '</td>' +
        '<td class="text-right" data-label="Stock"><span class="stock-badge ' + stockClass + '">' + stockText + '</span></td>' +
        '<td class="text-right ' + profitClass + '" data-label="Profit/Unit">' + (cost > 0 ? "₹" + profitUnit.toLocaleString("en-IN") : "—") + '</td>' +
        '<td class="text-right ' + profitClass + '" data-label="Margin">' + (cost > 0 ? margin + "%" : "—") + '</td>' +
        '<td class="text-right ' + profitClass + '" data-label="Total Profit">' + (cost > 0 ? "₹" + totalProfitProduct.toLocaleString("en-IN") : "—") + '</td>' +
        '<td class="profit-col-action"><button class="action-btn" data-id="' + p.id + '"><i class="fas fa-edit"></i> Edit</button></td>' +
        '</tr>';
    }).join("");

    // Attach edit handlers
    tbody.querySelectorAll(".action-btn").forEach((btn) => {
      btn.addEventListener("click", () => openQuickEdit(btn.getAttribute("data-id")));
    });
  }

  function openQuickEdit(id) {
    const p = getProducts().find((x) => x.id === id);
    if (!p) return;
    
    qs("#quickEditProductId").value = id;
    qs("#quickEditProductName").textContent = "Edit: " + (p.name || "Product");
    qs("#quickEditCostPrice").value = p.costPrice || "";
    qs("#quickEditSellingPrice").value = p.price || "";
    qs("#quickEditStock").value = p.stockQty ?? 0;
    
    updateQuickEditPreview();
    qs("#profitQuickEditOverlay")?.classList.remove("hidden");
    qs("#profitQuickEdit").classList.remove("hidden");
  }

  function closeQuickEdit() {
    qs("#profitQuickEdit").classList.add("hidden");
    qs("#profitQuickEditOverlay")?.classList.add("hidden");
  }

  function updateQuickEditPreview() {
    const cost = parseFloat(qs("#quickEditCostPrice").value) || 0;
    const sell = parseFloat(qs("#quickEditSellingPrice").value) || 0;
    const preview = qs("#quickEditPreview");
    
    if (cost > 0 && sell > 0) {
      const profit = sell - cost;
      const margin = ((profit / cost) * 100).toFixed(1);
      const color = profit >= 0 ? "#15803d" : "#dc2626";
      preview.innerHTML = '<strong style="color:' + color + '">Profit: ₹' + profit.toLocaleString("en-IN") + '</strong> (' + margin + '% margin)';
    } else {
      preview.innerHTML = '<span style="color:var(--muted)">Enter cost and selling price to see profit</span>';
    }
  }

  function saveQuickEdit() {
    const id = qs("#quickEditProductId").value;
    const cost = parseFloat(qs("#quickEditCostPrice").value) || 0;
    const sell = parseFloat(qs("#quickEditSellingPrice").value) || 0;
    const stock = parseInt(qs("#quickEditStock").value, 10) || 0;
    
    let products = getProducts();
    products = products.map((p) => {
      if (p.id === id) {
        return {
          ...p,
          costPrice: cost,
          price: sell,
          stockQty: stock,
          inStock: stock > 0
        };
      }
      return p;
    });
    
    saveProducts(products);
    closeQuickEdit();
    renderProfitSection();
    renderProducts();
    renderDashboard();
    showToast("Product updated.", "success");
    autoSyncProducts();
  }

  // Event listeners for profit section
  qs("#profitSearchInput")?.addEventListener("input", (e) => {
    profitSearchQuery = e.target.value;
    renderProfitSection();
  });

  qs("#profitCategoryFilter")?.addEventListener("change", (e) => {
    profitCategoryFilter = e.target.value;
    renderProfitSection();
  });

  qs("#profitSortBy")?.addEventListener("change", (e) => {
    profitSortBy = e.target.value;
    renderProfitSection();
  });

  qs("#quickEditCancel")?.addEventListener("click", closeQuickEdit);
  qs("#quickEditSave")?.addEventListener("click", saveQuickEdit);
  qs("#profitQuickEditOverlay")?.addEventListener("click", closeQuickEdit);

  qs("#quickEditCostPrice")?.addEventListener("input", updateQuickEditPreview);
  qs("#quickEditSellingPrice")?.addEventListener("input", updateQuickEditPreview);

  /* ---------- Stock Ledger (Buy/Sell Transactions) ---------- */
  let ledgerTypeFilter = "";
  let ledgerProductFilter = "";
  let ledgerDateRange = "";

  function getTransactions() {
    try {
      var raw = localStorage.getItem(LS.STOCK_TRANSACTIONS);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }

  function saveTransactions(list) {
    localStorage.setItem(LS.STOCK_TRANSACTIONS, JSON.stringify(list));
  }

  function openTxnModal(type) {
    var form = qs("#txnForm");
    if (form) form.reset();
    var typeField = qs("#txnType");
    if (typeField) typeField.value = type;
    var title = qs("#txnModalTitle");
    if (title) title.textContent = type === "buy" ? "Record Purchase (Buy Stock)" : "Record Sale (Sell Stock)";
    var submitBtn = qs("#txnSubmitBtn");
    if (submitBtn) {
      submitBtn.textContent = type === "buy" ? "Record Purchase" : "Record Sale";
      submitBtn.className = type === "buy" ? "btn btn-buy" : "btn btn-sell";
    }

    var select = qs("#txnProduct");
    if (select) {
      var products = getProducts();
      select.innerHTML = '<option value="">Select product…</option>' +
        products.map(function(p) {
          return '<option value="' + escapeHtml(p.id) + '">' + escapeHtml(p.name) + ' (Stock: ' + (p.stockQty || 0) + ')</option>';
        }).join("");
    }

    var dateField = qs("#txnDate");
    if (dateField) {
      var today = new Date();
      dateField.value = today.getFullYear() + '-' +
        String(today.getMonth() + 1).padStart(2, '0') + '-' +
        String(today.getDate()).padStart(2, '0');
    }

    updateTxnTotalPreview();
    openModal("txnModal");
  }

  function updateTxnTotalPreview() {
    var qty = parseFloat(qs("#txnQty")?.value) || 0;
    var rate = parseFloat(qs("#txnRate")?.value) || 0;
    var total = qty * rate;
    var preview = qs("#txnTotalPreview");
    if (preview) {
      preview.innerHTML = "Total: <strong>₹" + total.toLocaleString("en-IN") + "</strong>";
    }
  }

  qs("#txnQty")?.addEventListener("input", updateTxnTotalPreview);
  qs("#txnRate")?.addEventListener("input", updateTxnTotalPreview);

  qs("#txnProduct")?.addEventListener("change", function() {
    var productId = qs("#txnProduct").value;
    var type = qs("#txnType").value;
    if (!productId) return;
    var product = getProducts().find(function(p) { return p.id === productId; });
    if (!product) return;
    if (type === "buy") {
      qs("#txnRate").value = product.costPrice || "";
    } else {
      qs("#txnRate").value = product.price || "";
    }
    updateTxnTotalPreview();
  });

  qs("#ledgerRecordBuyBtn")?.addEventListener("click", function() { openTxnModal("buy"); });
  qs("#ledgerRecordSellBtn")?.addEventListener("click", function() { openTxnModal("sell"); });

  qs("#txnForm")?.addEventListener("submit", function(e) {
    e.preventDefault();
    var type = qs("#txnType").value;
    var productId = qs("#txnProduct").value;
    var qty = parseInt(qs("#txnQty").value, 10) || 0;
    var rate = parseFloat(qs("#txnRate").value) || 0;
    var dateVal = qs("#txnDate").value;
    var note = (qs("#txnNote").value || "").trim();

    if (!productId) { showToast("Select a product.", "error"); return; }
    if (qty <= 0) { showToast("Quantity must be at least 1.", "error"); return; }
    if (rate <= 0) { showToast("Rate must be greater than 0.", "error"); return; }

    var products = getProducts();
    var product = products.find(function(p) { return p.id === productId; });
    if (!product) { showToast("Product not found.", "error"); return; }

    if (type === "sell") {
      var currentStock = Number(product.stockQty) || 0;
      if (qty > currentStock) {
        showToast("Cannot sell " + qty + " units. Only " + currentStock + " in stock.", "error");
        return;
      }
    }

    var total = qty * rate;
    var txnDate = dateVal ? new Date(dateVal + "T12:00:00").getTime() : Date.now();

    var txn = {
      id: uid(),
      type: type,
      productId: productId,
      productName: product.name || "Unknown",
      qty: qty,
      unitPrice: rate,
      total: total,
      date: txnDate,
      note: note
    };

    var transactions = getTransactions();
    transactions.push(txn);
    saveTransactions(transactions);

    var ix = products.findIndex(function(p) { return p.id === productId; });
    if (ix !== -1) {
      var currentQty = Number(products[ix].stockQty) || 0;
      if (type === "buy") {
        products[ix].stockQty = currentQty + qty;
        products[ix].inStock = true;
      } else {
        products[ix].stockQty = Math.max(0, currentQty - qty);
        if (products[ix].stockQty === 0) products[ix].inStock = false;
      }
      saveProducts(products);
      autoSyncProducts();
    }

    var label = type === "buy" ? "Purchase" : "Sale";
    pushActivity(label + ": " + qty + "× " + product.name + " @ ₹" + rate.toLocaleString("en-IN"));

    closeModal("txnModal");
    renderLedger();
    renderProfitSection();
    renderProducts();
    renderDashboard();
    showToast(label + " recorded. Stock updated.", "success");
  });

  async function deleteTxn(txnId) {
    var ok = await confirmDialog("Delete transaction?", "This will remove the transaction record but will NOT reverse the stock change. Adjust stock manually if needed.");
    if (!ok) return;
    var transactions = getTransactions().filter(function(t) { return t.id !== txnId; });
    saveTransactions(transactions);
    pushActivity("Transaction deleted.");
    renderLedger();
    renderProfitSection();
    renderDashboard();
    showToast("Transaction deleted.", "success");
  }

  function renderLedger() {
    var transactions = getTransactions();
    var products = getProducts();

    var productSelect = qs("#ledgerProductFilter");
    if (productSelect) {
      var prevVal = productSelect.value;
      var usedProducts = {};
      transactions.forEach(function(t) {
        usedProducts[t.productId] = t.productName;
      });
      productSelect.innerHTML = '<option value="">All Products</option>' +
        Object.keys(usedProducts).map(function(id) {
          return '<option value="' + escapeHtml(id) + '">' + escapeHtml(usedProducts[id]) + '</option>';
        }).join("");
      productSelect.value = prevVal || "";
    }

    var filtered = transactions.slice();

    if (ledgerTypeFilter) {
      filtered = filtered.filter(function(t) { return t.type === ledgerTypeFilter; });
    }
    if (ledgerProductFilter) {
      filtered = filtered.filter(function(t) { return t.productId === ledgerProductFilter; });
    }
    if (ledgerDateRange) {
      var now = Date.now();
      var cutoff = 0;
      var todayStart = new Date();
      todayStart.setHours(0, 0, 0, 0);
      if (ledgerDateRange === "today") cutoff = todayStart.getTime();
      else if (ledgerDateRange === "7d") cutoff = now - 7 * 86400000;
      else if (ledgerDateRange === "30d") cutoff = now - 30 * 86400000;
      else if (ledgerDateRange === "90d") cutoff = now - 90 * 86400000;
      if (cutoff) {
        filtered = filtered.filter(function(t) { return t.date >= cutoff; });
      }
    }

    filtered.sort(function(a, b) { return b.date - a.date; });

    var totalBought = 0;
    var totalSold = 0;
    transactions.forEach(function(t) {
      if (t.type === "buy") totalBought += t.total;
      else totalSold += t.total;
    });
    var realizedPL = totalSold - totalBought;

    var boughtEl = qs("#ledgerTotalBought");
    var soldEl = qs("#ledgerTotalSold");
    var plEl = qs("#ledgerRealizedPL");
    var countEl = qs("#ledgerTxnCount");
    var plCard = qs("#ledgerPLCard");

    if (boughtEl) boughtEl.textContent = "₹" + totalBought.toLocaleString("en-IN");
    if (soldEl) soldEl.textContent = "₹" + totalSold.toLocaleString("en-IN");
    if (plEl) {
      plEl.textContent = (realizedPL >= 0 ? "₹" : "−₹") + Math.abs(realizedPL).toLocaleString("en-IN");
    }
    if (plCard) {
      plCard.classList.remove("stat-card--pl-profit", "stat-card--pl-loss");
      plCard.classList.add(realizedPL >= 0 ? "stat-card--pl-profit" : "stat-card--pl-loss");
    }
    if (countEl) countEl.textContent = String(transactions.length);

    var tbody = qs("#ledgerTableBody");
    var emptyMsg = qs("#ledgerEmptyMsg");
    var tableWrap = qs(".ledger-table-wrap");

    if (!tbody) return;

    if (filtered.length === 0) {
      tbody.innerHTML = "";
      if (tableWrap) tableWrap.classList.add("hidden");
      if (emptyMsg) emptyMsg.classList.remove("hidden");
      return;
    }

    if (tableWrap) tableWrap.classList.remove("hidden");
    if (emptyMsg) emptyMsg.classList.add("hidden");

    tbody.innerHTML = filtered.map(function(t) {
      var d = new Date(t.date);
      var dateStr = d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
      var typeBadge = t.type === "buy"
        ? '<span class="txn-badge txn-badge--buy"><i class="fas fa-arrow-down"></i> Buy</span>'
        : '<span class="txn-badge txn-badge--sell"><i class="fas fa-arrow-up"></i> Sell</span>';
      return '<tr>' +
        '<td class="txn-date">' + dateStr + '</td>' +
        '<td>' + typeBadge + '</td>' +
        '<td class="txn-product-name">' + escapeHtml(t.productName) + '</td>' +
        '<td class="text-right">' + t.qty + '</td>' +
        '<td class="text-right">₹' + Number(t.unitPrice).toLocaleString("en-IN") + '</td>' +
        '<td class="text-right"><strong>₹' + Number(t.total).toLocaleString("en-IN") + '</strong></td>' +
        '<td class="txn-note">' + escapeHtml(t.note || "—") + '</td>' +
        '<td><button class="action-btn action-btn--danger delete-txn" data-id="' + t.id + '" title="Delete"><i class="fas fa-trash"></i></button></td>' +
        '</tr>';
    }).join("");

    tbody.querySelectorAll(".delete-txn").forEach(function(btn) {
      btn.addEventListener("click", function() { deleteTxn(btn.getAttribute("data-id")); });
    });
  }

  qs("#ledgerTypeFilter")?.addEventListener("change", function(e) {
    ledgerTypeFilter = e.target.value;
    renderLedger();
  });
  qs("#ledgerProductFilter")?.addEventListener("change", function(e) {
    ledgerProductFilter = e.target.value;
    renderLedger();
  });
  qs("#ledgerDateRange")?.addEventListener("change", function(e) {
    ledgerDateRange = e.target.value;
    renderLedger();
  });

  /* ===================== SALES MODULE ===================== */

  function getSalesBills() {
    try { return JSON.parse(localStorage.getItem(LS.SALES_BILLS) || "[]"); }
    catch { return []; }
  }
  function saveSalesBills(list) { localStorage.setItem(LS.SALES_BILLS, JSON.stringify(list)); }

  function getPayments() {
    try { return JSON.parse(localStorage.getItem(LS.PAYMENTS) || "[]"); }
    catch { return []; }
  }
  function savePayments(list) { localStorage.setItem(LS.PAYMENTS, JSON.stringify(list)); }

  function nextSalesBillNumber() {
    var n = parseInt(localStorage.getItem(LS.SALES_BILL_COUNTER) || "0", 10);
    n += 1;
    localStorage.setItem(LS.SALES_BILL_COUNTER, String(n));
    return "A" + String(n).padStart(6, "0");
  }

  var salesSyncTimer = null;
  var isSalesSyncing = false;

  function fmtCurrency(v) {
    return Number(v || 0).toFixed(2);
  }
  function fmtDateShort(ts) {
    if (!ts) return "—";
    var d = new Date(ts);
    return String(d.getDate()).padStart(2, "0") + "/" + String(d.getMonth() + 1).padStart(2, "0") + "/" + d.getFullYear();
  }

  /* --- Product Search Dropdown for Line Items --- */
  function createSalesLineRow(data) {
    var tr = document.createElement("tr");
    tr.className = "sales-line-row";
    var nameVal = (data && data.productName) || "";
    var qtyVal = (data && data.qty) || "";
    var rateVal = (data && data.rate) || "";
    var disVal = (data && data.discount) || 0;
    var amtVal = (data && data.amount) || 0;

    tr.innerHTML =
      '<td class="sales-product-cell">' +
        '<input type="text" class="sl-product-input" placeholder="Search product..." value="' + nameVal.replace(/"/g, '&quot;') + '" />' +
        '<div class="sales-product-dropdown sales-dropdown hidden"></div>' +
      '</td>' +
      '<td><input type="number" class="sl-qty-input" min="0" step="1" value="' + qtyVal + '" /></td>' +
      '<td><input type="number" class="sl-rate-input" min="0" step="0.01" value="' + rateVal + '" /></td>' +
      '<td><input type="number" class="sl-dis-input" min="0" max="100" step="0.01" value="' + disVal + '" /></td>' +
      '<td class="col-amount">' + fmtCurrency(amtVal) + '</td>' +
      '<td class="col-action"><button type="button" class="sales-line-remove" title="Remove"><i class="fas fa-times"></i></button></td>';

    var productInput = tr.querySelector(".sl-product-input");
    var dropdown = tr.querySelector(".sales-product-dropdown");

    productInput.addEventListener("input", function() {
      var val = productInput.value.trim().toLowerCase();
      if (val.length < 1) { dropdown.classList.add("hidden"); return; }
      var prods = getProducts();
      var matches = prods.filter(function(p) {
        return p.name.toLowerCase().indexOf(val) !== -1;
      }).slice(0, 15);
      if (matches.length === 0) { dropdown.classList.add("hidden"); return; }
      dropdown.innerHTML = matches.map(function(p) {
        return '<div class="sales-dropdown-item" data-name="' + p.name.replace(/"/g, '&quot;') + '" data-price="' + (p.price || 0) + '">' + p.name + ' <span style="color:var(--muted);font-size:0.75rem;">₹' + (p.price || 0) + '</span></div>';
      }).join("");
      dropdown.classList.remove("hidden");
    });

    productInput.addEventListener("focus", function() {
      if (productInput.value.trim().length >= 1) productInput.dispatchEvent(new Event("input"));
    });

    productInput.addEventListener("blur", function() {
      setTimeout(function() { dropdown.classList.add("hidden"); }, 200);
    });

    dropdown.addEventListener("click", function(e) {
      var item = e.target.closest(".sales-dropdown-item");
      if (!item) return;
      productInput.value = item.getAttribute("data-name");
      tr.querySelector(".sl-rate-input").value = item.getAttribute("data-price");
      dropdown.classList.add("hidden");
      if (!tr.querySelector(".sl-qty-input").value) tr.querySelector(".sl-qty-input").value = 1;
      recalcSalesLine(tr);
      recalcSalesTotals();
    });

    tr.querySelector(".sl-qty-input").addEventListener("input", function() { recalcSalesLine(tr); recalcSalesTotals(); });
    tr.querySelector(".sl-rate-input").addEventListener("input", function() { recalcSalesLine(tr); recalcSalesTotals(); });
    tr.querySelector(".sl-dis-input").addEventListener("input", function() { recalcSalesLine(tr); recalcSalesTotals(); });

    tr.querySelector(".sales-line-remove").addEventListener("click", function() {
      tr.remove();
      recalcSalesTotals();
    });

    return tr;
  }

  function recalcSalesLine(tr) {
    var qty = parseFloat(tr.querySelector(".sl-qty-input").value) || 0;
    var rate = parseFloat(tr.querySelector(".sl-rate-input").value) || 0;
    var dis = parseFloat(tr.querySelector(".sl-dis-input").value) || 0;
    var amt = qty * rate * (1 - dis / 100);
    tr.querySelector(".col-amount").textContent = fmtCurrency(amt);
  }

  function recalcSalesTotals() {
    var rows = qsa("#salesLineItems .sales-line-row");
    var vog = 0;
    rows.forEach(function(tr) {
      var qty = parseFloat(tr.querySelector(".sl-qty-input").value) || 0;
      var rate = parseFloat(tr.querySelector(".sl-rate-input").value) || 0;
      var dis = parseFloat(tr.querySelector(".sl-dis-input").value) || 0;
      vog += qty * rate * (1 - dis / 100);
    });
    qs("#salesValueOfGoods").textContent = fmtCurrency(vog);

    var discount = parseFloat(qs("#salesDiscountAmt").value) || 0;
    var gstPct = parseFloat(qs("#salesGstPct").value) || 0;
    var freight = parseFloat(qs("#salesFreight").value) || 0;
    var gstAmt = vog * gstPct / 100;
    var billTotal = vog - discount + gstAmt + freight;
    qs("#salesBillTotal").textContent = fmtCurrency(billTotal);

    var cashRcvd = parseFloat(qs("#salesCashReceived").value) || 0;
    var balance = billTotal - cashRcvd;
    qs("#salesBalance").textContent = fmtCurrency(balance);
  }

  /* --- Customer Search & Status (synced across Bills + Sales tabs, grouped by phone) --- */
  function getAllCustomerNames() {
    var names = {};
    getSalesBills().forEach(function(b) { if (b.customerName) names[b.customerName.toUpperCase()] = true; });
    getBills().forEach(function(b) { if (b.customerName) names[b.customerName.toUpperCase()] = true; });
    getPayments().forEach(function(p) { if (p.customerName) names[p.customerName.toUpperCase()] = true; });
    return Object.keys(names).sort();
  }

  function getCustomerPhoneMap() {
    var map = {};
    getSalesBills().forEach(function(b) {
      if (b.phone) {
        if (!map[b.phone]) map[b.phone] = { phone: b.phone, name: b.customerName || "", date: b.date || 0 };
        else if ((b.date || 0) > map[b.phone].date) { map[b.phone].name = b.customerName || ""; map[b.phone].date = b.date || 0; }
      }
    });
    getBills().forEach(function(b) {
      if (b.phone) {
        if (!map[b.phone]) map[b.phone] = { phone: b.phone, name: b.customerName || "", date: b.date || 0 };
        else if ((b.date || 0) > map[b.phone].date) { map[b.phone].name = b.customerName || ""; map[b.phone].date = b.date || 0; }
      }
    });
    getPayments().forEach(function(p) {
      if (p.phone) {
        if (!map[p.phone]) map[p.phone] = { phone: p.phone, name: p.customerName || "", date: p.date || 0 };
      }
    });
    return map;
  }

  function findCustomerByPhone(phone) {
    if (!phone) return null;
    var ph = phone.trim();
    var result = { name: "", phone: ph, bills: [] };
    getSalesBills().forEach(function(b) {
      if ((b.phone || "") === ph) {
        result.bills.push(b);
        if (b.customerName) result.name = b.customerName;
      }
    });
    getBills().forEach(function(b) {
      if ((b.phone || "") === ph) {
        if (b.customerName && !result.name) result.name = b.customerName;
      }
    });
    return result.name ? result : null;
  }

  function findPhoneByCustomerName(name) {
    if (!name) return "";
    var upper = name.trim().toUpperCase();
    var phone = "";
    var latestDate = 0;
    getSalesBills().forEach(function(b) {
      if ((b.customerName || "").toUpperCase() === upper && b.phone && (b.date || 0) >= latestDate) {
        phone = b.phone; latestDate = b.date || 0;
      }
    });
    if (phone) return phone;
    getBills().forEach(function(b) {
      if ((b.customerName || "").toUpperCase() === upper && b.phone && (b.date || 0) >= latestDate) {
        phone = b.phone; latestDate = b.date || 0;
      }
    });
    return phone;
  }

  function matchesCustOrPhone(b, nameUpper, phone) {
    if (phone && (b.phone || "") === phone) return true;
    if (nameUpper && (b.customerName || "").toUpperCase() === nameUpper) return true;
    return false;
  }

  function getCustomerPurchaseHistory(nameUpper, phone) {
    var products = {};
    function addItems(b) {
      (b.lineItems || []).forEach(function(li) {
        var key = (li.productName || "").toUpperCase();
        if (!key) return;
        if (!products[key]) products[key] = { name: li.productName, totalQty: 0, lastRate: 0, lastDate: 0 };
        products[key].totalQty += (li.qty || 0);
        if ((b.date || 0) > products[key].lastDate) {
          products[key].lastRate = li.rate || li.unitPrice || 0;
          products[key].lastDate = b.date || 0;
        }
      });
    }
    getSalesBills().filter(function(b) { return matchesCustOrPhone(b, nameUpper, phone); }).forEach(addItems);
    getBills().filter(function(b) { return matchesCustOrPhone(b, nameUpper, phone); }).forEach(addItems);
    return Object.values(products).sort(function(a, b) { return b.lastDate - a.lastDate; });
  }

  function updateCustomerStatus(custName, custPhone) {
    if ((!custName || !custName.trim()) && (!custPhone || !custPhone.trim())) {
      qs("#custPanelName").textContent = "CUSTOMER STATUS";
      qs("#custPanelPhone").textContent = "";
      qs("#custPanelOutstanding").textContent = "0.00";
      qs("#custPanelBillCount").textContent = "0";
      qs("#custPanelLastSale").textContent = "—";
      qs("#custPanelLastReceipt").textContent = "—";
      qs("#custPanelTxnList").innerHTML = '<p class="muted-text">Enter mobile number to see history</p>';
      return;
    }
    var name = (custName || "").trim().toUpperCase();
    var phone = (custPhone || "").trim();

    var salesBills = getSalesBills().filter(function(b) { return matchesCustOrPhone(b, name, phone); });
    var oldBills = getBills().filter(function(b) { return matchesCustOrPhone(b, name, phone); });
    var payments = getPayments().filter(function(p) {
      if (phone && (p.phone || "") === phone) return true;
      if (name && (p.customerName || "").toUpperCase() === name) return true;
      return false;
    });

    var allBills = [];
    salesBills.forEach(function(b) {
      allBills.push({ src: "sales", billNumber: b.billNumber || "", total: b.billTotal || 0, cashReceived: b.cashReceived || 0, date: b.date || 0, phone: b.phone || "", name: b.customerName || "" });
    });
    oldBills.forEach(function(b) {
      allBills.push({ src: "bills", billNumber: b.billNumber || "", total: b.grandTotal || 0, cashReceived: b.paymentStatus === "Paid" ? (b.grandTotal || 0) : 0, date: b.date || 0, phone: b.phone || "", name: b.customerName || "" });
    });
    allBills.sort(function(a, b) { return (b.date || 0) - (a.date || 0); });
    payments.sort(function(a, b) { return (b.date || 0) - (a.date || 0); });

    var totalBilled = 0;
    var totalPaid = 0;
    allBills.forEach(function(b) { totalBilled += b.total; totalPaid += b.cashReceived; });
    payments.forEach(function(p) { totalPaid += (p.amount || 0); });
    var outstanding = totalBilled - totalPaid;

    var displayName = name;
    var displayPhone = phone;
    for (var i = 0; i < allBills.length; i++) {
      if (!displayName && allBills[i].name) displayName = allBills[i].name.toUpperCase();
      if (!displayPhone && allBills[i].phone) displayPhone = allBills[i].phone;
      if (displayName && displayPhone) break;
    }

    qs("#custPanelName").textContent = displayName || "CUSTOMER";
    qs("#custPanelPhone").textContent = displayPhone ? "Mobile: " + displayPhone : "";
    qs("#custPanelOutstanding").textContent = "₹ " + fmtCurrency(outstanding);
    qs("#custPanelBillCount").textContent = String(allBills.length);

    if (allBills.length > 0) {
      qs("#custPanelLastSale").textContent = "₹" + fmtCurrency(allBills[0].total) + " (" + fmtDateShort(allBills[0].date) + ")";
    } else {
      qs("#custPanelLastSale").textContent = "—";
    }

    if (payments.length > 0) {
      qs("#custPanelLastReceipt").textContent = "₹" + fmtCurrency(payments[0].amount) + " (" + fmtDateShort(payments[0].date) + ")";
    } else {
      qs("#custPanelLastReceipt").textContent = "—";
    }

    var txns = [];
    allBills.forEach(function(b) {
      txns.push({ type: "BILL", ref: b.billNumber, amount: b.total, date: b.date });
    });
    payments.forEach(function(p) {
      txns.push({ type: p.mode || "CASH", ref: "", amount: p.amount || 0, date: p.date || 0 });
    });
    txns.sort(function(a, b) { return (b.date || 0) - (a.date || 0); });

    var purchaseHistory = getCustomerPurchaseHistory(name, phone);

    var html = "";
    if (txns.length > 0) {
      html += txns.slice(0, 15).map(function(t) {
        var cls = t.type === "BILL" ? "cust-txn-type--bill" : "cust-txn-type--payment";
        return '<div class="cust-txn-item">' +
          '<span class="cust-txn-type ' + cls + '">' + t.type + '</span>' +
          '<span class="cust-txn-date">' + (t.ref ? t.ref + " " : "") + fmtDateShort(t.date) + '</span>' +
          '<span class="cust-txn-amount">₹' + fmtCurrency(t.amount) + '</span>' +
        '</div>';
      }).join("");
    }

    if (purchaseHistory.length > 0) {
      html += '<h4 class="cust-txn-title" style="margin-top:12px;">Products Purchased</h4>';
      html += purchaseHistory.slice(0, 20).map(function(p) {
        return '<div class="cust-txn-item">' +
          '<span style="flex:1;font-size:0.78rem;">' + p.name + '</span>' +
          '<span class="cust-txn-date">Qty: ' + p.totalQty + '</span>' +
          '<span class="cust-txn-amount">₹' + fmtCurrency(p.lastRate) + '</span>' +
        '</div>';
      }).join("");
    }

    if (!html) {
      html = '<p class="muted-text">No transactions found</p>';
    }
    qs("#custPanelTxnList").innerHTML = html;
  }

  /* --- Init / Reset Sales Form --- */
  function resetSalesForm() {
    qs("#salesBillId").value = "";
    qs("#salesBillNumber").value = "";
    qs("#salesBillDate").value = new Date().toISOString().split("T")[0];
    qs("#salesCustomerName").value = "";
    qs("#salesCustomerPhone").value = "";
    qs("#salesPaymentType").value = "CREDIT";
    qs("#salesBillType").value = "LOCAL";
    qs("#salesLineItems").innerHTML = "";
    qs("#salesDiscountAmt").value = 0;
    qs("#salesGstPct").value = 0;
    qs("#salesFreight").value = 0;
    qs("#salesCashReceived").value = 0;
    qs("#salesValueOfGoods").textContent = "0.00";
    qs("#salesBillTotal").textContent = "0.00";
    qs("#salesBalance").textContent = "0.00";
    for (var i = 0; i < 3; i++) {
      qs("#salesLineItems").appendChild(createSalesLineRow());
    }
    updateCustomerStatus("");
  }

  function startNewSalesBill() {
    resetSalesForm();
    qs("#salesBillNumber").value = nextSalesBillNumber();
    qs("#salesBillDate").value = new Date().toISOString().split("T")[0];
    qs("#salesFormWrap").scrollIntoView({ behavior: "smooth" });
  }

  function loadSalesBillForEdit(billId) {
    var bills = getSalesBills();
    var bill = bills.find(function(b) { return b.id === billId; });
    if (!bill) return;

    resetSalesForm();
    qs("#salesBillId").value = bill.id;
    qs("#salesBillNumber").value = bill.billNumber || "";
    if (bill.date) {
      qs("#salesBillDate").value = new Date(bill.date).toISOString().split("T")[0];
    }
    qs("#salesCustomerName").value = bill.customerName || "";
    qs("#salesCustomerPhone").value = bill.phone || "";
    qs("#salesPaymentType").value = bill.type || "CREDIT";
    qs("#salesBillType").value = bill.billType || "LOCAL";
    qs("#salesDiscountAmt").value = bill.discount || 0;
    qs("#salesGstPct").value = bill.gst || 0;
    qs("#salesFreight").value = bill.freight || 0;
    qs("#salesCashReceived").value = bill.cashReceived || 0;

    qs("#salesLineItems").innerHTML = "";
    if (Array.isArray(bill.lineItems)) {
      bill.lineItems.forEach(function(li) {
        qs("#salesLineItems").appendChild(createSalesLineRow(li));
      });
    }
    if (bill.lineItems.length < 1) {
      qs("#salesLineItems").appendChild(createSalesLineRow());
    }
    recalcSalesTotals();
    updateCustomerStatus(bill.customerName);
    qs("#salesFormWrap").scrollIntoView({ behavior: "smooth" });
  }

  /* --- Save Sales Bill --- */
  function generateRandomPhone() {
    return "9" + Math.floor(100000000 + Math.random() * 900000000).toString();
  }

  function saveSalesBill() {
    var custName = qs("#salesCustomerName").value.trim();
    if (!custName) { showToast("Customer name is required", "error"); return false; }
    var custPhone = qs("#salesCustomerPhone").value.trim();
    if (!custPhone) {
      custPhone = generateRandomPhone();
      qs("#salesCustomerPhone").value = custPhone;
      showToast("Auto-generated mobile: " + custPhone, "info");
    }

    var rows = qsa("#salesLineItems .sales-line-row");
    var lineItems = [];
    rows.forEach(function(tr) {
      var pname = tr.querySelector(".sl-product-input").value.trim();
      var qty = parseFloat(tr.querySelector(".sl-qty-input").value) || 0;
      var rate = parseFloat(tr.querySelector(".sl-rate-input").value) || 0;
      var dis = parseFloat(tr.querySelector(".sl-dis-input").value) || 0;
      if (pname && qty > 0) {
        lineItems.push({
          productName: pname,
          qty: qty,
          rate: rate,
          discount: dis,
          amount: qty * rate * (1 - dis / 100)
        });
      }
    });

    if (lineItems.length === 0) { showToast("Add at least one product", "error"); return false; }

    var vog = 0;
    lineItems.forEach(function(li) { vog += li.amount; });
    var discount = parseFloat(qs("#salesDiscountAmt").value) || 0;
    var gstPct = parseFloat(qs("#salesGstPct").value) || 0;
    var freight = parseFloat(qs("#salesFreight").value) || 0;
    var gstAmt = vog * gstPct / 100;
    var billTotal = vog - discount + gstAmt + freight;
    var cashReceived = parseFloat(qs("#salesCashReceived").value) || 0;

    var dateStr = qs("#salesBillDate").value;
    var dateTs = dateStr ? new Date(dateStr + "T12:00:00").getTime() : Date.now();

    var existingId = qs("#salesBillId").value;
    var bills = getSalesBills();

    if (existingId) {
      var idx = bills.findIndex(function(b) { return b.id === existingId; });
      if (idx !== -1) {
        bills[idx].customerName = custName;
        bills[idx].phone = custPhone;
        bills[idx].type = qs("#salesPaymentType").value;
        bills[idx].billType = qs("#salesBillType").value;
        bills[idx].lineItems = lineItems;
        bills[idx].valueOfGoods = vog;
        bills[idx].discount = discount;
        bills[idx].gst = gstPct;
        bills[idx].freight = freight;
        bills[idx].billTotal = billTotal;
        bills[idx].cashReceived = cashReceived;
        bills[idx].balance = billTotal - cashReceived;
        bills[idx].date = dateTs;
      }
    } else {
      var bill = {
        id: crypto.randomUUID ? crypto.randomUUID() : "sb-" + Date.now() + "-" + Math.random().toString(36).slice(2, 8),
        billNumber: qs("#salesBillNumber").value,
        customerName: custName,
        phone: custPhone,
        type: qs("#salesPaymentType").value,
        billType: qs("#salesBillType").value,
        lineItems: lineItems,
        valueOfGoods: vog,
        discount: discount,
        gst: gstPct,
        freight: freight,
        billTotal: billTotal,
        cashReceived: cashReceived,
        balance: billTotal - cashReceived,
        date: dateTs,
        status: "active"
      };
      bills.push(bill);
    }

    saveSalesBills(bills);
    showToast("Sales bill saved!", "success");
    renderSalesBillsList();
    updateCustomerStatus(custName, custPhone);
    autoSyncSalesBills();
    return true;
  }

  /* --- Render Sales Bills List (unified: sales + old bills) --- */
  function renderSalesBillsList(filter) {
    var tbody = qs("#salesBillsList");
    if (!tbody) return;

    var unified = [];
    getSalesBills().forEach(function(b) {
      unified.push({
        id: b.id, src: "sales", billNumber: b.billNumber || "", customerName: b.customerName || "",
        date: b.date || 0, billTotal: b.billTotal || 0, type: b.type || "CREDIT",
        balance: b.balance || 0, paymentStatus: ""
      });
    });
    getBills().forEach(function(b) {
      unified.push({
        id: b.id, src: "bills", billNumber: b.billNumber || "", customerName: b.customerName || "",
        date: b.date || 0, billTotal: b.grandTotal || 0, type: b.paymentMethod || "Cash",
        balance: b.paymentStatus === "Paid" ? 0 : (b.grandTotal || 0), paymentStatus: b.paymentStatus || ""
      });
    });
    unified.sort(function(a, b) { return (b.date || 0) - (a.date || 0); });

    var search = (filter || qs("#salesBillSearch")?.value || "").trim().toLowerCase();
    if (search) {
      unified = unified.filter(function(b) {
        return (b.billNumber || "").toLowerCase().indexOf(search) !== -1 ||
               (b.customerName || "").toLowerCase().indexOf(search) !== -1;
      });
    }

    if (unified.length === 0) {
      tbody.innerHTML = '<tr><td colspan="7" style="text-align:center;color:var(--muted);padding:20px;">No bills found</td></tr>';
      return;
    }

    tbody.innerHTML = unified.map(function(b) {
      var balCls = (b.balance || 0) > 0 ? "sales-bill-balance--due" : "sales-bill-balance--paid";
      var typeBadge = b.type;
      var typeCls = "sales-bill-badge--credit";
      if (b.type === "CASH" || b.type === "Cash") typeCls = "sales-bill-badge--cash";
      var editBtn = b.src === "sales"
        ? '<button class="icon-btn" title="Edit" onclick="window._salesEdit(\'' + b.id + '\')"><i class="fas fa-pen-to-square"></i></button>'
        : '<button class="icon-btn" title="Edit (Bills)" onclick="window._oldBillEdit(\'' + b.id + '\')"><i class="fas fa-pen-to-square"></i></button>';
      var printBtn = b.src === "sales"
        ? '<button class="icon-btn" title="Print" onclick="window._salesPrint(\'' + b.id + '\')"><i class="fas fa-print"></i></button>'
        : '<button class="icon-btn" title="Print (Bills)" onclick="window._oldBillPrint(\'' + b.id + '\')"><i class="fas fa-print"></i></button>';
      return '<tr>' +
        '<td><strong>' + b.billNumber + '</strong></td>' +
        '<td>' + b.customerName + '</td>' +
        '<td>' + fmtDateShort(b.date) + '</td>' +
        '<td class="text-right"><strong>₹' + fmtCurrency(b.billTotal) + '</strong></td>' +
        '<td><span class="sales-bill-badge ' + typeCls + '">' + typeBadge + '</span></td>' +
        '<td><span class="sales-bill-balance ' + balCls + '">₹' + fmtCurrency(b.balance || 0) + '</span></td>' +
        '<td class="sales-bill-actions">' + editBtn + printBtn + '</td>' +
      '</tr>';
    }).join("");
  }

  window._salesEdit = function(id) { loadSalesBillForEdit(id); };
  window._salesPrint = function(id) { printSalesBill(id); };
  window._oldBillEdit = function(id) {
    if (typeof openBillModal === "function") {
      openBillModal(id);
      switchTab("bills");
    }
  };
  window._oldBillPrint = function(id) {
    if (typeof openBillModal === "function") {
      openBillModal(id);
      switchTab("bills");
    }
  };

  /* --- Print Sales Bill --- */
  function buildSalesInvoiceHtml(bill) {
    var linesHtml = (bill.lineItems || []).map(function(li, i) {
      return '<tr>' +
        '<td>' + (i + 1) + '</td>' +
        '<td>' + (li.productName || "") + '</td>' +
        '<td style="text-align:right;">' + (li.qty || 0) + '</td>' +
        '<td style="text-align:right;">' + fmtCurrency(li.rate) + '</td>' +
        '<td style="text-align:right;">' + fmtCurrency(li.discount || 0) + '%</td>' +
        '<td style="text-align:right;">' + fmtCurrency(li.amount) + '</td>' +
      '</tr>';
    }).join("");

    return '<h2>SALE INVOICE</h2>' +
      '<div class="inv-header">' +
        '<div><strong>M/S : MAHESH N COMPANY</strong><br>Address: ASPUR<br>Phone: 7297047681</div>' +
        '<div class="inv-meta">' +
          '<span>INVOICE: ' + (bill.billNumber || "") + '</span>' +
          '<span>Date: ' + fmtDateShort(bill.date) + '</span>' +
          '<span>Type: ' + (bill.type || "CREDIT") + ' / ' + (bill.billType || "LOCAL") + '</span>' +
        '</div>' +
        '<div>Customer: <strong>' + (bill.customerName || "") + '</strong>' + (bill.phone ? ' | Phone: ' + bill.phone : '') + '</div>' +
      '</div>' +
      '<table>' +
        '<thead><tr><th>S.No</th><th>Product</th><th>Qty</th><th>Rate</th><th>Dis%</th><th>Amount</th></tr></thead>' +
        '<tbody>' + linesHtml + '</tbody>' +
      '</table>' +
      '<div class="inv-totals">' +
        '<div>Value of Goods: ₹' + fmtCurrency(bill.valueOfGoods) + '</div>' +
        (bill.discount ? '<div>Discount: ₹' + fmtCurrency(bill.discount) + '</div>' : '') +
        (bill.gst ? '<div>GST: ' + bill.gst + '%</div>' : '') +
        (bill.freight ? '<div>Freight: ₹' + fmtCurrency(bill.freight) + '</div>' : '') +
        '<div class="grand">Bill Total: ₹' + fmtCurrency(bill.billTotal) + '</div>' +
        '<div>Cash Received: ₹' + fmtCurrency(bill.cashReceived) + '</div>' +
        '<div><strong>Balance: ₹' + fmtCurrency(bill.balance) + '</strong></div>' +
      '</div>';
  }

  function printSalesBill(billId) {
    var bill;
    if (typeof billId === "string") {
      bill = getSalesBills().find(function(b) { return b.id === billId; });
    } else {
      bill = billId;
    }
    if (!bill) { showToast("Bill not found", "error"); return; }

    var printEl = qs("#salesInvoicePrint");
    if (!printEl) return;
    printEl.innerHTML = buildSalesInvoiceHtml(bill);
    qs("#salesPrintArea").style.display = "block";

    if (typeof html2pdf !== "undefined") {
      html2pdf().set({
        margin: 8,
        filename: (bill.billNumber || "sale") + ".pdf",
        image: { type: "jpeg", quality: 0.95 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" }
      }).from(printEl).save().then(function() {
        qs("#salesPrintArea").style.display = "none";
      });
    } else {
      var win = window.open("", "_blank");
      if (win) {
        win.document.write('<html><head><title>' + (bill.billNumber || "Sale") + '</title><style>body{font-family:sans-serif;padding:20px;font-size:13px;} table{width:100%;border-collapse:collapse;margin:12px 0;} th,td{border:1px solid #999;padding:6px 8px;text-align:left;} th{background:#f0f0f0;} h2{text-align:center;} .inv-header{border:1px solid #333;padding:10px 14px;margin-bottom:12px;} .inv-meta{display:flex;justify-content:space-between;margin-bottom:8px;font-size:12px;} .inv-totals{text-align:right;margin-top:12px;} .grand{font-size:16px;font-weight:700;border-top:2px solid #333;padding-top:4px;margin-top:4px;}</style></head><body>');
        win.document.write(buildSalesInvoiceHtml(bill));
        win.document.write('</body></html>');
        win.document.close();
        win.print();
      }
      qs("#salesPrintArea").style.display = "none";
    }
  }

  /* --- Record Payment Modal --- */
  function openPaymentModal(custName) {
    qs("#paymentCustomer").value = custName || "";
    qs("#paymentAmount").value = "";
    qs("#paymentMode").value = "CASH";
    qs("#paymentDate").value = new Date().toISOString().split("T")[0];
    qs("#paymentNote").value = "";
    qs("#paymentModal").classList.remove("hidden");
    qs("#paymentModal").setAttribute("aria-hidden", "false");
  }

  function closePaymentModal() {
    qs("#paymentModal").classList.add("hidden");
    qs("#paymentModal").setAttribute("aria-hidden", "true");
  }

  function savePayment() {
    var custName = qs("#paymentCustomer").value.trim();
    var amount = parseFloat(qs("#paymentAmount").value) || 0;
    if (!custName) { showToast("Customer name required", "error"); return; }
    if (amount <= 0) { showToast("Enter a valid amount", "error"); return; }

    var dateStr = qs("#paymentDate").value;
    var dateTs = dateStr ? new Date(dateStr + "T12:00:00").getTime() : Date.now();
    var custPhone = qs("#salesCustomerPhone")?.value.trim() || findPhoneByCustomerName(custName);

    var payment = {
      id: crypto.randomUUID ? crypto.randomUUID() : "pay-" + Date.now() + "-" + Math.random().toString(36).slice(2, 8),
      customerName: custName,
      phone: custPhone,
      amount: amount,
      mode: qs("#paymentMode").value,
      date: dateTs,
      note: qs("#paymentNote").value.trim()
    };

    var payments = getPayments();
    payments.push(payment);
    savePayments(payments);

    showToast("Payment of ₹" + fmtCurrency(amount) + " recorded!", "success");
    closePaymentModal();
    updateCustomerStatus(custName, custPhone);
    renderSalesBillsList();
    autoSyncPayments();
  }

  /* --- Sync Sales Bills & Payments to GitHub --- */
  function autoSyncSalesBills() {
    var token = localStorage.getItem(LS.GITHUB_TOKEN) || "";
    if (!token) return;
    clearTimeout(salesSyncTimer);
    salesSyncTimer = setTimeout(function() { syncSalesBillsToGithub(); }, 2000);
  }

  function autoSyncPayments() {
    var token = localStorage.getItem(LS.GITHUB_TOKEN) || "";
    if (!token) return;
    setTimeout(function() { syncPaymentsToGithub(); }, 2500);
  }

  async function syncSalesBillsToGithub() {
    if (isSalesSyncing) return;
    var token = localStorage.getItem(LS.GITHUB_TOKEN) || "";
    if (!token) return;
    var repo = getGithubRepo();
    if (!repo || !repo.includes("/")) return;

    isSalesSyncing = true;
    var bills = getSalesBills();
    var jsonContent = JSON.stringify(bills, null, 2) + "\n";
    var apiBase = "https://api.github.com/repos/" + repo + "/contents/data/sales-bills.json";
    var headers = {
      "Authorization": "Bearer " + token,
      "Accept": "application/vnd.github.v3+json",
      "Content-Type": "application/json"
    };
    var encoded = btoa(unescape(encodeURIComponent(jsonContent)));

    try {
      var getResp = await fetch(apiBase, { headers: headers });
      var sha = "";
      if (getResp.ok) {
        var fileData = await getResp.json();
        sha = fileData.sha || "";
      }
      var putBody = { message: "Update sales bills from admin", content: encoded };
      if (sha) putBody.sha = sha;
      var putResp = await fetch(apiBase, { method: "PUT", headers: headers, body: JSON.stringify(putBody) });
      if (putResp.ok) {
        showToast("Sales bills synced to GitHub", "success");
      }
    } catch (err) {
      console.error("Sales sync error:", err);
    }
    isSalesSyncing = false;
  }

  async function syncPaymentsToGithub() {
    var token = localStorage.getItem(LS.GITHUB_TOKEN) || "";
    if (!token) return;
    var repo = getGithubRepo();
    if (!repo || !repo.includes("/")) return;

    var payments = getPayments();
    var jsonContent = JSON.stringify(payments, null, 2) + "\n";
    var apiBase = "https://api.github.com/repos/" + repo + "/contents/data/payments.json";
    var headers = {
      "Authorization": "Bearer " + token,
      "Accept": "application/vnd.github.v3+json",
      "Content-Type": "application/json"
    };
    var encoded = btoa(unescape(encodeURIComponent(jsonContent)));

    try {
      var getResp = await fetch(apiBase, { headers: headers });
      var sha = "";
      if (getResp.ok) {
        var fileData = await getResp.json();
        sha = fileData.sha || "";
      }
      var putBody = { message: "Update payments from admin", content: encoded };
      if (sha) putBody.sha = sha;
      await fetch(apiBase, { method: "PUT", headers: headers, body: JSON.stringify(putBody) });
    } catch (err) {
      console.error("Payments sync error:", err);
    }
  }

  /* --- Seed Sales Bills & Payments from GitHub on boot --- */
  async function seedSalesBillsFromJson() {
    try {
      var token = localStorage.getItem(LS.GITHUB_TOKEN) || "";
      var repo = getGithubRepo();
      var remoteBills = [];
      if (token && repo) {
        var apiUrl = "https://api.github.com/repos/" + repo + "/contents/data/sales-bills.json";
        var resp = await fetch(apiUrl, { headers: { "Authorization": "Bearer " + token, "Accept": "application/vnd.github.v3+json" } });
        if (resp.ok) {
          var data = await resp.json();
          if (data.content) {
            remoteBills = JSON.parse(decodeURIComponent(escape(atob(data.content.replace(/\n/g, "")))));
          }
        }
      } else {
        var localResp = await fetch("data/sales-bills.json");
        if (localResp.ok) remoteBills = await localResp.json();
      }
      if (!Array.isArray(remoteBills) || remoteBills.length === 0) return;
      var local = getSalesBills();
      if (local.length === 0) {
        saveSalesBills(remoteBills);
      } else {
        var localIds = {};
        local.forEach(function(b) { localIds[b.id] = true; });
        remoteBills.forEach(function(rb) {
          if (!localIds[rb.id]) local.push(rb);
        });
        saveSalesBills(local);
      }
      var maxNum = 0;
      getSalesBills().forEach(function(b) {
        var m = (b.billNumber || "").match(/A0*(\d+)/);
        if (m) { var n = parseInt(m[1], 10); if (n > maxNum) maxNum = n; }
      });
      var currentCounter = parseInt(localStorage.getItem(LS.SALES_BILL_COUNTER) || "0", 10);
      if (maxNum > currentCounter) localStorage.setItem(LS.SALES_BILL_COUNTER, String(maxNum));
    } catch (e) { console.error("seedSalesBills error:", e); }
  }

  async function seedPaymentsFromJson() {
    try {
      var token = localStorage.getItem(LS.GITHUB_TOKEN) || "";
      var repo = getGithubRepo();
      var remotePayments = [];
      if (token && repo) {
        var apiUrl = "https://api.github.com/repos/" + repo + "/contents/data/payments.json";
        var resp = await fetch(apiUrl, { headers: { "Authorization": "Bearer " + token, "Accept": "application/vnd.github.v3+json" } });
        if (resp.ok) {
          var data = await resp.json();
          if (data.content) {
            remotePayments = JSON.parse(decodeURIComponent(escape(atob(data.content.replace(/\n/g, "")))));
          }
        }
      } else {
        var localResp = await fetch("data/payments.json");
        if (localResp.ok) remotePayments = await localResp.json();
      }
      if (!Array.isArray(remotePayments) || remotePayments.length === 0) return;
      var local = getPayments();
      if (local.length === 0) {
        savePayments(remotePayments);
      } else {
        var localIds = {};
        local.forEach(function(p) { localIds[p.id] = true; });
        remotePayments.forEach(function(rp) {
          if (!localIds[rp.id]) local.push(rp);
        });
        savePayments(local);
      }
    } catch (e) { console.error("seedPayments error:", e); }
  }

  /* --- Sales Tab Event Listeners --- */
  qs("#salesNewBillBtn")?.addEventListener("click", startNewSalesBill);
  qs("#salesRecordPaymentBtn")?.addEventListener("click", function() { openPaymentModal(qs("#salesCustomerName").value); });
  qs("#salesAddRowBtn")?.addEventListener("click", function() {
    qs("#salesLineItems").appendChild(createSalesLineRow());
  });

  qs("#salesBillForm")?.addEventListener("submit", function(e) {
    e.preventDefault();
    saveSalesBill();
  });

  qs("#salesCancelBtn")?.addEventListener("click", function() {
    resetSalesForm();
    qs("#salesBillNumber").value = "";
  });

  qs("#salesPrintBtn")?.addEventListener("click", function() {
    var existingId = qs("#salesBillId").value;
    if (existingId) {
      printSalesBill(existingId);
    } else {
      showToast("Save the bill first before printing", "info");
    }
  });

  qs("#salesDiscountAmt")?.addEventListener("input", recalcSalesTotals);
  qs("#salesGstPct")?.addEventListener("input", recalcSalesTotals);
  qs("#salesFreight")?.addEventListener("input", recalcSalesTotals);
  qs("#salesCashReceived")?.addEventListener("input", recalcSalesTotals);

  qs("#salesBillSearch")?.addEventListener("input", function() { renderSalesBillsList(); });

  /* Phone number search with auto-fill (primary grouping key) */
  (function() {
    var phoneInput = qs("#salesCustomerPhone");
    var phoneDropdown = qs("#salesPhoneDropdown");
    var custInput = qs("#salesCustomerName");
    if (!phoneInput || !custInput) return;

    phoneInput.addEventListener("input", function() {
      var val = phoneInput.value.trim();
      if (val.length < 3) {
        if (phoneDropdown) phoneDropdown.classList.add("hidden");
        return;
      }
      var phoneMap = getCustomerPhoneMap();
      var matches = Object.values(phoneMap).filter(function(e) {
        return e.phone.indexOf(val) !== -1;
      }).slice(0, 8);

      if (matches.length === 0 || (matches.length === 1 && matches[0].phone === val)) {
        if (phoneDropdown) phoneDropdown.classList.add("hidden");
        var exact = findCustomerByPhone(val);
        if (exact) {
          custInput.value = exact.name;
          updateCustomerStatus(exact.name, val);
        }
        return;
      }
      if (phoneDropdown) {
        phoneDropdown.innerHTML = matches.map(function(e) {
          return '<div class="sales-dropdown-item" data-phone="' + e.phone + '" data-name="' + (e.name || "") + '">' +
            '<strong>' + e.phone + '</strong> — ' + (e.name || "New") + '</div>';
        }).join("");
        phoneDropdown.classList.remove("hidden");
      }
    });

    phoneInput.addEventListener("blur", function() {
      setTimeout(function() {
        if (phoneDropdown) phoneDropdown.classList.add("hidden");
        var val = phoneInput.value.trim();
        if (val.length >= 3) {
          var cust = findCustomerByPhone(val);
          if (cust) {
            custInput.value = cust.name;
            updateCustomerStatus(cust.name, val);
          } else {
            updateCustomerStatus(custInput.value.trim(), val);
          }
        }
      }, 200);
    });

    if (phoneDropdown) {
      phoneDropdown.addEventListener("click", function(e) {
        var item = e.target.closest(".sales-dropdown-item");
        if (!item) return;
        var ph = item.getAttribute("data-phone");
        var nm = item.getAttribute("data-name");
        phoneInput.value = ph;
        if (nm) custInput.value = nm;
        phoneDropdown.classList.add("hidden");
        updateCustomerStatus(nm, ph);
      });
    }
  })();

  /* Customer name search with dropdown */
  (function() {
    var custInput = qs("#salesCustomerName");
    var custDropdown = qs("#salesCustomerDropdown");
    if (!custInput || !custDropdown) return;

    custInput.addEventListener("input", function() {
      var val = custInput.value.trim().toLowerCase();
      if (val.length < 1) { custDropdown.classList.add("hidden"); updateCustomerStatus(""); return; }
      var names = getAllCustomerNames();
      var matches = names.filter(function(n) { return n.toLowerCase().indexOf(val) !== -1; }).slice(0, 10);
      if (matches.length === 0) { custDropdown.classList.add("hidden"); updateCustomerStatus(val); return; }
      custDropdown.innerHTML = matches.map(function(n) {
        return '<div class="sales-dropdown-item" data-name="' + n + '">' + n + '</div>';
      }).join("");
      custDropdown.classList.remove("hidden");
    });

    custInput.addEventListener("blur", function() {
      setTimeout(function() {
        custDropdown.classList.add("hidden");
        var ph = qs("#salesCustomerPhone").value.trim();
        updateCustomerStatus(custInput.value, ph);
      }, 200);
    });

    custDropdown.addEventListener("click", function(e) {
      var item = e.target.closest(".sales-dropdown-item");
      if (!item) return;
      var name = item.getAttribute("data-name");
      custInput.value = name;
      custDropdown.classList.add("hidden");
      var phone = findPhoneByCustomerName(name);
      if (phone) qs("#salesCustomerPhone").value = phone;
      updateCustomerStatus(name, phone);
    });
  })();

  /* Payment modal listeners */
  qs("#paymentForm")?.addEventListener("submit", function(e) {
    e.preventDefault();
    savePayment();
  });
  qs('[data-close-modal="paymentModal"]')?.addEventListener("click", closePaymentModal);
  qs("#paymentModal")?.addEventListener("click", function(e) {
    if (e.target === qs("#paymentModal")) closePaymentModal();
  });

  /* --- Init Sales Tab on switchTab --- */
  (function() {
    var origSwitchTab = switchTab;
    switchTab = function(tab) {
      origSwitchTab(tab);
      if (tab === "sales") {
        renderSalesBillsList();
      }
    };
  })();

  /* ---------- Init ---------- */
  initDefaultPasswordHash();

  if (isLoggedIn()) {
    var loginTime = parseInt(localStorage.getItem(LS.LOGIN_TIME) || "0", 10);
    if (Date.now() - loginTime > SESSION_TIMEOUT_MS) {
      setLoggedIn(false);
      showScreen("login");
    } else {
      startSessionTimer();
      showScreen("main");
      bootMainApp();
    }
  } else {
    showScreen("login");
  }
})();
