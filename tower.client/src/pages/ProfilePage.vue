<template>
<div class="container-fluid">
  <section class="row">
    <div class="col-12 bg-secondary p-3">
      <h1>My Profile</h1>
    </div>
  </section>
  <section class="row">

    <div class="col-10 bg-primary">Events I have created</div>
  </section>
  <!-- <section class="row bg-light p-2">
    <div v-for="tix in myTickets" :key="tix.id" class="col-10 bg-secondary mb-2 rounded ">
      <h1>my tickets?</h1>
      <p v-if="tix" class="fs-5">event Id: {{ tix.eventId }}</p>
      <button class="btn btn-danger" @click="deleteMyTicket(tix.eventId)">Sell My Ticket</button>
    </div>
  </section>
  <section class="row">
    <div class="col-3">{{ tix.event }}</div>
  </section>
</div> -->
</template>


<script>
import { computed, onMounted } from "vue";
import Pop from "../utils/Pop.js";
import { AppState } from "../AppState.js";
import { ticketsService } from "../services/TicketsService.js";

export default {
  setup(){
    // props: { towerEvent: type: Object, required: true };
    // onMounted(() => )
    
    return {
      myTickets: computed(() => AppState.myTickets),
      account: computed(() => AppState.account),
      towerEvent: computed(() => AppState.towerEvents),

      // async deleteMyTicket(ticketId) {
      //   try {
      //     const wantsToDelete = Pop.confirm('Are you sure you want to sell your ticket?')
      //     if (!wantsToDelete) {
      //       return
      //     }
      //     await ticketsService.deleteMyTicket(ticketId)
      //   } catch (error) {
      //     Pop.error(error.message)
      //   }
      // }
    }
  }
}
</script>


<style lang="scss" scoped>

</style>