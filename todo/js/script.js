class Parent {
  #text
  #completed
  constructor(text) {
    this.#text = text;
    this.#completed = false;
    this.element = document.createElement('div');
    this.element.className = 'todo';
  }
  get text() {
    return this.#text;
  }
  get completed() {
      return this.#completed;
  }
  set text(value) {
      this.#text = value;
  }
  set completed(value) {
      this.#completed = value;
  }
}

// Definisi kelas utama (Todo)
class Todo extends Parent{
  constructor(text) {
    super(text)
    this.render();
  }  
  // Metode untuk merender todo ke dalam elemen container
  render() {
    const checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    checkBox.checked = this.completed;
    checkBox.addEventListener('change', () => this.toggleCompleted());

    const todoText = document.createElement('span');
    todoText.textContent = this.text;

    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete-btn';
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => this.delete());

    this.element.appendChild(checkBox);
    this.element.appendChild(todoText);
    this.element.appendChild(deleteButton);

    this.updateStyle();

    document.getElementById('todoList').appendChild(this.element);
  }
  // Metode untuk menandai todo sebagai selesai atau belum selesai
  toggleCompleted() {
    this.completed = !this.completed;
    this.updateStyle();
  }
  // Metode untuk menghapus todo
  delete() {
    this.element.remove();
  }
  // Metode untuk memperbarui gaya todo berdasarkan status completed
  updateStyle() {
    if (this.completed) {
      this.element.style.textDecoration = 'line-through';
      this.element.style.opacity = '0.6';
    } else {
      this.element.style.textDecoration = 'none';
      this.element.style.opacity = '1';
    }
  }
}

// Fungsi untuk memulai aplikasi
function startApp() {
  const todoForm = document.getElementById('todoForm');
  const todoInput = document.getElementById('todoInput');

  todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const todoText = todoInput.value.trim();
    if (todoText !== '') {
      const newTodo = new Todo(todoText);
      todoInput.value = '';
    }
  });
}
// Memanggil fungsi untuk memulai aplikasi setelah dokumen selesai dimuat
document.addEventListener('DOMContentLoaded', startApp);