<template>
  <div class="modall-shadow" @click.self="closeModal">
    <div class="modall">
      <div class="modall-close" @click="closeModal">&#10006;</div>

      <h3 class="modall-title">панель редактирования</h3>

      <p class="modall-content">
        здесь будет логика редактирования контента MySQL
      </p>

      <div class="modall-footer">
        <button class="modall-footer__button" @click="closeModal">Ок</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModalWindow',
  data: function () {
    return {
      show: true,
    }
  },
  methods: {
    closeModal: function () {
      this.$store.commit('setShowModal')
    },
  },
}
</script>

<style scoped lang="scss">
.modall-shadow {
  position: absolute;
  top: 0;
  left: 0;
  min-height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.39);
  z-index: 5;
}

.modall {
  background: #fff;
  border-radius: 8px;
  padding: 15px;
  min-width: 420px;
  max-width: 480px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  &-close {
    border-radius: 50%;
    color: #fff;
    background: #2a4cc7;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 7px;
    right: 7px;
    width: 30px;
    height: 30px;
    cursor: pointer;
  }

  &-title {
    color: #0971c7;
  }

  &-content {
    margin-bottom: 20px;
    color: black;
  }

  &-footer {
    &__button {
      background-color: #1b2c39;
      color: #fff;
      border: none;
      text-align: center;
      padding: 8px;
      font-size: 17px;
      font-weight: 500;
      border-radius: 8px;
      min-width: 150px;
    }
  }
}
</style>
