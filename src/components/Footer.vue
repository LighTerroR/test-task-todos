<template>
  <div class="footer">
    <div class="container">
      <div class="footer__wrapper">
        <button @click="save" class="button button__edit footer__button">Сохранить</button>
        <button @click="cancel" class="button button__edit footer__button">Отменить</button>
        <button @click="repeat" class="button button__edit footer__button">Повторить</button>
        <button @click="closeNote" class="button button__delete footer__button">Закрыть</button>
        <button @click="deleteNote" class="button button__delete footer__button">Удалить</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['noteId'],
  data() {
    return {};
  },
  methods: {
    save() {
      this.$emit('save-changes');
    },
    cancel() {
      this.$emit('cancel-changes');
    },
    repeat() {
      this.$emit('repeat-changes');
    },
    closeNote() {
      this.$emit('close-note', { show: true, id: this.noteId, delete: false });
    },
    deleteNote() {
      this.$emit('delete-note', { show: true, id: this.noteId, delete: true });
    },
  },
};
</script>

<style lang="scss" scoped>
.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: $second;

  &__wrapper {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
  }

  &__button {
    width: 18%;
  }
}

@media screen and (max-width: 600px) {
  .footer__wrapper {
    flex-wrap: wrap;
    justify-content: space-evenly;
  }
  .footer__button {
    width: 25%;
    margin: 5px;
  }
}
</style>
