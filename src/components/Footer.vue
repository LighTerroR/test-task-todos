<template>
  <div class="footer">
    <div class="container">
      <div class="footer__wrapper">
        <button class="button button__edit footer__button">Сохранить</button>
        <button class="button button__edit footer__button">Отменить</button>
        <button class="button button__edit footer__button">Повторить</button>
        <button class="button button__delete footer__button">Закрыть</button>
        <button class="button button__delete footer__button">Удалить</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    return {};
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
</style>
