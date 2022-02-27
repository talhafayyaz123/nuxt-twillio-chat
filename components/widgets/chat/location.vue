<template>

    <div id="content">
    <h4>Location</h4>
     
     <b-input-group>
        <b-input-group-prepend>
        <span class="input-group-text"><i class="fa fa-search"></i></span>
        </b-input-group-prepend>
         <b-form-input class="LoginInput" id='LoginInput' size="lg" placeholder="Type the name of a country,city or state">
        </b-form-input>
        
    </b-input-group>

     

    <div class="content-description mt-3 mb-3">
        <h5>Los Angeles, CA</h5>
        <div><span>City 34 Members</span></div>
    </div>
    <div class="content-description mt-3 mb-3">
        <h5>New York, NY</h5>
        <div><span>City 34 Members</span></div>
    </div>
    </div> 
</template>

<script>
/**
 * Register component
 */
export default {
  name: "location",
  data() {
    return {
      backendErrors: {},
      isDisabled: false,
      address:'',
      latitude:0,
      longitude:0
    };
  },

  mounted(){
 var defaultBounds = new google.maps.LatLngBounds(
  new google.maps.LatLng(-33.8902, 151.1759),
  new google.maps.LatLng(-33.8474, 151.2631));
  var input = document.getElementById('address');
  var options = {
    bounds: defaultBounds,
    types: ['establishment']};
 

  var autocomplete = new google.maps.places.Autocomplete(input, options);
   console.log(autocomplete);
    google.maps.event.addListener(autocomplete,"place_changed", function () {
      var place = autocomplete.getPlace();
      console.log(place);
 /*      var latitude = place.geometry.location.lat();
      var longitude = place.geometry.location.lng();
      debug(latitude+'  '+longitude); */
     // document.getElementById('latitute').value=latitude;
      //document.getElementById('longitude').value=longitude;
 
    });


  },
  

};
</script>
