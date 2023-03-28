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
    computed: {
        userId() {
            return this.$store.state;
        },
    },
    methods: {
        async alert(status, message) {
            const option = {
                position: "top",
                icon: status ? "success" : "error",
                text: message || "Change password successfully.",
                showConfirmButton: false,
                timer: 2000,
                width: 350,
            };
            return await this.$swal(option);
        },

        async change(values, { resetForm }) {
            const token = localStorage.getItem("token_user");
            const respone = await this.$store.dispatch("changePassword", {
                token,
                data: { old: values.old, new: values.new },
            });
            await this.alert(respone.status, respone.message);
            resetForm();
            if(respone.status)
                this.$router.push({ name: "home" });
        },
    },
    async alert(status, message) {
        const option = {
            position: "top",
            icon: status ? "success" : "error",
            text: message || "Login successfully.",
            showConfirmButton: false,
            timer: 2000,
            width: 350,
        };
        return await this.$swal(option);
    },
};
</script>

<template>
   <h3 class="auth__title">
        Change password
    </h3>
    <div class="auth__form">  
        <Form @submit='change'>
            <div class="auth__form-group">
                <label for="old">Old password</label>
                <Field type="password" name="old"/>
                <ErrorMessage name="old" class="error-feedback" />
            </div>
            <div class="auth__form-group">
                <label for="new">New password</label>
                <Field type="password" name="new"/>
                <ErrorMessage name="new" class="error-feedback" />
            </div>
            <div class="auth__form-group">
                <label for="confirm">Confirm Password</label>
                <Field type="password" name="confirm"/>
                <ErrorMessage name="confirm" class="error-feedback" />
            </div>
            <button type="submit">Change</button>
            <span>{{this.message}}</span>
        </Form>
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