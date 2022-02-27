<template>
     <div id="content">
    <h4>Join Date</h4>
    <p>Suggested dates</p>
    <div class="content-description mt-3 mb-3">
        <div><span @click="
        durationFilterColor('last24hours')
        "
        :class="{
            'text-primary': colors.last24hours,
        }">Joined: Last 24 hours</span></div>
        <div><span >joined {{recipents.last24hours}} Members</span></div>
    </div>
    <div class="content-description mt-3 mb-3">
        <div><span @click="
        durationFilterColor('last7days')
        "
        :class="{
            'text-primary': colors.last7days,
        }">Joined: Last 7 days</span></div>
        <div><span>joined {{recipents.last7days}} Members</span></div>
    </div>
    <div class="content-description mt-3 mb-3">
        <span @click="
        durationFilterColor('last30days')
        "
        :class="{
            'text-primary': colors.last30days,
        }">Joined : Last 30 Days</span>
        <div><span>joined {{recipents.last30days}} Members</span></div>
    </div>
    <div>
        <h5>Custom</h5>
      
        <div class="d-flex">
        <span class="mr-2">is</span>
        
        <b-form-select :options="options" v-model="search_type" @change="updateRange" class="w-50 mr-2"></b-form-select>
        <button class="btn btn-primary"  @click="$emit('closeModel')"  >Apply</button>
        </div>
    </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
        recipents:[],
        options: [
          { value: null, text: 'Please select an option' },
          { value: 'before', text: 'before' },
          { value: 'after', text: 'after' },
          { value: 'on', text: 'on' },
        ],
        colors: {
        last24hours: false,
        last7days: false,
        last30days: false,
      }, 
      search_type: ""

    };
  },
  methods: {
    async getRecipents() {
      const recipents = await this.$axios.$get("/duration_filter");
      this.recipents = recipents.data;
    },
    updateRange(){
    this.$store.commit('chat/filterType', 'join_date');
     let payload={
       last24hours: this.colors.last24hours,
        last7days: this.colors.last7days,
        last30days:  this.colors.last30days,
        value:this.search_type
     };

     this.$store.commit('chat/filterData',payload);
    },
    durationFilterColor(type) {
     
     this.$store.commit('chat/filterType', 'join_date');

    
      if (type == "last24hours") {
        this.colors.last24hours = true;
        this.colors.last7days = false;
        this.colors.last30days = false;
    

      } else if (type == "last7days") {
        this.colors.last7days = true;
           this.colors.last24hours = false;
           this.colors.last30days = false;

      }else if (type == "last30days") {
        this.colors.last30days = true;
        this.colors.last24hours = false;
        this.colors.last7days = false;
      }

      let payload={
       last24hours: this.colors.last24hours,
        last7days: this.colors.last7days,
        last30days:  this.colors.last30days,
        value:this.search_type
     };

     this.$store.commit('chat/filterData',payload);
    },
  },

  mounted() {
    this.getRecipents();
  }
}
 

</script>