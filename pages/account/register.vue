<script>
import { required, email } from "vuelidate/lib/validators";
/**
 * Register component
 */
export default {
  name: "account-register",
  data() {
    return {
      user: {
        first_name: "",
        last_name: "",
        email: "",
        city: "",
        country_id: "",
        gender: "",
        dob: "",
        instagram: "",
        twitter: "",
        ticktok: "",
        password: "",
        phone_no: "",
        password_confirmation: ""
      },
      countries: [],
      gender_list: ["Male", "Female", "Other"],
      submitted: false,
      regError: null,
      tryingToRegister: false,
      isRegisterError: false,
      registerSuccess: false,
      backendErrors: {},
      isDisabled: false,
      address:'',
      latitude:0,
      longitude:0
    };
  },
  layout: "auth",

  mounted(){
 var defaultBounds = new google.maps.LatLngBounds(
  new google.maps.LatLng(-33.8902, 151.1759),
  new google.maps.LatLng(-33.8474, 151.2631));
  var input = document.getElementById('address');
  var options = {
    bounds: defaultBounds,
    types: ['establishment']};

   var autocomplete = new google.maps.places.Autocomplete(input, options);
    google.maps.event.addListener(autocomplete,"place_changed", function () {
      var place = autocomplete.getPlace();
      var latitude = place.geometry.location.lat();
      var longitude = place.geometry.location.lng();
      document.getElementById('latitute').value=latitude;
      document.getElementById('longitude').value=longitude;
 
    });


  },
  computed: {
    notification() {
      return this.$store ? this.$store.state.notification : null;
    },
    notificationAutoCloseDuration() {
      return this.$store && this.$store.state.notification ? 5 : 0;
    },
  },
  validations: {
    user: {
      first_name: {
        required,
      },
      last_name: {
        required,
      },
      email: {
        required,
        email,
      },
      country_id: {
        required,
      },
      city: {
        required,
      },
      gender: {
        required,
      },
      // phone_no: {
      //   required,
      // },
     dob: {
        required,
      },
      // password: {
      //   required,
      // },
      // password_confirmation: {
      //   required,
      // },
    },
  },
  created() {
    if(!this.$route.query.id){
      this.returnLogin();
    }

     this.$store
      .dispatch("isValidReference",this.$route.query.id)
      .then((response) => {
       if(!response.data.data) {
         const message = 'Your reference link is not valid please type message your respective user again'
         this.$store.dispatch(
           "notification/error",
           message
         );

         this.returnLogin()
       }
      })
      .catch((error) => {
        this.returnLogin()
      }) 

    this.$store
      .dispatch("getInfluencersDropdowns")
      .then((response) => {
        this.countries = response.data.data;
      })
      .catch((error) => {
        this.backendErrors = error.response.data.errors;
      })
      .catch(() => {
        this.isDisabled = false;
      });
  },
  methods: {
    returnLogin() {
      this.$router.push({ path: "/account/login" })
    },
    // Try to register the user in with the email, username
    // and password they provided.
    tryToRegisterIn() {
      // return
      this.submitted = true;
      // stop here if form is invalid
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      } else {
        this.tryingToRegister = true;
        //     // Reset the regError if it existed.
        //     this.regError = null;
        if (!this.$v.$invalid) {
          const payload = {
            reference: this.$route.query.id,
            first_name: this.user.first_name,
            last_name: this.user.last_name,
            email: this.user.email,
            country_id: this.user.country_id,
            city: this.user.city,
            gender: this.user.gender,
            // phone_no: this.user.phone_no,
            dob: this.user.dob,
            instagram: this.user.instagram,
            twitter: this.user.twitter,
            ticktok: this.user.ticktok,
            // password: this.user.password,
            // password_confirmation: this.user.password_confirmation,
            terms: "on",
            baseDomain: "customer",
            latitude: document.getElementById('latitute').value,
            longitude:document.getElementById('longitude').value
            };

              
           this.$store
            .dispatch("register", payload)
            .then((response) => {
              if (response.data.status) {
                
                
            this.$store.dispatch(
                  "notification/clear"
                );

           this.$store.dispatch(
                  "notification/success",
                  "Thank you for signing up."
                );
          
          this.$router.push('/account/thanks')
          
              } else {
              
                this.$store.dispatch(
                  "notification/error",
                  response.data.message
                );
              }
            })
            .catch((error) => {
              this.backendErrors = error.response.data.errors;
              if (this.backendErrors) {
                this.$store.dispatch(
                  "notification/error",
                  "There is the Error Please take a Look"
                );
              }
            })
            .catch(() => {
              this.isDisabled = false;
            });
        }
      }
    },
  },
};
</script>

