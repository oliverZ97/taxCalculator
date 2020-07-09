//**************************************************************************************/
//**GET VALUES OF THE INPUT FIELDS******************************************************/
function getInputFromField(id) {
    let cleanInput = checkValidChars(document.getElementById(id).value);
    document.getElementById(id).value = cleanInput;
    return cleanInput
}

function getInputFromTax(id) {
    return document.getElementById(id).value;
}

//**************************************************************************************/
//**CHECK IF ONLY DIGITS OR DOT ARE USED************************************************/
function checkValidChars(input) {
    let regex = RegExp(/[a-zA-Z!\"§$%&\/\(\),]/g);
    if (regex.test(input)) {
        alert("Please Check your input only contains numbers or a dot")
        input = input.replace(",", ".");
        return setDecimalPlaces(input);
    } else {
        return setDecimalPlaces(input);
    }
}
//**************************************************************************************/
//**CHECK IF ONLY DIGITS OR DOT ARE USED************************************************/
function setDecimalPlaces(input) {
    let number;
    if(input.isNaN) {
        let str = input.replace("/[a-zA-Z!\"§$%&\/\(\),]/g", "");
        number = parseFloat(str).toFixed(2);
    } else {
        number = parseFloat(input).toFixed(2);
    }
    return setEUROSign(number);
}

function setEUROSign(number) {
    return number + " €";
}
//**************************************************************************************/
//**CALCULATE BRUTTO TAX****************************************************************/
function calculateBrutto(netto_id, tax_id, brutto_id) {
    let netto = getInputFromField(netto_id).replace(" €", "");
    let tax = getInputFromTax(tax_id);
    let brutto = parseFloat(netto);
    if(tax != "0") {
        brutto = parseFloat(netto) + parseFloat(((netto/100)*tax));
    }
    setBruttoToDisplayOnChange(brutto, brutto_id)
    calcResult()
}

//**CALCULATE NETTO TAX*****************************************************************/
function calculateNetto(netto_id, tax_id, brutto_id) {
    let brutto = getInputFromField(brutto_id).replace(" €", "");
    let tax = getInputFromTax(tax_id);
    let netto = parseFloat(brutto);
    if(tax != 0){
        taxVal = (100 + parseFloat(tax))/100
        netto = (brutto/taxVal);
    } 
    setNettoToDisplayOnChange(netto, netto_id)
    calcResult()
}

//**************************************************************************************/
//**CHECK IF NETTO OR BRUTTO FIELD NEEDS TO BE FILLED***********************************/
function checkNettoOrBrutto(netto_id, tax_id, brutto_id) {
    console.log("Netto " + netto_id);
    console.log("Tax " + tax_id);
    console.log("Brutto " + brutto_id);
    if(document.getElementById(netto_id).value === ""){
        if(document.getElementById(brutto_id).value !== ""){
            calculateNetto(netto_id, tax_id, brutto_id)
        }
    } else {
        calculateBrutto(netto_id, tax_id, brutto_id)
    }
}

//**SET BRUTTO TO DISPLAY***************************************************************/
function setBruttoToDisplayOnChange(brutto, brutto_id) {
    document.getElementById(brutto_id).value = setDecimalPlaces(brutto);
}

//**SET NETTO TO DISPLAY****************************************************************/
function setNettoToDisplayOnChange(netto, netto_id) {
    document.getElementById(netto_id).value = setDecimalPlaces(netto);
}

//**************************************************************************************/
//**CREATE AND SET INPUT FIELDS*********************************************************/
function createInputFormula() {
    let content = document.getElementById("content");
    let index = content.childElementCount;
    let numberOfGroups = 1
    if(!content.hasChildNodes()){
        numberOfGroups = 3
    }
    for (let i = 0; i < numberOfGroups; i++) {
        index ++;
        let actual = index;
        let container = document.createElement("div");
        let nettoInput = document.createElement("input");
        let taxDropdown = document.createElement("select");
        let bruttoInput = document.createElement("input");
        let bruttoContainer = document.createElement("div")
        let resetFields = document.createElement("button");

        //create Options for SelectTag
        let taxZero = document.createElement("option");
        let taxSeven = document.createElement("option");
        let taxNineteen = document.createElement("option");

        //add container attributes
        container.setAttribute("id", "container_" + actual);
        container.setAttribute("class", "container");

        //add nettoInput attributes
        nettoInput.setAttribute("id", "nettoInput_" + actual);
        nettoInput.setAttribute("placeholder", "Netto");
        nettoInput.setAttribute("type", "text");
        //nettoInput.setAttribute("pattern", "[0-9.]+")
        nettoInput.onchange = () => { checkNettoOrBrutto("nettoInput_" + actual, "taxType" + actual, "bruttoInput_" + actual) };

        //add taxDropdown attributes
        taxDropdown.setAttribute("id", "taxType" + actual);
        taxDropdown.setAttribute("class", "taxSelect");
        taxDropdown.setAttribute("name", "taxType");
        taxDropdown.onchange = () => { checkNettoOrBrutto("nettoInput_" + actual, "taxType" + actual, "bruttoInput_" + actual) };

        //add bruttoInput attributes
        bruttoInput.setAttribute("id", "bruttoInput_" + actual);
        bruttoInput.setAttribute("placeholder", "Brutto");
        bruttoInput.setAttribute("type", "text");
        //bruttoInput.setAttribute("pattern", "[0-9.]+")
        bruttoInput.onchange = () => { checkNettoOrBrutto("nettoInput_" + actual, "taxType" + actual, "bruttoInput_" + actual) };

        //add resetFieldButton attributes
        resetFields.textContent = "Reset"
        resetFields.setAttribute("id", "reset_" + actual);
        resetFields.onclick = () => {
            resetFieldsInContainer("container_" + actual)
        }

        //add option attributes
        taxZero.setAttribute("value", "0");
        taxZero.text = "0%";
        taxSeven.setAttribute("value", "7");
        taxSeven.text = "7%";
        taxNineteen.setAttribute("value", "19");
        taxNineteen.text = "19%"

        //append options to dropdown
        taxDropdown.appendChild(taxZero);
        taxDropdown.appendChild(taxSeven);
        taxDropdown.appendChild(taxNineteen);

        //append fields to container
        bruttoContainer.appendChild(bruttoInput);
        bruttoContainer.appendChild(resetFields);
        container.appendChild(nettoInput);
        container.appendChild(taxDropdown);
        container.appendChild(bruttoContainer);

        //add container to content
        content.appendChild(container);
    }
}

//**************************************************************************************/
//**CALCULATE THE TOTAL RESULTS*********************************************************/
function calcResult() {
    let netTotal = 0;
    let brutTotal = 0;
    let inputFields = Object.values(document.getElementsByTagName("input"));
    inputFields.forEach(element => {
        let value;
        if(element.value === "") {
            value = 0;
        } else {
            value = parseFloat(element.value)
        }
        if(element.placeholder === "Netto"){
            netTotal += value
        } else {
            brutTotal += value
        }
    });
    let taxTotal = (brutTotal - netTotal).toFixed(2);
    netTotal = netTotal.toFixed(2);
    brutTotal = brutTotal.toFixed(2);
    setTotalToTextFields(brutTotal, netTotal, taxTotal)
}

//**************************************************************************************/
//**SET TOTALS TO TEXT FIELDS***********************************************************/
function setTotalToTextFields(brutTotal, netTotal, taxTotal) {
    document.getElementById("netTotal").innerHTML = netTotal + " €";
    document.getElementById("taxTotal").innerHTML = taxTotal + " €";
    document.getElementById("brutTotal").innerHTML = brutTotal + " €";
}

//**************************************************************************************/
//**RESET INPUT OF FIELDS FROM ONE CONTAINER********************************************/
function resetFieldsInContainer(containerId){
    let fields = Object.values(document.getElementById(containerId).children);
    fields.forEach((element) => {
        switch(element.tagName) {
            case "INPUT": 
                element.value = "";
                break;
            case "SELECT": 
                element.selectedIndex = 0;
                break;
            case "DIV":
                Object.values(element.children)[0].value = "";
                break;
        }
    })
    calcResult();
}