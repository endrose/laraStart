<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-12 mt-4">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Users Table</h3>

            <div class="card-tools">
              <button
                type="submit"
                class="btn btn-success"
                data-toggle="modal"
                data-target="#addNew"
              >
                <i class="fas fa-user"></i>Add New
              </button>
            </div>
          </div>
          <!-- /.card-header -->
          <div class="card-body table-responsive p-0">
            <table class="table table-hover">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Type</th>
                  <th>Modify</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>183</td>
                  <td>John Doe</td>
                  <td>11-7-2014</td>
                  <td>
                    <span class="tag tag-success">Approved</span>
                  </td>
                  <td>Bacon ipsum dolor sit amet salami venison chicken flank fatback doner.</td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- /.card-body -->
        </div>
        <!-- /.card -->
        <!-- Modal -->
        <div
          class="modal fade"
          id="addNew"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Add New</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <form role="form" @submit.prevent="createUser">
                  <div class="form-group">
                    <input
                      v-model="form.name"
                      type="text"
                      placeholder="Name"
                      name="name"
                      class="form-control"
                      :class="{ 'is-invalid': form.errors.has('name') }"
                    />
                    <has-error :form="form" field="name"></has-error>
                  </div>
                  <div class="form-group">
                    <input
                      v-model="form.email"
                      type="text"
                      placeholder="Email"
                      name="email"
                      class="form-control"
                      :class="{ 'is-invalid': form.errors.has('email') }"
                    />
                    <has-error :form="form" field="email"></has-error>
                  </div>
                  <div class="form-group">
                    <input
                      v-model="form.password"
                      type="password"
                      placeholder="Password"
                      name="password"
                      class="form-control"
                      :class="{ 'is-invalid': form.errors.has('password') }"
                    />
                    <has-error :form="form" field="password"></has-error>
                  </div>
                  <div class="form-group">
                    <textarea
                      v-model="form.bio"
                      type="text"
                      placeholder="Short bio for user (optional)"
                      name="bio"
                      class="form-control"
                      :class="{ 'is-invalid': form.errors.has('bio') }"
                    ></textarea>
                    <has-error :form="form" field="bio"></has-error>
                  </div>
                  <div class="form-group">
                    <select
                      v-model="form.type"
                      type="text"
                      placeholder="Short type (optional)"
                      name="type"
                      class="form-control"
                      :class="{ 'is-invalid': form.errors.has('type') }"
                    >
                      <option disabled>Select User Role</option>
                      <option value="admin">Admin</option>
                      <option value="user">Standar User</option>
                      <option value="author">Author</option>
                    </select>
                    <has-error :form="form" field="type"></has-error>
                  </div>

                  <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                    <button type="submit" class="btn btn-primary">Create</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: new Form({
        name: "",
        email: "",
        password: "",
        bio: "",
        type: "",
        photo: ""
      })
    };
  },
  methods: {
    createUser() {
      this.form.post('api/user');
    }
  },
  mounted() {
    console.log("Component mounted.");
  }
};
</script>
