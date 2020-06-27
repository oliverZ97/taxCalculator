//**************************************************************************************/
//**GET VALUES OF THE INPUT FIELDS******************************************************/
function getInputFromNetto(id) {
    let value = document.getElementById(id).value;
    console.log(value)
}

function getInputFromTax(id) {
    let value = document.getElementById(id).value;
    console.log(value)
}
//**************************************************************************************/

function createInputFormula(number) {
    let content = document.getElementById("content");
    let numberOfGroups = number
    for(let i = 0; i < numberOfGroups; i++){
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
        nettoInput.setAttribute("id" ,"nettoInput_" + i);
        nettoInput.setAttribute("placeholder", "Netto");
        nettoInput.setAttribute("type", "text");
        nettoInput.onchange = "getInputFromNetto(\"nettoInput_\" + i)";

        //add taxDropdown attributes
        taxDropdown.setAttribute("id", "taxType" + i);
        taxDropdown.setAttribute("name", "taxType");
        taxDropdown.onchange = "getInputFromTax(\"taxType\" + i)";

        //add bruttoInput attributes
        bruttoInput.setAttribute("id", "bruttoInput_"+ i);
        bruttoInput.setAttribute("placeholder", "Brutto");
        bruttoInput.setAttribute("type", "text");

        //add option attributes
        taxZero.setAttribute("value", "zero");
        taxZero.text = "0%";
        taxSeven.setAttribute("value", "seven");
        taxSeven.text = "7%";
        taxNineteen.setAttribute("value", "nineteen");
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