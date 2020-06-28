//**************************************************************************************/
//**GET VALUES OF THE INPUT FIELDS******************************************************/
function getInputFromNetto(id) {
    return document.getElementById(id).value;
}

function getInputFromTax(id) {
    return document.getElementById(id).value;
}
//**************************************************************************************/
//**CALCULATE BRUTTO TAX****************************************************************/
function calculateBrutto(netto_id, tax_id) {
    let netto = getInputFromNetto(netto_id);
    let tax = getInputFromTax(tax_id);
    let brutto = parseFloat(netto);
    if(tax != "0") {
        brutto = parseFloat(netto) + parseFloat(((netto/100)*tax).toFixed(2))
    }
    console.log("brutto", brutto);
}
function createInputFormula(number) {
    let content = document.getElementById("content");
    let numberOfGroups = number
    for (let i = 0; i < numberOfGroups; i++) {
        let container = document.createElement("div");
        let nettoInput = document.createElement("input");
        let taxDropdown = document.createElement("select");
        let bruttoInput = document.createElement("input");

        //create Options for SelectTag
        let taxZero = document.createElement("option");
        let taxSeven = document.createElement("option");
        let taxNineteen = document.createElement("option");

        //add container attributes
        container.setAttribute("id", "container_" + i);

        //add nettoInput attributes
        nettoInput.setAttribute("id", "nettoInput_" + i);
        nettoInput.setAttribute("placeholder", "Netto");
        nettoInput.setAttribute("type", "text");
        nettoInput.onchange = () => { calculateBrutto("nettoInput_" + i, "taxType" + i) };

        //add taxDropdown attributes
        taxDropdown.setAttribute("id", "taxType" + i);
        taxDropdown.setAttribute("name", "taxType");
        taxDropdown.onchange = () => { calculateBrutto("nettoInput_" + i, "taxType" + i) };


        //add bruttoInput attributes
        bruttoInput.setAttribute("id", "bruttoInput_" + i);
        bruttoInput.setAttribute("placeholder", "Brutto");
        bruttoInput.setAttribute("type", "text");

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
        container.appendChild(nettoInput);
        container.appendChild(taxDropdown);
        container.appendChild(bruttoInput);

        //add container to content
        content.appendChild(container);
    }
}