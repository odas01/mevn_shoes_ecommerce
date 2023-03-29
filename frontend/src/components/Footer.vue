<script>
import { PhoneOutlined } from "@ant-design/icons-vue";
import { Row, Col } from "ant-design-vue";

export default {
    components: {
        PhoneOutlined,
        Row,
        Col,
    },
};
</script>

<template>
   <div class="footer">
    <div class="container">
        <Row :gutter="[16, {xs: 16}]">
            <Col :xs='0' :xl="8">
                <div class="footer__list">
                    <div class="footer__info footer__info-contact d-flex align-items-center">
                        <img src="../assets/image/footer/footer.png" alt="" />
                        <span class="ps-3">Cooperate with us</span>
                    </div>
                </div>
            </Col>
            <Col :xs='{span:24}' :xl="8">
                <div class="footer__list">
                    <h5 class="footer__title">Introduce</h5>
                    <div class="footer__info">
                        <span>
                            Khu II, đường 3/2, phường Xuân Khánh, quận Ninh Kiều, thành phố Cần Thơ, Việt Nam
                            <br />
                        </span>
                        <span>
                            <!-- <phone-outlined /> -->
                            0123789456
                            <br />
                        </span>
                        <span>
                            lntthanh3317@gmail.com
                            <br />
                        </span>
                    </div>
                </div>
            </Col>
            <Col :xs='{span:24}' :xl="8">
                <div class="footer__list">
                    <h5 class="footer__title">Support</h5>
                    <div class="footer__info">
                        <span>
                            Submit a warranty claim
                            <br />
                        </span>
                        <span>
                            Submit a return request
                            <br />
                        </span>
                        <span>
                            Customer support: lntthanh3317@gmail.com
                        </span>
                    </div>
                </div>
            </Col>
        </Row>
    </div>

    <div class="footer__coppyright">
        <div class="container">
            <span>
                © Copyright 2022 By lntthanh3317
            </span>
        </div>
    </div>
</div>

</template>

<style lang='scss' scoped>
@use "../scss/" as *;

.footer {
    margin-top: auto;
    background: url("../assets/image/footer/footer-bg.jpg");
    padding: 20px 0 8px;

    &__info {
        &-contact {
            margin-top: 20px;
            width: fit-content;
            padding: 8px 12px;
            border: 2px solid $white-color;
            border-radius: 12px;
        }
    }

    & span,
    & h5 {
        color: $white-color;
    }

    & span {
        font-size: 14px;
    }

    &__coppyright {
        margin-top: 20px;

        & span {
            padding-top: 8px;
            border-top: 1px solid $white-color;
        }
    }

    @include mobile{
        h5{
            font-size: 16px;
        }
        span{
            font-size: 12px;
        }
    }
}
</style>