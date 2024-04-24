<script setup>
import { computed, onBeforeMount } from "vue";
import { useRoute } from "vue-router";
import { AppState } from "../AppState.js";
import Pop from "../utils/Pop.js";
import { towerEventsService } from "../services/TowerEventsService.js";
import { logger } from "../utils/Logger.js";

const route = useRoute()
const towerEvent = computed(() => AppState.activeTowerEvent)

async function getTowerEventById(){
  try {
    await towerEventsService.getTowerEventById(route.params.eventId)
  } catch (error) {
    Pop.toast("Could not get event by id", 'error')
    logger.error(error)
  }
}

onBeforeMount(() => {
  getTowerEventById()
})

</script>


<template>
  <section v-if="towerEvent" class="container-fluid">
    <div class="row justify-content-around">

      <div class="col-12 text-center">
        <img :src="towerEvent.coverImg" alt="">
      </div>

      <div class="col-5">
        <div class="row">
          <div class="col-12">
            <h1 class="text-black fw-bold">{{ towerEvent.name }}</h1>
            <p>{{ towerEvent.description }}</p>
            <h3>Date and Time</h3>
            <h5><i class="mdi mdi-calendar"> {{ towerEvent.startDate.toLocaleString() }}</i></h5>
            <h3>Location</h3>
            <h5><i class="mdi mdi-map"> {{ towerEvent.location }}</i></h5>
            <h3>See what folks are saying...</h3>
            <div class="card">
              <form class="p-4">
                <textarea class="form-control" name="comments" id="comments" rows="5" placeholder="Tell the people..."></textarea>
                <button class="btn btn-success rounded float-end mt-1">Post Comment</button>
              </form>
              <!-- //FIXME - Add v-for over peoples comments here -->
            </div>
          </div>
        </div>
      </div>

      <div class="col-4">
        attendees
      </div>
    </div>
  </section>
</template>


<style lang="scss" scoped>

</style>