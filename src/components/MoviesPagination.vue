<template>
  <div id="movies-pagination" class="d-flex justify-content-center">
    <BPagination
      v-model="currentPageModel"
      :perPage="perPage"
      :total-rows="total"
      prev-text="Prev"
      next-text="Next"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "MoviesPagination",

  props: {
    currentPage: {
      type: Number,
      default: 1,
    },
    total: {
      type: Number,
      default: 1,
    },
    perPage: {
      type: Number,
      default: 1,
    },
  },
  computed: {
    currentPageModel: {
      get(): number {
        return this.currentPage;
      },
      set(value: number) {
        this.$emit("pageChanged", value);
      },
    },
  },
});
</script>

<style scoped>
#movies-pagination {
  margin-top: 30px;
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
}

#movies-pagination >>> .pagination .page-item .page-link {
  background-color: transparent;
  font-size: 12px;
  color: #fff;
  box-shadow: none;
}

#movies-pagination >>> .pagination .page-item.active .page-link {
  border-color: #fff;
  background-color: #fff;
  color: #000;
}

#movies-pagination >>> .pagination .page-item.disabled .page-link {
  color: gray;
}
</style>
