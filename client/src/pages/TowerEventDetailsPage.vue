<script setup>
import { computed, onBeforeMount, onMounted } from "vue";
import { useRoute } from "vue-router";
import { AppState } from "../AppState.js";
import Pop from "../utils/Pop.js";
import { towerEventsService } from "../services/TowerEventsService.js";
import { logger } from "../utils/Logger.js";

const route = useRoute()
const towerEvent = computed(() => AppState.activeTowerEvent)
const account = computed(() => AppState.account)
const coverImg = computed(() => `url(${AppState.activeTowerEvent?.coverImg})`)

async function getTowerEventById(){
  try {
    await towerEventsService.getTowerEventById(route.params.eventId)
  } catch (error) {
    Pop.toast("Could not get event by id", 'error')
    logger.error(error)
  }
}

async function cancelTowerEvent(eventId){
  try {
    await towerEventsService.cancelTowerEvent(eventId)
  } catch (error) {
    Pop.toast("Could not cancel event", 'error')
    console.error(error)
  }
}

onBeforeMount(() => {
  getTowerEventById()
})

onMounted(() => getTowerEventById())

</script>


<template>
  <section v-if="towerEvent" class="container-fluid">
    <div class="row justify-content-center">

      <div class="col-8 text-center large-image mb-4">
        <div class="d-flex align-items-end float-end mt-3">
          <button v-if="towerEvent.isCanceled" disabled class="btn btn-danger opacity-100 rounded">Cancelled</button>
        </div>
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
                <button v-if="towerEvent.isCanceled" disabled class="btn btn-success rounded float-end mt-1">Post Comment</button>
                <button v-else class="btn btn-success rounded float-end mt-1">Post Comment</button>
              </form>
              <!-- //FIXME - Add v-for over peoples comments here -->
            </div>
          </div>
        </div>
      </div>

      <div class="col-4">
        <div class="row">
          <div class="col-12 py-2">
            <div class="dropdown open text-end">
                <button v-if="towerEvent.creatorId == account?.id" class="btn btn-outline-secondary dropdown-toggle" type="button" id="triggerId" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Options
                </button>
                <div class="dropdown-menu p-0" aria-labelledby="triggerId">
                <option class="dropdown-item text-warning selectable">Edit <i class="mdi mdi-pencil"></i></option>
                <option @click="cancelTowerEvent(towerEvent.id)" v-if="towerEvent.isCanceled" disabled class="dropdown-item text-dark">Cancel <i class="mdi mdi-trash-can"></i></option>
                <option @click="cancelTowerEvent(towerEvent.id)" v-else class="dropdown-item text-danger selectable">Cancel <i class="mdi mdi-trash-can"></i></option>
              </div>
            </div>
          </div>

          <div class="col-12">
            <div class="card text-center py-3 px-5">
              <h4>Interested in going?</h4>
              <p>Grab a ticket!</p>
              <button v-if="towerEvent.isCanceled" disabled class="btn btn-primary rounded">Attend</button>
              <button v-else class="btn btn-primary rounded">Attend</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>


<style lang="scss" scoped>
.large-image{
  background-image: v-bind(coverImg);
  background-size: cover;
  background-position: center;
  height: 60dvh;
  border-radius: 20px;
}
</style>