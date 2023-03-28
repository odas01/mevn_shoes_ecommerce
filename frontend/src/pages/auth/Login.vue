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
            email: yup.string().email().required("Email is required!"),
            password: yup.string().required("Password is required!"),
        });
        return {
            formSchema,
            message: "",
            admin: {},
        };
    },
    methods: {
        async login(values, { resetForm }) {
            // kiểm tra request có phải trang dashboard
            const redirectRoute = JSON.parse(
                localStorage.getItem("redirect_login")
            );

            if (redirectRoute && redirectRoute.name.includes("dashboard"))
                values = { ...values, role: "admin" };

            const login = await this.$store.dispatch("login", values);
            await this.alert(login.status, login.message);

            if (login.status) {
                const token = localStorage.getItem("token_user");
                if (token) {
                    await this.$store.dispatch("getUser", token);
                    await this.$store.dispatch("cartQuantity");
                }

                this.$router.push(redirectRoute || { name: "home" });
                localStorage.removeItem("redirect_login");
            } else resetForm();
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
    },
    mounted() {
        const redirectRoute = JSON.parse(
            localStorage.getItem("redirect_login")
        );
        if (redirectRoute && redirectRoute.name.includes("dashboard"))
            this.admin = { email: "admin01@gmail.com", password: "admin01" };
    },
};
</script>

<template>
    <h3 class="auth__title">
        Login
    </h3>
    <div class="auth__form">  
        <Form @submit='login' :validation-schema="formSchema">
            <div class="auth__form-group">
                <label for="email">Email</label>
                <Field type="text" name="email" v-model='admin.email' placeholder="admin01@gmail.com"/>
                <ErrorMessage name="email" class="error-feedback" />
            </div>
            <div class="auth__form-group">
                <label for="password">Password</label>
                <Field type="password" name="password" v-model='admin.password' placeholder="admin01"/>
                <ErrorMessage name="password" class="error-feedback" />
            </div>
            <button type="submit">Log in</button>
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
        <router-link :to='{name:"auth.register"}'>Create account</router-link>
    </div>
</template>
