<script>
export default {
  name: "Home",
};
</script>

<template>
  <div class="home">
    <div class="container">
      <div class="content">
        <h1>Tab 功能練習</h1>
        <table>
          <thead>
            <tr>
              <th colspan="2">使用功能包含 :</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Tab 功能 :</td>
              <td>
                使用component
                v-bind:is綁定reactive達成資料雙向綁定，並在外層包上keep-alive使它能夠記住Tab切換前的狀態。
              </td>
            </tr>
            <tr>
              <td>Select :</td>
              <td>
                使用v-model綁定reactive達成資料雙向綁定，透過computed功能篩選資料
              </td>
            </tr>
            <tr>
              <td>Radio :</td>
              <td>
                同樣使用v-model及reactive做資料綁定，這邊透過inject非同步取得資料並處理後再渲染到畫面上。
              </td>
            </tr>
            <tr>
              <td>Text :</td>
              <td>
                同樣的方法綁定資料，這邊做了一個簡易的資料篩選功能，使用v-on的(keydown
                & up, focus, blur...)等狀態操作資料
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$trOdd: #202020;
$trEven: #151413;

.home {
  margin-top: 1.75rem;

  .container {
    max-width: 1140px;
    width: 100%;
    margin: 0 auto;
    background-color: var(--mask);
    display: flex;
    justify-content: center;
    padding: 1.75rem 2rem;

    .content {
      width: 100%;
      background-color: var(--darkGray);

      h1 {
        color: var(--white);
        background-color: var(--deepGray);
      }

      table {
        width: 50%;
        margin: 1.75rem auto;
        border-spacing: 0px;
        background-color: var(--darkGray);
        line-height: 1.5;
        box-shadow: 0 4px 8px var(--mask);

        @media screen and (max-width: 960px) {
          width: calc(100% - 1.75rem);
        }

        th,
        td {
          padding: 0.25rem 0.5rem;
        }

        th {
          color: var(--white);
          background-color: var(--powderBlue);
        }

        tbody tr {
          td {
            color: var(--lightGray);
            text-align: left;

            &:first-child {
              white-space: nowrap;
              text-align: center;
              width: 25%;
            }
          }

          &:nth-child(even) {
            background-color: $trEven;
          }

          &:nth-child(odd) {
            background-color: $trOdd;
          }
        }
      }
    }
  }
}
</style>