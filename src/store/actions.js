export default {
  addRecord(state, record) {
    this.commit("addRecord", record);
  },
  deleteRecord(state, recordId) {
    this.commit("deleteRecord", recordId);
  },
};
