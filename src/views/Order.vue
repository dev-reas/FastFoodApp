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
      <ion-grid>
        <ion-row class="ion-justify-content-center ion-align-items-s">
          <ion-col size-lg="7">
            <ion-grid>
              <ion-row class="ion-justify-content-center ion-align-items-s">
                <ion-col size="auto">
                  <ion-segment
                    scrollable
                    v-model="selectedCategory"
                    @ionChange="segmentChanged"
                  >
                    <ion-segment-button value="all">
                      <ion-label>All</ion-label>
                    </ion-segment-button>
                    <ion-segment-button value="1">
                      <ion-label>Breakfast</ion-label>
                    </ion-segment-button>
                    <ion-segment-button value="2">
                      <ion-label>Chicken</ion-label>
                    </ion-segment-button>
                    <ion-segment-button value="3">
                      <ion-label>Dessert</ion-label>
                    </ion-segment-button>
                  </ion-segment>
                </ion-col>
              </ion-row>
            </ion-grid>
          </ion-col>
        </ion-row>
      </ion-grid>

      <FoodOrder :responseData="responseData" :categoryId="selectedCategory" />
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonItem,
  IonList,
  IonMenuButton,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
  IonSegment,
  IonSegmentButton,
  IonLabel,
} from "@ionic/vue";
import { defineComponent, ref, onMounted } from "vue";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "@ionic/vue/css/ionic-swiper.css";
import FoodOrder from "../components/FoodOrder.vue";
import Navbar from "@/components/Navbar.vue";
import IconInput from "../components/IconInput.vue";
import { fetchFoods } from "../config/axiosConfig";

export default defineComponent({
  name: "OrderView",
  components: {
    IonContent,
    FoodOrder,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonMenuButton,
    IonTitle,
    Navbar,
    IonPage,
    IonList,
    IonItem,
    IconInput,
    IonRow,
    IonGrid,
    IonCol,
    IonSegment,
    IonSegmentButton,
    IonLabel,
  },

  setup() {
    const selectedCategory = ref<string | "all">("all");

    const segmentChanged = (ev: CustomEvent) => {
      selectedCategory.value = ev.detail.value;
      fetchData();
    };

    const responseData = ref<FoodItem[]>([]);

    const fetchData = async () => {
      try {
        let categoryParam: string | undefined = undefined;
        if (selectedCategory.value !== "all") {
          categoryParam = selectedCategory.value;
        }
        const response = await fetchFoods(categoryParam);
        responseData.value = response.data;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    onMounted(() => {
      fetchData();
    });

    return {
      responseData,
      selectedCategory,
      segmentChanged,
      modules: [Pagination],
    };
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

ion-label {
  text-transform: capitalize;
}

ion-segment-button {
  --border-radius: 10px;
  --padding-start: 10px;
  --padding-end: 10px;
  --padding-top: 5px;
  --padding-bottom: 5px;
  --color: #2a363b;
  --background: #dee2e6;
  --background-checked: #cf4647;
  --color-checked: #f8f6f6;
  --indicator-color: none;
  --margin-end: 10px;
}

ion-segment-button:focus,
ion-segment-button:hover {
  --background: #e5e5e5;
}

ion-segment-button:not(:last-child) {
  margin-right: 10px;
}
</style>
