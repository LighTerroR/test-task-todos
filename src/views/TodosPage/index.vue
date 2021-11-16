<template>
  <div id="todo-list">
    <Header :title="note.title" @createTodo="createTodo" />
    <div class="container pb-70">
      <h2 class="title-chapter">
        <span>Активные задачи</span>
        <span class="count-elements">{{ activeTodo.length }}</span>
      </h2>
      <ul v-if="activeTodo.length" class="todo-wrapper">
        <Todo
          v-for="todo in activeTodo"
          :key="todo.id"
          :todo="todo"
          @update-changes="changeTodos"
          @delete-todo="deleteItem"/>
      </ul>
      <h2 v-else class="_empty">Не создано ни одной задачи</h2>
      <h2 class="title-chapter">
        <span>Выполнено</span>
        <span class="count-elements">{{ completedTodo.length }}</span>
      </h2>
      <ul v-if="completedTodo.length" class="todo-wrapper">
         <Todo
          v-for="todo in completedTodo"
          :key="todo.id"
          :todo="todo"
          :editable="false"
          @update-changes="changeTodos"
          @delete-todo="deleteItem"/>
      </ul>
      <h2 v-else class="_empty">Нет выполненых задач</h2>
    </div>
    <Footer
      :noteId="noteId"
      @save-changes="saveChanges"
      @cancel-changes="cancelChanges"
      @repeat-changes="repeatChanges"
      @close-note="openModal"
      @delete-note="openModal"/>
    <ModalWindow
      :showModal="showModal"
      @on-ok="(deleteElement ? deleteNote : closeWithoutSaving)()"
      @on-cancel="closeModal" />
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import Todo from '@/components/ToDoItem.vue';
import Footer from '@/components/Footer.vue';
import ModalWindow from '@/components/ModalWindow.vue';

export default {
  components: {
    Header,
    Todo,
    Footer,
    ModalWindow,
  },

  data() {
    return {
      showModal: false,
      deleteElement: false,
      noteId: 0,
      todos: [],
      activeTodo: [],
      completedTodo: [],
      numberChange: 0,
    };
  },

  methods: {
    createTodo(noteTitle) {
      this.todos.push({
        id: this.todos.length + 1,
        title: noteTitle,
        isCompleted: false,
      });
      this.updateTodos();
      this.$store.commit('updateTodoChanges', this.todos);
    },
    changeTodos(todo) {
      this.todos.splice(this.todos.findIndex((item) => item.id === todo.id), 1);
      this.todos.push(todo);
      this.updateTodos();
      this.$store.commit('updateTodoChanges', this.todos);
    },
    deleteItem(id) {
      this.todos.splice(this.todos.findIndex((item) => item.id === id), 1);
      this.updateTodos();
      this.$store.commit('updateTodoChanges', this.todos);
    },
    updateTodos() {
      this.activeTodo = this.todos.filter((item) => item.isCompleted === false);
      this.completedTodo = this.todos.filter((item) => item.isCompleted === true);
    },
    saveChanges() {
      this.$store.commit('saveChangesInCurrentNote', { id: this.noteId, todos: this.todos });
      localStorage.notes = JSON.stringify(this.$store.state.notes);
    },
    cancelChanges() {
      if (this.numberChange < 9) {
        this.numberChange += 1;
        this.todos = this.changesTodos[this.numberChange].slice();
        this.updateTodos();
      }
    },
    repeatChanges() {
      if (this.numberChange > 0) {
        this.numberChange -= 1;
        this.todos = this.changesTodos[this.numberChange].slice();
        this.updateTodos();
      }
    },
    openModal(data) {
      this.deleteElement = data.delete;
      if (this.deleteElement === false && this.changesTodos.length <= 1) {
        this.$store.commit('clearTodoChanges');
        this.$router.push('/');
      } else {
        this.showModal = data.show;
      }
    },
    deleteNote() {
      this.$store.commit('deleteNote', this.noteId);
      localStorage.notes = JSON.stringify(this.$store.state.notes);
      this.showModal = false;
      this.$router.push('/');
    },
    closeWithoutSaving() {
      this.$store.commit('clearTodoChanges');
      this.$router.push('/');
    },
    closeModal() {
      this.showModal = false;
    },
  },

  computed: {
    note() {
      return this.$store.state.notes.find((note) => note.id === this.noteId);
    },
    changesTodos() {
      return this.$store.state.todoChanges;
    },
  },

  created() {
    this.noteId = Number(this.$route.params.id);
    this.todos = this.note.todos.slice();
    this.updateTodos();
    this.$store.commit('updateTodoChanges', this.todos);
    document.addEventListener('beforeunload', this.closeWindow);
  },

  mounted() {
    if (localStorage.notes) {
      this.$store.commit('takeStateFromLocalStorage', JSON.parse(localStorage.notes));
    }
  },
};
</script>

<style lang="scss" scoped>
.todo-wrapper {
  margin: 1rem;
}
</style>
