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
  deleteRecord(state, recordId) {
    let index = state.recordings.findIndex((p) => p.id == recordId);
    state.recordings.splice(index, 1);
  },
};
