<script setup>
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState.js';
import Pop from "../utils/Pop.js";
import { ticketsService } from "../services/TicketsService.js";
import EventCard from "../components/EventCard.vue";

const account = computed(() => AppState.account)
const tickets = computed(() => AppState.accountTickets)

async function getAccountTicketTowerEvents(){
  try {
    await ticketsService.getAccountTicketTowerEvents()
  } catch (error) {
    Pop.toast("Could not get Account tickets", 'error')
    console.error(error)
  }
}

async function deleteTicket(ticketId){
  try {
    await ticketsService.deleteTicket(ticketId)
  } catch (error) {
    Pop.toast("Could not unnatend event", 'error')
    console.error(error)
  }
}

onMounted(() => {
  getAccountTicketTowerEvents()
})

</script>

<template>
  <div class="about text-start p-3 container-fluid">
    <div v-if="account" class="row">
      <div class="col-1">
        <img class="rounded" :src="account.picture" alt="" />
      </div>
      <div class="col-12">
        <h1>{{ account.name }}</h1>
        <p> ~ Events</p>
      </div>
    </div>
    <div v-else>
      <h1>Loading... <i class="mdi mdi-loading mdi-spin"></i></h1>
    </div>
  </div>
  
  <section class="container-fluid">
    <div class="row">
      <div v-for="ticket in tickets" :key="ticket.id" class="col-12 col-md-4 col-sm-6">
        <!-- {{ tickets }} -->
        <EventCard :towerEvent="ticket.towerEvent"/>
        <div class="text-end">
          <button @click="deleteTicket(ticket.id)" class="btn btn-primary rounded">Unattend</button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
img {
  max-width: 100px;
}
</style>
