import Vue from 'vue'
import Vuex from 'vuex'
//import { consoleError } from 'vuetify/src/util/console';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    socket: {
      isConnected: false,
      message: '',
      reconnectError: false,
    },
    mercado: {
      pares: {},
      par: {},
      ohlcv: []
    }
  },
  getters: {
    pares(state){
      return state.mercado.pares;
    }
  },
  mutations: {
    SOCKET_ONOPEN (state, event)  {
      Vue.prototype.$socket = event.currentTarget
      state.socket.isConnected = true
    },
    SOCKET_ONCLOSE (state, event)  {
      state.socket.isConnected = false
    },
    SOCKET_ONERROR (state, event)  {
      console.error(state, event)
    },
    // default handler called for all methods
    SOCKET_ONMESSAGE (state, message)  {
      state.socket.message = message;
      console.log('missatge : '+JSON.stringify(message));
      //let missatge = JSON.parse(message.data);
      switch (message.tipus){
        case 'putPairsStatus':
          console.info('rebut putPairsStatus ...');
          state.mercado.pares = message.data;
          break;
          default:
            console.log("missatge desconegut",message);
      }
    },
    // mutations for reconnect methods
    SOCKET_RECONNECT(state, count) {
      console.info(state, count)
    },
    SOCKET_RECONNECT_ERROR(state) {
      state.socket.reconnectError = true;
    }
  },
  actions: {
    sendMessage: function(context, message) {
      //.....
      Vue.prototype.$socket.sendObj(message)
      //.....
    },
    getPairs(){
      let paquet = {"tipus": "getPairsStatus"};
      console.log('llamada accion getPairs ...');
      this.dispatch('sendMessage',paquet);
    }
    /*
    putPairs({commit},data){
      commit('mPutPairs',data);
    }
    */
  }
})
