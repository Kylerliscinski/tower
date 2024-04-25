<script setup>
import { computed } from "vue";
import { TowerEvent } from "../models/TowerEvent.js";
import { AppState } from "../AppState.js";


defineProps({towerEvent: {type: TowerEvent, required: true}})

const tickets = computed(() => AppState.activeTowerEventTickets)
// FIXME - you have a ticket does not work
const youHaveATicket = computed(() => tickets.value.find(ticket => ticket.creatorId == AppState.account.id))


</script>


<template>
  <RouterLink :to="{name: 'Tower Event Details', params: {eventId: towerEvent.id}}">
    <div class="card d-flex g-2 h-100">
      <!-- //FIXME - Fix img height -->
      <img class="img-fluid" :src="towerEvent.coverImg" alt="">
      <div class="card-body">
        <h4>{{ towerEvent.name }}</h4>
        <p>Hosted by {{ towerEvent.creator.name }}</p>
        <p>{{ towerEvent.startDate.toDateString() }} - <br/> {{ towerEvent.location }}</p>
        <p>Event capacity: {{ towerEvent.capacity }}</p>
        <button v-if="towerEvent.isCanceled" disabled class="btn btn-danger opacity-100 rounded">Cancelled</button>
        <button v-if="youHaveATicket" disabled class="btn btn-success opacity-100 rounded">Attending</button>
      </div>
    </div>
  </RouterLink>
</template>


<style lang="scss" scoped>
div{
  img{
    max-height: fit-content;
  }
}
</style>