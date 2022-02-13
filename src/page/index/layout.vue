<template>
  <div>
    <keep-alive>
      <router-view :key="key"
                   class="avue-view" />
    </keep-alive>
  </div>
</template>

<script>
export default {
  computed: {
    key () {
      return this.$route.path
    }
  }
}
</script>

<style>
</style>