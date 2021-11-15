<template>
  <div id="todo-list">
    <Header :title="note.title" @createTodo="createTodo" />
    <div class="container">
      <h2 class="title-chapter">
        <span>Активные задачи</span>
        <span class="count-elements">{{ activeTask.length }}</span>
      </h2>
      <ul v-if="activeTask.length" class="todo-wrapper">
        <li class="todo-item" v-for="todo in activeTask" :key="todo.id">
          <label class="todo-item__checkbox-wrapper">
            <input
              class="todo-item__input"
              type="checkbox"
              name=""
              id=""
              @change="doCheck(todo.id)"
            />
            <span class="todo-item__checkbox"> </span>
            <span v-if="!todo.editing" class="todo-item__label">{{ todo.title }}</span>
            <input
              v-else
              class="todo-item__edit-input"
              type="text"
              :value="todo.title"
              @change="todoTextChange($event.target.value, todo.id)"/>
          </label>
          <div class="todo-item__buttons-wrapper">
            <button @click="editTodo(todo.id)" class="todo-item__button button button__edit">
              {{ !todo.editing ? "Редактировать" : "Сохранить" }}
            </button>
            <button
            @click="deleteItem(todo.id)"
            class="todo-item__button button button__delete">Удалить</button>
          </div>
        </li>
      </ul>
      <h2 v-else class="_empty">Не создано ни одной задачи</h2>
      <h2 class="title-chapter">
        <span>Выполнено</span>
        <span class="count-elements">{{ completedTask.length }}</span>
      </h2>
      <ul v-if="completedTask.length" class="todo-wrapper">
        <li class="todo-item" v-for="todo in completedTask" :key="todo.id">
          <label class="todo-item__checkbox-wrapper">
            <input
              class="todo-item__input"
              type="checkbox"
              name=""
              id=""
              checked
              @change="doCheck(todo.id)"
            />
            <span class="todo-item__checkbox"> </span>
            <span class="todo-item__label">{{ todo.title }}</span>
          </label>
          <div class="todo-item__buttons-wrapper">
            <button
              @click="deleteItem(todo.id)"
              class="todo-item__button button button__delete">Удалить</button>
          </div>
        </li>
      </ul>
      <h2 v-else class="_empty">Нет выполненых задач</h2>
    </div>
    <Footer />
    <ModalWindow :controlModal="controlModal" />
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import ModalWindow from '@/components/ModalWindow.vue';

export default {
  components: {
    Header,
    Footer,
    ModalWindow,
  },

  data() {
    return {
      controlModal: {
        show: false,
        id: 0,
        delete: false,
      },
      noteId: 0,
      note: {},
      titleTodo: '',
      activeTask: [],
      completedTask: [],
    };
  },

  methods: {
    createTodo(noteTitle) {
      this.note.todos.push({
        id: this.note.todos.length + 1,
        title: noteTitle,
        isCompleted: false,
        editing: false,
      });
      this.updateTodos();
    },
    doCheck(id) {
      this.note.todos.forEach((item, index) => {
        if (item.id === id) {
          this.note.todos[index].isCompleted = !item.isCompleted;
        }
      });
      this.updateTodos();
    },
    deleteItem(id) {
      this.note.todos.splice(this.note.todos.findIndex((item) => item.id === id), 1);
      this.updateTodos();
    },
    editTodo(id) {
      this.note.todos.forEach((item, index) => {
        if (item.id === id) {
          this.note.todos[index].editing = !item.editing;
        }
      });
      this.updateTodos();
    },
    todoTextChange(value, id) {
      this.note.todos.forEach((item, index) => {
        if (item.id === id) {
          this.note.todos[index].title = value;
        }
      });
      this.updateTodos();
    },
    updateTodos() {
      this.activeTask = this.note.todos.filter((item) => item.isCompleted === false);
      this.completedTask = this.note.todos.filter((item) => item.isCompleted === true);
    },
  },

  computed: {
    getNoteById() {
      return this.$store.state.notes.find((note) => note.id === this.noteId);
    },
  },

  created() {
    this.noteId = Number(this.$route.params.id);
    this.note = this.getNoteById;
    this.updateTodos();
  },
};
</script>

<style lang="scss" scoped>
.todo-wrapper {
  margin: 1rem;
}

.todo-item {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 10px;

  &__checkbox-wrapper {
    position: relative;
    padding-left: 40px;
    display: flex;
    align-items: center;

    &:hover .todo-item__checkbox {
      background-color: rgba(68, 68, 104, 0.2);
    }
  }

  &__input:checked + .todo-item__checkbox {
    background: $prime-darken url("../../assets/check.svg") no-repeat 0 0 / cover;
  }

  &__checkbox {
    width: 30px;
    height: 30px;
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    border: 3px solid;
    border-radius: 8px;
    background-color: $second;
  }

  &__label {
    font-size: 30px;
    font-weight: 500;
  }

  &__button {
    margin: 5px;
  }

  &__edit-input {
    font-size: 18px;
    font-weight: 600;
    padding: 10px 10px 10px 5px;
    display: block;
    width: 500px;
    border: none;
    border-bottom: 1px solid $prime;
    color: $prime-darken;
  }
}
</style>
