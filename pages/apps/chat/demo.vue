<template>
  <div>
    <div id="app">
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
                      class="close"
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
                          <i class="fa fa-plus-circle" aria-hidden="true"></i>
                        </div>
                        <b-collapse id="collapse-1" class="mt-2">
                          <b-card bg-variant="light">
                            <div class="wrapper">
                              <!-- Sidebar  -->
                              <nav id="sidebar">
                                <ul class="list-unstyled components">
                                  <li>
                                    <a href="#">
                                      <span>
                                        <i class="fa fa-user"></i>
                                        Recipients (0)
                                      </span>
                                    </a>
                                  </li>
                                  <div class="m-2">Search</div>
                                  <li>
                                    <a href="#">
                                      <span>
                                        <i class="fa fa-user"></i>
                                        Individuals
                                      </span>
                                    </a>
                                  </li>
                                  <li>
                                    <a href="#">
                                      <span>
                                        <i class="fa fa-user"></i>
                                        Communities
                                      </span>
                                    </a>
                                  </li>
                                  <div class="m-2">Demographics</div>
                                  <li>
                                    <a href="#">
                                      <span>
                                        <i class="fa fa-map-marker"></i>
                                        Location
                                      </span>
                                    </a>
                                  </li>
                                  <li>
                                    <a href="#">
                                      <span>
                                        <i class="fa fa-clock"></i>
                                        Time Zone
                                      </span>
                                    </a>
                                  </li>
                                  <li>
                                    <a href="#">
                                      <span>
                                        <i class="fa fa-user"></i>
                                        Age
                                      </span>
                                    </a>
                                  </li>
                                  <li>
                                    <a href="#">
                                      <span>
                                        <i class="fa fa-mercury"></i>
                                        Gender Identity
                                      </span>
                                    </a>
                                  </li>
                                  <div class="m-2">Engagement</div>
                                  <li>
                                    <a href="#">
                                      <span>
                                        <i class="fa fa-calendar-alt"></i>
                                        Join Date
                                      </span>
                                    </a>
                                  </li>
                                  <li>
                                    <a href="#">
                                      <span>
                                        <i class="fa fa-user"></i>
                                        Activity
                                      </span>
                                    </a>
                                  </li>
                                </ul>
                              </nav>

                              <!-- Page Content  -->

                              <!-- Recipients -->
                              
                              <div id="content" style="display:none;">
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
                                  <div><span>473Members</span></div>
                                </div>

                                <p>Suggested Ages</p>
                                <div class="content-description">
                                  <h5>18+</h5>
                                  <div><span>273Members</span></div>
                                </div>
                                <div class="content-description">
                                  <h5>21+</h5>
                                  <div><span>973Members</span></div>
                                </div>

                                <p>Gender</p>
                                <div class="content-description">
                                  <h5>Male</h5>
                                  <div><span>963Members</span></div>
                                </div>
                                <div class="content-description">
                                  <h5>Female</h5>
                                  <div><span>473Members</span></div>
                                </div>
                              </div>

                              <!-- Join Date -->

                               <div id="content">
                                <h4>Join Date</h4>
                                <p>Suggested dates</p>
                                <div class="content-description mt-3 mb-3">
                                  <div><span>Joined: Last 24 hours</span></div>
                                  <div><span>joined 0 Members</span></div>
                                </div>
                                <div class="content-description mt-3 mb-3">
                                  <div><span>Joined: Last 7 days</span></div>
                                  <div><span>joined 0 Members</span></div>
                                </div>
                                <div class="content-description mt-3 mb-3">
                                  <h5>Joined : Last 30 Days</h5>
                                  <div><span>joined 1 Members</span></div>
                                </div>
                                <div>
                                  <h5>Custom</h5>
                                  <div class="d-flex">
                                    <span class="mr-2">is</span>
                                    <b-form-select :options="options" class="w-50 mr-2"></b-form-select>
                                    <button class="btn btn-primary">Apply</button>
                                  </div>
                                </div>
                              </div>

                              <!-- Age -->

                              <!-- <div id="content">
                                <h4>Age</h4>
                                <p>Suggested Ages</p>
                                <div class="content-description mt-3 mb-3">
                                  <h5>18+</h5>
                                  <div><span>273Members</span></div>
                                </div>
                                <div class="content-description mt-3 mb-3">
                                  <h5>18+</h5>
                                  <div><span>273Members</span></div>
                                </div>
                                <div>
                                  <h5>Custom Age</h5>
                                  <div class="d-flex">
                                    <b-form-select :options="option" class="w-50 mr-2"></b-form-select>
                                    <button class="btn btn-primary">Apply</button>
                                  </div>
                                </div>
                              </div> -->

                              <!-- Location -->

                               <div id="content">
                                <h4>Location</h4>
                                <b-input-group>
                                  <b-input-group-prepend>
                                    <span class="input-group-text"><i class="fa fa-search"></i></span>
                                  </b-input-group-prepend>
                                  <b-form-input class="LoginInput" size="lg" placeholder="Type the name of a country,city or state">
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
                            </div>
                          </b-card>
                        </b-collapse>
                      </div>
                      <h5>To: 24 Members</h5>
                    </div>
                    <div class="excluding mb-3">
                      <h5>Excluding:</h5>
                    </div>
                    <div class="message-box mb-3">
                      <textarea
                        name
                        id
                        cols="30"
                        rows="10"
                        class="form-control"
                        placeholder="Enter Your Message"
                      ></textarea>
                      <span class="icons">
                        <i class="fa fa-images" aria-hidden="true"></i>
                        <i class="fa fa-smile ml-1" aria-hidden="true"></i>
                        <i class="fa fa-file ml-1" aria-hidden="true"></i>
                      </span>
                    </div>
                    <div class="d-flex justify-content-between">
                      <button class="btn btn-light">Schedule</button>
                      <button class="btn btn-primary">Send</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <button @click="showModal = true" class="btn btn-primary mt-2">
        New Message
      </button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      showModal: false,
      isShowing: false,
        options: [
          { value: null, text: 'Please select an option' },
          { value: 'before', text: 'before' },
          { value: 'after', text: 'after' },
          { value: 'on', text: 'on' },
        ],
        option: [
          { value: 'between', text: 'between' },
          { value: 'under', text: 'under' },
          { value: 'over', text: 'over' },
          { value: 'exactly', text: 'exactly' },
        ]
    };
  },
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

.card {
  margin-top: 30px;
  position: absolute;
  top: 20px;
  left: 0px;
  z-index: 10;
  padding: 0px !important;
}
.card-body {
  padding: 0px !important;
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
