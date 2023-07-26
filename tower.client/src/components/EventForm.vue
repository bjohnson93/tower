<template>
  <form @submit.prevent="createTowerEvent()">
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
<select v-model="editable.type" class="form-select" aria-label="Default select example">
  <option selected>Type</option>
  <option v-for="type in types" :key="type" :value="type"></option>
  {{  }}
</select>

<div class="form-check">
  <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
  <label class="form-check-label" for="flexCheckDefault">
    Event is Cancelled
  </label>
</div>
</form>
</template>


<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import Pop from "../utils/Pop.js";
import { towerEventsService } from "../services/TowerEventsService.js";
import { Modal } from "bootstrap";

export default {
  setup(){
    const editable = ref({})
    const router = useRouter()
    return {
      editable,
      types: ['concert', 'convention', 'sport', 'digital'],
      async createTowerEvent(){
        try {
          const towerEventData = editable.value
          const towerEvent = await towerEventsService.createTowerEvent(towerEventData)
          editable.value = {}
          Modal.getOrCreateInstance('#exampleModal').hide()
          router.push({name: 'TowerEvent', params: {towerEventId: towerEvent.id}})
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