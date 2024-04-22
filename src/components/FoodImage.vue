<template>
  <ion-grid>
    <ion-row class="ion-justify-content-center ion-align-items-center">
      <ion-col size-lg="7">
        <ion-grid>
          <ion-row class="ion-justify-content-center ion-align-items-center">
            <ion-col size-lg="12" size-md="12" size-sm="12">
              <p>What's New</p>
            </ion-col>
          </ion-row>
          <ion-row class="ion-justify-content-center ion-align-items-center">
            <ion-col size-lg="8" size-md="12">
              <div class="group-508">
                <div class="capture4"></div>
              </div>
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

export default defineComponent({
  name: "FoodImage",
  components: {
    IonGrid,
    IonRow,
    IonCol,
  },
});
</script>

<style scoped>
.group-508 {
  position: relative;
  width: 100%;
  padding-bottom: 58.3%; /* Adjusted aspect ratio to maintain responsiveness */
}

.capture4,
.vector,
.logo {
  position: absolute;
  background-size: cover;
}

.capture4 {
  width: 100%;
  height: 0;
  padding-top: 58.3%; /* Maintain aspect ratio */
  background-image: url("../assets/Food.png");
  border-radius: 16px;
}
</style>
