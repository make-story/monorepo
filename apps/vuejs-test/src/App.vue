<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <div>
      <input type="file" id="input" />
      <div id="previewing" style="width: 100px; height: 100px; border: 1px solid;"></div>
    </div>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue';
import './style/test.css';
import heic2any from 'heic2any';

// https://copyprogramming.com/howto/image-magick-contert-heic-to-jpg-code-example
function convertHeicToJpg() {
  const input = this;
  const fileName = input.value;
  //const fileNameExt = fileName.substr(fileName.lastIndexOf('.') + 1);
  const fileNameExt = fileName.split('.').pop().toLowerCase();

  console.log('fileName', fileName);
  if (fileNameExt === 'heic') {
    const blob = input.files[0]; 
    heic2any({
      blob: blob,
      toType: 'image/jpg',
    })
      .then(function (resultBlob) {
        // previewing the uploaded picture
        const url = URL.createObjectURL(resultBlob);
        console.log('url', url);
        document.getElementById("previewing").innerHTML = `<a target="_blank" href="${url}"><img src="${url}"></a>`;
        // adding converted picture to the original
        const fileInputElement = input;
        const container = new DataTransfer();
        const file = new File([resultBlob], 'heic' + '.jpg', {
          type: 'image/jpeg',
          lastModified: new Date().getTime(),
        });
        container.items.add(file);
        fileInputElement.files = container.files;
        console.log('added');
      })
      .catch(function (x) {
        console.log(x.code);
        console.log(x.message);
      });
  }
}

export default {
  name: 'App',
  components: {
    HelloWorld,
  },
  mounted() {
    console.log(this.$el);
    const $input = this.$el.querySelector('#input');
    console.log($input);
    $input.addEventListener('change', convertHeicToJpg);
    /*$('#input').change(function () {
      convertHeicToJpg(this);
    });*/
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
