<template>
  <div class="container-fluid p-3">
    <section class="row">
      <!-- event details -->
      <div v-if="towerEvent" class="col-12 ">
        <div class=" row d-flex justify-content-evenly bg-dark rounded text-light p-4">
          <div class="col-md-4">
            <img :src="towerEvent.coverImg" class="mb-3 img-fluid" :alt="towerEvent.name">
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
              <p class="fs-3 p-2">{{ (towerEvent.startDate).toLocaleDateString('en', { day: '2-digit', month: '2-digit', year: 'numeric' }) }}</p>
            </div>
            <div class="d-flex p-2 justify-content-between">
              <p class="fs-2 p-2 text-primary">{{ towerEvent.location }}</p>
              <p class="fs-3 p-2">{{ (towerEvent.startDate).toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit'}) }}</p>
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
        <p class="fs-4">Ticket Holders</p>
      </div>
      <div class="col-12 bg-secondary rounded-bottom">
          <section class="row">
          <div v-for="ticket in tickets" :key="ticket.id" class="col-1  p-4 d-flex">
              <img class="avatar" :title="ticket.profile.name" :src="ticket.profile.picture" :alt="ticket.profile.name">
          </div>

        </section>
        </div>
    </section>
    <!-- comment section for this event -->
    <section class="row justify-content-center mb-2">
<div class="col-10 bg-dark rounded-top p-4">
  <p class="fs-4">What people are saying</p>
</div>
<div class="col-10 bg-dark rounded-bottom p-4 text-center">
  <form @submit.prevent="createComment()">
  <div class="mb-3">
  <label for="body" class="form-label">Comment on Event</label>
  <textarea v-model="editable.body" type="text" rows="3" cols="10" class="form-control" id="body" placeholder="Event comment..." required> </textarea>
</div>
  <button type="submit" class="btn btn-success">Post Comment</button>
</form>
</div>
    </section>
 <!-- comments section -->
  <section class="row bg-dark rounded p-3">

    <div v-for="comment in comments" :key="comment?.id" class="d-flex align-items-center ps-5 ">
      <div class="px-4 mb-3 bg-primary rounded">
        <img class="avatarComment my-2" :src="comment?.creator?.picture" :alt="comment?.creator?.name">
        <p class="text-dark bg-white rounded px-3">{{ comment?.creator?.name }}</p>
      </div>
      <div class="p-2 d-flex">
        <!-- <button v-if="comment.creatorId == account?.id" @click="deleteComment(comment.id)" class="btn btn-danger px-2"> -->
          <i v-if="comment.creatorId == account?.id" @click="deleteComment(comment.id)" class="mdi mdi-delete text-danger fs-3"></i>
        <!-- </button> -->
        <p class="text-light fs-5">{{ comment.body }}</p>
      </div>
    </div>
  </section>
  </div>
</template>


<script>
import { useRoute } from "vue-router";
import Pop from "../utils/Pop.js";
import { towerEventsService } from "../services/TowerEventsService.js";
import { computed, ref, watchEffect } from "vue";
import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js";
import { ticketsService } from "../services/TicketsService.js"
import { commentsService } from "../services/CommentsService.js"

export default {
  setup(){
    const editable = ref({})
    const route = useRoute()

    async function getTowerEventById(){
      try {
        const towerEventId = route.params.eventId
        await towerEventsService.getTowerEventById(towerEventId)
      } catch (error) {
        Pop.error(error.message)
      }
    }
    async function getEventTickets(){
      try {
        const towerEventId = route.params.eventId
        // logger.log('[ROUTE PARAMS :]', towerEventId)
        await towerEventsService.getEventTickets(towerEventId)
      } catch (error) {
        Pop.error(error.message)
      }
    }
    async function getEventComments(){
      try {
        const towerEventId = route.params.eventId
      await commentsService.getEventComments(towerEventId)
      } catch (error) {
        Pop.error(error.message)
      }
    }
    watchEffect(() => {
      getTowerEventById(route.params.eventId)
      getEventTickets()
      getEventComments()
    })

    return {
      editable,
      tickets: computed(() => AppState.tickets),
      towerEvent: computed(() => AppState.activeEvent ),
      comments: computed(() => AppState.comments),
      account: computed(() => AppState.account),
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
          const ticketData = { eventId: activeEventId }
          await ticketsService.buyTicket(ticketData)
          AppState.activeEvent.ticketCount++
        } catch (error) {
          Pop.error(error.message)
        }
      },
      async createComment(){
        try {
          const eventCommentData = editable.value
          eventCommentData.eventId = route.params.eventId
          //this attaches the event Id TO the comment post
        await commentsService.createComment(eventCommentData)
        editable.value = {}
        } catch (error) {
          Pop.error(error.message)
        }
      },
      async deleteComment(commentId){
        try {
          
          const wantsToDelete = await Pop.confirm('Deleting this comment is permanent, are you sure?')
        if(!wantsToDelete) {
          return
            }
            logger.log('deleting comment with id of : ', commentId)
        // const commentToRemove = AppState.comments.find(c => c.id == commentId)
        await commentsService.deleteComment(commentId)
        // const commentId
        } catch (error) {
          Pop.error(error.message)
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
.avatar{
  border-radius: 50%;
  height: 6vh;
  width: 6vh;
  object-fit: cover;
  object-position: center;
}
.avatarComment{
  border-radius: 50%;
  height: 3vh;
  width: 3vh;
  object-fit: cover;
  object-position: center;
}
</style>