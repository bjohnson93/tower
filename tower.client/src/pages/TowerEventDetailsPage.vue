<template>
  <div class="container-fluid p-3">
    <section class="row">
      <!-- event details -->
      <div v-if="towerEvent" class="col-12 ">
        <div class="d-flex justify-content-evenly bg-dark rounded text-light p-4">
          <div>
            <img :src="towerEvent.coverImg" class="mb-3" :alt="towerEvent.name">
            <div class="d-flex">
            <div class="my-3 fs-5 p-3 ">
              <button v-if="towerEvent.creatorId == account.id && !towerEvent.isCanceled" @click="cancelTowerEvent()" class="btn btn-danger">Cancel My Event</button>
             
            </div>
            <div class="my-3 fs-5 p-3 ">
              <button v-if="account.id == towerEvent.creatorId && !towerEvent.isCanceled" data-bs-toggle="modal" data-bs-target="#exampleModal" class="btn btn-warning">Edit My Event</button>
            </div>
          </div>
          </div>
          <div class="p-2">
            <div class="d-flex p-2 justify-content-between">
              <p class="fs-2 p-2">{{ towerEvent.name }}</p>
              <p class="fs-3 p-2">{{ (towerEvent.startDate).toLocaleDateString() }}</p>
            </div>
            <div class="d-flex p-2 justify-content-between">
              <p class="fs-2 p-2 text-primary">{{ towerEvent.location }}</p>
              <p class="fs-3 p-2">{{ (towerEvent.startDate).toLocaleTimeString() }}</p>
            </div>
            <p class="fs-4 p-3 mb-3">{{ towerEvent.description }}</p>
            <div class="d-flex p-2 justify-content-between">
              <p v-if="towerEvent.isCanceled" class="fs-4 bg-danger text-center rounded p-1">EVENT HAS BEEN CANCELLED</p>
              <p v-if="!towerEvent.isCanceled" class="fs-2 p-2">{{ (towerEvent.capacity) - (towerEvent.ticketCount) }} Spots left </p>
              <button @click="buyTicket()" v-if="account.id && !towerEvent.isCanceled && !isTicketHolder" class="btn btn-warning px-5 fs-4">Buy Ticket  <i class="mdi mdi-human "></i></button>
              <div v-if="isTicketHolder" class="fs-4 text-primary"><p>Attending</p></div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- ticket holder area for this event -->
    <section class="row p-3">
      <div class="col-12 bg-dark rounded-top p-4">
        <p class="fs-4">See who is attending</p>
      </div>
      <div class="col-12 bg-secondary rounded-bottom p-4">
        Pictures of ticket holders with title's being their name will go here.
      </div>
    </section>
    <!-- comment section for this event -->
    <section class="row justify-content-center">
<div class="col-10 bg-dark rounded-top p-4">
  <p class="fs-4">What people are saying</p>
</div>
<div class="col-10 bg-dark rounded-bottom p-4 text-center">
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
import { logger } from "../utils/Logger.js";
import { ticketsService } from "../services/TicketsService.js"

export default {
  setup(){
    const route = useRoute()

    async function getTowerEventById(){
      try {
        const towerEventId = route.params.eventId
        await towerEventsService.getTowerEventById(towerEventId)
      } catch (error) {
        Pop.error(error.message)
      }
    }

    watchEffect(() => {
      getTowerEventById(route.params.eventId)
      
    })

    return {
      towerEvent: computed(() => AppState.activeEvent ),
      account: computed(() => AppState.account),
      user: computed(() => AppState.user),
      isTicketHolder: computed(() => {
        return AppState.tickets.find(t => t.accountId == AppState.account.id)
      }),
      
      async cancelTowerEvent() {
        try {
          // logger.log('cancelling this event')
          const wantsToCancel = await Pop.confirm('Are you sure you want to cancel this event?')

          if(!wantsToCancel) {
            return
          }
          const towerEventId = route.params.eventId
          await towerEventsService.cancelTowerEvent(towerEventId)
        } catch (error) {
          Pop.error(error.message)
        }
      },
      async buyTicket() {
        try {
          // logger.log('[You want to buy a ticket?]')
          const activeEventId = route.params.eventId
          // logger.log('[active event id]', route.params)
          // logger.log('[active event id]', activeEventId)
          const ticketData = { eventId: activeEventId }
          // logger.log('[this is the ticket data]', ticketData)
          await ticketsService.buyTicket(ticketData)
          // await ticketsService.getTicket(activeEventId)
          AppState.activeEvent.ticketCount++
        } catch (error) {
          Pop.error(error.message)
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>

</style>