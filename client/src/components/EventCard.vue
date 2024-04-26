<script setup>
import { TowerEvent } from "../models/TowerEvent.js";


defineProps({towerEvent: {type: TowerEvent, required: true}})

</script>


<template>
  <RouterLink :to="{name: 'Tower Event Details', params: {eventId: towerEvent.id}}">
    <div class="card d-flex g-2">
      <img class="img-fluid event-card-image" :src="towerEvent.coverImg" alt="">
      <div class="card-body">
        <h4>{{ towerEvent.name }}</h4>
        <p v-if="towerEvent.creator">Hosted by {{ towerEvent.creator.name }}</p>
        <p>{{ towerEvent.startDate.toDateString() }} - <br/> {{ towerEvent.location }}</p>
        <p>{{ towerEvent.attending }} Attending</p>
        <button v-if="towerEvent.isCanceled" disabled class="btn btn-danger opacity-100 rounded">Cancelled</button>
        <button v-if="towerEvent.ticketCount == 0" disabled class="btn btn-warning opacity-100 rounded">Sold Out!</button>
      </div>
    </div>
  </RouterLink>
</template>


<style lang="scss" scoped>

.event-card-image{
  height: 250px;
  object-fit: cover;
  object-position: center;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}
</style>