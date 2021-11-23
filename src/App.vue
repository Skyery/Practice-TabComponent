<script>
import { ref } from "vue";
import { onMounted } from "vue";
export default {
  setup() {
    const activeFixTop = ref(false);

    onMounted(() => {
      window.document.onscroll = () => {
        window.scrollY > 0
          ? (activeFixTop.value = true)
          : (activeFixTop.value = false);
      };
    });

    return { activeFixTop };
  },
};
</script>

<template>
  <div id="nav" :class="{ fixTop: activeFixTop }">
    <div class="nav-container">
      <router-link to="/">Home</router-link>
      <router-link to="/tabComponent">TabComponent</router-link>
    </div>
  </div>
  <router-view />
</template>

<style lang="scss">
:root {
  --mask: rgba(0, 0, 0, 0.45);
  --white: #eee;
  --lightGray: #ccc;
  --gray: #444;
  --deepGray: #3c3c3c;
  --darkGray: #303030;
  --lightBlack: #252525;
  --black: #141414;
  --deepBlack: #121212;
  --powderBlue: #375a7f;
  --sourLemon: #ffeaa7;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background-color: var(--deepBlack);
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
}

#nav {
  width: 100%;
  background-color: var(--powderBlue);
  padding: 0.15rem 0;
  transition: 0.2s;

  &.fixTop {
    position: fixed;
    top: 0;
    padding: 0 !important;
    opacity: 0.95;
    z-index: 9999;
  }

  .nav-container {
    max-width: 1140px;
    width: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    a {
      padding: 0.5rem;
      color: lightGray;
      text-decoration: none;
      transition: 0.2s;

      &:hover {
        color: var(--white);
      }
    }

    a:not(:first-child) {
      font-size: 1.25rem;
      margin-left: 1.25rem;

      &.router-link-active {
        color: var(--sourLemon);
      }
    }

    a:first-child {
      color: var(--white);
      font-size: 1.5rem;
    }
  }
}
</style>