<template>
  <div class="row justify-content-center">
    <div class="col-md-8 col-lg-6 col-xl-5">
      <div class="card">
        <div class="card-body p-4">
          <div class="text-center w-75 m-auto">
            <div class="auth-logo">
              <nuxt-link to="/" class="logo logo-dark text-center">
                <span class="logo-lg">
                  <img src="~/assets/images/logo-dark.png" alt height="22" />
                </span>
              </nuxt-link>

              <nuxt-link to="/" class="logo logo-light text-center">
                <span class="logo-lg">
                  <img src="~/assets/images/logo-light.png" alt height="22" />
                </span>
              </nuxt-link>
            </div>
            <p class="text-muted mb-4 mt-3">
              Don't have an account? Create your own account, it takes less than
              a minute
            </p>
          </div>

          <form ref="register_form" action="#" @submit.prevent="tryToRegisterIn">
            <b-alert
              v-model="registerSuccess"
              class="mt-3"
              variant="success"
              dismissible
              >Registration successfull.</b-alert
            >

            <b-alert
              v-model="isRegisterError"
              class="mt-3"
              variant="danger"
              dismissible
              :show="notificationAutoCloseDuration"
              >{{ regError }}</b-alert
            >

            <b-alert
              :variant="notification.type"
              class="mt-3"
              v-if="notification.message"
              :show="notificationAutoCloseDuration"
              dismissible
              >{{ notification.message }}</b-alert
            >

            <div class="form-group">
              <label for="fullname">
                First Name
                  <span class="text-danger">*</span>
                </label>
              <input
                class="form-control"
                v-model="user.first_name"
                type="text"
                id="first_name"
                placeholder="Enter your first name"
                :class="{
                  'is-invalid': submitted && $v.user.first_name.$error,
                }"
              />
              <div
                v-if="submitted && !$v.user.first_name.required"
                class="invalid-feedback"
              >
                First Name is required.
              </div>
            </div>

            <div class="form-group">
              <label for="fullname">Last Name
                 <span class="text-danger">*</span>
                 </label>
              <input
                class="form-control"
                v-model="user.last_name"
                type="text"
                id="last_name"
                placeholder="Enter your last name"
                :class="{ 'is-invalid': submitted && $v.user.last_name.$error }"
              />
              <div
                v-if="submitted && !$v.user.last_name.required"
                class="invalid-feedback"
              >
                Last Name is required.
              </div>
            </div>
            <div class="form-group">
              <label for="emailaddress">
                Email address
                <span class="text-danger">*</span>
                </label>
              <input
                class="form-control"
                v-model="user.email"
                type="email"
                id="emailaddress"
                :class="{ 'is-invalid': submitted && $v.user.email.$error }"
                placeholder="Enter your email"
              />
              <div
                v-if="submitted && $v.user.email.$error"
                class="invalid-feedback"
              >
                <span v-if="!$v.user.email.required">Email is required.</span>
                <span v-if="!$v.user.email.email"
                  >Please enter valid email.</span
                >
              </div>
              <span v-if="backendErrors.email" class="text-danger">
                {{ backendErrors.email[0] }}
              </span>
            </div>


            <div class="form-group">
              <label for="country">
                Country
                <span class="text-danger">*</span>
              </label>
              <select
              class="form-control"
               v-model="user.country_id"
              :class="{ 'is-invalid': submitted && $v.user.country_id.$error }"

               >
                <option value="">Select</option>
                <option
                  v-for="country in countries"
                  :value="country.id"
                  :key="country.id"
                >
                  {{ country.country_name }}
                </option>
              </select>
              <div
                v-if="submitted && !$v.user.country_id.required"
                class="invalid-feedback"
              >
                Country  is required.
              </div>
              <span v-if="backendErrors.country_id" class="text-danger">
                {{ backendErrors.country_id[0] }}
              </span>
            </div>


              <input id="latitute"  type="hidden" value=""/>
              <input id="longitude" type="hidden" value=""/>


              <div class="form-group">
              <label for="emailaddress">
                Address
                <span class="text-danger">*</span>
                </label>
              <input
                id="address"
                class="form-control"
                type="text"
                placeholder="Enter your Address"
                />
            </div>


            <div class="form-group">
              <label for="fullname">City <span class="text-danger">*</span></label>
              <input
                class="form-control"
                v-model="user.city"
                type="text"
                id="city"
                placeholder="Enter your City"
                :class="{ 'is-invalid': submitted && $v.user.city.$error }"
              />
              <div
                v-if="submitted && !$v.user.last_name.required"
                class="invalid-feedback"
              >
                City is required.
              </div>
            </div>
             <div class="form-group">
              <label for="phno">
                Gender
                <span class="text-danger">*</span>
              </label>
              <select class="form-control"
                :class="{ 'is-invalid': submitted && $v.user.gender.$error }"
               v-model="user.gender">
               <option value=""> Select </option>
                <option
                  v-for="gender in gender_list"
                  :value="gender"
                  :key="gender"
                >
                  {{ gender }}
                </option>
              </select>
              <span v-if="backendErrors.gender" class="text-danger">
                {{ backendErrors.gender[0] }}
              </span>
              <div
                v-if="submitted && !$v.user.gender.required"
                class="invalid-feedback"
              >
                Gender is required.
              </div>

            </div>
            <!-- <div class="form-group">
              <label for="fullname">Phone Number<span class="text-danger">*</span></label>
              <input
                class="form-control"
                v-model="user.phone_no"
                type="text"
                id="phone_no"
                placeholder="Enter your phone_no"
                :class="{ 'is-invalid': submitted && $v.user.phone_no.$error }"
              />
              <div
                v-if="submitted && !$v.user.phone_no.required"
                class="invalid-feedback"
              >
                Phone Number is required.
              </div>
            </div> -->
             <div class="form-group">
              <label for="fullname">Date Of Birth<span class="text-danger">*</span></label>
              <input
                class="form-control"
                v-model="user.dob"
                type="date"
                id="dob"
                placeholder="Enter your Date of Birth"
                :class="{ 'is-invalid': submitted && $v.user.dob.$error }"
              />
              <div
                v-if="submitted && !$v.user.dob.required"
                class="invalid-feedback"
              >
                Date of Birth is required.
              </div>
            </div>
              <div class="form-group">
              <label for="instagram">Instagram</label>
              <input
                class="form-control"
                v-model="user.instagram"
                type="text"
                id="instagram"
                placeholder="Enter your Instagram"
              />
              <!-- <div
                v-if="submitted && !$v.user.instagram.required"
                class="invalid-feedback"
              >
                Instagram is required.
              </div> -->
            </div>

            <div class="form-group">
              <label for="twitter">Twitter</label>
              <input
                class="form-control"
                v-model="user.twitter"
                type="text"
                id="twitter"
                placeholder="Enter your Twitter"
              />
              <!-- <div
                v-if="submitted && !$v.user.twitter.required"
                class="invalid-feedback"
              >
                Twitter is required.
              </div> -->
            </div>

          <div class="form-group">
              <label for="ticktok">TickTok</label>
              <input
                class="form-control"
                v-model="user.ticktok"
                type="text"
                id="ticktok"
                placeholder="Enter your ticktok"
              />
              <!-- <div
                v-if="submitted && !$v.user.ticktok.required"
                class="invalid-feedback"
              >
                ticktok is required.
              </div> -->
            </div>

