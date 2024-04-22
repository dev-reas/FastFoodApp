<template>
  <ion-grid class="image-container">
    <ion-row class="ion-justify-content-center">
      <ion-col size="5" size-md="5" size-lg="5">
        <ion-img
          :src="src"
          alt="Selected Food"
          class="img-responsive"
        ></ion-img>
      </ion-col>
    </ion-row>
    <div class="favorite-button-container">
      <ion-button class="favorite-button" fill="clear" @click="toggleFavorite">
        <ion-icon :icon="heartOutline" v-if="!isFavorite"></ion-icon>
        <ion-icon :icon="heart" v-else></ion-icon>
      </ion-button>
    </div>
  </ion-grid>
</template>

<script lang="ts">
import {
  IonGrid,
  IonRow,
  IonCol,
  IonImg,
  IonButton,
  IonIcon,
} from "@ionic/vue";
import { defineComponent } from "vue";
import { heartOutline, heart } from "ionicons/icons";

export default defineComponent({
  name: "FoodImageDetails",
  props: {
    src: String,
  },
  components: {
    IonGrid,
    IonRow,
    IonCol,
    IonImg,
    IonButton,
    IonIcon,
  },
  data() {
    return {
      isFavorite: false,
      heartOutline,
      heart,
    };
  },
  methods: {
    toggleFavorite() {
      this.isFavorite = !this.isFavorite;
    },
  },
});
</script>

<style scoped>
.image-container {
  position: relative;
  background-color: #e9ecef;
  padding-bottom: 40px;
  padding-top: 40px;
  border-radius: 30px;
}

.img-responsive {
  flex-grow: 1;
  width: 100%;
  object-fit: cover;
}

.favorite-button-container {
  position: absolute;
  right: 0;
  margin-right: 25px;
}

.favorite-button {
  background-color: #f8f6f6;
  color: #cf4647;
  border-radius: 25%;
  font-size: 1.5rem;
  padding: 0.5rem;
  box-sizing: border-box;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

@media (max-width: 425px) {
  .favorite-button {
    font-size: 1rem;
    padding: 0;
  }

  .favorite-button-container {
    position: absolute;
    right: 0;
    margin-right: 25px;
    margin-top: 15px;
  }
}

@media (max-width: 375px) {
  .favorite-button-container {
    position: absolute;
    right: 0;
    margin-right: 25px;
    margin-top: 15px;
  }
}
</style>
