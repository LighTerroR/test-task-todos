<template>
  <div id="header" class="header">
    <div class="container">
      <div class="header__wrapper">
        <h1 class="header__title">{{ page ? 'Заметки' : title }}</h1>
        <div class="header__form">
          <Input
          :title="page ? 'Название заметки' : 'Название задачи'"
          :isEmpty="isEmpty"
          @getTitle="getTitle" />
          <button
          @click="createRecord"
          class="button header__button">
            {{ page ? 'Создать заметку' : 'Создать задачу' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Input from './Input.vue';

export default {
  props: {
    title: String,
    page: {
      type: Boolean,
      default: false,
    },
    countNotes: {
      type: Number,
    },
  },

  data() {
    return {
      titleElement: '',
      note: {
        id: '',
        title: '',
        todos: [],
      },
      isEmpty: false,
    };
  },

  components: {
    Input,
  },

  methods: {
    createRecord() {
      if (this.note.title !== '' || this.titleElement !== '') {
        if (this.page) {
          this.note.id = this.countNotes + 1;
          this.$store.commit('createNote', this.note);
          this.$router.push({ name: 'Todo', params: { id: this.note.id } });
        } else {
          this.$emit('createTodo', this.titleElement);
        }
      } else {
        this.isEmpty = true;
      }
    },
    getTitle(titleElement) {
      if (this.page) this.note.title = titleElement;
      this.titleElement = titleElement;
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  background-color: $prime;
  margin-bottom: 20px;

  &__wrapper {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 0;
  }

  &__title {
    font-size: 36px;
    font-weight: 700;
    color: $second;
    line-height: 150%;
  }

  &__form {
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  &__button {
    width: 30%;
    color: $second;
    transition: all 0.1s ease-in-out;

    &:hover {
      border-width: 2px;
      background-color: rgba(255, 255, 255, 0.2);
    }
  }
}
</style>
