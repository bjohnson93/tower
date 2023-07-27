<template>
<div class="container-fluid">
  <section class="row">
    <div class="col-12 createButton text-dark p-3 mb-3">
      <h1>Events I have Tickets For...</h1>
    </div>
  </section>
  <section class="row">
    <div v-for="ticket in myTickets" :key="ticket.event.name" class="col-md-2 col-6 p-2 ">
    <EventCard :eventProp="ticket.event"/>
    <button @click="deleteMyTicket(ticket.id)" class="btn btn-danger ">Sell My Ticket</button>
    </div>

  </section>

</div> 
</template>


<script>
import { computed, onMounted } from "vue";
import Pop from "../utils/Pop.js";
import { AppState } from "../AppState.js";
import { ticketsService } from "../services/TicketsService.js";
import { Ticket } from "../models/Ticket.js";
import { logger } from "../utils/Logger.js";

export default {
  setup(){
    // props: { tickets: type: Ticket, required: true };
    // onMounted(() => )
    
    return {
      myTickets: computed(() => AppState.myTickets),
      account: computed(() => AppState.account),
      towerEvent: computed(() => AppState.towerEvents),

      async deleteMyTicket(ticketId) {
        try {
          const wantsToDelete = await Pop.confirm('Are you sure you want to sell your ticket?')
          if (!wantsToDelete) {
            return
          }
          await ticketsService.deleteMyTicket(ticketId)
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