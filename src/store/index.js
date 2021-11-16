import { createStore } from 'vuex';

export default createStore({
  state: {
    notes: [
      {
        id: 1,
        title: 'Котики',
        todos: [],
      },
    ],
    todoChanges: [],
  },
  mutations: {
    createNote(state, note) {
      state.notes.push(note);
    },
    deleteNote(state, id) {
      state.notes.splice(state.notes.findIndex((item) => item.id === id), 1);
    },
    saveChangesInCurrentNote(state, changes) {
      state.notes[state.notes.findIndex((i) => i.id === changes.id)].todos = changes.todos.slice();
    },
    takeStateFromLocalStorage(state, storage) {
      state.notes.length = 0;
      state.notes = [...storage];
    },
    updateTodoChanges(state, todos) {
      if (state.todoChanges.length > 9) {
        state.todoChanges.unshift(todos.slice());
        state.todoChanges.pop();
      } else {
        state.todoChanges.unshift(todos.slice());
      }
    },
  },
  actions: {
  },
  modules: {
  },
  getters: {
    getNotes(state) {
      return state.notes;
    },
  },
});
