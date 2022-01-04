const axios = require("axios").default;
// import store from "@/store";

export default {
  async getRecording() {
    try {
      const res = await axios.get("/records");
      const recordings = res.data.data;
      console.log("records", recordings);
      //convert base encode 64 response to audio object for each blob in recordings array
      const blobFiles = recordings.map((records) => {
        const raw = window.atob(records.audio);
        const binaryData = new Uint8Array(new ArrayBuffer(raw.length));
        for (let i = 0; i < raw.length; i++) {
          binaryData[i] = raw.charCodeAt(i);
        }

        //build audio object to be store in state
        const blob = new Blob([binaryData], { type: "audio/wav" });
        const audioUrl = URL.createObjectURL(blob);
        const audio = new Audio(audioUrl);

        //call api to get mapped record names
        return { name: records.name, audio: audio };
      });
      console.log("blobs", blobFiles);
      this.commit("setRecords", blobFiles);
    } catch (err) {
      console.log("error in getRecording", err);
    }
  },

  async postRecording(state, record) {
    try {
      this.commit("addRecord", record.record);
      await axios.post("/records", record.formdata, {
        headers: { contentType: "multipart/form-data" },
      });
    } catch (err) {
      console.log("error in postRecording", err);
    }
  },
  async updateRecordingName(state, record) {
    try {
      await axios.post("/records/update", {
        fileName: record.ogName,
        newFileName: record.newName,
      });
      this.commit("updateRecord", {
        name: record.newName,
        ogName: record.ogName,
      });
    } catch (err) {
      console.log(err);
    }
  },
  async deleteRecording(state, recordName) {
    try {
      console.log("fieldName", recordName);
      const res = await axios.post("/records/delete", {
        fileName: recordName,
      });
      this.commit("deleteRecord", recordName);
      console.log(res);
    } catch (err) {
      console.log("error in deleteRecording", err);
    }
  },
};
