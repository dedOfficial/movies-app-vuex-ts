<template>
  <div id="notify"></div>
</template>

<script lang="ts">
import { mapGetters } from 'vuex';

import Vue from 'vue';
import { TNotifyParams } from '@/store/modules/notification';
export default Vue.extend({
  name: 'Notification',
  computed: {
    ...mapGetters(['messagePool']),
  },
  watch: {
    messagePool: 'showNotification',
  },
  methods: {
    showNotification({ variant, msg, title }: TNotifyParams) {
      this.$bvToast.toast(msg, {
        title,
        variant,
        solid: true,
      });
    },
  },
});
</script>
