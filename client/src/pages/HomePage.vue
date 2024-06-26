<script setup>
import { computed, onMounted, ref } from "vue";
import { AppState } from "../AppState.js";
import Pop from "../utils/Pop.js";
import { towerEventsService } from "../services/TowerEventsService.js";
import EventCard from "../components/EventCard.vue";
import ModalWrap from "../components/ModalWrap.vue";
import TowerEventForm from "../components/TowerEventForm.vue";


const filterBy = ref('all')

const account = computed(() => AppState.account)

const towerEvents = computed(() => {
  if(filterBy.value == 'all') return AppState.towerEvents
  return AppState.towerEvents.filter(event => event.type == filterBy.value)
})

const filters = [
  {
    name: 'all',
  },
  {
    name: 'concert',
  },
  {
    name: 'convention',
  },
  {
    name: 'sport',
  },
  {
    name: 'digital',
  }
]

async function getTowerEvents(){
  try {
    await towerEventsService.getTowerEvents()
  } catch (error) {
    Pop.toast("Could not get events", 'error')
    console.error(error)
  }
}

onMounted(() => {
  getTowerEvents()
})

</script>

<template>

<!-- //!SECTION Large bg-image & Text-->
  <section class="container-fluid bg-image">
    <div class="row ms-1 p-5 justify-content-end">
      <div class="col-12 col-md-6">
        <h1 class="text-white fw-bold">Event Management for People, <br/> by People</h1>
        <h5 class="text-white">Whatever your interest, from hiking and reading to networking and skill sharing, there are thousands of people who share it on Tower. Events are happening every day - log in to join the fun.
        </h5>
      </div>
    </div>
  </section>

  <!-- //!SECTION Create Event Modal -->
  <section class="container-fluid">
    <div class="row justify-content-around">
      <div class="col-12 ps-5 mt-5">
        <h1 class="text-black fw-bold">How Tower works</h1>
      </div>
      <div class="col-12 col-md-5 px-5 py-4">
        <div class="card filter-card p-4">
          <h1>Discover events you're interested in</h1>
          <p>Browse through community hosted events for all the things you love and enjoy</p>
          <p>Don't miss out!</p>
        </div>
      </div>
      <div class="col-12 col-md-5 px-5 py-4">
        <div class="card filter-card p-4">
          <h1>Start an event to invite your friends</h1>
          <p>Create your own Tower event, and draw from a community of millions</p>
          <p v-if="account" data-bs-toggle="modal" data-bs-target="#create-towerEvent-modal" class="fw-bold text-success selectable">Create an event</p>
          <ModalWrap modalId="create-towerEvent-modal">
            <TowerEventForm/>
          </ModalWrap>
        </div>
      </div>
    </div>
  </section>

  <!-- //!SECTION Filter search -->
  <section class="container-fluid">
    <div class="row justify-content-between mx-1">
      <div class="col-12 mt-5 ps-4">
        <h1 class="text-black fw-bold">Explore top categories</h1>
      </div>
      <div class="col-12 col-md-2 px-1 mt-4" v-for="filterObj in filters" :key="filterObj.name">
        <div @click="filterBy = filterObj.name" role="button" class="filter-card rounded selectable shadow" :style="`${filterObj.name}`">
          <h4 class="text-center py-3">{{ filterObj.name }}</h4> 
        </div>
      </div>
    </div>
  </section>

  <!-- //!SECTION Upcoming Events -->
  <section class="container-fluid">
    <div class="row justify-content-around">
      <div class="col-12 ps-5 mt-5">
        <h1 class="text-black fw-bold">Upcoming Events</h1>
      </div>
      <div v-for="towerEvent in towerEvents" :key="towerEvent.id" class="col-12 col-md-4 col-sm-6 p-2">
        <EventCard :towerEvent="towerEvent"/>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.bg-image{
  background-image: url(https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D);
  height: 70dvh;
  background-position: center;
  background-size: cover;
}

.filter-card{
  background-color: rgb(234, 226, 232);
}
</style>
