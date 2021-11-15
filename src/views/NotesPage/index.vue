<template>
  <div id='notes'>
    <Header :page="true" :countNotes="getNotes.length" />
    <div class="container">
      <h2 class="title-chapter">
        <span>Заметки</span>
        <span class="count-elements">{{ getNotes.length }}</span>
      </h2>
      <div class="card-container">
        <h2 class="_empty" v-if="!getNotes.length">Не создано ни одной заметки</h2>
        <Note
        v-else
        v-for="note in getNotes"
        :key="note.id"
        :note="note"
        @getModalControl="getModalControl" />
      </div>
    </div>
    <ModalWindow :controlModal="controlModal"/>
  </div>
</template>

<script>
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
      controlModal: {
        show: false,
        id: 0,
        delete: false,
      },
    };
  },

  methods: {
    getModalControl(control) {
      this.controlModal = control;
    },
  },

  computed: {
    getNotes() {
      return this.$store.getters.getNotes;
    },
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
