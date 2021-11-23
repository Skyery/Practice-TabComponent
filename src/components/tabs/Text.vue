<script>
import TabInfo from "@/components/TabInfo.vue";
import { computed, reactive } from "vue";
export default {
  components: {
    TabInfo,
  },
  setup() {
    const select = reactive({
      selected: "",
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

    const input = reactive({
      inputText: "",
      isSelect: false,
      isFocus: false,
      arrowCount: -1,
      filteredList: computed(() => {
        return select.armorGroup.filter((el) => {
          const en = el.type.includes(input.inputText.toLowerCase().trim());
          const zh_tw = el.name.includes(input.inputText.trim());
          return en ? en : zh_tw;
        });
      }),
      toggleFocus() {
        input.isFocus = !input.isFocus;
      },
      setIsSelect() {
        input.isSelect = true;
      },
    });

    const setInputText = (name, type) => {
      input.inputText = name;
      select.selected = type;
      input.setIsSelect();
    };

    const onArrow = (e) => {
      e.code == "ArrowDown" ? ++input.arrowCount : --input.arrowCount;
      if (input.arrowCount >= input.filteredList.length) {
        input.arrowCount = input.arrowCount % input.filteredList.length;
      } else if (input.arrowCount < 0) {
        input.arrowCount = input.filteredList.length - 1;
      }
    };

    const onEnter = (e) => {
      if (input.filteredList.length == 1) {
        setInputText(input.filteredList[0].name, input.filteredList[0].type);
        e.target.blur();
      } else {
        if (input.filteredList[input.arrowCount] == undefined) return;
        setInputText(
          input.filteredList[input.arrowCount].name,
          input.filteredList[input.arrowCount].type
        );
        e.target.blur();
      }
    };

    return {
      select,
      input,
      onEnter,
      setInputText,
      onArrow,
    };
  },
};
</script>

<template>
  <div class="tab-component">
    <h1>Text</h1>
    <div class="text-container">
      <div class="text-content">
        <input
          type="text"
          v-model="input.inputText"
          @keyup.enter="onEnter($event)"
          @keydown.down="onArrow($event)"
          @keydown.up="onArrow($event)"
          @focus="input.toggleFocus"
          @blur="input.toggleFocus"
        />
        <ul :class="{ active: input.isFocus }">
          <li
            v-for="(item, i) in input.filteredList"
            :key="i"
            @mousedown="setInputText(item.name, item.type)"
            :class="{ isArrow: i === input.arrowCount }"
          >
            {{ item.name }}
            <small>({{ item.type }})</small>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <TabInfo v-if="input.isSelect" :select="select" />
</template>


<style lang="scss" scoped>
.tab-component {
  background-color: var(--darkGray);

  h1 {
    color: var(--white);
    background-color: var(--deepGray);
  }

  .text-container {
    display: flex;
    justify-content: center;
    align-items: center;

    .text-content {
      margin: 1.75rem 0;
      text-align: left;

      ul {
        display: none;

        &.active {
          display: block;
        }

        li {
          padding: 0.25rem;
          margin-top: 0.25rem;
          list-style: none;
          color: var(--lightGray);
          cursor: pointer;

          &.isArrow {
            background-color: var(--lightBlack);
          }

          &:hover {
            background-color: var(--black);
          }
        }
      }
    }
  }
}
</style>