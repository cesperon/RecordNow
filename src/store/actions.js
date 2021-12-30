const axios = require("axios").default;

export default {
  async getRecording() {
    try {
      const res = await axios.get("/records");
      const recordings = res.data.data;
      console.log("recordings", recordings);
      const blobFiles = recordings.map((records) => {
        const raw = window.atob(records);
        const binaryData = new Uint8Array(new ArrayBuffer(raw.length));
        for (let i = 0; i < raw.length; i++) {
          binaryData[i] = raw.charCodeAt(i);
        }
        const blob = new Blob([binaryData], { type: "audio/wav" });
        return blob;
      });
      console.log("blobfile", blobFiles);
      this.commit("setRecords", blobFiles);
      // const raw = window.atob(recordings);
      // const binaryData = new Uint8Array(new ArrayBuffer(raw.length));
      // for (let i = 0; i < raw.length; i++) {
      //   binaryData[i] = raw.charCodeAt(i);
      // }
      // const blob = new Blob([binaryData], { type: "audio/wav" });
      // console.log("recordings", recordings);
      // // this.commit("setRecords", recordings);
      // this.commit("addRecord", blob);
      // console.log(res);
    } catch (err) {
      console.log("error in getRecording", err);
    }
  },
  async postRecording(state, record) {
    try {
      console.log("records", record);
      const res = await axios.post("/records", record, {
        headers: { contentType: "multipart/form-data" },
      });
      console.log("postRecording", res);
      this.commit("addRecord", record);
      console.log(res);
    } catch (err) {
      console.log("error in postRecording", err);
    }
  },
  async deleteRecording(state, id) {
    try {
      console.log("id", id);
      const res = await axios.post("/records/delete", id);
      this.commit("deleteRecord", id);
      console.log(res);
    } catch (err) {
      console.log("error in deleteRecording", err);
    }
  },
  deleteRecord(state, recordId) {
    this.commit("deleteRecord", recordId);
  },
};
