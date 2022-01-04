export default {
  setRecords(state, records) {
    state.recordings = records;
  },
  addRecord(state, record) {
    state.recordings.push(record);
  },
  updateRecord(state, record) {
    //find index of original name
    const indexToUpdate = state.recordings.findIndex(
      (p) => p.name === record.ogName
    );
    //set array at index of og name to new name
    state.recordings[indexToUpdate].name = record.name;
  },
  deleteRecord(state, recordName) {
    let index = state.recordings.findIndex((p) => p.name == recordName);
    //remove recordings from local state
    state.recordings.splice(index, 1);
  },
};
