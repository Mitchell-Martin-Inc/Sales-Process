const defaults = {
  workerType: "W2",
  payRate: 50,
  billRate: 75,
  ownership: 100,
  targetGm: 21,
  hoursPerWeek: 40,
  roleCount: 1,
  volumeEnabled: false,
  volumeThreshold: 3,
  volumeDiscount: 2,
};

const commissionRates = [0.08, 0.1, 0.12, 0.14, 0.16, 0.18];

const form = document.querySelector("#calculatorForm");
const fields = {
  payRate: document.querySelector("#payRate"),
  billRate: document.querySelector("#billRate"),
  ownership: document.querySelector("#ownership"),
  targetGm: document.querySelector("#targetGm"),
  hoursPerWeek: document.querySelector("#hoursPerWeek"),
  roleCount: document.querySelector("#roleCount"),
  volumeEnabled: document.querySelector("#volumeEnabled"),
  volumeThreshold: document.querySelector("#volumeThreshold"),
  volumeDiscount: document.querySelector("#volumeDiscount"),
};

const outputs = {
  grossMarginCard: document.querySelector("#grossMarginCard"),
  grossMargin: document.querySelector("#grossMargin"),
  grossMarginPercent: document.querySelector("#grossMarginPercent"),
  effectiveBill: document.querySelector("#effectiveBill"),
  volumeNote: document.querySelector("#volumeNote"),
  monthlyGm: document.querySelector("#monthlyGm"),
  monthlyHoursLabel: document.querySelector("#monthlyHoursLabel"),
  requiredBill: document.querySelector("#requiredBill"),
  workerCostLabel: document.querySelector("#workerCostLabel"),
  loadedCost: document.querySelector("#loadedCost"),
  markup: document.querySelector("#markup"),
  weeklyGm: document.querySelector("#weeklyGm"),
  dailyGm: document.querySelector("#dailyGm"),
  maxPay: document.querySelector("#maxPay"),
  billGap: document.querySelector("#billGap"),
  targetSolverNote: document.querySelector("#targetSolverNote"),
  targetPayRate: document.querySelector("#targetPayRate"),
  targetBillRate: document.querySelector("#targetBillRate"),
  commissionBase: document.querySelector("#commissionBase"),
  commissionGrid: document.querySelector("#commissionGrid"),
  adviceSummary: document.querySelector("#adviceSummary"),
  gmAdviceTitle: document.querySelector("#gmAdviceTitle"),
  gmAdviceBody: document.querySelector("#gmAdviceBody"),
};

function value(id) {
  return Number(fields[id].value) || 0;
}

function currency(amount, decimals = 0) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(Number.isFinite(amount) ? amount : 0);
}

function percent(rate, decimals = 1) {
  return `${((Number.isFinite(rate) ? rate : 0) * 100).toFixed(decimals)}%`;
}

function getWorkerType() {
  return new FormData(form).get("workerType") || defaults.workerType;
}

function loadedCost(workerType, payRate) {
  if (workerType === "W2") {
    return payRate * 1.155 + 1.5;
  }
  return payRate + 1.5;
}

function maxPayAtTarget(workerType, billRate, targetRate) {
  if (targetRate >= 1) return 0;
  if (workerType === "W2") {
    return (billRate * (1 - targetRate) - 1.5) / 1.155;
  }
  return billRate * (1 - targetRate) - 1.5;
}

function requiredBillAtTarget(workerType, payRate, targetRate) {
  if (targetRate >= 1) return 0;
  const cost = loadedCost(workerType, payRate);
  return cost / (1 - targetRate);
}

function effectiveBillFromInputs() {
  const workerType = getWorkerType();
  const baseBillRate = value("billRate");
  const roleCount = Math.max(Math.floor(value("roleCount")), 1);
  const threshold = Math.max(Math.floor(value("volumeThreshold")), 2);
  const requestedDiscount = Math.min(Math.max(value("volumeDiscount"), 0), 60) / 100;
  const volumeApplies = fields.volumeEnabled.checked && roleCount >= threshold;
  return {
    workerType,
    effectiveBill: baseBillRate * (1 - (volumeApplies ? requestedDiscount : 0)),
  };
}

function syncPayRateToTarget() {
  const { workerType, effectiveBill } = effectiveBillFromInputs();
  const targetRate = Math.min(Math.max(value("targetGm"), 0), 95) / 100;
  const payAtTarget = Math.max(maxPayAtTarget(workerType, effectiveBill, targetRate), 0);
  fields.payRate.value = payAtTarget.toFixed(2);
}

function setText(element, text) {
  element.textContent = text;
}

