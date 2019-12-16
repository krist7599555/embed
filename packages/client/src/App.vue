<template lang='pug'>
  #app: .columns
    .column.is-4.is-offset-2
      br
      br
      h1.title.has-text-white Light Controller
      br
      form.form(@submit.prevent='updateData(key)' style='max-width: 300px')
        .field: .control
          pre {{JSON.stringify(val, null, 2) || "empty"}}
        .field: .control
          input.input(v-model='key' required placeholder='key')
        .field: .control
          button.button.is-info(type='submit') submit
    .column.is-4
      template(v-for='cnt, label in val')
        LightBulb(:key='label' :label='label' :value='cnt' @change='change(label, $event)' @delete='del(label)')
</template>

<script>
import axios from 'axios';
import _ from 'lodash';
import LightBulb from './components/LightBulb.vue'

export default {
  name: 'app',
  components: {
    LightBulb
  },
  data() {
    return {
      val: null,
      key: ""
    }
  },
  mounted() {
    const socket = this.$root.socket;
    socket.on('update', data => this.val = data);
    // setInterval(() => {
      //   // socket.emit('message', {})
    // }, 100);
  },
  methods: {
    updateData(key) {
      const socket = this.$root.socket;
      socket.emit('update', {[key]: 0});
      this.key = ""
    },
    change(label, cnt) {
      const socket = this.$root.socket;
      socket.emit('update', {[label]: +cnt});
    },
    del(label) {
      const socket = this.$root.socket;
      socket.emit('delete', label);
    }
  }
}
</script>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
}
#app {
  background-color: #363636;
  height: 100vh;
  padding: 3rem 1rem;
  color: #f9f9f9;
}

</style>
