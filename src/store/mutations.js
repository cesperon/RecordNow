export default {
  setRecords(state, records) {
    state.recordings = records;
  },
  addRecord(state, record) {
    state.recordings.push(record);
  },
  deleteRecord(state, recordId) {
    let index = state.recordings.findIndex((p) => p.id == recordId);
    state.recordings.splice(index, 1);
  },
};
