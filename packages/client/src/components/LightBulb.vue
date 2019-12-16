<template lang="pug">
.lightbulb
  h4 Device ID: 
    b {{label}}
    button.delete(@click='$emit("delete")' style='margin-left: 9px; background-color: #bf3166;' aria-label='delete')
  .process
    .tube(:style='tubeStyle')
      .label {{tubeValue}}%
  input.slider(type='range' min='0' max='100' :value='tubeValue' @change='sliding')
  br
</template>

<script>
import * as _ from 'lodash';
export default {
  props: {
    label: {
      type: String
    },
    value: {
      type: Number,
      default: 0
    }
  },
  computed: {
    tubeValue() {
      return _.isNumber(this.value)
        ? _.clamp(this.value, 0, 100)
        : "invalid";
    },
    tubeStyle() {
      if (_.isNumber(this.tubeValue)) {
        return `width: ${this.tubeValue}%`
      } else {
        return `background-color: #bf3166`
      }
    }
  },
  methods: {
    sliding(e) {
      this.$emit('change', e.target.value)
    }
  }
}
</script>

<style lang='scss' scoped>
.lightbulb {
  width: 100%;
  max-width: 300px;
}
h4 {
  font-size: 1rem;
  font-family: 'Courier New', Courier, monospace;
  margin: 0.5rem 0;
}
.slider {
  width: 100%;
}
.process {
  background-color: #f4f4f439;
  height: 1.7rem;
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
  > .tube {
    background-color: #378ee8;
    height: 100%;
    width: 50%;
    border-radius: 10px;
    transition: all 1s ease-in-out;
    > .label {
      position: absolute;
      margin: 0.3rem 0.7rem;
      font-family: 'Courier New', Courier, monospace;
      color: white;
    }
  }
}
</style>