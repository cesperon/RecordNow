<template>
  <div class="submissionForm">
    <div class="submissionForm-inner form text-center justify-content-center">
      <label for="recordName">Record Name</label>
      <input
        id="recordName"
        v-model="recordName"
        type="text"
        placeholder="name your record"
      />
      <button class="save" @click="validateInput">Save</button>
      <button class="close" @click="closeSubmission">Restart</button>
    </div>
  </div>
</template>

<script>
import store from "@/store";
export default {
  name: "submissionForm",
  props: ["audioChunks", "mediaRecorder"],
  data() {
    return {
      recordName: "",
    };
  },
  computed: {},
  methods: {
    closeSubmission() {
      this.$emit("closeSubForm");
    },
    submitRecord() {
      this.mediaRecorder.addEventListener("stop", () => {
        const audioBlob = new Blob(this.audioChunks, { type: "audio/wav" });
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);
        let formData = new FormData();
        const fileName = `${this.recordName}-${new Date()
          .toISOString()
          .replace(/:/g, "-")}`;
        formData.append("name", fileName);
        formData.append("audioBlob", audioBlob);
        console.log("formData", formData);
        const output = {
          formdata: formData,
          record: {
            audio: audio,
            name: fileName,
          },
        };
        store.dispatch("postRecording", output);
      });
      this.mediaRecorder.stop();
      this.closeSubmission();
    },
    validateInput() {
      //simple valid check
      if (this.recordName == "") {
        alert("please enter a name for your recording");
      } else {
        this.submitRecord();
      }
    },
  },
};
</script>

<style lang="scss">
.submissionForm {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;

  .submissionForm-inner {
    background: white;
    color: rgb(103, 111, 163);
    padding: 32px;
    width: 200px;
    height: 100px;
    border-radius: 10px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 2px solid black;
  }
  em {
    font-weight: bold;
  }
  .close {
    margin-top: 20px;
    border-radius: 8px;
    width: 30%;
    background-color: rgb(103, 111, 163);
    color: white;
    cursor: pointer;
  }
  .save {
    margin-top: 20px;
    border-radius: 8px;
    width: 30%;
    background-color: green;
    color: white;
    cursor: pointer;
  }
}
</style>
