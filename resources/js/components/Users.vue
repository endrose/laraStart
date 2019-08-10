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
                  <th>Register At</th>
                  <th>Modify</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="user in users" :key="user.id">
                  <td>{{ user.id }}</td>
                  <td>{{ user.name | upText }}</td>
                  <td>{{ user.email }}</td>
                  <td>{{ user.type | upText }}</td>
                  <td>{{ user.created_at | myDate}}</td>
                  <td></td>
                    <a href="#">
                      <i class="fas fa-edit"></i>
                    </a>
                    /
                    <a href="#" @click="deleteUser(user.id)">
                      <i class="fas fa-trash red"></i>
                    </a>
                  </td>
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
          <div class="modal-dialog" role="document" id="addNewModal">
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
      users: {},
      form: new Form({
        name: "",
        email: "",
        password: "",
        bio: "",
        type: "",
        photo: ""
      })
    }
  },
  methods: {
    deleteUser(id){
        swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            
            // send request to server
            if (result.value) {
                this.form.delete("api/user/" + id).then(() => {
                    swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    )   
                Fire.$emit("afterCreate");
                    
                }).catch( () => {
                    swal.fire("failed","There was something wrong.","warning");
                    this.$Progress.fail();
                });
                
            }
        })
    },
    loadUser() {
      this.$Progress.start();
      axios.get("api/user").then(({ data }) => (this.users = data.data));
      this.$Progress.finish();
    },

    createUser() {
      this.$Progress.start();
      this.form.post("api/user")
      .then(() => {
          Fire.$emit("afterCreate");
          toast.fire({
            type: "success",
            title: "User Create in successfully"
          });

          $("#addNew").modal("hide");
          this.$Progress.finish();
          //   this.form.post("api/user").then(({ data }) => {
          //     console.log(data);
          //   });

      } )
      .catch(() => {
          this.$Progress.fail(data);
      });
    }
  },
  created() {
    this.loadUser();
    Fire.$on("afterCreate", () => {
        this.loadUser()
    });
    // setInterval(() => this.loadUser(), 3000);
  }
};
</script>
