<template>
  <header>
    <Navbar />
  </header>
  <main>
    <router-view />
  </main>

  <ModalComponent />

</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'

export default {
  setup() {
    return {
      appState: computed(() => AppState)
    }
  },
  components: { Navbar }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

:root{
  --main-height: calc(100vh - 32px - 64px);
}


footer {
  display: grid;
  place-content: center;
  height: 32px;
}
.createButton{
/* From https://css.glass */
background: rgba(200, 245, 245, 0.69);
border-radius: 16px;
box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
backdrop-filter: blur(7.9px);
-webkit-backdrop-filter: blur(7.9px);
border: 1px solid rgba(200, 245, 245, 0.3);
}
.orangeSherbet{
/* From https://css.glass */
background: rgba(200, 245, 245, 0.69);
border-radius: 16px;
box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
backdrop-filter: blur(7.9px);
-webkit-backdrop-filter: blur(7.9px);
border: 1px solid rgba(200, 245, 245, 0.3);
}

</style>
