

<template>
  <!-- <div
    class="h3-sider"
    :class="[options.direction]"
    :style="style"
  > -->
  <size-slider
    class="h3-sider"
    :class="[options.direction, expended]"
    :style="style"
    :left="isLeft"
    :slider="options.slider"
    :right="isRight"
    :minWidth="options.minWidth"
    :maxWidth="options.maxWidth"
    @resize="onResize"
  >
    <div class="h3-sider-body">
      <slot></slot>
    </div>

    <div
      v-if="options.collapsible"
      class="h3-sider-toggle"
      @click="toggle"
    >
      <img class="img" src="../../assets/images/toleft.svg" v-show="show === true">
      <img class="img-hover" src="../../assets/images/tolefthover.svg" v-show="show === true">
      <img class="img" src="../../assets/images/toright.svg" v-show="show === false">
      <img class="img-hover" src="../../assets/images/torighthover.svg" v-show="show === false">
    </div>
  </size-slider>

</template>
<script lang='ts'>
export default {
  name: 'Slider'
}
</script>

<script lang='ts' setup>
import { ref, computed, watch, PropType } from 'vue';
import { SiderOptions } from './sider-options';
import SizeSlider from './size-slider.vue';

const props = defineProps({
  options: {
    default: function() {
      return {} as SiderOptions
    },
    type: Object as PropType<SiderOptions>
  }
})

const emit= defineEmits(['resize', 'toggle'])

let style = ref({width: ''})
let show = ref(true)
let lastWidth = ref(0)
let expended = ref('expended')
let isLeft = computed(() => {
  return show && props.options.direction === 'right'; 
})
let isRight = computed(() => {
  return show && props.options.direction === 'left';
})

watch(() => props.options, (val) => {
  if (!val) {
      return;
    }
    if (val.width) {
      style.value.width = `${val.width}px`;
      lastWidth.value = val.width;
    }
})

const onResize = (data:{
    width : number
  }) => {
    lastWidth.value = data.width;
    style.value = { 
      width : `${data.width}px`
    };
    setTimeout(()=>{
      emit('resize',data);
    },500);
  }

const toggle = () => {
  show.value = !show.value;
    const width = show.value ? 256 : 0;
    
    style.value = { 
      width : `${width}px`
    };

    setTimeout(()=>{
      emit('toggle', show.value);
      emit('resize',{
        width
      });
    },500);
}
</script>


<style lang="less" scoped>
.h3-sider {
  position: relative;
  display: flex;
  transition:width 0.3s ease;
  flex-shrink: 0;
  width: 256px;

  &.resizing{
    transition:width 1ms linear;
  }

  &.left {
    border-right: 1px solid #e8e8e8;

    & > .h3-sider-toggle {
      right: -14px;
    }
  }

  &.right {
    border-left: 1px solid #e8e8e8;
    & > .h3-sider-toggle {
      left: -14px;

      & > img {
        transform: rotate(180deg);
      }
    }
  }

  &-body {
    flex-grow: 1;
    overflow: auto;
  }

  &-toggle {
    position: absolute;
    width: 14px;
    height: 30px;
    z-index: 999;
    cursor: pointer;
    &:hover {
      .img{
        display: none;
      }
      .img-hover{
        display: inline-block;
      }
    }
    .img-hover{
      display: none;
    }

  }
}
</style>
