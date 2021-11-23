<script>
import TabInfo from "@/components/TabInfo.vue";
import { inject, reactive, computed } from "vue";
export default {
  components: {
    TabInfo,
  },
  setup() {
    const { fetchData, armorData } = inject("mapStore");

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

    const input = reactive({
      imgUrl: [],
      state: false,
      setImgUrl() {
        armorData.armors.forEach((el) => {
          select.armorGroup.forEach((item) => {
            if (item.type == el.type) {
              let obj = { name: el.name, type: el.type, url: el.des[0].url };
              input.imgUrl.push(obj);
            }
          });
        });
      },
      setState() {
        input.state = true;
      },
    });

    fetchData().then(() => {
      input.setState();
      input.setImgUrl();
    });

    return { select, input, fetchData, armorData };
  },
};
</script>

<template>
  <div class="tab-component">
    <h1>Radio</h1>
    <div class="items" v-if="input.state">
      <div class="item" v-for="item in input.imgUrl" :key="item.type">
        <input
          type="radio"
          name="armorGroup"
          :id="item.type"
          v-model="select.selected"
          :value="item.type"
        />
        <label :for="item.type">
          <div class="img-container">
            <img :src="require(`@/assets/${item.type}/${item.url}`)" />
          </div>
          <span>{{ item.name }}</span>
        </label>
      </div>
    </div>
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

  .items {
    background-color: var(--darkGray);
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    padding: 2rem 0;

    .item:not(:first-child) {
      margin-left: 1rem;
    }

    .item {
      input {
        display: none;

        &:active + label {
          background-color: var(--lightBlack);
          transform: scale(1);
        }

        &:checked + label {
          background-color: var(--deepGray);
          transform: scale(1.05);
          border-color: var(--lightGray);
        }
      }
      label {
        display: block;
        padding: 1rem;
        border-radius: 7px;
        border: 1px solid var(--gray);
        transition: 0.1s;

        &:hover {
          background-color: var(--deepGray);
          transform: scale(1.05);
          border-color: var(--lightGray);
        }

        .img-container {
          width: 3.75rem;
          height: 4.5rem;

          img {
            width: 100%;
            height: 100%;
            object-fit: contain;
            vertical-align: bottom;
          }
        }

        span {
          display: inline-block;
          margin-top: 0.5rem;
          color: var(--lightGray);
        }
      }
    }
  }
}
</style>