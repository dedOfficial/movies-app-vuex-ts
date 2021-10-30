<template>
  <div id="loader" v-if="isShowLoader">
    <BSpinner type="grow" variant="light" />
  </div>
</template>

<script lang="ts">
import { mapGetters } from 'vuex';

import Vue from 'vue';
export default Vue.extend({
  name: 'Loader',
  computed: {
    ...mapGetters(['isShowLoader']),
  },
});
</script>

<style scoped>
#loader {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
</style>
