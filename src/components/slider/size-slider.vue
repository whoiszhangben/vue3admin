


<template>
  <div class="h3-size-slider" ref="box">
    <span
      v-show="props.left && !props.slider"
      class="h3-size-slider__sider h3-size-slider__sider-left"
      @mousedown="e => onMousedown(e,'left')"
    ></span>

    <span
      v-show="props.right && !props.slider"
      class="h3-size-slider__sider h3-size-slider__sider-right"
      @mousedown="e => onMousedown(e,'right')"
    ></span>

    <span
      v-show="props.top && !props.slider"
      class="h3-size-slider__sider h3-size-slider__sider-top"
      @mousedown="e => onMousedown(e,'top')"
    ></span>

    <span
      v-show="props.bottom && !props.slider"
      class="h3-size-slider__sider h3-size-slider__sider-bottom"
      @mousedown="e => onMousedown(e,'bottom')"
    ></span>

    <slot></slot>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  const props = defineProps<{
    left?: Boolean,
    right?: boolean,
    top?: boolean,
    bottom?: boolean,
    slider?: boolean,
    minWidth?: number,
    maxWidth?: number,
    minHeight?: number,
    maxHeight?: number
  }>()
  const emit = defineEmits(['resizeStart', 'resizeEnd'])
  let box = ref(null);
  let base = ref(0);
  let sum = ref(0)

  const isHorizontal = (direction: string) => {
    return direction === "left" || direction === "right";
  }

  const onMousedown = (evt: MouseEvent, direction: string) => {
    evt.preventDefault();
    const horizontal = isHorizontal(direction);
    const _el = box.value ? box.value as HTMLElement : null;
    base.value = horizontal ? evt.screenX : evt.screenY;
    if (_el) {
      sum.value = horizontal ? _el.offsetWidth : _el.offsetHeight;
    }
    const sider = evt.target as HTMLSpanElement;
    sider.classList.add("active");
    if (_el) {
      _el.classList.add("resizing")
    }
    const bodyCursor = document.body.style.cursor;
    const moveFn = (e: MouseEvent) => {
      e.preventDefault();

      onMousemove(e, direction);
    };
    const upFn = (e: MouseEvent) => {
      e.preventDefault();
      
      base.value = 0;
      sum.value = 0;

      sider.classList.remove("active");
      if (_el) {
      _el.classList.add("resizing")
    }

      document.body.style.cursor = bodyCursor;

      document.removeEventListener("mousemove", moveFn);
      document.removeEventListener("mouseup", upFn);

      emit("resizeEnd");
    };

    document.body.style.cursor = horizontal ? "e-resize" : "n-resize";

    document.addEventListener("mousemove", moveFn);
    document.addEventListener("mouseup", upFn);

    emit("resizeStart");
  }

  const onMousemove = (evt: MouseEvent, direction: string) => {
    evt.preventDefault();

    const horizontal = isHorizontal(direction);

    const _el = box.value ? box.value as HTMLElement : null;

    base.value = horizontal ? evt.screenX : evt.screenY;
    if (_el) {
      sum.value = horizontal ? _el.offsetWidth : _el.offsetHeight;
    }
    const sider = evt.target as HTMLSpanElement;
    sider.classList.add("active");
    if (_el) {
      _el.classList.add("resizing")
    }

    const bodyCursor = document.body.style.cursor;

    const moveFn = (e: MouseEvent) => {
      e.preventDefault();

      onMousemove(e, direction);
    };

    const upFn = (e: MouseEvent) => {
      e.preventDefault();
      
      base.value = 0;
      sum.value = 0;

      sider.classList.remove("active");
      if (_el) {
      _el.classList.add("resizing")
    }

      document.body.style.cursor = bodyCursor;

      document.removeEventListener("mousemove", moveFn);
      document.removeEventListener("mouseup", upFn);

      emit("resizeEnd");
    };

    document.body.style.cursor = horizontal ? "e-resize" : "n-resize";

    document.addEventListener("mousemove", moveFn);
    document.addEventListener("mouseup", upFn);

    emit("resizeStart");
  }

</script>


<style lang="less" scoped>
@primary-color: #1da57a;
@size: 3px;

@offset : @size / 2 * -1;

.h3-size-slider {
  position: relative;

  &__sider {
    cursor: e-resize;
    display: inline-block;
    position: absolute;
    user-select: none;

    z-index: 1;

    &:hover,
    &.active {
      width: @size !important;
      background-color: @primary-color !important;
    }

    &-left,
    &-right {
      top: 0;
      width: @size;
      height: 100%;

      &:hover,
      &.active {
        cursor: e-resize;
      }
    }

    &-left {
      left: @offset;
    }

    &-right {
      right: @offset;
    }

    &-top,
    &-bottom {
      left: 0;
      height: @size;
      width: 100%;
      
      &:hover,
      &.active {
        cursor: n-resize;
      }

    }

    &-top {
      top: @offset;
    }

    &-bottom {
      bottom: @offset;
    }
  }
}

</style>
