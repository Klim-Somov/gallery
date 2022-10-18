<template>
  <div>
    <myFilter
      @select="categorySelect"
      :options="categories"
      :selectedCategory="selectedCategory"
    />
    <Modal v-if="$store.getters.getShowModal" />
    <div v-if="isLoading" class="home d-flex p10">
      <div
        class="itemCard position-relative"
        v-for="c in filterdArts"
        :key="c.objectID"
      >
        <p class="cardTitle">{{ c.title }}</p>
        <div class="cardImg">
          <div
            @click="showModal(c.objectID)"
            class="position-absolute my-n4 mx-n4"
          >
            <Gear v-if="$store.getters.getIsAdmin" />
          </div>
          <img :src="c.primaryImageSmall" alt="" />
        </div>
        <p class="my-4">{{ c.artistDisplayName }}</p>
      </div>
    </div>
    <Loader v-else />
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'IndexPage',
  data() {
    return {
      isLoading: false,
      selectedCategory: '',
      categories: [
        { name: 'Женщина автор', value: 'Female' },
        { name: 'Американский автор', value: 'American' },
        { name: 'Новая Англия', value: 'New England' },
        { name: 'Все', value: 'Все' },
      ],
      artsIds: [],
      arts: [],
      sorted: [],
    }
  },
  computed: {
    filterdArts() {
      if (this.sorted.length) {
        return this.sorted
      } else {
        return this.arts
      }
    },
  },
  methods: {
    showModal(id) {
      this.$store.commit('setShowModal')
    },

    sortArtsByCat() {
      this.sorted = []
      let vm = this
      switch (this.selectedCategory.value) {
        case 'Female':
          this.arts.map((art) => {
            if (art.artistGender === this.selectedCategory.value) {
              vm.sorted.push(art)
            }
          })
          break
        case 'American':
          this.arts.map((art) => {
            if (art.culture === this.selectedCategory.value) {
              vm.sorted.push(art)
            }
          })
          break
        case 'New England':
          this.arts.map((art) => {
            if (art.region === this.selectedCategory.value) {
              vm.sorted.push(art)
            }
          })
          break
        case 'Все':
          this.sorted = this.arts

          break
        default:
          return this.sorted
      }
    },
    categorySelect(option) {
      this.selectedCategory = option
      this.sortArtsByCat()
    },
    async getArts() {
      const { data } = await axios.get(
        'https://collectionapi.metmuseum.org/public/collection/v1/search?dateBegin=1700&dateEnd=1800&hasImages=true&q=pictures'
      )
      this.artsIds.push(data.objectIDs)
      const res = await this.artsIds[0]
        .slice(0, 60)
        .map((id) =>
          axios.get(
            `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`
          )
        )
      Promise.all(res).then((res) =>
        res.forEach((res) => {
          this.arts.push(res.data)
        })
      )
    },
  },
  async created() {
    await this.getArts()
    this.isLoading = true
    await this.$store.dispatch('getArtsFromApi')
    console.log(this.$store.getters.getArts)
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
.cardTitle {
  color: rgb(183, 162, 235);
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
