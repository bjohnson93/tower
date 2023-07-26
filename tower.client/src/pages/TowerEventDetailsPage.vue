<template>
  <div class="container-fluid p-3">
    <section class="row">
      <!-- event details -->
      <div v-if="towerEvent" class="col-12 ">
        <div class="d-flex justify-content-evenly bg-dark text-light p-4">
          <div>
            <img :src="towerEvent.coverImg" :alt="towerEvent.name">

          </div>
          <div class="p-2">
            <div class="d-flex p-2 justify-content-between">
              <p class="fs-2">{{ towerEvent.name }}</p>
              <p class="fs-3">{{ (towerEvent.startDate).toLocaleDateString() }}</p>
            </div>
            <div class="d-flex p-2 justify-content-between">
              <p class="fs-2 text-primary">{{ towerEvent.location }}</p>
              <p class="fs-3">{{ (towerEvent.startDate).toLocaleTimeString() }}</p>
            </div>
            <p class="fs-4 p-3 mb-3">{{ towerEvent.description }}</p>
            <div class="d-flex p-2 justify-content-between">
              <p class="fs-2">{{ (towerEvent.capacity) - (towerEvent.ticketCount) }} Spots left </p>
              <button class="btn btn-warning px-5 fs-4">Attend  <i class="mdi mdi-human "></i></button>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- ticket holder area for this event -->
    <section class="row p-3">
      <div class="col-12 bg-dark p-4">
        <p class="fs-4">See who is attending</p>
      </div>
      <div class="col-12 bg-secondary p-4">
        Pictures of ticket holders with title's being their name will go here.
      </div>
    </section>
    <!-- comment section for this event -->
    <section class="row justify-content-center">
<div class="col-10 bg-dark p-4">
  <p class="fs-4">What people are saying</p>
</div>
<div class="col-10 bg-dark p-4">
  Form for making a comment will go here, with post comment 
  <button class="btn btn-success">Post Comment</button>
  <p>Commenter names, comments, photos will display under comment form, possibly if attending also.</p>
</div>
    </section>
  </div>
</template>


<script>
import { useRoute } from "vue-router";
import Pop from "../utils/Pop.js";
import { towerEventsService } from "../services/TowerEventsService.js";
import { computed, watchEffect } from "vue";
import { AppState } from "../AppState.js"

export default {
  setup(){
    const route = useRoute()
    async function getTowerEventById(){
      try {
        const towerEventId = route.params.towerEventId
        await towerEventsService.getTowerEventById(towerEventId)
      } catch (error) {
        Pop.error(error.message)
      }
    }

    watchEffect(() => {
      getTowerEventById(route.params.towerEventId)
    })

    return {
      towerEvent: computed(() => AppState.activeEvent ),
    }
  }
}
</script>


<style lang="scss" scoped>

</style>