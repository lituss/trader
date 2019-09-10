<template>
  <div class="about">
    <h1>This is an about page</h1>
    <v-container>
      <v-row>
        <v-col>
          <abc> </abc>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
//import datePicker from '../components/datePicker.vue'
import abc from '../components/tonto.vue';
 
export default {
    name: 'App',
    components: { abc },
    data() {return {
    }
    }
}