<script>
/**
 * Loading component
 */
export default {
  data: () => ({
    loading: false,
  }),
  methods: {
    start() {
      this.loading = true;
    },
    finish() {
      this.loading = false;
    },
    loadingState() {
      return this.$store.state.spinner.loading;
    },
    loadingType() {
      return this.$store.state.spinner.type;
    },
  },
};
</script>

<template>
  <!-- Loader -->
  <div class="loaders">
    <div id="preloader" v-if="loading">
      <div class="card-portlets-loader">
        <div class="spinner-border text-primary m-2" role="status"></div>
      </div>
    </div>

    <div id='single_loader'
      class="loader"
      v-if="loadingState() == 1 && loadingType() == 'single_loader'"
    >
      <div class="card-portlets-loader">
        <span aria-hidden="true" class="m-2 spinner-border text-primary"></span>
      </div>
    </div>
  </div>
</template>
