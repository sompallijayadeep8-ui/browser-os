export function createCalculator() {
      const calculator = document.createElement("div");

     
    
      calculator.className = "calculator";

    calculator.innerHTML = `

     <div class="calculator-display">
    <input type="text" readonly value="0">
    </div>

    <div class="calculator-buttons">

   </div>
    
    `;

     const buttonContainer = calculator.querySelector(".calculator-buttons"); // Fill in the blank
      const operators = ["+", "-", "×", "÷", "="];
       const actions = ["AC", "⌫", "%"];
      const buttons = [
     "AC", "⌫", "%", "÷",
     "7", "8", "9", "×",
     "4", "5", "6", "-",
     "1", "2", "3", "+",
     "0", ".", "="
];

 

     for(const button of buttons){
       const btn =  document.createElement("button")

        btn.textContent = button

          if(operators.includes(button)){
        btn.classList.add("operator");
    }

    if(actions.includes(button)){
        btn.classList.add("action");
    }

        buttonContainer.appendChild(btn)
     }

      const equalButton = [...buttonContainer.children].find(
      button => button.textContent === "="
);

equalButton.style.gridRow = "span 2";

   const zeroButton = [...buttonContainer.children].find(
    button => button.textContent === "0"
);

zeroButton.style.gridColumn = "span 2";

     const display = calculator.querySelector("input");
     buttonContainer.addEventListener("click",function(event){
   if (event.target.tagName !== "BUTTON") return;

    const value = event.target.textContent;

   switch (value) {

        case "AC":
            display.value = "0";
            break;

        case "⌫":
            if (display.value.length > 1) {
                display.value = display.value.slice(0, -1);
            } else {
                display.value = "0";
            }
            break;

        case "=":
            try {

                const expression = display.value
                    .replace(/×/g, "*")
                    .replace(/÷/g, "/");

                display.value = String(eval(expression));

            } catch {

                display.value = "Error";

            }
            break;

       default: {

  
    const lastChar = display.value.slice(-1);

    // Prevent operator as first character
    if (display.value === "0" && operators.includes(value)) {
        return;
    }

    // Prevent two operators together
    if (operators.includes(lastChar) && operators.includes(value)) {
        return;
    }

    // Prevent multiple decimal points in the current number
    if (value === ".") {

        const parts = display.value.split(/[+\-×÷%]/);

        if (parts[parts.length - 1].includes(".")) {
            return;
        }

    }

    if (display.value === "0" || display.value === "Error") {
        display.value = value;
    } else {
        display.value += value;
    }

}

    }
    
});

  document.addEventListener("keydown", function (event) {

    const key = event.key;

    const allowed = [

        "0","1","2","3","4","5","6","7","8","9",
        "+","-","*","/",".",
        "Backspace",
        "Enter",
        "Escape",
        "%"
    ];

    if (!allowed.includes(key)) return;

    if (key === "Enter") {

        buttonContainer.querySelector("button:last-child").click();
        return;

    }

    if (key === "Escape") {

        buttonContainer.querySelector("button").click();
        return;

    }

    if (key === "Backspace") {

        buttonContainer.querySelector("button:nth-child(2)").click();
        return;

    }

    const map = {
        "*":"×",
        "/":"÷"
    };

    const value = map[key] || key;

    const btn = [...buttonContainer.children].find(
        button => button.textContent === value
    );

    if (btn) btn.click();

});



 return calculator;

}