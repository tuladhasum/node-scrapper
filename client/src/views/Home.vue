<template>
  <div class="container">
    <Craigslist></Craigslist>
  </div>
</template>

<script>
// @ is an alias to /src
import Craigslist from '@/components/Craigslist.vue'

export default {
  name: 'home',
  components: {
    Craigslist
  }
}
</script>
