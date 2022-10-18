<template>
  <div class="header">
    <header class="d-flex justify-content-around align-items-center py-3">
      <ul class="nav nav-pills">
        <li class="nav-item">
          <NuxtLink to="/" class="nav-link" aria-current="page"
            >Main Gallery</NuxtLink
          >
        </li>

        <li class="nav-item">
          <NuxtLink to="/sculptures" class="nav-link">Sculptures</NuxtLink>
        </li>
        <li class="nav-item">
          <NuxtLink to="/painting" class="nav-link">Painting</NuxtLink>
        </li>
      </ul>
      
      <div class="form-check form-switch">
        <input
          @change="togle"
          class="form-check-input"
          type="checkbox"
          id="flexSwitchCheckChecked"
         
        />
        <label class="form-check-label" for="flexSwitchCheckChecked"
          >режим администратора</label
        >
      </div>
  
    </header>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {}
  },

  methods: {
    togle() {
      this.$store.commit('toggleIsAdmin')
    },

  },
}
</script>

<style>
.header {
  background: rgb(75, 75, 75);
  position: sticky;
}
.nuxt-link-exact-active {
  color: rgb(255, 255, 255);
  background: rgb(226, 225, 225);
}
</style>
template
