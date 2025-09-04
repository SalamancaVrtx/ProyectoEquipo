// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    // Seleccionar todos los elementos necesarios del DOM
    const numberButtons = document.querySelectorAll('.number');
    const operatorButtons = document.querySelectorAll('.operator');
    const equalsButton = document.getElementById('equals');
    const clearButton = document.getElementById('clear');
    const deleteButton = document.getElementById('delete');
    const previousOperandTextElement = document.getElementById('previous-operand');
    const currentOperandTextElement = document.getElementById('current-operand');

    let currentOperand = '0';
    let previousOperand = '';
    let operation = undefined;

    // Función para actualizar la pantalla
    function updateDisplay() {
        currentOperandTextElement.innerText = currentOperand;
        if (operation != null) {
            previousOperandTextElement.innerText = `${previousOperand} ${operation}`;
        } else {
            previousOperandTextElement.innerText = '';
        }
    }

    // Función para añadir un número
    function appendNumber(number) {
        if (number === '.' && currentOperand.includes('.')) return;
        if (currentOperand === '0' && number !== '.') {
            currentOperand = number;
        } else {
            currentOperand = currentOperand.toString() + number.toString();
        }
    }

    // Función para elegir un operador
    function chooseOperation(op) {
        if (currentOperand === '') return;
        if (previousOperand !== '') {
            compute();
        }
        operation = op;
        previousOperand = currentOperand;
        currentOperand = '';
    }

    // Función para realizar el cálculo
    function compute() {
        let computation;
        const prev = parseFloat(previousOperand);
        const current = parseFloat(currentOperand);
        if (isNaN(prev) || isNaN(current)) return;
        switch (operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '×':
                computation = prev * current;
                break;
            case '÷':
                if (current === 0) {
                    alert("No se puede dividir por cero.");
                    clear();
                    return;
                }
                computation = prev / current;
                break;
            default:
                return;
        }
        currentOperand = computation.toString();
        operation = undefined;
        previousOperand = '';
    }

    // Función para limpiar todo
    function clear() {
        currentOperand = '0';
        previousOperand = '';
        operation = undefined;
    }

    // Función para borrar el último dígito
    function deleteNumber() {
        currentOperand = currentOperand.toString().slice(0, -1);
        if (currentOperand === '') {
            currentOperand = '0';
        }
    }

    // Asignar eventos a los botones de números
    numberButtons.forEach(button => {
        button.addEventListener('click', () => {
            appendNumber(button.innerText);
            updateDisplay();
        });
    });

    // Asignar eventos a los botones de operadores
    operatorButtons.forEach(button => {
        button.addEventListener('click', () => {
            chooseOperation(button.dataset.operator);
            updateDisplay();
        });
    });

    // Asignar evento al botón de igual
    equalsButton.addEventListener('click', button => {
        compute();
        updateDisplay();
    });

    // Asignar evento al botón de limpiar
    clearButton.addEventListener('click', button => {
        clear();
        updateDisplay();
    });

    // Asignar evento al botón de borrar
    deleteButton.addEventListener('click', button => {
        deleteNumber();
        updateDisplay();
    });

    // Actualizar la pantalla al cargar
    updateDisplay();
});