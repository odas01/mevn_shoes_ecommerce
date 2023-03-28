<script>
import { Row, Col } from "ant-design-vue";
export default {
    components: {
        Row,
        Col,
    },
};
</script>

<template>
    <div class="auth">
        <div class="auth__main">
            <Row>
                <Col :xl="12" :xs="24">
                    <img class="auth__image" src="../assets/image/auth/bg.jpg" alt="">
                </Col>
                <Col :xl="12" :xs="24">
                    <div class="auth__body">
                        <router-view/>
                    </div>
                </Col>
            </Row>
        </div>
    </div>
</template>

<style lang='scss'>
@use "../scss/" as *;
.auth {
    background-color: #121317;
    padding: 24px;
    display: flex;
    min-height: 100vh;

    &__main {
        overflow: hidden;
        border-radius: 12px;
        margin: 0 auto;
        width: 900px;

        & > .ant-row {
            height: 100%;
        }
    }

    &__image {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    &__body {
        height: 100%;
        padding: 48px;
        background-color: #1a1c23; 

        @include mobile{
            padding: 24px;
        }
    }
    &__title {
        margin-bottom: 24px;
        color: $white-color;

        @include mobile{
            font-size: 24px;
        }
    }

    &__form {
        &-group {
            display: flex;
            flex-direction: column;
            margin-bottom: 24px;

            label {
                margin-bottom: 6px;
                color: rgb(158, 158, 158);
                font-size: 14px;
            }

            input:not([type="checkbox"]), select {
                font-size: 14px;
                height: 48px;
                border: 1px solid rgb(76, 79, 82);
                background-color: rgb(36, 38, 45);
                color: $text-color;
                border-radius: 6px;
                outline: none;
                padding-left: 12px;
            }
        }

        button {
            height: 48px;
            width: 100%;
            border-radius: 8px;
            color: rgba($color: $white-color, $alpha: 0.8);
            background-color: rgb(14, 159, 110);
            border: none;
            outline: none;
            transition: all 0.2s ease;

            &:hover {
                background-color: $green-btn-color;
            }
        }
    }

    &__other {
        display: flex;
        flex-direction: column;
    }

    &__group {
        @include flex(center, center);
        margin: 8px 0;
        height: 48px;
        width: 100%;
        border-radius: 4px;
        border: none;
        outline: none;
        transition: all 0.2s ease;

        &-fb {
            &:hover {
                background-color: #2980b9;
                color: $white-color;
            }
        }
        &-gg {
            &:hover {
                background-color: #f05252;
                color: $white-color;
            }
        }

        i {
            margin-right: 12px;
        }

        span {
            font-size: 15px;
            font-weight: 500;
        }
    }
    &__bottom {
        padding-top: 12px;
        color: #31c48d;

        a {
            font-size: 14px;
        }
    }

    hr {
        height: 1px;
        margin: 48px 0;
        background-color: $white-color;

        @include mobile{
            margin: 24px 0;
        }
    }
}

.error-feedback {
    color: #f98080;
    margin-left: 4px;
    font-size: 14px;
}
</style>


