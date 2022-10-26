<template>
  <div v-if="isLoading" class="home d-flex p10">
    <div class="itemCard" v-for="c in sculpture" :key="c.objectID">
      <p class="title">{{ c.title }}</p>
      <div class="cardImg">
        <img :src="c.primaryImageSmall" alt="" />
      </div>
      <p class="my-4">{{ c.artistDisplayName }}</p>
    </div>
  </div>
  <Loader v-else />
</template>

<script>
import axios from 'axios'
export default {
  name: 'Sculptures',

  data() {
    return {
      isLoading: false,
      pictures: [],
      sculpturesIds: [],
      sculpture: [],
    }
  },
  async fetch() {
    await this.getSculptures()
    this.isLoading = true

  },

  methods: {
    async getSculptures() {
      const { data } = await axios.get(
        'https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&isHighlight=true&q=sculpture'
      )
      this.sculpturesIds.push(data.objectIDs)
      const res = await this.sculpturesIds[0]
        .slice(40, 80)
        .map((id) =>
          axios.get(
            `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`
          )
        )
      Promise.all(res).then((res) =>
        res.forEach((res) => {
          this.sculpture.push(res.data)
        })
      )

    },
  },

}
</script>

<style lang="scss">
.home {
  margin-top: 100px;
  gap: 30px;
  flex-wrap: wrap;
  justify-content: space-between;
}
.title {
  color: rgb(173, 149, 233);
  overflow: hidden;
  max-width: 200px;
  max-height: 45px;
}
.itemCard {
  text-align: center;
  p {
    max-width: 200px;
    display: inline-block;
    white-space: wrap;
  }
}
.cardImg {
  img {
    height: 250px;
    width: 200px;
    object-fit: cover;
  }
}
</style>
