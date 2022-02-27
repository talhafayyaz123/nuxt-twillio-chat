<template>
  <div>
    <PageHeader :title="title" :items="items" />

    <div v-if="showModal">
      <transition name="modal">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-dialog modal-xl" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h4 class="modal-title text-center">New Message</h4>
                  <button
                    type="button"
                    class="close tyb"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true" @click="showModal = false"
                      >&times;</span
                    >
                  </button>
                </div>

                <div class="modal-body">
                  <div class="members mb-3">
                    <div class="plus-main">
                      <div
                        class="plus-div"
                        v-b-toggle.collapse-1
                        variant="primary"
                      >
                        <i
                          class="fa fa-plus-circle"
                          aria-hidden="true"
                          ref="age_popup_close"
                        ></i>
                      </div>

                      <b-collapse id="collapse-1" class="mt-2">
                        <b-card bg-variant="light">
                          <div class="wrapper">
                            <!-- Sidebar  -->
                            <nav id="sidebar">
                              <ul class="list-unstyled components">
                                <li>
                                  <a href="#" @click="menuList('recipents')">
                                    <span>
                                      <i class="fa fa-user"></i>
                                      Recipients (0)
                                    </span>
                                  </a>
                                </li>

                                <li>
                                  <a href="#" @click="menuList('location')">
                                    <span>
                                      <i class="fa fa-map-marker"></i>
                                      Location
                                    </span>
                                  </a>
                                </li>

                                <li>
                                  <a href="#" @click="menuList('age')">
                                    <span>
                                      <i class="fa fa-user"></i>
                                      Age
                                    </span>
                                  </a>
                                </li>

                                <li>
                                  <a href="#" @click="menuList('join_date')">
                                    <span>
                                      <i class="fa fa-calendar-alt"></i>
                                      Join Date
                                    </span>
                                  </a>
                                </li>

                              </ul>
                            </nav>

                            <!-- Page Content  -->
                            <div id="content" v-if="menuItems.recipentModel">
                              <p>Activity</p>
                              <div class="content-description">
                                <h5>Top 5% Active</h5>
                                <div><span>Members</span></div>
                              </div>
                              <div class="content-description">
                                <h5>Top 10% Active</h5>
                                <div><span>Members</span></div>
                              </div>
                              <div class="content-description">
                                <h5>Top 25% Active</h5>
                                <div><span>Members</span></div>
                              </div>
                              <div class="content-description">
                                <h5>Everyone</h5>
                                <div>
                                  <span
                                    >{{ recipents.total_fans }} Members</span
                                  >
                                </div>
                              </div>

                              <p>Gender</p>
                              <div class="content-description">
                                <h5>Male</h5>
                                <div>
                                  <span
                                    >{{ recipents.total_males }} Members</span
                                  >
                                </div>
                              </div>
                              <div class="content-description">
                                <h5>Female</h5>
                                <div>
                                  <span
                                    >{{ recipents.total_females }} Members</span
                                  >
                                </div>
                              </div>
                            </div>

                            <joinDate
                              v-if="menuItems.joinDateModel"
                              @closeModel="applyAgeFilter"
                            ></joinDate>

                            <div id="content" v-if="menuItems.locationModel">
                              <h4>Location</h4>


                                
                              <b-input-group>

                                <b-form-input
                                  class="LoginInput"
                                  id="radius"
                                    v-model="radius"
                                  size="lg"
                                  type="number"
                                  placeholder="Type Radius in KM to draw circle in map"
                                >
                                </b-form-input>

                                <br><br>
                                
                              </b-input-group>

                              <b-input-group>
                                <b-input-group-prepend>
                                  <span class="input-group-text"
                                    ><i class="fa fa-search"></i
                                  ></span>
                                </b-input-group-prepend>
                                <b-form-input
                                  class="LoginInput"
                                  id="addressLine"
                                  ref="tyb"
                                  size="lg"
                                  placeholder="Type the name of a country,city or state"
                                >
                                </b-form-input>
                                
                              </b-input-group>
                               
                              <div class="content-description mt-3 mb-3">
                             <div id="map_container"><div id="locationmap"></div></div>
                              </div>

                              <div class="content-description mt-3 mb-3">
                                <h5>Los Angeles, CA</h5>
                                <div><span>City 34 Members</span></div>
                              </div>
                              <div class="content-description mt-3 mb-3">
                                <h5>New York, NY</h5>
                                <div><span>City 34 Members</span></div>
                              </div>
                            </div>

                            <div id="content" v-if="menuItems.ageModel">
                              <h4>Age</h4>
                              <div class="content-description mt-3 mb-3">
                                <h5>
                                  <span
                                    v-on:click="
                                      ageFilterColor('eighteen_above')
                                    "
                                    v-bind:class="{
                                      'text-primary': colors.eighteen_above,
                                    }"
                                  >
                                    18+</span
                                  >
                                </h5>
                                <div>
                                  <span
                                    >{{ recipents.eighteen_plus }} Members</span
                                  >
                                </div>
                              </div>
                              <div class="content-description mt-3 mb-3">
                                <h5>
                                  <span
                                    v-on:click="
                                      ageFilterColor('twenty_one_above')
                                    "
                                    v-bind:class="{
                                      'text-primary': colors.twenty_one_above,
                                    }"
                                  >
                                    21+</span
                                  >
                                </h5>
                                <div>
                                  <span
                                    >{{
                                      recipents.twenty_one_plus
                                    }}
                                    Members</span
                                  >
                                </div>
                              </div>
                              <div>
                                <h5>Custom Age</h5>
                                <div class="d-flex">
                                  <b-form-select
                                    :options="ageOptions"
                                    v-model="ageFilter.age_type"
                                    class="w-50 mr-2"
                                  ></b-form-select>
                                  <button
                                    class="btn btn-primary"
                                    @click="applyAgeFilter()"
                                  >
                                    Apply
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </b-card>
                      </b-collapse>
                    </div>

                    <h5 v-if="ageFilter.age_type == 'Between'">
                      To: Members between 18+ and 21+
                    </h5>

                    <div v-if="ageFilter.age_type == 'Under'">
                      <h5 v-if="colors.eighteen_above">To: Members Under 18</h5>
                      <h5 v-else>To: Members Under 21</h5>
                    </div>

                    <div v-if="ageFilter.age_type == 'Over'">
                      <h5 v-if="colors.eighteen_above">To: Members Over 18</h5>
                      <h5 v-else>To: Members Over 21</h5>
                    </div>

                    <div v-if="ageFilter.age_type == 'Excatly'">
                      <h5 v-if="colors.eighteen_above">
                        To: Members Excatly 18
                      </h5>
                      <h5 v-else>To: Members Excatly 21</h5>
                    </div>
                  </div>
                  <div class="excluding mb-3">
                    <h5>Excluding:</h5>
                  </div>

                  <div class="message-box mb-3">
                    <textarea
                      name="custom_message"
                      id="custom_message"
                      cols="30"
                      rows="10"
                      class="form-control"
                      placeholder="Enter Your Message"
                      v-model="form.custom_message"
                    ></textarea>
                    <span class="icons">
                      <i class="fa fa-images" aria-hidden="true"></i>
                      <i class="fa fa-smile ml-1" aria-hidden="true"></i>
                      <i class="fa fa-file ml-1" aria-hidden="true"></i>
                    </span>
                  </div>
                  <div class="d-flex justify-content-between">
                    <button class="btn btn-light">Schedule</button>
                    <button class="btn btn-primary" @click="sendCustomMessage">
                      Send
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>

    <div class="row">
      <!-- start chat users-->

      <div class="col-xl-3 col-lg-4">
        <div class="card">
          <div class="card-body">
            <div class="media mb-3">
              <img
                v-if="$auth.user.profile_photo_path != null"
                :src="$auth.user.profile_photo_path"
                class="mr-2 rounded-circle"
                height="42"
                alt="Brandon Smith"
              />
              <img
                v-else
                src="~/assets/images/users/avatar-1.jpg"
                class="mr-2 rounded-circle"
                height="42"
                alt="Brandon Smith"
              />
              <div class="media-body">
                <h5 class="mt-0 mb-0 font-15">
                  <!--                  <nuxt-link to="/contacts/profile" class="text-reset">-->
                  {{ this.$auth.user.name }}

                  <!--                  </nuxt-link>-->
                </h5>
                <p class="mt-1 mb-0 text-muted font-14">
                  <small class="mdi mdi-circle text-success"></small> Online
                </p>
              </div>
              <div>
                <a href="javascript: void(0);" class="text-reset font-20">
                  <i class="mdi mdi-cog-outline"></i>
                </a>
              </div>
            </div>

            <!-- start search box -->
            <form class="search-bar mb-3">
              <div class="position-relative">
                <input
                  type="text"
                  class="form-control form-control-light"
                  placeholder="People, groups & messages..."
                />
                <span class="mdi mdi-magnify"></span>
              </div>
            </form>
            <!-- end search box -->

            <h6 class="font-13 text-muted text-uppercase mb-2">Contacts</h6>

            <!-- users -->
            <div class="row">
              <div class="col">
                <simplebar
                  data-simplebar
                  style="max-height: 498px"
                  v-if="chatData"
                >
                  <a
                    href="javascript:void(0);"
                    class="text-body"
                    v-for="(item, index) in chatData"
                    :key="index"
                    v-if="item"
                    @click="
                      chatUsername(
                        item.id,
                        item.fan.fname,
                        '~/assets/images/users/default.png',
                        item.local_number
                      )
                    "
                  >
                    <div class="media p-2">
                      <div class="position-relative">
                        <span class="user-status online"></span>
                        <!--                         <span-->
                        <!--                          class="user-status"-->
                        <!--                          :class="{-->
                        <!--                            online: item.status === 'online',-->
                        <!--                            busy: item.status === 'away',-->
                        <!--                            'do-not-disturb': item.status === 'do-not-disturb',-->
                        <!--                          }"-->
                        <!--                        ></span> -->
                        <!--                        <img v-if="item.fan.profile_photo_path"-->
                        <!--                          :src="item.fan.profile_photo_path"-->
                        <!--                          class="mr-2 rounded-circle"-->
                        <!--                          height="42"-->
                        <!--                          alt="user"-->
                        <!--                        />-->
                        <img
                          src="~/assets/images/users/default.png"
                          class="mr-2 rounded-circle"
                          height="42"
                          alt="user"
                        />
                      </div>
                      <div class="media-body">
                        <h5 class="mt-0 mb-0 font-14">
                          <span
                            class="
                              float-right
                              text-muted
                              font-weight-normal font-12
                            "
                          >
                          </span>
                          {{ item.fan.fname }}
                        </h5>
                        <p class="mt-1 mb-0 text-muted font-14">
                          <span class="w-75"> {{ item.local_number }} </span>
                        </p>
                        <!--  <p v-if="item.message[0]" class="mt-1 mb-0 text-muted font-14">
                           <span class="w-75">{{ item.message[0].message }}</span>
                         </p> -->
                      </div>
                    </div>
                  </a>
                </simplebar>
                <!-- end slimscroll-->
              </div>
              <!-- End col -->
            </div>
            <!-- end users -->
          </div>
          <!-- end card-body-->
        </div>
        <!-- end card-->
      </div>
      <!-- end chat users-->

      <!-- chat area -->

      <div class="col-xl-9 col-lg-8">
        <div class="card">
          <div class="card-body py-2 px-3 border-bottom border-light">
            <div class="media p-2">
              <div class="position-relative">
                <b-alert
                  :variant="notification.type"
                  class="mt-3"
                  v-if="notification.message"
                  :show="notificationAutoCloseDuration"
                  dismissible
                >
                  {{ notification.message }}
                </b-alert>
              </div>

              <div class="position-relative" style="left: 83%">
                <button @click="showModal = true" class="btn btn-primary mt-2">
                  New Message
                </button>
              </div>

              <div class="position-relative" v-if="username">
                <span class="user-status online"></span>
                <!--                         <span-->
                <!--                          class="user-status"-->
                <!--                          :class="{-->
                <!--                            online: item.status === 'online',-->
                <!--                            busy: item.status === 'away',-->
                <!--                            'do-not-disturb': item.status === 'do-not-disturb',-->
                <!--                          }"-->
                <!--                        ></span> -->
                <!--                        <img v-if="item.fan.profile_photo_path"-->
                <!--                          :src="item.fan.profile_photo_path"-->
                <!--                          class="mr-2 rounded-circle"-->
                <!--                          height="42"-->
                <!--                          alt="user"-->
                <!--                        />-->
                <img
                  src="~/assets/images/users/default.png"
                  class="mr-2 rounded-circle"
                  height="42"
                  alt="user"
                />
              </div>

              <div class="media-body">
                <h5 class="mt-0 mb-0 font-14">
                  <span
                    class="float-right text-muted font-weight-normal font-12"
                  >
                    <!--                             {{  formatDate(item.user.created_at) }}-->
                  </span>
                  {{ username }}
                </h5>
                <p class="mt-1 mb-0 text-muted font-14">
                  <span class="w-75"> {{ receiver_number }} </span>
                </p>
                <!--  <p v-if="item.message[0]" class="mt-1 mb-0 text-muted font-14">
                   <span class="w-75">{{ item.message[0].message }}</span>
                 </p> -->
              </div>
            </div>
          </div>

          <div class="card-body">
            <simplebar data-simplebar style="max-height: 460px">
              <ul class="conversation-list chat-app-conversation" ref="test">
                <template v-if="chatMessages">
                  <li
                    class="clearfix"
                    v-for="(data, index) in chatMessages"
                    :key="index"
                    :id="`m-${data.timestamp}`"
                    :class="{ odd: data.align === 'right' }"
                  >
                    <div class="chat-avatar">
                      <span v-if="data.align === 'right'">
                        <img
                          v-if="$auth.user.profile_photo_path"
                          :src="$auth.user.profile_photo_path"
                          class="rounded"
                          alt="James Z"
                        />
                        <img
                          v-else
                          src="~/assets/images/users/avatar-1.jpg"
                          class="rounded"
                          alt="James Z"
                        />
                      </span>
                      <span v-else>
                        <img
                          src="~/assets/images/users/default.png"
                          class="rounded"
                          alt="James Z"
                        />
                      </span>
                    </div>
                    <div class="conversation-text">
                      <div class="ctext-wrap">
                        <i>{{ data.from }}</i>
                        <p v-html="data.message"></p>
                      </div>
                      <br />
                      <i>{{ data.time }}</i>

                      <div
                        class="card mt-2 mb-1 shadow-none border text-left"
                        v-if="data.file === true"
                      >
                        <div class="p-2">
                          <div class="row align-items-center">
                            <div class="col-auto">
                              <div class="avatar-sm">
                                <span class="avatar-title bg-primary rounded"
                                  >PDF</span
                                >
                              </div>
                            </div>
                            <div class="col pl-0">
                              <a
                                href="javascript:void(0);"
                                class="text-muted font-weight-medium"
                                >minton-presentation.pdf</a
                              >
                              <p class="mb-0">2.3 MB</p>
                            </div>
                            <div class="col-auto">
                              <!-- Button -->
                              <a
                                href="javascript:void(0);"
                                class="btn btn-link btn-lg text-muted"
                              >
                                <i class="dripicons-download"></i>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <!--                    <b-dropdown-->
                    <!--                      class="conversation-actions"-->
                    <!--                      toggle-class="btn-sm btn-link text-reset p-0"-->
                    <!--                      variant="black"-->
                    <!--                      right-->
                    <!--                    >-->
                    <!--                      <template v-slot:button-content>-->
                    <!--                        <i class="mdi mdi-dots-vertical font-18"></i>-->
                    <!--                      </template>-->
                    <!--                      <a class="dropdown-item" href="#">Copy Message</a>-->
                    <!--                      <a class="dropdown-item" href="#">Edit</a>-->
                    <!--                      <a class="dropdown-item" href="#">Delete</a>-->
                    <!--                    </b-dropdown>-->
                  </li>
                </template>
              </ul>
            </simplebar>
            <div class="row">
              <div class="col">
                <div class="mt-2 bg-light p-3 rounded">
                  <form
                    class="needs-validation"
                    @submit.prevent="formSubmit"
                    name="chat-form"
                    id="chat-form"
                  >
                    <div class="row">
                      <div class="col mb-2 mb-sm-0">
                        <input
                          type="text"
                          v-model="form.message"
                          class="form-control border-0"
                          placeholder="Enter your text"
                        />
                        <div
                          v-if="submitted && $v.form.message.$error"
                          class="invalid-feedback"
                        >
                          <span v-if="!$v.form.message.required"
                            >Please enter your message</span
                          >
                        </div>
                      </div>
                      <div class="col-sm-auto">
                        <div class="btn-group">
                          <a href="#" class="btn btn-light">
                            <i class="fe-paperclip"></i>
                          </a>
                          <button
                            type="submit"
                            @click="send_messages()"
                            class="btn btn-success chat-send btn-block"
                          >
                            <i class="fe-send"></i>
                          </button>
                        </div>
                      </div>
                      <!-- end col -->
                    </div>
                    <!-- end row-->
                  </form>
                </div>
              </div>
              <!-- end col-->
            </div>
            <!-- end row -->
          </div>
          <!-- end card-body -->
        </div>
        <!-- end card -->
      </div>
      <!-- end chat area-->
    </div>
    <!-- end row-->
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import joinDate from "~/components/widgets/chat/join_date";
/**
 * Chat comoponent
 */
