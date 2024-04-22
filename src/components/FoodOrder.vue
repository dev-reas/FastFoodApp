<template>
  <ion-grid>
    <ion-row class="ion-justify-content-center ion-align-items-center">
      <ion-col size-lg="7">
        <ion-grid class="grid">
          <ion-row class="ion-justify-content-center ion-align-items-center">
            <ion-col size-lg="12" size-md="12" size-sm="12">
              <p>Most Popular</p>
            </ion-col>
          </ion-row>
          <ion-row class="ion-justify-content-center">
            <ion-col
              size-lg="6"
              size-md="6"
              size-sm="6"
              size="6"
              v-for="foodItem in responseData"
              :key="foodItem.id"
            >
              <router-link :to="'/food/' + foodItem.id" class="router-link">
                <Card
                  :title="foodItem.name"
                  :subtitle="
                    foodItem.category ? foodItem.category.name : 'Unknown'
                  "
                  :content="foodItem.price"
                  :image="foodItem.image"
                />
              </router-link>
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-col>
    </ion-row>
  </ion-grid>
</template>

<script lang="ts">
import { IonCol, IonGrid, IonRow } from "@ionic/vue";
import Card from "../components/Card.vue";
import { defineComponent, PropType } from "vue";

interface FoodItem {
  id: number;
  name: string;
  price: string;
  rating: number;
  image: string;
  category: {
    id: number;
    name: string;
  };
}

export default defineComponent({
  name: "FoodOrder",
  components: {
    IonGrid,
    IonRow,
    IonCol,
    Card,
  },
  props: {
    responseData: {
      type: Array as PropType<FoodItem[]>,
      required: true,
    },
  },
});
</script>

<style>
ion-content,
ion-list,
ion-item {
  --ion-background-color: #f8f6f6;
  --background: #f8f6f6;
  --ion-item-background: #f8f6f6;
}

ion-content {
  --ion-text-color: #2a363b;
  color: #2a363b;
}

ion-item {
  --ion-item-border-color: #f8f6f6;
}

.router-link {
  text-decoration: none; /* Remove underline */
  color: inherit; /* Use the default text color */
}
</style>
