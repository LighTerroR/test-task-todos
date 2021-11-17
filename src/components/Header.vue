<template>
  <div id="header" class="header">
    <div class="container">
      <div class="header__wrapper">
        <h1 class="header__title">{{ page ? "Заметки" : title }}</h1>
        <div class="header__form">
          <div class="input">
            <div class="field">
              <div class="field__body" :class="{ _focus: focus, _error: isEmpty }">
                <input
                  type="text"
                  class="field__input"
                  id="note-title"
                  autocomplete="off"
                  @focus="focus = true"
                  @focusout="value === '' ? (focus = false) : (focus = true)"
                  @keydown.enter="createRecord"
                  :class="{ _focus: focus }"
                  v-model.trim="value"
                />
                <label for="note-title" class="field__label">
                  {{ isEmpty ? "Поле обязательно для заполнения" : placeholder }}
                </label>
                <fieldset class="field__border">
                  <legend class="field__legend">
                    <span>
                      {{ isEmpty ? "Поле обязательно для заполнения" : placeholder }}
                    </span>
                  </legend>
                </fieldset>
              </div>
            </div>
          </div>
          <button @click="createRecord" class="button header__button">
            {{ page ? "Создать заметку" : "Создать задачу" }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
      focus: false,
      value: '',
      placeholder: this.page ? 'Название заметки' : 'Название задачи',
    };
  },

  methods: {
    // Проверяет тип создаваемой записи
    checkTypeRecord() {
      this.getTitle(this.value);
      if (this.note.title !== '' || this.titleElement !== '') {
        if (this.page) {
          this.createNote();
        } else {
          this.getTodoTitle();
        }
      } else {
        this.isEmpty = true;
      }
    },

    createNote() {
      this.note.id = this.countNotes + 1;
      this.$store.commit('createNote', this.note);
      this.note.title = this.value;
      this.$router.push({ name: 'Todo', params: { id: this.note.id } });
      localStorage.notes = JSON.stringify(this.$store.state.notes);
      this.value = '';
    },

    getTodoTitle() {
      this.titleElement = this.value;
      this.$emit('create-todo', this.titleElement);
      this.value = '';
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

.input {
  width: 60%;
  margin-right: 15px;
  padding: 5px 0;
}

.field {
  line-height: 130%;
  letter-spacing: 0.01em;
  text-align: left;
  margin-top: -4px;

  &__input {
    position: relative;
    width: 100%;
    font-size: inherit;
    padding: 20px 20px 14px;
    color: $second;
    border-radius: 8px;
    resize: none;
    z-index: 100;

    &._focus + .field__label {
      top: 2px;
      opacity: 1;
      transform: translate(-10%, -50%) scale(0.7);
    }
  }

  &__body {
    position: relative;
    min-height: 54px;
    border-color: $second;
    color: $second;

    &._focus .field__legend {
      max-width: 1000px;
    }

    &._focus .field__border {
      border-width: 2px;
    }

    &._error {
      color: $danger;
      border-color: $danger;
    }
  }

  &__border {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    border-radius: 8px;
    padding: 0 16px;
    overflow: hidden;
    border: 1px solid;
    border-color: inherit;
    color: inherit;
    text-align: left;

    span {
      padding: 0 5px 0 7px;
    }
  }

  &__label {
    position: absolute;
    display: inline-block;
    left: 22px;
    top: 29px;
    transition: all 0.3s ease-in;
    transform: translateY(-50%);
    pointer-events: none;
    opacity: 0.5;
    z-index: 100;
  }

  &__legend {
    font-size: 0.8em;
    height: 11px;
    width: auto;
    display: block;
    max-width: 0.01px;
    transition: max-width 120ms ease;
    visibility: hidden;
  }
}

@media screen and (max-width: 1200px) {
  .header__form {
    width: 75%;
  }
}

@media screen and (max-width: 768px) {
  .header{
    &__wrapper {
      flex-direction: column;
    }
    &__form {
      width: 100%;
      justify-content: center;
    }
  }
}

@media screen and (max-width: 540px) {
  .input {
    width: 90%;
    margin: 0;
  }

  .header{
    &__form {
      flex-direction: column;
    }

    &__button {
      width: 90%;
    }
  }
}
</style>
