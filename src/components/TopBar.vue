<script>
export default{
  props:{
    class: String
  }
}
</script>

<template>
  <header class="app-topbar" :class="class">
    <div class="app-topbar__wrapper">
      <div class="app-topbar__wrapper-left"><slot name="left"></slot></div>
      <div class="app-topbar__wrapper-right"><slot name="right"></slot></div>
    </div>
  </header>
</template>
