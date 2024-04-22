<template>
  <ion-grid>
    <ion-row class="ion-justify-content-start ion-align-items-center">
      <ion-col size="auto">
        <ion-title>
          <ion-button class="backButton" @click="goBack">
            <ion-icon slot="icon-only" :icon="chevronBackOutline"></ion-icon
          ></ion-button>
        </ion-title>
      </ion-col>
      <ion-col>
        <div class="foodTitle">
          {{ category }}
        </div>
      </ion-col>
      <ion-col v-if="showImage" class="ion-text-end">
        <img src="../assets/basket.svg" />
      </ion-col>
    </ion-row>
  </ion-grid>
</template>

<script lang="ts">
import {
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonIcon,
  IonTitle,
} from "@ionic/vue";
import { chevronBackOutline } from "ionicons/icons";
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "FoodViewToolbar",
  components: {
    IonGrid,
    IonRow,
    IonCol,
    IonButton,
    IonIcon,
    IonTitle,
  },
  props: {
    category: {
      type: String,
    },
    showImage: {
      type: Boolean,
      default: true, // Default value is true if not provided
    },
  },
  data() {
    return {
      chevronBackOutline,
    };
  },
  setup() {
    const router = useRouter();
    const goBack = () => {
      router.go(-1); // Go back one step in history
    };
    return { goBack };
  },
});
</script>

<style>
.backButton {
  --background: #dee2e6 !important;
  --color: #6c757d !important;
  --border-radius: 50%;
}

.foodTitle {
  font-size: 2rem;
  color: #2a363b;
}

.basket-button {
  justify-self: flex-end;
}
</style>
