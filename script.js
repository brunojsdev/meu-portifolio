/**

 * Linguagens: JavaScript
 */

// --- NAVEGAÇÃO ---
function showSection(sectionId) {
    document.querySelectorAll('.section-container').forEach(sec => {
        sec.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
    window.scrollTo(0, 0);
}

// --- WIDGETS EXPANSÍVEIS ---
function toggleWidget(element) {
    if (element.classList.contains('collapsed')) {
        element.classList.remove('collapsed');
        element.classList.add('expanded');
    } else {
        element.classList.add('collapsed');
        element.classList.remove('expanded');
    }
}

// --- RELÓGIO DIGITAL ---
function startClock() {
    const clockEl = document.getElementById('digital-clock');
    if (!clockEl) return;
    setInterval(() => {
        const now = new Date();
        clockEl.innerText = now.toLocaleTimeString('pt-BR');
    }, 1000);
}
startClock();

// --- CALCULADORA ---
let calcExpression = '';
const calcDisplay = document.getElementById('calc-display');

function calcAppend(val) {
    calcExpression += val;
    calcDisplay.innerText = calcExpression;
}

function calcClear() {
    calcExpression = '';
    calcDisplay.innerText = '0';
}

function calcEqual() {
    try {
        // Sanitização básica para segurança
        if (/^[0-9+\-*/.]+$/.test(calcExpression)) {
            const result = eval(calcExpression);
            calcDisplay.innerText = result;
            calcExpression = result.toString();
        } else {
            calcDisplay.innerText = 'Erro';
            calcExpression = '';
        }
    } catch (e) {
        calcDisplay.innerText = 'Erro';
        calcExpression = '';
    }
}

// --- LISTA DE TAREFAS ---
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

function addTodo() {
    const text = todoInput.value;
    if (text.trim() === '') return;

    const li = document.createElement('li');
    li.innerHTML = `
        <span class="todo-item-text">${text}</span>
        <div class="todo-actions">
            <span class="todo-check" onclick="markDone(this)">✔</span>
            <span class="todo-delete" onclick="deleteTask(this)">✖</span>
        </div>
    `;
    todoList.appendChild(li);
    todoInput.value = '';
}

function deleteTask(element) {
    element.closest('li').remove();
}

function markDone(element) {
    const text = element.closest('li').querySelector('.todo-item-text');
    text.style.textDecoration = text.style.textDecoration === 'line-through' ? 'none' : 'line-through';
}

// Adicionar tarefa com a tecla Enter
if (todoInput) {
    todoInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.stopPropagation();
            addTodo();
        }
    });
}

// --- CLIMA (SIMULADO) ---
function updateWeather() {
    const display = document.getElementById('weather-display');
    display.innerHTML = '<div style="padding: 20px;">Buscando...</div>';
    
    setTimeout(() => {
        display.innerHTML = `
            <div style="font-size: 3rem;">🌦</div>
            <div class="weather-temp">22°C</div>
            <div class="weather-city">São Bernardo do Campo</div>
            <button class="weather-btn" onclick="event.stopPropagation(); updateWeather()">Atualizar</button>
        `;
    }, 800);
}