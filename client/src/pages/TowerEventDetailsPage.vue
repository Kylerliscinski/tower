<script setup>
import { computed, onBeforeMount, ref } from "vue";
import { useRoute } from "vue-router";
import { AppState } from "../AppState.js";
import Pop from "../utils/Pop.js";
import { towerEventsService } from "../services/TowerEventsService.js";
import { logger } from "../utils/Logger.js";
import { ticketsService } from "../services/TicketsService.js";
import { commentsService } from "../services/CommentsService.js";

const route = useRoute()
const towerEvents = computed(() => AppState.activeTowerEvent)
const account = computed(() => AppState.account)
const coverImg = computed(() => `url(${AppState.activeTowerEvent?.coverImg})`)
const tickets = computed(() => AppState.activeTowerEventTickets)
const youHaveATicket = computed(() => tickets.value.find(ticket => ticket.accountId == AppState.account?.id))
const comments = computed(() => AppState.towerComments)

const commentData = ref({
  body: '',
  eventId: route.params.eventId
})

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

async function getTowerEventTickets(){
  try {
    await ticketsService.getTowerEventTickets(route.params.eventId)
  } catch (error) {
    Pop.toast("Could not get tickets for this event", 'error')
  }
}

async function createTicket(){
  try {
    const eventData = {eventId: route.params.eventId}
    await ticketsService.createTicket(eventData)
  } catch (error) {
    Pop.toast("Could not create ticket", 'error')
    console.error(error)
  }
}

function resetForm(){
  commentData.value = {
    body: '',
    eventId: route.params.eventId
  }
}

async function createComment(){
  try {
    logger.log("Creating a comment", commentData)
    await commentsService.createComment(commentData.value)

    resetForm()
  } catch (error) {
    Pop.toast("Could not create comment", 'error')
    console.error(error)
  }
}

async function getEventComments(){
  try {
    await commentsService.getEventComments(route.params.eventId)
  } catch (error) {
    Pop.toast("Could not get comments for this event", 'error')
    console.error(error)
  }
}

async function destroyComment(commentId){
  try {
    await commentsService.destroyComment(commentId)
  } catch (error) {
    Pop.toast("Could not destroy comment", 'error')
    console.error(error)
  }
}

onBeforeMount(() => {
  getTowerEventById()
  getTowerEventTickets()
  getEventComments()
})

</script>


