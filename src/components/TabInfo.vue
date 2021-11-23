<script>
import Laoder from "@/components/Laoder.vue";
import { computed, inject, reactive, watch } from "vue";
export default {
  props: ["select"],
  components: { Laoder },
  setup(props) {
    const { armorData, fetchData } = inject("mapStore");

    const tableData = reactive({
      selectedData: [],
      state: false,
      attrGroup: [
        { name: "名稱" },
        { deffense: "防禦" },
        { levelReq: "需要等級" },
        { strReq: "需要力量" },
        { durability: "耐久度" },
        { weight: "重量" },
        { sockets: "鑲孔數量" },
        { qlvl: "qlvl" },
        { capacity: "容量" },
        { kickDamage: "踢擊傷害" },
        { blockChance: "格檔機率" },
        { smiteDamage: "重擊傷害" },
      ],
      th_zh_tw: computed(() => {
        let arr = [];
        const selAttr = Object.entries(
          JSON.parse(JSON.stringify(tableData.selectedData.des[0].difficult[0]))
        );
        selAttr.forEach((el) => {
          tableData.attrGroup.forEach((item) => {
            if (Object.keys(item) == el[0]) {
              arr.push(Object.values(item)[0]);
            }
          });
        });
        return arr;
      }),
      setSelectedData() {
        const data = armorData.armors.find(
          (el) => el.type == props.select.selected
        );
        tableData.selectedData = data;
      },
      setState() {
        tableData.state = true;
      },
    });

    watch(
      () => props.select.selected,
      () => {
        tableData.setSelectedData();
      }
    );

    fetchData().then(() => {
      tableData.setState();
      tableData.setSelectedData();
    });

    return { props, tableData };
  },
};
</script>

<template>
  <Laoder v-show="!tableData.state" />
  <div class="tabInfo" v-if="tableData.state">
    <h1>{{ props.select.selectedName }}</h1>
    <table v-for="armor in tableData.selectedData.des" :key="armor.url">
      <thead>
        <tr>
          <th></th>
          <th v-for="attr in tableData.th_zh_tw" :key="attr">{{ attr }}</th>
        </tr>
      </thead>
      <tbody>
        <td rowspan="4">
          <img
            :src="require(`@/assets/${props.select.selected}/${armor.url}`)"
          />
        </td>
        <tr v-for="item in armor.difficult" :key="item.name">
          <td v-for="i in item" :key="i">{{ i }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style lang="scss" scoped>
$trOdd: #202020;
$trEven: #151413;

.tabInfo {
  margin-top: 1.75rem;

  h1 {
    color: var(--white);
    background-color: var(--deepGray);
  }

  table {
    width: 100%;
    border-spacing: 0px;
    background-color: var(--deepGray);
    line-height: 1.5;
    margin-bottom: 1.75rem;
    box-shadow: 0 4px 8px var(--mask);

    th,
    td {
      color: var(--lightGray);
      white-space: pre-wrap;
    }

    th:nth-child(1),
    th:nth-child(2) {
      width: 15%;
    }

    th,
    tbody > td:nth-child(1) {
      background-color: var(--lightBlack);
    }

    tbody {
      &:nth-child(even) {
        background-color: $trEven;
      }

      &:nth-child(odd) {
        background-color: $trEven;
      }

      img {
        object-fit: cover;
        width: 4.5rem;
        height: auto;
        vertical-align: bottom;
      }
    }
  }
}
</style>