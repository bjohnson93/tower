<template>
<div class="container-fluid">
  <section class="row justify-content-center text-center p-4">
    <div class="col-12">
      <img class="welcomeImg rounded border border-secondary" src="https://images.unsplash.com/photo-1464047736614-af63643285bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjF8fGV2ZW50fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60" alt="">
      <div class="d-flex justify-content-evenly p-3">
        <p class="fs-3">Get ahead of scalpers</p>
        <button v-if="account.id" type="button" class="btn btn-success fs-3 p-3" data-bs-toggle="modal" data-bs-target="#exampleModal">
          Create Your Own Event
        </button>
      </div>
    </div>
  </section>
</div>
<div class="container">
<section class="row justify-content-center">
  <div class="col-md-10 col-12 p-3 bg-primary text-light d-flex justify-content-evenly rounded">
    <button class="btn btn-outline-light px-3" @click="filterBy = '' ">All Events</button>
    <button class="btn btn-outline-light px-3" @click="filterBy = 'concert' ">Concerts</button>
    <button class="btn btn-outline-light px-3" @click="filterBy = 'convention' ">Conventions</button>
    <button class="btn btn-outline-light px-3" @click="filterBy = 'sport' ">Sports</button>
    <button class="btn btn-outline-light px-3" @click="filterBy = 'digital' ">Digital</button>
  </div>
</section>

<section class="row p-4">
  <div v-for="towerEvent in towerEvents" :key="towerEvent.id" class="col-md-3 col-6 ">
    <EventCard :eventProp="towerEvent"/>

  </div>
</section>
</div>
</template>

<script>
import Pop from "../utils/Pop.js";
import {towerEventsService} from "../services/TowerEventsService.js"
import { computed, onMounted, ref } from "vue";
import { AppState } from "../AppState.js";

export default {
    setup() {
      const filterBy = ref('')
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
            filterBy,
            towerEvents: computed(() => {
              if (filterBy.value == "") {
                return AppState.towerEvents
              } else {
                return AppState.towerEvents.filter(e => e.type == filterBy.value)
              }
            }
              ),
            account: computed(() => AppState.account)
        };
    },
    
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
