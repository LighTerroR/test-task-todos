<template>
  <div class="input">
    <div class="field">
      <div class="field__body" :class="{ _focus: focus, _error: empty }">
        <input
          type="text"
          class="field__input"
          id="note-title"
          autocomplete="off"
          @focus="focus = true"
          @focusout="value === '' ? (focus = false) : (focus = true)"
          :class="{ _focus: focus }"
          v-model.trim="value"
        />
        <label
        for="note-title"
        class="field__label">
          {{ empty ? 'Поле обязательно для заполнения' : title }}
        </label>
        <fieldset class="field__border">
          <legend class="field__legend">
            <span>{{ empty ? 'Поле обязательно для заполнения' : title }}</span>
          </legend>
        </fieldset>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['title', 'isEmpty'],
  data() {
    return {
      focus: false,
      value: '',
      empty: false,
    };
  },
  methods: {
    checkOnEmpty() {
      if (this.isEmpty && this.value === '') {
        this.empty = true;
      } else {
        this.empty = false;
      }
    },
  },
  watch: {
    value(v) {
      this.checkOnEmpty();
      this.$emit('getTitle', v);
    },
    isEmpty() {
      this.checkOnEmpty();
    },
  },
};
</script>

<style lang="scss" scoped>
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
</style>
