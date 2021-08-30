const inputBill = document.querySelector("#inputBill");
const inputPerson = document.querySelector("#inputPerson");
const radioBoxes = document.querySelectorAll(".radioBox");
const customEntry = document.querySelector("#customEntry");
const inputBillErrorMsg = document.querySelector("#inputBillErrorMsg");
const inputPersonErrorMsg = document.querySelector("#inputPersonErrorMsg");

const resultTip = document.querySelector("#resultTip");
const resultTotal = document.querySelector("#resultTotal");
const btnReset = document.querySelector("#btnReset");

function checkBillInput() {
  let regexn = "^[0-9]{0,5}([.][0-9]{2,2})?$";

  if (inputBill.value.match(regexn)) {
    inputBill.classList.remove("error");
    inputBillErrorMsg.style.display = "none";
    checkInputsForCalculation();
  } else {
    inputBill.classList.add("error");
    inputBillErrorMsg.style.display = "inline-block";
  }
}

function checkPersonInput() {
  if (
    !isNaN(inputPerson.value) &&
    inputPerson.value >= 1 &&
    inputPerson.value <= 99
  ) {
    inputPerson.classList.remove("error");
    inputPersonErrorMsg.style.display = "none";
    checkInputsForCalculation();
  } else {
    inputPerson.classList.add("error");
    inputPersonErrorMsg.style.display = "inline-block";
  }
}

function customEntryHandler() {
  resetRadioBoxes();
  if (
    !isNaN(customEntry.value) &&
    customEntry.value >= 1 &&
    customEntry.value <= 99
  ) {
    checkInputsForCalculation();
  } else {
    customEntry.value = "error";
  }
}

function checkInputsForCalculation() {
  if (
    !inputBill.value == "" &&
    !inputBill.classList.contains("error") &&
    !inputPerson.value == "" &&
    !inputPerson.classList.contains("error")
  ) {
    let tip = 0;
    radioBoxes.forEach((box) => {
      if (box.children[0].checked == true) {
        tip = box.children[0].value;
      }
    });

    if (tip == 0) {
      tip = customEntry.value;
    }
    let bill = inputBill.value;
    let person = inputPerson.value;
    calculateResult(bill, person, tip);
  }
}

function calculateResult(bill, people, tip) {
  bill = parseFloat(bill);
  people = parseInt(people);
  tip = parseInt(tip);

  let tipCalc = ((bill / people) * tip) / 100;

  let totalCalc = bill / people + tipCalc;

  console.log("Calculation tip: " + tipCalc);
  console.log(" Calculation Total: " + totalCalc);

  resultTip.innerText = tipCalc.toLocaleString("de-DE", {
    maximumFractionDigits: 2, minimumFractionDigits: 2
  });

  resultTotal.innerText = totalCalc.toLocaleString("de-DE", {
    maximumFractionDigits: 2, minimumFractionDigits: 2
  });
}

function resetApp() {
  inputBill.value = "";
  inputPerson.value = "";
  customEntry.value = "";
  resetRadioBoxes();
  resultTip.innerText = "0.00";
  resultTotal.innerText = "0.00";
}


function resetRadioBoxes() {
  radioBoxes.forEach((box) => (box.children[0].checked = false));
}

function resetCustomField() {
  customEntry.value = "";
  console.log("1");
  checkInputsForCalculation();
}


function init() {
  btnReset.addEventListener("click", resetApp);
  radioBoxes.forEach((box) => {
    box.addEventListener("change", resetCustomField);
  });
  inputBill.addEventListener("blur", checkBillInput);
  inputPerson.addEventListener("blur", checkPersonInput);
  customEntry.addEventListener("focus", customEntryHandler);
  customEntry.addEventListener("blur", customEntryHandler);
}

window.onload = init();
