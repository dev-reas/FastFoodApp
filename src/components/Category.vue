<template>
  <ion-grid>
    <ion-row class="ion-justify-content-center ion-align-items-center">
      <ion-col size-lg="7">
        <ion-grid>
          <ion-row class="ion-justify-content-center ion-align-items-center">
            <ion-col size-lg="12" size-md="12" size-sm="12">
              <p>Category</p>
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
import Chicken from "../assets/Chicken.png";
import Seafood from "../assets/Seafood.png";

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
          image: Chicken,
          altText: "Chicken",
          text: "Chicken",
          subtext: "9 Recipes",
        },
        {
          image: Seafood,
          altText: "Seafood",
          text: "Seafood",
          subtext: "6 Recipes",
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
