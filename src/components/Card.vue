<template>
  <ion-card>
    <ion-grid>
      <ion-row class="ion-justify-content-center ion-align-items-center">
        <ion-col size="auto">
          <ion-img :src="image" alt="Food Image" class="card-image"></ion-img>
        </ion-col>
      </ion-row>
    </ion-grid>
    <ion-card-header>
      <ion-card-title class="title">{{ title }}</ion-card-title>
      <ion-card-subtitle class="subtitle">{{ subtitle }}</ion-card-subtitle>
    </ion-card-header>
    <ion-card-content class="content"> P {{ content }} </ion-card-content>
  </ion-card>
</template>

<script lang="ts">
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonImg,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "CardComponent",
  components: {
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonImg,
    IonGrid,
    IonRow,
    IonCol,
  },
  props: {
    title: String,
    subtitle: String,
    content: String,
    image: String,
  },
});
</script>

<style>
ion-card,
ion-card-header {
  background-color: #dddddd;
}

ion-card-title,
ion-card-subtitle {
  color: #2a363b;
}

ion-card-content {
  color: #cf4647;
}

ion-card-title,
ion-card-content {
  font-weight: bold;
}

.title {
  font-size: 20px;
  text-decoration: none;
}

.subtitle {
  font-size: 20px;
}

.content {
  font-size: 18px;
}

.card-image {
  width: 200px;
  height: 200px;
}

@media screen and (max-width: 768px) {
  .title {
    font-size: 18px;
  }

  .subtitle {
    font-size: 18px;
  }

  .content {
    font-size: 15px;
  }
}

@media screen and (max-width: 576px) {
  .title {
    font-size: 12px;
  }

  .subtitle {
    font-size: 10px;
  }

  .content {
    font-size: 10px;
  }

  .card-image {
    width: 100px;
    height: 100px;
  }
}

@media screen and (width: 375px) {
  .title {
    font-size: 10px;
  }
}

@media screen and (max-width: 320px) {
  .card-image {
    width: 80px;
    height: 80px;
  }
}
</style>
