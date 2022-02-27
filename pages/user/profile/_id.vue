<template>
  <div>
    <PageHeader :title="title" :items="items" />
    <div class="row">
      <div class="col-lg-8 mx-auto">
        <div class="card">
          <div class="card-body">
            <!-- <h4 class="header-title m-t-0">Add Users Form</h4> -->
            <form action="#" @submit.prevent="updateUser">

               <b-alert
                :variant="notification.type" 
                class="mt-3" 
                v-if="notification.message" 
                :show="notificationAutoCloseDuration" 
                dismissible>
                {{notification.message}}
                </b-alert>


              <div class="form-group">
                <label for="fname">First Name</label>
                <input
                  class="form-control "
                  v-model="fname"
                  type="text"
                  id="fname"
                  placeholder="Enter your first name"
                  :class="{ 'is-invalid': submitted && $v.fname.$error }"
                />
                <div
                  v-if="submitted && !$v.fname.required"
                  class="invalid-feedback"
                >
                  First Name is required.
                </div>
                <span v-if="backendErrors.fname" class="text-danger">
                  {{ backendErrors.fname[0] }}
                </span>
              </div>

              <div class="form-group">
                <label for="fname">Last Name</label>
                <input
                  class="form-control disabled"
                  v-model="lname"
                  type="text"
                  id="lname"
                  placeholder="Enter your Last name"
                  :class="{ 'is-invalid': submitted && $v.lname.$error }"
                />
                <div
                  v-if="submitted && !$v.lname.required"
                  class="invalid-feedback"
                >
                  Last Name is required.
                </div>
                <span v-if="backendErrors.lname" class="text-danger">
                  {{ backendErrors.lname[0] }}
                </span>
              </div>

              <div class="form-group">
                <label for="fname">Password</label>
                <input
                  class="form-control"
                  v-model="password"
                  type="text"
                  id="password"
                  placeholder="Enter your password"
                />
              </div>

              <div class="form-group">
                <label for="phno">
                  Image
                  <span class="text-danger">*</span>
                </label>
                <input
                  ref="fileInput"
                  type="file"
                  @input="pickFile"
                  class="form-control"
                  placeholder="Choose File"
                />

                <div v-if="previewImage != null"
                  class="imagePreviewWrapper mt-3"
                  :style="{ 'background-image': `url(${previewImage})` }"
                  @click="selectImage"
                >
                </div>

                 <div v-else
                  class="imagePreviewWrapper mt-3"
                  :style="{ 'background-image': `url(${$auth.user.profile_photo_path})` }"
                  @click="selectImage"
                ></div>


              </div>



              <div class="form-group text-right m-b-0">
                <button class="btn btn-primary" type="submit">Submit</button>
                <NuxtLink to="/" class="btn btn-secondary m-l-5 ml-1">
                  Cancel
                </NuxtLink>
              </div>
            </form>
          </div>
        </div>
        <!-- end card-box -->
      </div>
      <!-- end col -->
    </div>
    <!-- end row -->
  </div>
</template>

<script>
/**
 * Form Validation component
 */
import { required, email } from "vuelidate/lib/validators";

export default {
  name: "add",
  head() {
    return {
      title: `${this.title} | Profile Update`,
    };
  },
  data() {
    return {
      title: "Profile Update ",
      items: [
        {
          text: "In Fluencer",
          to: "/",
        },
        {
          text: "Edit Form",
          active: true,
        },
      ],
      fname: "",
      lname: "",
      file: null,
      previewImage: null,
      // email: "",
      // phone_no: "",
      password: "",
      // country_id: "",
      // twilio_id: "",
      backendErrors: {},
      submitted: false,
      countries: [],
      user: [],
    };
  },
  computed: {
        notification() {
            return this.$store ? this.$store.state.notification : null;
        },
        notificationAutoCloseDuration() {
            return this.$store && this.$store.state.notification ? 7 : 0;
        },
    },
  validations: {

    fname: {
      required,
    },
    lname: {
      required,
    },
  },
  methods: {
    // Try to register the user in with the email, username
    // and password they provided.
    updateUser() {
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
          const payload = new FormData();
          payload.append("fname", this.fname);
          payload.append("lname", this.lname);
          payload.append("previewImage", this.file);
          payload.append("password", this.password);
          payload.append("user_uuid", this.$route.params.id);
     
          this.$store
            .dispatch("updateUser", payload)
            .then((response) => {
              this.$auth.$storage.setUniversal('user', response.data.data.user)
                
                this.$store.dispatch(
                  "notification/success",
                  "Profile has been updated Successfully!"
                );
                   var store=this.$store;
            setTimeout(function(){
               store.dispatch(
                  "notification/clear"
                );
            }, 7000);

              // this.$router.push("/influencers");
            })
            .catch((error) => {
              this.backendErrors = error.response.data.errors;
            })
            .catch(() => {
              this.isDisabled = false;
            });
        }
      }
    },
    selectImage() {
      this.$refs.fileInput.click();
    },
    pickFile() {
      let input = this.$refs.fileInput;
      let file = input.files;
      if (file && file[0]) {
        this.file = file[0]
        let reader = new FileReader();
        reader.onload = (e) => {
          this.previewImage = e.target.result;
        };
        reader.readAsDataURL(file[0]);
        this.$emit("input", file[0]);
      }
    },
  },
  created() {
   
    const payload = {
      uuid: this.$route.params.id,
    };

    this.$store
      .dispatch("getUserDetail", payload)
      .then((response) => {
        const user = response.data.data.user_detail;
        this.fname = user.fname ? user.fname : user.name;
        this.lname = user.lname;
        this.email = user.email;
        this.phone_no = user.phone_no;
        this.country_id = user.country_id;
        this.getDropdown();
      })
      .catch((error) => {
        this.backendErrors = error.response.data.errors;
      })
      .catch(() => {
        this.isDisabled = false;
      });
    //////////////////////////////
  },
  middleware: "router-auth",
};
</script>

<style scoped lang="scss">
.imagePreviewWrapper {
  width: 250px;
  height: 250px;
  display: block;
  cursor: pointer;
  background-size: cover;
  background-position: center center;
}
</style>
