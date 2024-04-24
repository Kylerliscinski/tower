<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import Pop from "../utils/Pop.js";
import { towerEventsService } from "../services/TowerEventsService.js";
import { Modal } from "bootstrap";


const router = useRouter()

const towerEventData = ref({
  coverImg: '',
  name: '',
  startDate: '',
  location: '',
  capacity: 0,
  type: '',
  description: ''
})

function resetForm(){
  towerEventData.value = {
    coverImg: '',
    name: '',
    startDate: '',
    location: '',
    capacity: 0,
    type: '',
    description: ''
  }
}

async function createTowerEvent(){
  try {
    const newTowerEvent = await towerEventsService.createTowerEvent(towerEventData.value)
    resetForm()
    Modal.getOrCreateInstance('#create-towerEvent-modal').hide()
    Pop.toast("Created event!", 'success')
    router.push({name: 'Tower Event Details', params: {eventId: newTowerEvent.id}})
  } catch (error) {
    Pop.toast("Could not create event", 'error')
    console.error(error)
  }
}

</script>


<template>
  <!-- //FIXME - Make the form fields function better like a calendar for the date field -->
  <div class="container-fluid">
    <form @submit.prevent="createTowerEvent()" class="row">
      <div class="mb-3 col-4">
        <label for="event-coverImg">Image</label>
        <input v-model="towerEventData.coverImg" type="text" class="form-control" id="event-coverImg" required>
      </div>
      <div class="mb-3 col-4">
        <label for="event-name">Name</label>
        <input v-model="towerEventData.name" type="text" class="form-control" id="event-name" required minlength="3" maxlength="50">
      </div>
      <div class="mb-3 col-4">
        <label for="event-startDate">Start Date</label>
        <input v-model="towerEventData.startDate" type="date" class="form-control" id="event-startDate" required>
      </div>
      <div class="mb-3 col-4">
        <label for="event-location">Location</label>
        <input v-model="towerEventData.location" type="text" class="form-control" id="event-location" required minlength="1" maxlength="500">
      </div>
      <div class="mb-3 col-4">
        <label for="event-capacity">Capacity</label>
        <input v-model="towerEventData.capacity" type="text" class="form-control" id="event-capacity" required min="1" max="5000">
      </div>
      <div class="mb-3 col-4">
        <label for="event-type">Type</label>
        <select v-model="towerEventData.type" class="form-control" id="event-type" required>
          <option value="" disabled selected>Please select a type</option>
          <option value="concert">concert</option>
          <option value="convention">convention</option>
          <option value="sport">sport</option>
          <option value="digital">digital</option>
        </select>
      </div>
      <div class="mb-3 col-4">
        <label for="event-description">Description</label>
        <textarea v-model="towerEventData.description" type="text" class="form-control" id="event-description" required min="15" max="1000" rows="5"> 
        </textarea>
      </div>
      <div class="mb-2 d-flex justify-content-end">
        <button class="btn px-5" type="button" @click="resetForm()" >clear</button>
        <button class="btn btn-primary px-4">Submit <i class="mdi mdi-plus"></i></button>
      </div>
    </form>
  </div>
</template>


<style lang="scss" scoped>

</style>