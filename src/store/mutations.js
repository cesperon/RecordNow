export default {
  setRecords(state, records) {
    state.recordings = records;
  },
  setRecordNames(state, recordNames) {
    state.recordingNames = recordNames;
  },
  addRecord(state, record) {
    state.recordings.push(record.audio);
    state.recordingNames.push(record.name);
    console.log("addedRecord");
  },
  updateRecord(state, record) {
    state.recordingNames[record.index] = record.name;
  },
  deleteRecord(state, recordName) {
    let index = state.recordingNames.findIndex((p) => p == recordName);
    //remove recordings from local state
    state.recordings.splice(index, 1);
    state.recordingNames.splice(index, 1);
  },
};
