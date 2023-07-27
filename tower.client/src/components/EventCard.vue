<template>
  <router-link :to="{ name: 'TowerEvent', params: {eventId: eventProp.id }}">
  <div class="bg-secondary text-light rounded border border-info mb-3">
      <img class="eventImg img-fluid rounded-top" :src="eventProp.coverImg" :alt="eventProp.name">
      <p class="fs-4 p-2">{{ eventProp.name }}</p>
      <p v-if="eventProp.isCanceled" class="fs-5 bg-danger text-end p-2 rounded">CANCELLED</p>
    </div>
  </router-link>
</template>


<script>

export default {
  props: {
    eventProp: { type: Object, required: true }
  },
  setup(){
    return {}
  }
}
</script>


<style lang="scss" scoped>
.eventImg{
  height: auto;
  width: fit-content;
  object-fit: cover;
  object-position: center;
}
</style>