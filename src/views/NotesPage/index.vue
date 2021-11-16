<template>
  <div id='notes'>
    <Header :page="true" :countNotes="notes.length" />
    <div class="container">
      <h2 class="title-chapter">
        <span>Заметки</span>
        <span class="count-elements">{{ notes.length }}</span>
      </h2>
      <div class="card-container">
        <h2 class="_empty" v-if="!notes.length">Не создано ни одной заметки</h2>
        <Note
        v-for="note in notes"
        :key="note.id"
        :note="note"
        @on-delete="openModal" />
      </div>
    </div>
    <ModalWindow :showModal="showModal" @on-ok="deleteNote" @on-cancel="closeModal"/>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Header from '@/components/Header.vue';
import Note from '@/components/Note.vue';
import ModalWindow from '@/components/ModalWindow.vue';

export default {
  components: {
    Header,
    Note,
    ModalWindow,
  },

  data() {
    return {
      showModal: false,
      id: 0,
    };
  },

  methods: {
    openModal(data) {
      this.showModal = data.show;
      this.id = data.id;
    },
    deleteNote() {
      this.$store.commit('deleteNote', this.id);
      localStorage.notes = JSON.stringify(this.$store.state.notes);
      this.showModal = false;
    },
    closeModal() {
      this.showModal = false;
    },
  },

  computed: mapState(['notes']),

  mounted() {
    if (localStorage.notes) {
      this.$store.commit('takeStateFromLocalStorage', JSON.parse(localStorage.notes));
    }
  },
};
</script>

<style lang="scss">
.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}
</style>
