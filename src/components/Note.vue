<template>
  <div id="note" class="card">
    <h3 class="card__title">{{ note.title }}</h3>
    <p class="card__subtitle">Список задач</p>
    <ul
      v-if="note.todos.filter((item) => item.isCompleted === false ).length"
      class="card__todo-list">
      <li
      v-for="todo in note.todos.filter((item) => item.isCompleted === false ).slice(0,5)"
      :key="todo.id">{{ todo.title }}</li>
    </ul>
    <p v-else class="card__empty-list">Задач пока нет</p>
    <div class="card__buttons">
      <button
      @click="this.$router.push({ name: 'Todo', params: { id: this.note.id } })"
      class="card__button button button__edit">Изменить</button>
      <button @click="onDelete" class="card__button button button__delete">Удалить</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    note: {
      type: Object,
    },
  },

  data() {
    return {};
  },

  methods: {
    onDelete() {
      this.$emit('on-delete', { show: true, id: this.note.id });
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  background: $second;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  min-height: 300px;
  margin: 1rem;
  position: relative;
  width: 300px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  padding: 15px;

  &__title {
    text-align: center;
    margin-bottom: 20px;
  }

  &__subtitle {
    border-bottom: 1px solid $prime;
    margin-bottom: 10px;
  }

  &__todo-list {
    margin-bottom: 10px;
    padding-left: 10px;

    li {
      list-style-type: none;
      padding: 5px;
    }
  }

  &__empty-list {
    padding-left: 10px;
  }

  &__buttons {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: auto;
  }

  &__button {
    width: 48%;
  }
}
</style>
