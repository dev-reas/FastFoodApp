<template>
  <swiper
    :slidesPerView="'auto'"
    :spaceBetween="30"
    :pagination="{
      clickable: true,
    }"
    :modules="modules"
    class="mySwiper"
  >
    <swiper-slide v-for="(item, index) in items" :key="index">
      <div class="slide-container">
        <img :src="item.image" :alt="item.altText" />
        <div class="overlay" v-if="item.text">
          <p>{{ item.text }}</p>
          <p>{{ item.subtext }}</p>
        </div>
      </div>
    </swiper-slide>
  </swiper>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "@ionic/vue/css/ionic-swiper.css";

interface SlideItem {
  image: string;
  altText: string;
  text?: string;
  subtext?: string;
}

export default defineComponent({
  name: "HomeView",
  components: {
    Swiper,
    SwiperSlide,
  },

  props: {
    items: {
      type: Array as () => SlideItem[],
      required: true,
    },
  },

  setup() {
    return { modules: [Pagination] };
  },
});
</script>

<style>
.swiper {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  /* Center slide text vertically */
  display: flex;
  justify-content: center;
  align-items: center;
}

.slide-container {
  position: relative;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
}

.slide-container .overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 20px;
  background-color: rgba(0, 0, 0, 0.2);
}

.overlay p {
  color: #ffffff;
  margin: 0;
  display: flex;
  justify-content: start;
}

.swiper .swiper-slide img {
  width: 100%;
  height: 100%;
  border-radius: 30px;
}

.swiper-slide:nth-child(1n) {
  width: 80%;
}

.swiper-slide:nth-child(2n) {
  width: 80%;
}

.swiper-slide:nth-child(3n) {
  width: 80%;
}
</style>
