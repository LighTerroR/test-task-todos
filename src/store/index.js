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
  },
  mutations: {
    createNote(state, note) {
      state.notes.push(note);
    },
    deleteNote(state, id) {
      state.notes.splice(state.notes.findIndex((item) => item.id === id), 1);
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
