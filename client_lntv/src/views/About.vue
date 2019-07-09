<style scoped>
#inputFile {
  display: none;
}

</style>

<template>
<!-- video element -->
<v-layout row wrap justify-center align-center>
  <v-flex xs12>
    <v-card width="1920" height="1600">
      <input type="file" id="inputFile" ref="inputFile" @change="selectFile">
      <v-btn color="primary" @click="selectInput">text</v-btn>
      <vue-plyr ref="plyr">
        <video poster="poster.png" :src="srcVideo">
          <source :src="srcVideo" type="video/mp4" size="720">
          <source :src="srcVideo" type="video/mp4" size="1080">
          <track kind="captions" label="English" srclang="en" src="captions-en.vtt" default>
        </video>
      </vue-plyr>
      <v-card-text class="display-1 font-weight-bold">
        <p>Ancho: {{videoData.ancho}}</p>
        <p>Altura: {{videoData.altura}}</p>
        <p>Radio Aspecto: {{videoData.aspecto.toFixed(2)}}</p>
        <p>Aspecto Fraccion: {{videoData.aspectoRatio.n}}/{{videoData.aspectoRatio.d}}</p>

      </v-card-text>
    </v-card>
  </v-flex>
</v-layout>
</template>

<script>
export default {
  data() {
    return {
      srcVideo: '',
      videoData: {
        altura: 0,
        ancho: 0,
        aspectoRatio: '',
        aspecto: 0
      }


    }
  },
  created() {
    this.srcVideo = '2019-07-02-011546_1.mov';
  },
  mounted() {
    this.player.on('event', () => {
      console.log('event fired')
    })
  },
  computed: {
    player() {
      return this.$refs.plyr.player
    },
    aspecto() {
      this.videoData.altura = document.getElementsByClassName('plyr__poster')[0].clientHeight;
      this.videoData.ancho = document.getElementsByClassName('plyr__poster')[0].clientWidth;
      this.videoData.aspecto = (this.videoData.ancho / this.videoData.altura);
      this.videoData.aspectoRatio = math.fraction(this.videoData.aspecto)
    }
  },
  methods: {
    selectInput() {
      this.$refs.inputFile.click();
    },
    selectFile(e) {

      this.srcVideo = URL.createObjectURL(e.target.files[0]);
      console.log(e.target.files[0]);
      let dataClass = document.getElementsByClassName('plyr__poster')[0];
      console.log(dataClass);
      this.videoData.altura = dataClass.clientHeight;
      this.videoData.ancho = dataClass.clientWidth;
      this.videoData.aspecto = (this.videoData.ancho / this.videoData.altura);
      this.videoData.aspectoRatio = math.fraction(this.videoData.aspecto);
      console.log(this.videoData.altura);




    }
  }
}
</script>
