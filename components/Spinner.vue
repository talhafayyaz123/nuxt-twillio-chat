<script>

import {
    mapState
} from "vuex";
/**
 * Loading component
 */
export default {
    data: () => ({
        spinner: 0,
        type:''
    }),
    computed: {
        loadingState() {
            return this.$store.state.spinner.loading
        },
       loadingType() {
            return this.$store.state.spinner.type
        }
       
    }
};
</script>

<template>

  <div class="row" v-if='loadingState()==1 && loadingType()=="single_loader" ' >
    <div class="col-lg-6">
      <div class="card">
        <div class="card-body">
         
          <p class="text-muted mb-4">
            You can use any of our text color utilities on the standard spinner.
          </p>
          <span aria-hidden="true" class="m-2 spinner-border text-primary"
            ></span
          >
          
          <span aria-hidden="true" class="m-2 spinner-border text-info"
            ></span
          >

        </div>
      </div>
    </div>
 
  </div>
</template>