function buildGmAdvice(metrics) {
  const {
    baseBillRate,
    effectiveBill,
    cost,
    targetRate,
    gmHourly,
    gmRate,
    monthlyGm,
    monthlyHours,
    roleCount,
    ownership,
    billDiscount,
    listBillForTarget,
  } = metrics;
  const minimumRate = 0.2;
  const floorGmHourly = effectiveBill * minimumRate;
  const monthlyGmGapToFloor = Math.max((floorGmHourly - gmHourly) * monthlyHours * roleCount, 0);
  const monthlyGmGapToTarget = Math.max((effectiveBill * targetRate - gmHourly) * monthlyHours * roleCount, 0);
  const midpointCommissionLoss = monthlyGmGapToFloor * 0.12 * ownership;
  const hourlyBillToFloor = cost / (1 - minimumRate);
  const listBillToFloor = billDiscount < 1 ? hourlyBillToFloor / (1 - billDiscount) : hourlyBillToFloor;
  const billLiftToFloor = Math.max(listBillToFloor - baseBillRate, 0);

  if (gmRate < minimumRate) {
    return {
      tone: "warning",
      summary: "GM needs attention",
      title: `${percent(gmRate)} GM leaves ${currency(monthlyGmGapToFloor)} monthly GM on the table.`,
      body: `At a 12% commission rate, that is about ${currency(midpointCommissionLoss)} less commission per month. Lift bill by ${currency(billLiftToFloor, 2)}/hr, reduce pay, or trim the volume discount to get back to 20%.`,
    };
  }

  if (targetRate < minimumRate) {
    return {
      tone: "opportunity",
      summary: "Low target GM",
      title: `${percent(gmRate)} GM clears your target, but the target is below 20%.`,
      body: `Use 20% as the first checkpoint before approving the deal. At the current rates, monthly GM is ${currency(monthlyGm)} across ${roleCount} role${roleCount === 1 ? "" : "s"}.`,
    };
  }

  if (gmRate < targetRate) {
    return {
      tone: "warning",
      summary: "Below target GM",
      title: `The deal is ${percent(targetRate - gmRate)} under the target GM.`,
      body: `To hit the selected target after any volume discount, list bill should be about ${currency(listBillForTarget, 2)}/hr. The monthly GM gap is ${currency(monthlyGmGapToTarget)}.`,
    };
  }

  return {
    tone: "good",
    summary: "GM looks healthy",
    title: `${percent(gmRate)} GM clears the ${percent(targetRate)} target.`,
    body: `The current setup produces ${currency(monthlyGm)} in monthly GM across ${roleCount} role${roleCount === 1 ? "" : "s"}. Keep any volume discount tied to enough role volume so GM stays above 20%.`,
  };
}

function renderGmAdvice(advice) {
  const guidance = document.querySelector(".gm-guidance");
  setText(outputs.adviceSummary, advice.summary);
  setText(outputs.gmAdviceTitle, advice.title);
  setText(outputs.gmAdviceBody, advice.body);
  guidance.classList.toggle("is-warning", advice.tone === "warning");
  guidance.classList.toggle("is-opportunity", advice.tone === "opportunity");
  guidance.classList.toggle("is-good", advice.tone === "good");
}

