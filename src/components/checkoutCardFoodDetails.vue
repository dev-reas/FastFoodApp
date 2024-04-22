<template>
  <ion-card>
    <ion-grid>
      <ion-row>
        <ion-col>
          <ion-card-header>
            <ion-card-title>{{ foodTitle }}</ion-card-title>
            <ion-card-subtitle>
              Total Price: {{ totalPrice }}
            </ion-card-subtitle>
          </ion-card-header>

          <ion-card-content class="checkoutFoodDetails">
            <h4><strong>Add Ons:</strong></h4>
            <p>{{ beverageSize }} {{ beverage }}</p>
            <p v-for="(addOn, index) in addOnDetails" :key="index">
              {{ addOn.quantity }} x {{ addOn.name }}
            </p>
          </ion-card-content>
        </ion-col>
      </ion-row>
    </ion-grid>
  </ion-card>
</template>

<script lang="ts">
import {
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    IonCard,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonCardContent,
    IonGrid,
    IonRow,
    IonCol,
  },
  props: {
    foodTitle: String,
    totalPrice: Number,
    beverage: String,
    beverageSize: String,
    addOnDetails: Array,
  },
});
</script>

<style>
.checkoutFoodDetails p {
  margin-left: 20px;
}
</style>
