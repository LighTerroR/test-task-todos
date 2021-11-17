<template>
  <div id="todo-list">
    <Header :title="note.title" @create-todo="createTodo" />
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
          @delete-todo="deleteItem"
        />
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
          @delete-todo="deleteItem"
        />
      </ul>
      <h2 v-else class="_empty">Нет выполненых задач</h2>
    </div>
    <Footer
      :noteId="noteId"
      @save-changes="saveChanges"
      @cancel-changes="cancelChanges"
      @repeat-changes="repeatChanges"
      @close-note="openModal"
      @delete-note="openModal"
    />
    <ModalWindow
      :showModal="showModal"
      @on-ok="(deleteElement ? deleteNote : closeWithoutSaving)()"
      @on-cancel="closeModal"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex';
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
    // Создаёт элемент списка
    createTodo(noteTitle) {
      this.todos.push({
        id: this.todos.length + 1,
        title: noteTitle,
        isCompleted: false,
      });
      this.updateTodos();
      this.updateApplicationState();
    },
    // изменяет элемент списка в массиве после его редактирования
    changeTodos(todo) {
      this.todos.splice(this.todos.findIndex((item) => item.id === todo.id), 1);
      this.todos.push(todo);
      this.updateTodos();
      this.updateApplicationState();
    },

    deleteItem(id) {
      this.todos.splice(this.todos.findIndex((item) => item.id === id), 1);
      this.updateTodos();
      this.updateApplicationState();
    },
    // обновляет списки активных элементов и выполненных элементов
    updateTodos() {
      this.activeTodo = this.todos.filter((item) => item.isCompleted === false);
      this.completedTodo = this.todos.filter((item) => item.isCompleted === true);
    },

    saveChanges() {
      this.$store.commit('saveChangesInCurrentNote', { id: this.noteId, todos: this.todos });
      localStorage.notes = JSON.stringify(this.$store.state.notes);
      this.$store.commit('clearApplicationState');
    },

    cancelChanges() {
      if (this.numberChange < 9) {
        this.numberChange += 1;
        this.todos = this.applicationState[this.numberChange].slice();
        this.updateTodos();
      }
    },

    repeatChanges() {
      if (this.numberChange > 0) {
        this.numberChange -= 1;
        this.todos = this.applicationState[this.numberChange].slice();
        this.updateTodos();
      }
    },

    openModal(data) {
      this.deleteElement = data.delete;
      if (this.deleteElement === false && this.applicationState.length <= 1) {
        this.closeWithoutSaving();
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
      this.$store.commit('clearApplicationState');
      this.$router.push('/');
    },

    closeModal() {
      this.showModal = false;
    },

    updateApplicationState() {
      this.$store.commit('updateApplicationState', this.todos);
    },
  },

  computed: mapState({
    note() {
      return this.$store.state.notes.find((note) => note.id === this.noteId);
    },
    applicationState: (state) => state.applicationState,
  }),

  created() {
    this.noteId = Number(this.$route.params.id);
    this.$store.commit('updateApplicationState', this.todos);
    document.addEventListener('beforeunload', this.closeWindow);
  },

  mounted() {
    if (localStorage.notes) {
      this.$store.commit('takeStateFromLocalStorage', JSON.parse(localStorage.notes));
    }
    this.todos = this.note.todos.slice();
    this.updateTodos();
  },
};
</script>

<style lang="scss" scoped>
.todo-wrapper {
  margin: 1rem;
}
</style>
