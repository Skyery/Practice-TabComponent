<script>
import Select from "@/components/tabs/Select.vue";
import Radio from "@/components/tabs/Radio.vue";
import Text from "@/components/tabs/Text.vue";
import { provide, reactive } from "vue";
import store from "@/store";
export default {
  components: {
    Select,
    Radio,
    Text,
  },
  setup() {
    const tabs = reactive({
      tabsContent: [{ name: "Select" }, { name: "Radio" }, { name: "Text" }],
      selectedContent: "Select",
      isCurr: 0,
    });

    provide("mapStore", store);

    return { tabs };
  },
};
</script>

<template>
  <div class="tabComponent">
    <div class="container">
      <div class="tab">
        <div class="tab-container">
          <button
            v-for="(tab, index) in tabs.tabsContent"
            :key="tab.name"
            @click="(tabs.isCurr = index), (tabs.selectedContent = tab.name)"
            :class="{ active: tabs.isCurr == index }"
          >
            {{ tab.name }}
          </button>
        </div>
        <keep-alive>
          <component :is="tabs.selectedContent"></component>
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tabComponent {
  margin-top: 1.75rem;

  .container {
    max-width: 1140px;
    width: 100%;
    padding: 0 1rem;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    flex-direction: column;

    @media screen and (max-width: 896px) {
      overflow-x: scroll;
      width: 896px;
    }

    .tab {
      padding: 1.75rem 2rem;
      background-color: var(--mask);

      .tab-container {
        display: flex;
        justify-content: flex-start;

        > button {
          padding: 0.5rem 1rem;
          border: 1px solid var(--black);
          border-bottom-color: var(--deepGray);
          border-radius: 7px 7px 0 0;
          font-size: 1.2rem;
          color: var(--white);
          background-color: var(--lightBlack);
          cursor: pointer;
          transition: 0.1s;

          &:hover {
            background-color: var(--deepGray);
          }

          &.active {
            background-color: var(--gray);
          }
        }

        > button:not(:first-child) {
          margin-left: 0.15rem;
        }
      }
    }
  }
}
</style>