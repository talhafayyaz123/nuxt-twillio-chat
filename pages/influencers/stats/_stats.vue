<template>
  <div>
    <PageHeader :title="title" :items="items" />
    <div class="row">
      <div class="col-lg-8 mx-auto">
        <div class="card">
          <div class="card-body">
            <div class="card-body pt-0">
              <div class="table-responsive mb-0">
                <table class="table table-hover table-centered mb-0">
                  <thead>
                    <tr>
                      <th>Contact history</th>
                    </tr>
                  </thead>
                  <tbody>
                    <template v-if="history">
                      <tr>
                        <td v-if="history">
                          {{ history }}
                        </td>
                        <td v-else>
                          <h1>There is no history against this contact</h1>
                        </td>
                      </tr>
                    </template>
                  </tbody>
                </table>
              </div>
            </div>
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
      title: `${this.title} | In Fluencer`,
    };
  },
  data() {
    return {
      title: "History",
      history: "",
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
      email: "",
      phone_no: "",
      password: "",
      country_id: "",
      twilio_id: "",
      backendErrors: {},
      submitted: false,
      countries: [],
      user: [],
    };
  },
  validations: {
    email: {
      required,
      email,
    },
    fname: {
      required,
    },
    lname: {
      required,
    },
    phone_no: {
      required,
    },

    country_id: {
      required,
    },
  },
  methods: {
    // Try to register the user in with the email, username
    // and password they provided.
    updateInfluencer() {
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
            user_uuid: this.$route.params.edit,
            fname: this.fname,
            lname: this.lname,
            email: this.email,
            phone_no: this.phone_no,
            country_id: this.country_id,
          };
          if (this.password) {
            payload.password = this.password;
          }

          this.$store
            .dispatch("updateInfluencer", payload)
            .then((response) => {
              this.$router.push("/influencers");
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
    getDropdown() {
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
  },
  created() {
          this.$store.dispatch("spinner/success", "single_loader");
    const payload = {
      uuid: this.$route.params.stats,
    };

    this.$store
      .dispatch("getUserstats", payload)
      .then((response) => {
              this.$store.dispatch("spinner/clear", "");

        this.history = response.data.data;
      })
      .catch((error) => {
        this.backendErrors = error.response.data.errors;
              this.$store.dispatch("spinner/clear", "");

      })
      .catch(() => {
              this.$store.dispatch("spinner/clear", "");

        this.isDisabled = false;
      });
    //////////////////////////////
  },
  middleware: "router-auth",
};
</script>
