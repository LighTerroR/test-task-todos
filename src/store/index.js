import { createStore } from 'vuex';

export default createStore({
  state: {
    notes: [
    ],
    applicationState: [],
  },
  mutations: {
    createNote(state, note) {
      state.notes.push(note);
    },
    deleteNote(state, id) {
      state.notes.splice(
        state.notes.findIndex((item) => item.id === id),
        1,
      );
    },
    saveChangesInCurrentNote(state, changes) {
      state.notes[state.notes.findIndex((i) => i.id === changes.id)].todos = changes.todos.slice();
    },
    takeStateFromLocalStorage(state, storage) {
      state.notes.length = 0;
      state.notes = [...storage];
    },
    updateApplicationState(state, todos) {
      if (state.applicationState.length > 9) {
        state.applicationState.unshift(todos.slice());
        state.applicationState.pop();
      } else {
        state.applicationState.unshift(todos.slice());
      }
    },
    clearApplicationState(state) {
      state.applicationState.length = 0;
    },
  },
  actions: {},
  modules: {},
  getters: {},
});