<template>
  <section v-if="towerEvents" class="container-fluid">
    <div class="row justify-content-center">

      <!-- //!SECTION Large image + cancelled/sold out banner -->
      <div class="col-12 col-md-8 text-center large-image mb-4">
        <div class="d-flex align-items-end float-end mt-3">
          <button v-if="towerEvents.isCanceled" disabled class="btn btn-danger opacity-100 rounded">Cancelled</button>
          <button v-if="towerEvents.ticketCount == 0" disabled class="btn btn-warning opacity-100 rounded">Sold Out!</button>
        </div>
      </div>

      <!-- //!SECTION Left side of the page -->
      <div class="col-12 col-md-7">
        <div class="row">

          <!-- //!SECTION Event info -->
          <div class="col-12">

          <!-- //!SECTION Delete -->
            <div class="d-flex justify-content-between">
              <p v-if="youHaveATicket" class="text-success">You have a ticket!</p>
              <div class="dropdown open text-end">
                <button v-if="towerEvents.creatorId == account?.id" class="btn btn-outline-secondary dropdown-toggle" type="button" id="triggerId" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Options
                </button>
                <div class="dropdown-menu p-0" aria-labelledby="triggerId">
                <!-- <option class="dropdown-item text-warning selectable">Edit <i class="mdi mdi-pencil"></i></option> -->
                <option @click="cancelTowerEvent(towerEvents.id)" v-if="towerEvents.isCanceled" disabled class="dropdown-item text-dark">Cancel <i class="mdi mdi-trash-can"></i></option>
                <option @click="cancelTowerEvent(towerEvents.id)" v-else class="dropdown-item text-danger selectable">Cancel Event<i class="mdi mdi-trash-can"></i></option>
              </div>
            </div>
            </div>
            <h1 class="text-black fw-bold">{{ towerEvents.name }}</h1>
            <p class="mb-4">{{ towerEvents.description }}</p>
            <h3>Date and Time</h3>
            <h5><i class="mdi mdi-calendar"> ~ {{ towerEvents.startDate.toLocaleString() }}</i></h5>
            <h3>Location</h3>
            <h5 class="mb-4"><i class="mdi mdi-map"> ~ {{ towerEvents.location }}</i></h5>
            <h3>See what folks are saying...</h3>
            <div class="card">
              <form v-if="account" @submit.prevent="createComment()" class="p-4">
                <textarea v-model="commentData.body" class="form-control" name="comments" id="comments" rows="5" placeholder="Tell the people..."></textarea>
                <button v-if="towerEvents.isCanceled" disabled class="btn btn-success rounded float-end mt-1">Post Comment</button>
                <button v-else class="btn btn-success rounded float-end mt-1">Post Comment</button>
              </form>
              
              <div class="row justify-content-center">
                <div class="col-10">
                  <div v-for="towerComment in comments" :key="towerComment.id" class="card px-2 my-1 shadow">
                    <div class="row align-items-center">
                      <div class="col-12 col-md-2 p-3 text-center">
                        <img class="profile-img" :src="towerComment.creator?.picture" alt="">
                      </div>
                      <div class="col-12 col-md-7 text-start">
                        <p>{{ towerComment.creator?.name }} <br/>
                        "{{ towerComment.body }}"</p>
                      </div>
                      <div class="col-12 col-md-3">
                        <p v-if="youHaveATicket && towerComment.creatorId == towerEvents.creatorId" class="m-1 bg-primary rounded bg-opacity-50 text-center">Attending</p>
                        <p v-if="towerComment.creatorId == towerEvents.creatorId" class="m-1 bg-secondary rounded bg-opacity-50 text-center">Host</p>
                        <p @click="destroyComment(towerComment.id)" v-if="account?.id == towerComment.creatorId" class="mx-1 bg-danger rounded text-center bg-opacity-75 w-25 float-end selectable" role="button"><i class="mdi mdi-trash-can"></i></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      <!-- //!SECTION Right side of the page -->
      <div class="col-12 col-md-4 mt-5">
        <div class="row">

          <!-- //!SECTION Create ticket -->
          <div class="col-12">
            <div class="card text-center py-3 px-5">
              <h4>Interested in going?</h4>
              <p>Grab a ticket!</p>
              <div v-if="account">
                <button v-if="towerEvents.isCanceled || towerEvents.ticketCount == 0" disabled class="btn btn-primary rounded">Attend</button>
                <button @click="createTicket()" v-else class="btn btn-primary rounded">Attend</button>
              </div>
            </div>
            <p class="text-end">{{ towerEvents.ticketCount }} spots left!</p>
          </div>

          <!-- //!SECTION Attendees -->
          <h3>Attendees</h3>
          <div data-bs-spy="scroll" data-bs-target="#simple-list-example" data-bs-offset="0" data-bs-smooth-scroll="true" class="scrollspy-example card" tabindex="0">
            <div v-for="ticket in tickets" :key="ticket.id" class="col-12">
              <div class="row align-items-center">
                  <div class="col-5 p-3 text-center">
                  <div class="profile-bar ms-1">
                    <img class="profile-img" :src="ticket.profile.picture" alt="">
                  </div>
                </div>
                <div class="col-7">
                  <h5>{{ ticket.profile.name }}</h5>
                </div>
              </div>
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
.profile-img{
  height: 55px;
  aspect-ratio: 1/1;
  border-radius: 50em;
  object-fit: cover;
  object-position: center;
}

.profile-bar{
  border-left: 4.5px solid red;
  padding-right: 25px;
}
</style>