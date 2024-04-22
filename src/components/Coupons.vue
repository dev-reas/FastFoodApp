<template>
  <ion-grid>
    <ion-row class="ion-justify-content-center ion-align-items-center">
      <ion-col size-lg="7">
        <ion-grid>
          <ion-row class="ion-justify-content-center ion-align-items-center">
            <ion-col size-lg="6" size-md="6" size-sm="12">
              <p>Special Offers</p>
            </ion-col>
            <ion-col size-lg="6" size-md="6" size-sm="12">
              <ion-grid>
                <ion-row class="ion-justify-content-end ion-align-items-center">
                  <ion-col size="auto">
                    <p>View all</p>
                  </ion-col>
                  <ion-col size="auto" class="image-col">
                    <img src="../assets/Vector.svg" alt="arrow" class="arrow" />
                  </ion-col>
                </ion-row>
              </ion-grid>
            </ion-col>
          </ion-row>
          <ion-row class="ion-justify-content-center">
            <ion-col size-lg="8" size-md="8" size-sm="12">
              <Swiper :items="carouselItems" />
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-col>
    </ion-row>
  </ion-grid>
</template>

<script lang="ts">
import { IonCol, IonGrid, IonRow } from "@ionic/vue";
import { defineComponent } from "vue";
import { Pagination } from "swiper/modules";
import Coupon1 from "../assets/Coupon1.png";

import "swiper/css";
import "@ionic/vue/css/ionic-swiper.css";

import Swiper from "../components/Swiper.vue";

export default defineComponent({
  name: "HomeView",
  components: {
    IonGrid,
    IonRow,
    IonCol,
    Swiper,
  },

  setup() {
    return { modules: [Pagination] };
  },

  data() {
    return {
      carouselItems: [
        {
          image: Coupon1,
          altText: "Coupon 1",
        },
        {
          image: Coupon1,
          altText: "Coupon 2",
        },
        {
          image: Coupon1,
          altText: "Coupon 3",
        },
      ],
    };
  },
});
</script>

<style>
.arrow {
  width: 15px;
  height: auto;
  margin-top: 5px;
}

/* Responsive text size */
p {
  font-size: 25px;
}

@media screen and (max-width: 768px) {
  p {
    font-size: 20px;
  }

  .arrow {
    width: 15px;
    height: auto;
    margin-top: 0;
  }
}

@media screen and (max-width: 576px) {
  p {
    font-size: 15px;
  }

  .arrow {
    width: 10px;
    height: auto;
    margin-top: 0;
  }
}
</style>
