<template>

  <v-app>
    <v-app-bar app dense >
  
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>TRADER</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn class="success">Mercados</v-btn>
        <v-btn>Otra cosa</v-btn>
        


      <v-btn
        text
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
      >
        <span class="mr-2">Latest Release</span>
      </v-btn>
    </v-app-bar>
<v-navigation-drawer app v-model="drawer" temporaly >
          <h3>menu vertical</h3>
          <v-list-item>
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>John Leider</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>

        <v-list-item
          v-for="item in items"
          :key="item.title"
        
          :to="item.to"
          :replace="true"
          
         
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
          
        </v-list-item>
        </v-list>

        </v-navigation-drawer>

    <v-content>
      <router-view/>
      
    </v-content>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld';

export default {
  name: 'App',
  components: {
    HelloWorld,
  },
  data: () => ({
    drawer : false,
     items: [
          { title: 'Home', icon: 'dashboard',to: '/about' },
          { title: 'About', icon: 'question_answer', to:'/' },
          { title: 'Velas', icon: '', to:'/test' },
        ],
    //
  }),
  methods:{
    prova(){
      console.log('clickat');
      this.drawer = false;
    }
  },
  mounted(){
    console.log('muntat');
  }
};
</script>
