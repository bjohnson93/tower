<template>

  <form action="" @submit.prevent="handleSubmit()">
  <div class="mb-3">
  <label for="name" class="form-label">Event Name</label>
  <input v-model="editable.name" type="text" minlength="3" maxlength="30" class="form-control" id="name" placeholder="Event Name..." required>
</div>
  
  <div class="mb-3">
  <label for="location" class="form-label">Location</label>
  <input v-model="editable.location" type="text" minlength="3" maxlength="30" class="form-control" id="location" placeholder="Event Location..." required>
</div>
  <div class="mb-3">
  <label for="coverImg" class="form-label">Image</label>
  <input v-model="editable.coverImg" type="url" minlength="3" maxlength="250" class="form-control" id="coverImg" placeholder="Event Image ..." required>
</div>
  <div class="mb-3">
  <label for="capacity" class="form-label">Max Capacity</label>
  <input v-model="editable.capacity" type="number" min="0" max="224" class="form-control" id="capacity" placeholder="Event Capacity..." required>
</div>

<div class="mb-3">
  <label for="description" class="form-label">Event Description</label>
  <textarea v-model="editable.description" type="text" minlength="3" maxlength="800" class="form-control" id="description" placeholder="Event description..." required> </textarea>
</div>
<label for="type" class="form-label">Select Event Type</label>
<select v-model="editable.type" required class="form-select mb-2" aria-label="Default select example">
  <option selected value="">Select Event Type</option>
  <option v-for="type in types" :key="type" :value="type">
  {{ type }}
  </option>
</select>

<div class="mb-3">
  <label for="startDate">Event Date (date and time):</label>
<input class="form-control" v-model="editable.startDate" type="datetime-local" id="startDate" name="startDate">
  </div>
<button type="submit" class="btn btn-success">Save</button>

</form>
</template>


<script>
import { ref, watchEffect } from "vue";
import { useRouter } from "vue-router";
import Pop from "../utils/Pop.js";
import { towerEventsService } from "../services/TowerEventsService.js";
import { Modal } from "bootstrap";
import { logger } from "../utils/Logger.js";
import { AppState } from "../AppState.js";

export default {
  setup(){
    const editable = ref({})
    const router = useRouter()

    watchEffect(() => {
      // logger.log('[watch effect on the form...]')
      editable.value = {...AppState.activeEvent}
    })
    return {
      editable,
      types: ['concert', 'convention', 'sport', 'digital'],
      handleSubmit(){
        if(editable.value.id) {
          this.editTowerEvent()
        }
        else {
          this.createTowerEvent()
        }
      },
      async createTowerEvent(){
        try {
          logger.log('created new event?')
          const towerEventData = editable.value
          const towerEvent = await towerEventsService.createTowerEvent(towerEventData)
          editable.value = {}
          Modal.getOrCreateInstance('#exampleModal').hide()
          router.push({name: 'TowerEvent', params: {towerEventId: towerEvent.id}})
        } catch (error) {
          Pop.error(error.message)
        }
      },
      async editTowerEvent() {
        try {
          const towerEventData = editable.value
          await towerEventsService.editTowerEvent(towerEventData)
          editable.value = {}
          Modal.getOrCreateInstance('#exampleModal').hide()
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