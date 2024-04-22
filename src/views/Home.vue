<template>
  <Navbar />
  <ion-page id="main-content">
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>Our Foods</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-list>
        <ion-item>
          <IconInput />
        </ion-item>
      </ion-list>
      <Coupons />
      <Category />
      <FoodImage />
      <FoodOrder :responseData="responseData" />
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonList,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/vue";
import { defineComponent, ref, onMounted } from "vue";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "@ionic/vue/css/ionic-swiper.css";

import IconInput from "../components/IconInput.vue";
import Coupons from "../components/Coupons.vue";
import Category from "../components/Category.vue";
import FoodImage from "../components/FoodImage.vue";
import FoodOrder from "../components/FoodOrder.vue";
import Navbar from "@/components/Navbar.vue";
import { fetchFoods } from "../config/axiosConfig";

interface FoodItem {
  id: number;
  name: string;
  price: string;
  rating: number;
  category: {
    id: number;
    name: string;
  };
}

export default defineComponent({
  name: "HomeView",
  components: {
    IonContent,
    IonItem,
    IonList,
    IconInput,
    Coupons,
    Category,
    FoodImage,
    FoodOrder,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonMenuButton,
    IonTitle,
    Navbar,
    IonPage,
  },

  setup() {
    const responseData = ref<FoodItem[]>([]);

    const fetchData = async () => {
      try {
        const response = await fetchFoods();
        responseData.value = response.data;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    onMounted(() => {
      fetchData();
    });

    return { responseData, modules: [Pagination] };
  },
});
</script>

<style>
ion-content,
ion-list,
ion-item {
  --background: #f8f6f6;
}

ion-content {
  --ion-text-color: #2a363b;
  color: #2a363b;
}

ion-item {
  --ion-item-border-color: #f8f6f6;
}

ion-header {
  box-shadow: none !important;
}

ion-title {
  --ion-text-color: #2a363b;
  color: #2a363b;
}

ion-buttons {
  color: #cf4647;
}
</style>
