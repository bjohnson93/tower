<template>
<div class="container-fluid">
  <section class="row justify-content-center text-center p-4">
    <div class="col-12">
      <img class="welcomeImg rounded border border-secondary" src="https://images.unsplash.com/photo-1464047736614-af63643285bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjF8fGV2ZW50fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60" alt="">
      <div class="d-flex justify-content-evenly p-3">
        <p class="fs-3">Get ahead of scalpers</p>
        <button type="button" class="btn btn-success fs-3 p-3" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
          Create Your Own Event
          <ModalComponent></ModalComponent>
</button>

        
      </div>
    </div>
  </section>
</div>

<section class="row p-4">
  <div v-for="towerEvent in towerEvents" :key="towerEvent.id" class="col-md-3 col-6 ">
    <EventCard :eventProp="towerEvent"/>
    <!-- <div class="bg-secondary text-light rounded border border-info mb-3">
      <img class="eventImg img-fluid rounded-top" :src="towerEvent.coverImg" :alt="towerEvent.name">
      <p class="fs-4 p-2">{{ towerEvent.name }}</p>
      <p v-if="towerEvent.isCanceled" class="fs-5 bg-danger text-end p-2 rounded">CANCELLED</p>
    </div> -->
  </div>
</section>
</template>

<script>
import ModalComponent from "../components/ModalComponent.vue";
import Pop from "../utils/Pop.js";
import {towerEventsService} from "../services/TowerEventsService.js"
import { computed, onMounted } from "vue";
import { AppState } from "../AppState.js";

export default {
    setup() {
        async function getTowerEvents() {
            try {
                await towerEventsService.getTowerEvents();
            }
            catch (error) {
                Pop.error(error.message);
            }
        }
        onMounted(() => {
            getTowerEvents();
        });
        return {
            towerEvents: computed(() => AppState.towerEvents)
        };
    },
    components: { ModalComponent }
}
</script>

<style scoped lang="scss">


.welcomeImg{
  width: 130vh;
  height: 20vh;
  object-fit: cover;
  object-position: center;
}
</style>
