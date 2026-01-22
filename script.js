// CONTROLE DE NAVEGAÇÃO
const homeView = document.getElementById("home-view");
const appWrapper = document.getElementById("app-wrapper");
const appTitle = document.getElementById("app-title");
const appIconContainer = document.getElementById("app-icon-container");
const apps = ["calculator", "clock", "todo", "weather"];

const appMeta = {
  calculator: { title: "Calculadora Pro", color: "bg-purple-600", icon: "fa-calculator" },
  clock: { title: "Relógio Global", color: "bg-sky-600", icon: "fa-clock" },
  todo: { title: "Task Manager", color: "bg-emerald-700", icon: "fa-tasks" },
  weather: { title: "Weather API", color: "bg-blue-500", icon: "fa-cloud-moon" }
};

function toggleSection(sectionId) {
  closeOverlay();
  const section = document.getElementById(sectionId + "-section");
  if (section) section.classList.remove("hidden");
}

function closeOverlay() {
  document.getElementById("about-section").classList.add("hidden");
  document.getElementById("projects-section").classList.add("hidden");
}

function openApp(appName) {
  homeView.classList.add("hidden");
  appWrapper.classList.remove("hidden");
  
  apps.forEach(app => document.getElementById("app-" + app).classList.add("hidden"));
  document.getElementById("app-" + appName).classList.remove("hidden");

  const meta = appMeta[appName];
  appTitle.innerText = meta.title;
  appIconContainer.className = `w-10 h-10 rounded-lg flex items-center justify-center text-white ${meta.color}`;
  appIconContainer.innerHTML = `<i class="fas ${meta.icon}"></i>`;

  if (appName === "clock") startClock();
  if (appName === "todo") renderTodos();
  if (appName === "weather") updateWeather();
}

function closeApp() {
  appWrapper.classList.add("hidden");
  homeView.classList.remove("hidden");
}

// CALCULADORA
let calcDisplay = document.getElementById("calc-display");
function calcInput(val) {
  const lastChar = calcDisplay.value.slice(-1);
  if (["+", "-", "*", "/", "."].includes(val) && ["+", "-", "*", "/", "."].includes(lastChar)) return;
  calcDisplay.value += val;
}
function calcClear() { calcDisplay.value = ""; }
function calcDelete() { calcDisplay.value = calcDisplay.value.slice(0, -1); }
function calcResult() {
  try {
    if (calcDisplay.value) calcDisplay.value = eval(calcDisplay.value);
  } catch {
    calcDisplay.value = "ERR";
    setTimeout(calcClear, 800);
  }
}

// RELÓGIO
let clockInterval;
function startClock() {
  if(clockInterval) clearInterval(clockInterval);
  function update() {
    const now = new Date();
    document.getElementById("clock-time").innerText = now.toLocaleTimeString("pt-BR", { hour: '2-digit', minute: '2-digit' });
    document.getElementById("clock-date").innerText = now.toLocaleDateString("pt-BR", { weekday: 'long', day: 'numeric', month: 'long' });
  }
  update();
  clockInterval = setInterval(update, 1000);
}

// TAREFAS
let todos = JSON.parse(localStorage.getItem("bruno_pro_todos")) || [{ text: "Finalizar Portfólio", done: true }];
function saveTodos() {
  localStorage.setItem("bruno_pro_todos", JSON.stringify(todos));
  renderTodos();
}
function addTodo() {
  const input = document.getElementById("todo-input");
  if (input.value.trim()) {
    todos.push({ text: input.value.trim(), done: false });
    input.value = "";
    saveTodos();
  }
}
function toggleTodo(index) { todos[index].done = !todos[index].done; saveTodos(); }
function deleteTodo(index) { todos.splice(index, 1); saveTodos(); }
function renderTodos() {
  const list = document.getElementById("todo-list");
  list.innerHTML = "";
  todos.forEach((todo, index) => {
    const li = document.createElement("li");
    li.className = "flex items-center gap-4 p-4 bg-black/40 rounded-2xl border border-slate-800 transition";
    li.innerHTML = `
      <button onclick="toggleTodo(${index})" class="text-2xl ${todo.done ? "text-emerald-500" : "text-slate-700"}">
        <i class="fas ${todo.done ? "fa-check-square" : "fa-square"}"></i>
      </button>
      <span class="flex-grow ${todo.done ? "line-through text-slate-600" : "text-white"} font-medium">${todo.text}</span>
      <button onclick="deleteTodo(${index})" class="text-slate-600 hover:text-red-500 transition px-2"><i class="fas fa-trash-alt"></i></button>
    `;
    list.appendChild(li);
  });
}

// WEATHER
async function updateWeather() {
  const tempEl = document.getElementById("weather-temp");
  const windEl = document.getElementById("weather-wind");
  tempEl.innerText = "--°";
  try {
    const res = await fetch("https://api.open-meteo.com/v1/forecast?latitude=-23.55&longitude=-46.63&current_weather=true");
    const data = await res.json();
    tempEl.innerText = Math.round(data.current_weather.temperature) + "°";
    windEl.innerText = data.current_weather.windspeed + " km/h";
  } catch { tempEl.innerText = "!!"; }
}
