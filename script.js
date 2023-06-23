document.addEventListener('DOMContentLoaded', function() {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
  
    // Cargar las tareas guardadas en LocalStorage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  
    // Función para renderizar las tareas en la lista
    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach(function(task, index) {
          const li = document.createElement('li');
          li.textContent = task.text;
          if (task.completed) {
            li.classList.add('completed');
          }
          const deleteButton = document.createElement('button');
          deleteButton.textContent = 'Borrar';
          deleteButton.addEventListener('click', function(event) {
            event.stopPropagation(); // Evita que el clic se propague a la tarea
            deleteTask(index);
          });
          li.appendChild(deleteButton);
          li.addEventListener('click', function() {
            toggleCompleted(index);
          });
          taskList.appendChild(li);
        });
      }
  
    // Función para agregar una tarea
    function addTask(text) {
      const task = {
        text: text,
        completed: false
      };
      tasks.push(task);
      renderTasks();
      saveTasks();
    }
  
// Función para eliminar una tarea
function deleteTask(index) {
    if (index >= 0 && index < tasks.length) {
      tasks.splice(index, 1);
      renderTasks();
      saveTasks();
    }
  }
  
 // Función para marcar/desmarcar una tarea como completada
function toggleCompleted(index) {
    if (index >= 0 && index < tasks.length) {
      tasks[index].completed = !tasks[index].completed;
      renderTasks();
      saveTasks();
    }
  }
  
    // Función para guardar las tareas en LocalStorage
    function saveTasks() {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  
    // Manejador de evento para agregar una tarea
    taskForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const taskText = taskInput.value.trim();
      if (taskText !== '') {
        addTask(taskText);
        taskInput.value = '';
      }
    });
  
    // Renderizar las tareas al cargar la página
    renderTasks();
  });
  