<template>
  <div class="text-center">
    <v-container fluid>
    <v-row>
      <v-col cols=2>
    <v-menu offset-y>
      <template v-slot:activator="{ on }">
        <v-btn
          color="primary"
          dark
          v-on="on"
        >
          {{par}}  
        </v-btn>
      </template> 
      <v-list>
        <v-list-item
          v-for="(item, index) in pares"
          :key="index"
          @click="eligePar(item)"
        >
          <v-list-item-title>{{ item.exchange}}-{{item.pair}}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-col>
    <v-col cols=2>
    <v-btn @click="picker_fecha_inicial=true;fechaIni=null">fecha inicial : {{fechaIni}}</v-btn>
    <v-dialog :value="fechaInicial()" :persistent=true>
    <v-date-picker v-model="fechaIni" @click="picker_fecha_inicial=false"></v-date-picker>
    </v-dialog>
    </v-col>
    <v-col cols=2>
      <v-btn @click="picker_hora_inicial=true;horaIni=null">hora inicial : {{horaIni}}</v-btn>
    <v-dialog :value="horaInicial()" :persistent=true>
    <v-time-picker v-model="horaIni" format="24hr"></v-time-picker>
    </v-dialog>
    </v-col >
    <v-col cols=2>
    <v-btn @click="picker_fecha_final=true;fechaFi=null">fecha final : {{fechaFi}}</v-btn>
    <v-dialog :value="fechaFinal()" >
    <v-date-picker v-model="fechaFi" @click="picker_fecha_final=false"></v-date-picker>
    </v-dialog>
    </v-col>
    <v-col cols=2>
      <v-btn @click="picker_hora_final=true;horaFi=null">hora final : {{horaFi}}</v-btn>
    <v-dialog :value="horaFinal()" >
    <v-time-picker v-model="horaFi" format="24hr" @click:minute="picker_hora_final=false"></v-time-picker>
    </v-dialog>
    </v-col>
    <v-col cols="2">
      <v-menu
        ref="menu"
        v-model="menu2"
        :close-on-content-click="false"
        :nudge-right="40"
        :return-value.sync="time"
        transition="scale-transition"
        offset-y
        full-width
        max-width="290px"
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-btn

            v-on="on"
          >hora Final : {{time}}</v-btn>
        </template>
        <v-time-picker
          v-if="menu2"
          v-model="time"
          full-width
          format="24hr"
          @click:minute="$refs.menu.save(time)"
        ></v-time-picker>
      </v-menu>
    </v-col>
    <v-col cols=2>
    <v-menu offset-y>
      <template v-slot:activator="{ on }">
        <v-btn
          color="primary"
          dark
          v-on="on"
        >
          granularidad : {{granularidad.v}}  
        </v-btn>
      </template> 
      <v-list>
        <v-list-item
          v-for="(item, index) in granularidadList"
          :key="index"
          @click="eligeGranularidad(item)"
        >
          <v-list-item-title>{{ item.v}}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-col>
  </v-row>
  </v-container>
  </div>
</template>
<script>
 
import TradingVue from 'trading-vue-js'
import Velas from '../components/Velas.vue'
import {mapGetters,mapActions} from 'vuex'
 
export default {
    name: 'app',
    components: { Velas },
    data() {
        return {
            pinta : false,
            ohlcv: [
                [ 1551128400000, 33,  37.1, 14,  14,  196 ],
                [ 1551132000000, 13.7, 30, 6.6,  30,  206 ],
                [ 1551135600000, 29.9, 33, 21.3, 21.8, 74 ],
                [ 1551139200000, 21.7, 25.9, 18, 24,  140 ],
                [ 1551142800000, 24.1, 24.1, 24, 24.1, 29 ],
            ],
            granularidadList: [{v:'1min',d:60},{v:'5min',d:300},{v:'15min',d:900},{v:'30min',d:1800},{v:'1h',d:3600}],
            granularidad: {},
            par: 'Elegir par',
            fechaIni: null,fechaFi: null,horaIni: null,horaFi: null,
            picker_fecha_inicial: false,picker_hora_inicial: false,picker_fecha_final: false,picker_hora_final:false,
            time: null,menu2:false

        }
    },
    computed: {
        ...mapGetters(['pares'])
    },
    methods: {
        ...mapActions(['getPairs']),
        eligePar(par){
          this.par = par.exchange+'-'+par.pair;
        },
        eligeGranularidad(item){
          this.granularidad = item;
        },
        fechaInicial(){
          console.log('crida a fechaInicial');
          if (this.fechaIni === null && this.picker_fecha_inicial) {
            console.log('true');
            return true;
          }
          else return false;
        },
        horaInicial(){
          console.log('crida a horaInicial');
          if (this.horaIni === null && this.picker_hora_inicial) {
            console.log('true');
            return true;
          }
          else return false;
        },
        fechaFinal(){
          console.log('crida a fechaFinal');
          if (this.fechaFi === null && this.picker_fecha_final) {
            console.log('true');
            return true;
          }
          else return false;
        },
        horaFinal(){
          console.log('crida a horaFinal');
          if (this.horaFi === null && this.picker_hora_final) {
            console.log('true');
            return true;
          }
          else return false;
        }

    },
    mounted(){
        //if (this.pares === []) 
        this.getPairs(); 
    }
}
 
</script> 