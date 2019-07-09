

<template>
<v-container grid-list-xs,sm,md,lg,xl>
  <v-layout row wrap align-center justify-center>
    <v-flex xs12 sm4 md6>
      <v-card height="400px" width="500px">
        <v-card-text style="height:350px;" class="text-xs-center">
          <v-layout row wrap align-center justify-center>

            <img :src="imageUrl" alt="" width="100%">

          </v-layout>

        </v-card-text>
        <v-spacer></v-spacer>
        <v-card-actions>
          <v-btn color="primary" @click="seleccionarEntrada">Seleccionar</v-btn>
          <input type="file" ref="entradaArchivo" v-show="false" @change="seleccionarArchivo">
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
export default {
  data() {
    return {
      imageUrl: "",
      imagen: ""
    }
  },
  methods: {
    seleccionarEntrada() {
      this.$refs.entradaArchivo.click();
    },
    seleccionarArchivo(e) {
      let files = e.target.files;
      let filename = files[0].name;

      if (filename.lastIndexOf('.') <= 0) {
        return alert('Archivo Inválido, no tiene extensión');
      }
      const fileReader = new FileReader() //Cambiar a Base64
      /*  const getResult =
          fileReader.onload = e =>{
            files = {
              url: e.target.result
            }
          }
          console.log(getResult);
        fileReader.readAsDataURL(files)
        return getResult.then(file =>{
          return file;
        })*/
      fileReader.addEventListener('load', () => {
        this.imageUrl = fileReader.result
      })
      fileReader.readAsDataURL(files[0])
      this.imagen = files[0];
    }
  }
}
</script>
