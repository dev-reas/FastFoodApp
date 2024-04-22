<template>
  <ion-input label-placement="stacked" placeholder="Try our new Beef Bibimbowl">
    <ion-icon
      slot="start"
      :icon="search"
      aria-hidden="true"
      class="input-icons"
      size="large"
    ></ion-icon>
    <ion-button fill="clear" slot="end" aria-label="Show/hide">
      <ion-icon
        slot="icon-only"
        :icon="filter"
        aria-hidden="true"
        class="input-icons"
        size="large"
      ></ion-icon>
    </ion-button>
  </ion-input>
</template>

<script lang="ts">
import { IonButton, IonIcon, IonInput } from "@ionic/vue";

import { search, filter } from "ionicons/icons";

import { defineComponent } from "vue";

export default defineComponent({
  components: {
    IonButton,
    IonIcon,
    IonInput,
  },
  setup() {
    return { search, filter };
  },
});
</script>

<style>
.input-icons {
  color: #cf4647;
}
</style>