export default {
  head() {
    return {
      title: `${this.title} | Minton - Nuxtjs Responsive Admin Dashboard Template`,
    };
  },
  components: {
    joinDate: joinDate,
  },
  data() {
    return {
      showModal: false,
      menuItems: {
        joinDateModel: false,
        recipentModel: true,
        ageModel: false,
        locationModel: false,
      },
      ageOptions: [
        { value: "Between", text: "Between" },
        { value: "Under", text: "Under" },
        { value: "Over", text: "Over" },
        { value: "Excatly", text: "Excatly" },
      ],
      backendErrors: [],
      chatData: [],
      chatMessages: [],
      recipents: [],
      title: "Chat",
      colors: {
        eighteen_above: false,
        twenty_one_above: false,

        last24hours: false,
        last7days: false,
        last30days: false,
      },
      items: [
        {
          text: "Minton",
        },
        {
          text: "Apps",
        },
        {
          text: "Chat",
          active: true,
        },
      ],
      submitted: false,
      form: {
        message: "",
        custom_message: "",
      },
      username: "",
      status: "",
      image: "",
      receiver_id: "",
      receiver_number: "",
      radius:'',
      filter_type: "recipents",
      ageFilter: {
        age_type: "",
      },
    };
  },
  validations: {
    form: {
      message: {
        required,
      },
    },
  },
  computed: {
    notification() {
      return this.$store ? this.$store.state.notification : null;
    },
    notificationAutoCloseDuration() {
      return this.$store && this.$store.state.notification ? 7 : 0;
    },
  },
  methods: {
    menuList(type) {
      if (type == "join_date") {
        this.menuItems.joinDateModel = true;
        this.menuItems.recipentModel = false;
        this.menuItems.ageModel = false;
        this.menuItems.locationModel = false;
        this.filter_type = "join_date";
      } else if (type == "recipents") {
        this.menuItems.recipentModel = true;
        this.menuItems.joinDateModel = false;
        this.menuItems.ageModel = false;
        this.menuItems.locationModel = false;
        this.filter_type = "recipents";
      } else if (type == "age") {
        this.menuItems.recipentModel = false;
        this.menuItems.joinDateModel = false;
        this.menuItems.ageModel = true;
        this.menuItems.locationModel = false;
        this.filter_type = "age";
      } else if (type == "location") {
        this.menuItems.recipentModel = false;
        this.menuItems.joinDateModel = false;
        this.menuItems.ageModel = false;
        this.menuItems.locationModel = true;
        this.filter_type = "location";

        var defaultBounds = new google.maps.LatLngBounds(
          new google.maps.LatLng(-33.8902, 151.1759),
          new google.maps.LatLng(-33.8474, 151.2631)
        );

           
              

        setTimeout(() => {
          var input = document.getElementById("addressLine");
const map = new google.maps.Map(
            document.getElementById("locationmap"),
            {
              zoom: 8,
              center: { lat: -33.8902, lng: 151.1759 },
              mapTypeId: "terrain",
            }
          )
        

          var options = {
            bounds: defaultBounds,
            types: ["establishment"],
          };

          var autocomplete = new google.maps.places.Autocomplete(
            input,
            options
          );
          google.maps.event.addListener(
            autocomplete,
            "place_changed",
            function () {
              var place = autocomplete.getPlace();
              var latitude = place.geometry.location.lat();
              var longitude = place.geometry.location.lng();
              const map = new google.maps.Map(
            document.getElementById("locationmap"),
            {
              zoom: 11,
              center: { lat: latitude, lng: longitude },
              mapTypeId: "terrain",
            }
          );
                  console.log( document.getElementById("radius").value);
              if( document.getElementById("radius").value!='undefined '){
                 const cityCircle = new google.maps.Circle({
                strokeColor: "#FF0000",
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: "#FF0000",
                fillOpacity: 0.35,
                map,
                center: { lat: latitude, lng: longitude },
                radius: Math.sqrt( document.getElementById("radius").value*1000) * 100,
              });
              }
             



            }
          );
        }, 3000);
      }
    },
    sendCustomMessage() {
      let filterRecord = this.$store.state.chat;

      let payload;

      if (this.filter_type == "age") {
        payload = {
          type: this.ageFilter.age_type,
          eighteen_above: this.colors.eighteen_above,
          twenty_one_above: this.colors.twenty_one_above,
          message: this.form.custom_message,
          filter_type: this.filter_type,
        };
      } else if (this.filter_type == "join_date") {
        payload = {
          type: filterRecord.data.value,
          last24hours: filterRecord.data.last24hours,
          last7days: filterRecord.data.last7days,
          last30days: filterRecord.data.last30days,
          message: this.form.custom_message,
          filter_type: this.filter_type,
        };
      }

      this.showModal = false;
      this.$store.dispatch(
        "notification/success",
        "Message has been send Successfully!"
      );
      this.$store
        .dispatch("chat/sendMessageToContents", payload)
        .then((response) => {})
        .catch((error) => {
          this.backendErrors = error.response.data.errors;
        })
        .catch(() => {
          this.isDisabled = false;
        });
    },
    ageFilterColor(type) {
      if (type == "eighteen_above") {
        this.colors.eighteen_above = !this.colors.eighteen_above;
      } else if (type == "twenty_one_above") {
        this.colors.twenty_one_above = !this.colors.twenty_one_above;
      }
    },
    applyAgeFilter() {
      this.$refs.age_popup_close.click();
    },
    formatDate(date) {
      const options = { year: "numeric", month: "numeric", day: "numeric" };
      return new Date(date).toLocaleDateString("en", options);
    },
    send_messages() {
      const payload = {
        receiver_number: this.receiver_number,
        receiver_id: this.receiver_id,
        message: this.form.message,
      };

      if (this.receiver_id) {
        this.$store
          .dispatch("chat/saveMessage", payload)
          .then((response) => {})
          .catch((error) => {
            this.backendErrors = error.response.data.errors;
          })
          .catch(() => {
            this.isDisabled = false;
          });
      }
    },
    async getChatMessages() {
      const chat_contacts = await this.$axios.$get("/get_chat_contacts");
      this.chatData = chat_contacts.data;
    },

    async getRecipents() {
      const recipents = await this.$axios.$get("/recipent_count");
      this.recipents = recipents.data;
    },

    /**
     * Get the name of user
     */
    async chatUsername(id, name, image, phone_no) {
      this.receiver_id = id;
      this.username = name;
      this.status = "online";
      this.image = image;
      this.receiver_number = phone_no;

      const messages = await this.$axios.$get("/get_chat_users/" + id);
      //  this.chatMessages= messages.data

      let arr = [];
      Object.entries(messages.data).forEach((ob) => {
        arr.push(ob[1]);
      });
      // this.chatMessages = arr.slice().reverse()
      this.chatMessages = arr;
    },

    /**
     * Char form Submit
     */
    // eslint-disable-next-line no-unused-vars
    formSubmit(e) {
      this.submitted = true;

      // stop here if form is invalid
      this.$v.$touch();

      if (this.$v.$invalid) {
        return;
      } else {
        const message = this.form.message;
        const currentDate = new Date();

        if (this.receiver_id) {
          if (Object.keys(this.chatMessages).length == 0) {
            this.chatMessages = [
              {
                align: "right",
                name: `${this.$auth.user.name}`,
                message,
                direction: "outbound-api",
                id: 0,
                to: this.receiver_number,
                from: `${this.$auth.user.phone_no}`,
                time: currentDate.getHours() + ":" + currentDate.getMinutes(),
                image: `${this.$auth.user.profile_photo_path}`,
              },
            ];
          } else {
            this.chatMessages.push({
              align: "right",
              name: `${this.$auth.user.name}`,
              message,
              direction: "outbound-api",
              id: 0,
              to: this.receiver_number,
              from: `${this.$auth.user.phone_no}`,
              time: currentDate.getHours() + ":" + currentDate.getMinutes(),
              image: `${this.$auth.user.profile_photo_path}`,
            });
          }
        }
      }
      this.submitted = false;
      this.form = {};
    },
  },

  mounted() {

    
    const newMessages = this.chatMessages;

    this.getChatMessages();

    this.getRecipents();

    this.$echo
      .channel(`chat.${this.$auth.user.user_uuid}`)
      .on("chat.event", (res) => {
        if (this.receiver_id == res.data.sender_id) {
          if (Object.keys(this.chatMessages).length == 0) {
            this.chatMessages = [
              {
                name: this.name,
                message: res.data.message,
                // time: res.data.created_at,
                image: this.image,
                align: res.data.align,
                direction: res.data.direction,
                from: this.receiver_number,
                timestamp: res.data.timestamp,
              },
            ];

            this.$nextTick(function () {
              let length = this.chatMessages.length;

              if (length > 0) {
                let id = this.chatMessages[length - 1].timestamp;
                let element = document.getElementById("m-" + id);
                element.scrollIntoView({ behavior: "smooth", block: "end" });
              }
            });
          } else {
            this.chatMessages.push({
              name: this.name,
              message: res.data.message,
              // time: res.data.created_at,
              image: this.image,
              align: res.data.align,
              direction: res.data.direction,
              from: this.receiver_number,
              timestamp: res.data.timestamp,
            });

            this.$nextTick(function () {
              let length = this.chatMessages.length;

              if (length > 0) {
                let id = this.chatMessages[length - 1].timestamp;
                let element = document.getElementById("m-" + id);
                element.scrollIntoView({ behavior: "smooth", block: "end" });
              }
            });
          }
        }
      });

    this.$echo
      .channel(`user.${this.$auth.user.user_uuid}`)
      .on("user.event", (record) => {
        this.getChatMessages();
        // let data = {
        //   created_at: "",
        //   fan_club_uuid: "",
        //   fan_id: 0,
        //   id: 0,
        //   local_number: "",
        //   temp_id: "",
        //   user: record.data
        // }
        // this.chatData.push(data);
      });
  },
  middleware: "router-auth",
};
</script>
<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: top;
}
.members {
  border: 1px solid #4f5d6b;
  border-radius: 4px;
  min-height: 90px;
  padding: 15px;
  position: relative;
}
.excluding {
  border: 1px solid #4f5d6b;
  border-radius: 4px;
  min-height: 60px;
  padding: 15px;
}
.message-box {
  position: relative;
}
.icons {
  position: absolute;
  bottom: 0px;
  left: 10px;
}
.plus-div i {
  font-size: 24px;
}

