import axios from "axios";
import { reactive } from "vue";

const armorData = reactive({
  armors: [],
  setData(data) {
    this.armors = data;
  }
})

const fetchData = async () => {
  try {
    const api = `${process.env.VUE_APP_HEROKU_URL}`;
    const res = await axios.get(api);
    armorData.setData(res.data.armors);
  } catch (error) {
    console.error(error.data.response);
  }
}

export default {
  armorData,
  fetchData
}