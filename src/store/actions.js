const axios = require("axios").default;

export default {
  async postRecording(state, record) {
    try {
      const res = await axios.post("/records", record);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  },
  addRecord(state, record) {
    this.commit("addRecord", record);
  },
  deleteRecord(state, recordId) {
    this.commit("deleteRecord", recordId);
  },
};