.plus-div {
  position: absolute;
  right: 15px;
  top: 15px;
}

.modal-body {
  position: relative;
}

/************ Card Style *******************/

a,
a:hover,
a:focus {
  color: inherit;
  text-decoration: none;
  transition: all 0.3s;
}

.navbar {
  padding: 15px 10px;
  background: #fff;
  border: none;
  border-radius: 0;
  margin-bottom: 40px;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
}

.navbar-btn {
  box-shadow: none;
  outline: none !important;
  border: none;
}

.line {
  width: 100%;
  height: 1px;
  border-bottom: 1px dashed #ddd;
  margin: 40px 0;
}
.content-description {
  border-bottom: 1px solid lightgray;
}

/* ---------------------------------------------------
    SIDEBAR STYLE
----------------------------------------------------- */

/*
 *  STYLE 8
 */

#content::-webkit-scrollbar-track {
  border: 1px solid #4a5c6d;
  background-color: #6d7277;
}

#content::-webkit-scrollbar {
  width: 6px;
  background-color: #6d7277;
}

#content::-webkit-scrollbar-thumb {
  background-color: #4a5c6d;
}

.wrapper {
  display: flex;
  width: 100%;
  align-items: stretch;
}

#sidebar {
  min-width: 250px;
  max-width: 250px;
  background: #f3f4f6;
  color: #4a5c6d;
  transition: all 0.3s;
}

