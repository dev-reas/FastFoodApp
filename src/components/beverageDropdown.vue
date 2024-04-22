<template>
  <ion-row>
    <ion-col size="12">
      <ion-item>
        <ion-select
          label="Beverages"
          label-placement="stacked"
          :value="selectedBeverage"
          class="dropdown-beverage"
          @ionChange="handleChange"
        >
          <ion-select-option
            v-for="option in options"
            :key="option.value"
            :value="option.value"
            >{{ option.label }}</ion-select-option
          >
        </ion-select>
      </ion-item>
    </ion-col>
  </ion-row>
</template>

<script lang="ts">
import {
  IonCol,
  IonItem,
  IonRow,
  IonSelect,
  IonSelectOption,
} from "@ionic/vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "BeverageDropdown",
  components: {
    IonSelect,
    IonSelectOption,
    IonItem,
    IonCol,
    IonRow,
  },
  props: {
    selectedBeverage: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      options: [
        { value: "Coke", label: "Coke" },
        { value: "Pepsi", label: "Pepsi" },
        { value: "Sprite", label: "Sprite" },
      ],
    };
  },
  methods: {
    handleChange(event) {
      this.$emit("update:selectedBeverage", event.detail.value);
    },
  },
});
</script>

<style scoped>
.dropdown-beverage {
  --highlight-color-focused: #cf4647;
}
</style>