<!--            <div class="form-group">-->
<!--              <label for="password">Password<span class="text-danger">*</span></label>-->
<!--              <div class="input-group input-group-merge">-->
<!--                <input-->
<!--                  type="password"-->
<!--                  v-model="user.password"-->
<!--                  id="password"-->
<!--                  class="form-control"-->
<!--                  :class="{-->
<!--                    'is-invalid': submitted && $v.user.password.$error,-->
<!--                  }"-->
<!--                  placeholder="Enter your password"-->
<!--                />-->
<!--                <div class="input-group-append" data-password="false">-->
<!--                  <div class="input-group-text">-->
<!--                    <span class="password-eye"></span>-->
<!--                  </div>-->
<!--                </div>-->
<!--                <div-->
<!--                  v-if="submitted && !$v.user.password.required"-->
<!--                  class="invalid-feedback"-->
<!--                >-->
<!--                  Password is required.-->
<!--                </div>-->
<!--              </div>-->
<!--              <span v-if="backendErrors.password" class="text-danger">-->
<!--                {{ backendErrors.password[0] }}-->
<!--              </span>-->
<!--            </div>-->
<!--            <div class="form-group">-->
<!--              <label for="password">Confirm Password</label>-->
<!--              <div class="input-group input-group-merge">-->
<!--                <input-->
<!--                  type="password"-->
<!--                  v-model="user.password_confirmation"-->
<!--                  id="password_confirmation"-->
<!--                  class="form-control"-->
<!--                  :class="{-->
<!--                    'is-invalid':-->
<!--                      submitted && $v.user.password_confirmation.$error,-->
<!--                  }"-->
<!--                  placeholder="Enter your password"-->
<!--                />-->
<!--                <div class="input-group-append" data-password="false">-->
<!--                  <div class="input-group-text">-->
<!--                    <span class="password-eye"></span>-->
<!--                  </div>-->
<!--                </div>-->
<!--                <div-->
<!--                  v-if="submitted && !$v.user.password_confirmation.required"-->
<!--                  class="invalid-feedback"-->
<!--                >-->
<!--                  Confirm Password is required.-->
<!--                </div>-->
<!--              </div>-->
<!--            </div>-->
            <div class="form-group">
              <div class="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  class="custom-control-input"
                  id="checkbox-signup"
                  required
                />
                <label class="custom-control-label" for="checkbox-signup">
                  I accept
                  <a href="javascript: void(0);" class="text-dark"
                    >Terms and Conditions</a
                  >
                </label>
              </div>
            </div>
            <div class="form-group mb-0 text-center">
              <button class="btn btn-primary btn-block" type="submit">
                Sign Up
              </button>
            </div>
          </form>
        </div>
        <!-- end card-body -->
      </div>
      <!-- end card -->

      <div class="row mt-3">
        <div class="col-12 text-center">
          <p class="text-muted">
            Already have account?
            <nuxt-link
              to="/account/login"
              class="text-primary font-weight-medium ml-1"
              >Sign In</nuxt-link
            >
          </p>
        </div>
        <!-- end col -->
      </div>
      <!-- end row -->
    </div>
    <!-- end col -->
  </div>
  <!-- end row -->
</template>