#sidebar.active {
  margin-left: -250px;
}

#sidebar .sidebar-header {
  padding: 20px;
  background: #6d7fcc;
}

#sidebar ul.components {
  padding: 20px 0;
}

#sidebar ul p {
  color: #fff;
  padding: 10px;
}

#sidebar ul li a {
  padding: 10px;
  font-size: 1.1em;
  display: block;
}

#sidebar ul li a:hover {
  color: #4a5c6d;
  background: #e0fbff;
}

#sidebar ul li.active > a,
a[aria-expanded="true"] {
  color: #fff;
  background: #6d7fcc;
}

a[data-toggle="collapse"] {
  position: relative;
}

.dropdown-toggle::after {
  display: block;
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
}

ul ul a {
  font-size: 0.9em !important;
  padding-left: 30px !important;
  background: #6d7fcc;
}

ul.CTAs {
  padding: 20px;
}

ul.CTAs a {
  text-align: center;
  font-size: 0.9em !important;
  display: block;
  border-radius: 5px;
  margin-bottom: 5px;
}

a.download {
  background: #fff;
  color: #7386d5;
}

a.article,
a.article:hover {
  background: #6d7fcc !important;
  color: #fff !important;
}

/* ---------------------------------------------------
    CONTENT STYLE
----------------------------------------------------- */

#content {
  width: 100%;
  padding: 20px;
  height: 600px;
  overflow-y: scroll;
  overflow-x: hidden;
  transition: all 0.3s;
}

/* ---------------------------------------------------
    MEDIAQUERIES
----------------------------------------------------- */

@media (max-width: 768px) {
  #sidebar {
    margin-left: -270px;
  }
  #sidebar.active {
    margin-left: 0;
  }
  #sidebarCollapse span {
    display: none;
  }
}

@media (min-width: 1367px) {
  #content {
    width: 860px;
  }
}

@media (max-width: 992px) {
  #content {
    width: 200px;
  }
}

@media (max-width: 768px) {
  #content {
    width: 330px;
  }
}
</style>
