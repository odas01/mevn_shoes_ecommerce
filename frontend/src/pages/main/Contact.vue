<script>
import {
    InstagramOutlined,
    TwitterOutlined,
    MailOutlined,
    GoogleOutlined,
    LinkedinOutlined,
    FacebookOutlined,
} from "@ant-design/icons-vue";
export default {
    components: {
        InstagramOutlined,
        TwitterOutlined,
        MailOutlined,
        GoogleOutlined,
        LinkedinOutlined,
        FacebookOutlined,
    },
    data() {
        return {
            data: {},
            message: "",
        };
    },
    methods: {
        async upload(data) {
            alert("thành công");
        },
    },
};
</script>

<template>
    <div class="contact">
        <h3 class="contact__title">
            Liên hệ
        </h3>
        <div class="contact__map d-flex justify-content-center">
            <iframe class="w-100"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3928.841518408634!2d105.76842661461575!3d10.029933692830687!2m3!1f0!2f0!3f0!
                            3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a0895a51d60719%3A0x9d76b0035f6d53d0!2zxJDhuqFpIGjhu41jIEPhuqduIFRoxqE!5e0!3m2!1svi!2s!4v1650553658210!5m2!1svi!2s"
                width="100%" height="350" style="border:0;" allowfullscreen="false" loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
        <div class="contact__body">
            <div class="row">
                <div class="col col-md-5 contact__form">
                </div>
                <div class="col col-md-7">
                    <h5 class="contact__title">
                        Thông tin liên hệ
                    </h5>

                    <div class="contact__wrap">
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum earum eveniet dolorum
                            suscipit nesciunt incidunt animi repudiandae ab at, tenetur distinctio voluptate vel illo
                            similique.</p>

                        <div class="d-flex justify-content-center mt-4">
                            <i class="fa-brands fa-instagram"></i>
                            <i class="fa-brands fa-twitter"></i>
                            <i class="fa-brands fa-google"></i>
                            <i class="fa-brands fa-facebook"></i>
                            <i class="fa-solid fa-envelope"></i>
                            <i class="fa-brands fa-linkedin-in"></i>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<style lang='scss' >
@use "../../scss/" as *;

.contact {
    &__title {
        text-align: center;
    }

    &__body {
        padding: 40px;
        background-color: rgba(255, 255, 255, 0.91);
    }

    &__form {
        & .form-group:first-child,
        & .form-group:nth-child(2) {
            width: 48%;
            display: inline-block;
        }

        & .form-group:nth-child(2) {
            float: right;
        }

        & input,
        & textarea {
            border-radius: unset;
        }
    }

    &__wrap {
        padding: 12px 60px 0;

        & p {
            text-align: center;
        }

        & i {
            opacity: 0.6;
            margin-left: 10px;
        }
    }
}
</style>