function calculate() {
  const workerType = getWorkerType();
  const payRate = value("payRate");
  const baseBillRate = value("billRate");
  const ownership = Math.min(Math.max(value("ownership"), 0), 100) / 100;
  const targetRate = Math.min(Math.max(value("targetGm"), 0), 95) / 100;
  const hoursPerWeek = Math.max(value("hoursPerWeek"), 1);
  const roleCount = Math.max(Math.floor(value("roleCount")), 1);
  const threshold = Math.max(Math.floor(value("volumeThreshold")), 2);
  const requestedDiscount = Math.min(Math.max(value("volumeDiscount"), 0), 60) / 100;
  const volumeApplies = fields.volumeEnabled.checked && roleCount >= threshold;
  const billDiscount = volumeApplies ? requestedDiscount : 0;
  const effectiveBill = baseBillRate * (1 - billDiscount);
  const cost = loadedCost(workerType, payRate);
  const gmHourly = effectiveBill - cost;
  const gmRate = effectiveBill > 0 ? gmHourly / effectiveBill : 0;
  const markup = payRate > 0 ? (effectiveBill - payRate) / payRate : 0;
  const dailyHours = Math.min(hoursPerWeek / 5, 24);
  const monthlyHours = hoursPerWeek * 4;
  const weeklyGm = gmHourly * hoursPerWeek * roleCount;
  const dailyGm = gmHourly * dailyHours * roleCount;
  const monthlyGm = gmHourly * monthlyHours * roleCount;
  const requiredBill = requiredBillAtTarget(workerType, payRate, targetRate);
  const listBillForTarget = billDiscount < 1 ? requiredBill / (1 - billDiscount) : 0;
  const maxPay = maxPayAtTarget(workerType, effectiveBill, targetRate);
  const billGap = effectiveBill - requiredBill;

  setText(outputs.grossMargin, `${currency(gmHourly, 2)}/hr`);
  setText(outputs.grossMarginPercent, percent(gmRate));
  setText(outputs.effectiveBill, `${currency(effectiveBill, 2)}/hr`);
  setText(outputs.monthlyGm, currency(monthlyGm));
  setText(outputs.requiredBill, `${currency(listBillForTarget, 2)}/hr`);
  setText(outputs.monthlyHoursLabel, `${monthlyHours.toLocaleString()} hours / role`);
  setText(outputs.loadedCost, `${currency(cost, 2)}/hr`);
  setText(outputs.markup, percent(markup));
  setText(outputs.weeklyGm, currency(weeklyGm));
  setText(outputs.dailyGm, currency(dailyGm));
  setText(outputs.maxPay, `${currency(maxPay, 2)}/hr`);
  setText(outputs.billGap, `${currency(billGap, 2)}/hr`);
  setText(outputs.targetSolverNote, `${percent(targetRate)} target GM`);
  setText(outputs.targetPayRate, `${currency(maxPay, 2)}/hr`);
  setText(outputs.targetBillRate, `${currency(listBillForTarget, 2)}/hr`);
  setText(outputs.workerCostLabel, workerType === "W2" ? "W2 cost: 15.5% + $1.50" : "Corp cost: pay + $1.50");
  setText(outputs.commissionBase, `${currency(monthlyGm)} monthly GM basis`);

  if (volumeApplies) {
    setText(outputs.volumeNote, `${percent(billDiscount, 2)} off list bill for ${roleCount} roles`);
  } else if (fields.volumeEnabled.checked) {
    setText(outputs.volumeNote, `Volume starts at ${threshold} roles`);
  } else {
    setText(outputs.volumeNote, "No volume adjustment");
  }

  const ragStatus =
    gmRate < 0.18
      ? { card: "gm-rag-red", pill: "is-low", text: "Red GM" }
      : gmRate < 0.2
        ? { card: "gm-rag-orange", pill: "is-warning", text: "Orange GM" }
        : { card: "gm-rag-green", pill: "is-good", text: "Green GM" };

  outputs.grossMarginCard.classList.toggle("gm-rag-red", ragStatus.card === "gm-rag-red");
  outputs.grossMarginCard.classList.toggle("gm-rag-orange", ragStatus.card === "gm-rag-orange");
  outputs.grossMarginCard.classList.toggle("gm-rag-green", ragStatus.card === "gm-rag-green");

  outputs.commissionGrid.replaceChildren(
    ...commissionRates.map((rate) => {
      const card = document.createElement("article");
      card.className = "commission-card";

      const label = document.createElement("span");
      label.textContent = percent(rate, 0);

      const amount = document.createElement("strong");
      amount.textContent = currency(monthlyGm * rate * ownership);

      const weekly = document.createElement("small");
      weekly.textContent = `${currency(weeklyGm * rate * ownership)} weekly`;

      card.append(label, amount, weekly);
      return card;
    }),
  );

  const gmAdvice = buildGmAdvice({
    baseBillRate,
    effectiveBill,
    cost,
    targetRate,
    gmHourly,
    gmRate,
    monthlyGm,
    monthlyHours,
    roleCount,
    ownership,
    billDiscount,
    volumeApplies,
    requiredBill,
    listBillForTarget,
    maxPay,
  });
  renderGmAdvice(gmAdvice);
}

function reset() {
  for (const [key, defaultValue] of Object.entries(defaults)) {
    if (key === "workerType") continue;
    if (key === "volumeEnabled") {
      fields[key].checked = defaultValue;
    } else {
      fields[key].value = defaultValue;
    }
  }

  document.querySelectorAll('input[name="workerType"]').forEach((input) => {
    input.checked = input.value === defaults.workerType;
  });

  syncPayRateToTarget();
  calculate();
}

form.addEventListener("input", (event) => {
  if (
    event.target.matches(
      "#billRate, #targetGm, #roleCount, #volumeEnabled, #volumeThreshold, #volumeDiscount, input[name='workerType']",
    )
  ) {
    syncPayRateToTarget();
  }
  calculate();
});
document.querySelector("#resetButton").addEventListener("click", reset);
calculate();
