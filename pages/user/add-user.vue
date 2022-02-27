<script>
/**
 * Form Validation component
 */
export default {
  head() {
    return {
      title: `${this.title} | Minton - Nuxtjs Responsive Admin Dashboard Template`,
    };
  },
  data() {
    return {
      title: "Add Users",
      previewImage: null,
      items: [
        {
          text: "Minton",
          href: "/",
        },
        {
          text: "Forms",
          href: "/",
        },
        {
          text: "Validation",
          active: true,
        },
      ],
    };
  },
  // middleware: "router-auth",
  methods: {
    selectImage() {
      this.$refs.fileInput.click();
    },
    pickFile() {
      let input = this.$refs.fileInput;
      let file = input.files;
      if (file && file[0]) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.previewImage = e.target.result;
        };
        reader.readAsDataURL(file[0]);
        this.$emit("input", file[0]);
      }
    },
  },
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

<template>
  <div>
    <PageHeader :title="title" :items="items" />
    <div class="row">
      <div class="col-lg-8 mx-auto">
        <div class="card">
          <div class="card-body">
            <!-- <h4 class="header-title m-t-0">Add Users Form</h4> -->
            <form>
              <div class="form-group">
                <label for="fname">
                  First Name
                  <span class="text-danger">*</span>
                </label>
                <input
                  name="fname"
                  class="form-control"
                  placeholder="Enter First Name"
                />
              </div>
              <div class="form-group">
                <label for="lname">
                  Last Name
                  <span class="text-danger">*</span>
                </label>
                <input
                  name="lname"
                  class="form-control"
                  placeholder="Enter Last Name"
                />
              </div>
              <div class="form-group">
                <label for="email">
                  Email
                  <span class="text-danger">*</span>
                </label>
                <input
                  name="email"
                  class="form-control"
                  placeholder="Enter Email Name"
                />
              </div>
              <div class="form-group">
                <label for="phno">
                  Phone Number
                  <span class="text-danger">*</span>
                </label>
                <input
                  name="phno"
                  class="form-control"
                  placeholder="Enter Phone Number"
                />
              </div>
              <div class="form-group">
                <label for="phno">
                  Country
                  <span class="text-danger">*</span>
                </label>
                <select class="form-control">
                  <option>Select</option>
                  <option>Pakistan</option>
                  <option>India</option>
                </select>
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
                <div
                  class="imagePreviewWrapper mt-3"
                  :style="{ 'background-image': `url(${previewImage})` }"
                  @click="selectImage"
                ></div>
              </div>
              <div class="form-group">
                <div class="checkbox checkbox-purple">
                  <input id="checkbox6a" type="checkbox" />
                  <label for="checkbox6a">Remember me</label>
                </div>
              </div>

              <div class="form-group text-right m-b-0">
                <button class="btn btn-primary" type="submit">Submit</button>
                <button type="reset" class="btn btn-secondary m-l-5 ml-1">
                  Cancel
                </button>
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
