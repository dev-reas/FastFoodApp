<template>
  <ion-row>
    <ion-col
      v-for="(size, index) in sizes"
      :key="index"
      size-lg="4"
      size-md="12"
      size-sm="12"
    >
      <ion-button
        expand="block"
        class="ButtonSizes"
        :class="{ ButtonSelected: selectedSize === size }"
        @click="emitSize(size)"
        >{{ size }}</ion-button
      >
    </ion-col>
  </ion-row>
</template>

<script lang="ts">
import { IonRow, IonCol, IonButton } from "@ionic/vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "SizeButtons",
  props: {
    sizes: {
      type: Array,
      required: true,
    },
  },
  components: {
    IonRow,
    IonCol,
    IonButton,
  },
  data() {
    return {
      selectedSize: null as string | null, // Track the selected size
    };
  },
  methods: {
    emitSize(size: string) {
      this.selectedSize = size; // Update selected size
      this.$emit("sizeSelected", size);
    },
  },
});
</script>

<style scoped>
.ButtonSizes {
  --background: #f8f6f6 !important;
  --color: #2a363b !important;
  --border-radius: 35px;
}

.ButtonSelected {
  --background: #cf4647 !important; /* Change background color for selected button */
  --color: #f8f6f6 !important;
}
</style>
