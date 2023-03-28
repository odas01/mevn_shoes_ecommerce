<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    data() {
        const formSchema = yup.object().shape({
            name: yup.string().required("Name is required!"),
            email: yup.string().email().required("Email is required!"),
            password: yup.string().required("Password is required!"),
        });
        return {
            formSchema,
            message: "",
            required: false,
        };
    },
    methods: {
        async alert(status, message) {
            const option = {
                position: "top",
                icon: status ? "success" : "error",
                text: message || "Create account successfully.",
                showConfirmButton: false,
                timer: 2000,
                width: 350,
            };
            return await this.$swal(option);
        },

        async regis(values, { resetForm }) {
            const regis = await this.$store.dispatch("regis", values);
            await this.alert(regis.status, regis.message);

            if (regis.status) this.$router.push({ name: "auth.login" });
            else resetForm();
        },
    },
};
</script>

<template>
   <h3 class="auth__title">
        Create account
    </h3>
    <div class="auth__form">  
        <Form @submit='regis' :validation-schema="formSchema">
            <div class="auth__form-group">
                <label for="name">Name</label>
                <Field type="text" name="name"/>
                <ErrorMessage name="name" class="error-feedback" />
            </div>
            <div class="auth__form-group">
                <label for="email">Email</label>
                <Field type="text" name="email"/>
                <ErrorMessage name="email" class="error-feedback" />
            </div>
            <div class="auth__form-group">
                <label for="password">Password</label>
                <Field type="password" name="password"/>
                <ErrorMessage name="password" class="error-feedback" />
            </div>
            <div class="auth__form-group">
                <label for="role">Role</label>
                <Field as='select' name="role" value="user">
                    <option value="admin" checked>admin</option>
                    <option value="user">user</option>
                </Field>
                
                <ErrorMessage name="password" class="error-feedback" />
            </div>
            <div class="auth__form-role">
                <input type="checkbox" name='role' :checked='false' v-model="required"/> 
                <span>I agree to the privacy policy</span>
                <ErrorMessage  name='role'  class="error-feedback" />
            </div>
            <button type="submit">Create</button>
            <span>{{this.message}}</span>
        </Form>
    </div>
    <hr>
    <div class="auth__other">
        <button class="auth__group auth__group-fb">
            <i class="fa-brands fa-facebook-f"></i>
            <span>Login with Facebook</span>
        </button>
        <button class="auth__group auth__group-gg">
            <i class="fa-brands fa-google"></i>
            <span>Login with Google</span>
        </button>
    </div>
    <div class="auth__bottom">
        <router-link :to='{name:"auth.login"}'>Already have an account? Login</router-link>
    </div>
</template>

<style lang='scss' scoped>
@use "../../scss/" as *;
.auth__form-role {
    margin-bottom: 24px;
    @include flex(center);
    span {
        font-size: 12px;
        color: rgb(158, 158, 158);
        margin-left: 8px;
    }
}
</style>