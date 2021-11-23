<script>
import TabInfo from "@/components/TabInfo.vue";
import { computed, reactive } from "vue";
export default {
  components: {
    TabInfo,
  },
  setup() {
    const select = reactive({
      selected: "armor",
      armorGroup: [
        { name: "護甲", type: "armor" },
        { name: "腰帶", type: "belt" },
        { name: "鞋子", type: "boot" },
        { name: "手套", type: "glove" },
        { name: "頭盔", type: "helmet" },
        { name: "盾牌", type: "shield" },
      ],
      selectedName: computed(() => {
        const name = select.armorGroup.find((el) => el.type == select.selected);
        return name.name;
      }),
    });

    return { select };
  },
};
</script>

<template>
  <div class="tab-component">
    <h1>Select</h1>
    <select v-model="select.selected">
      <option
        v-for="armor in select.armorGroup"
        :key="armor.type"
        :value="armor.type"
      >
        {{ armor.name }}
      </option>
    </select>
  </div>
  <TabInfo :select="select" />
</template>


<style lang="scss" scoped>
.tab-component {
  background-color: var(--darkGray);

  h1 {
    color: var(--white);
    background-color: var(--deepGray);
  }

  select {
    margin: 1.75rem 0;
    padding: 0.25rem 0.5rem;
    font-size: 1.1rem;
    color: var(--black);
  }
}
</style>