<template>
  <li class="todo-item">
    <label class="todo-item__checkbox-wrapper">
      <input
        class="todo-item__input"
        type="checkbox"
        :checked="currentTodo.isCompleted"
        @change="doCheck"/>
      <span class="todo-item__checkbox"> </span>
      <span v-if="!editing" class="todo-item__label">{{ currentTodo.title }}</span>
      <input
        v-else
        class="todo-item__edit-input"
        type="text"
        :value="currentTodo.title"
        @change="todoTextChange"
        @keydown.enter="updateTodo"/>
    </label>
    <div class="todo-item__buttons-wrapper">
      <button v-if="editable" @click="updateTodo" class="todo-item__button button button__edit">
        {{ !editing ? "Редактировать" : "Сохранить" }}
      </button>
      <button @click="deleteTodo" class="todo-item__button button button__delete">Удалить</button>
    </div>
  </li>
</template>

<script>
export default {
  props: {
    todo: Object,
    editable: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      editing: false,
      currentTodo: { ...this.todo },
    };
  },
  methods: {
    // редактирование этемента списка todo
    updateTodo() {
      this.editing = !this.editing;
    },

    todoTextChange(e) {
      this.currentTodo.title = e.target.value;
      this.updateChanges();
    },
    // отмечает чекбокс
    doCheck() {
      this.currentTodo.isCompleted = !this.currentTodo.isCompleted;
      this.updateChanges();
    },

    updateChanges() {
      this.$emit('update-changes', this.currentTodo);
    },

    deleteTodo() {
      this.$emit('delete-todo', this.todo.id);
    },
  },
};
</script>

<style lang="scss" scoped>
.todo-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 10px;

  &__checkbox-wrapper {
    position: relative;
    padding-left: 40px;
    display: flex;
    align-items: center;
    width: 75%;
    line-height: 110%;
  }

  &__input:checked + .todo-item__checkbox {
    background: $prime-darken url("../assets/check.svg") no-repeat 0 0 / cover;
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
    line-height: 110%;
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
    width: 100%;
    border: none;
    border-bottom: 1px solid $prime;
    color: $prime-darken;
  }
}

@media (any-hover: hover) {
  .todo-item__checkbox-wrapper:hover .todo-item__checkbox {
    background-color: rgba(68, 68, 104, 0.2);
  }
}

@media screen and (max-width: 1200px) {
  .todo-item__checkbox-wrapper {
    width: 70%;
  }
}

@media screen and (max-width: 991px) {
  .todo-item{
    &__buttons-wrapper {
      display: flex;
      flex-direction: column;
    }
  }
}

@media screen and (max-width: 540px) {
  .todo-item {
    flex-wrap: wrap;

    &__checkbox-wrapper {
      width: 90%;
      margin-bottom: 5px;
    }

    &__label {
      font-size: 20px;
    }

    &__buttons-wrapper {
      flex-direction: row;
    }
  }
}
</style>
