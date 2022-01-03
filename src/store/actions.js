const axios = require("axios").default;
import store from "@/store";

export default {
  async getRecording() {
    try {
      const res = await axios.get("/records");
      const recordings = res.data.data;
      //convert base encode 64 response to audio object for each blob in recordings array
      const blobFiles = recordings.map((records) => {
        const raw = window.atob(records);
        const binaryData = new Uint8Array(new ArrayBuffer(raw.length));
        for (let i = 0; i < raw.length; i++) {
          binaryData[i] = raw.charCodeAt(i);
        }

        //build audio object to be store in state
        const blob = new Blob([binaryData], { type: "audio/wav" });
        const audioUrl = URL.createObjectURL(blob);
        const audio = new Audio(audioUrl);

        //call api to get mapped record names
        return audio;
      });

      this.commit("setRecords", blobFiles);
    } catch (err) {
      console.log("error in getRecording", err);
    }
  },
  async getRecordNames() {
    try {
      const names = await axios.get("/records/names");
      this.commit("setRecordNames", names.data.data);
    } catch (err) {
      console.log(err);
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
      const indexOfReplace = store.getters["recordNames"].indexOf(
        record.ogName
      );
      console.log(indexOfReplace, record.newName);
      this.commit("updateRecord", {
        name: record.newName,
        index: indexOfReplace,
      });
    } catch (err) {
      console.log(err);
    }
  },
  async deleteRecording(state, record) {
    try {
      console.log("fieldName", record.fileName);
      const res = await axios.post("/records/delete", {
        fileName: record.fileName,
      });
      this.commit("deleteRecord", record.fileName);
      console.log(res);
    } catch (err) {
      console.log("error in deleteRecording", err);
    }
  },
};
