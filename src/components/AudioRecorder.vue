<template>
  <div class="container audioRecorder">
    <button
      class="button"
      id="recordButton"
      @click="changeRecordState"
    ></button>
    <div id="recordButtonText">Press to Record</div>
    <!-- <div>
      <input
        v-model="searchText"
        type="text"
        placeholder="search by id number"
      />
      <span>{{ recordingsLength }} total recordings</span>
    </div> -->
    <div v-for="recording in recordingsList" :key="recording.id">
      <div class="recording">
        <span>Recording {{ recording.name }}</span>
        <div class="recordingActions">
          <button class="playButton" @click="playRecord(recording.id)"></button>
          <button
            class="deleteButton"
            @click="deleteRecord(recording)"
          ></button>
          <button class="infoButton" @click="openDetail(recording)"></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from "@/store";

export default {
  name: "audioRecorder",
  components: {},
  data() {
    return {
      recordState: false,
      recordButton: null,
      recordButtonText: null,
      allRecords: [],
      audioChunks: [],
      mediaRecorder: null,
      audio: null,
      audioUrl: null,
      audioBlob: null,
      audioDuration: null,
    };
  },
  async mounted() {
    this.recordButton = document.getElementById("recordButton");
    this.recordButtonText = document.getElementById("recordButtonText");
  },
  computed: {
    recordingsList() {
      console.log(this.allRecords);
      return store.getters["userRecords"];
    },
    recordingsLength() {
      return this.recordingsList.length;
    },
  },
  methods: {
    openDetail(recording) {
      console.log("hi", recording);
      this.$emit("openDetail", recording);
    },
    async recordAudio() {
      this.audioChunks = [];
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.mediaRecorder = new MediaRecorder(stream);
      this.mediaRecorder.addEventListener("dataavailable", (event) => {
        //push chunks into audioChunks as they are recorded.
        this.audioChunks.push(event.data);
      });
      this.mediaRecorder.start();
    },
    async stopRecord() {
      this.mediaRecorder.addEventListener("stop", () => {
        this.audioBlob = new Blob(this.audioChunks, { type: "audio/wav" });
        // this.audioUrl = URL.createObjectURL(this.audioBlob);
        // this.audio = new Audio(this.audioUrl);
        // const currentDate = new Date();
        console.log("audioBlob", this.audioBlob);

        let formData = new FormData();
        formData.append("name", `Recording${this.recordingsList.length + 1}`);
        formData.append("audioBlob", this.audioBlob);
        console.log("formData", formData);
        // const newRecord = {
        //   name: `Recording ${this.recordingsList.length + 1}`,
        //   audioBlob: this.audioBlob,
        //   audioUrl: this.audioUrl,
        //   audio: this.audio,
        //   duration: this.audio.duration,
        //   dateCreated: currentDate,
        // };
        // console.log("new recording", newRecord);
        store.dispatch("postRecording", formData);
      });
      this.mediaRecorder.stop();
    },
    playRecord() {
      // for (let record of this.recordingsList) {
      //   record.audio.pause();
      //   record.audio.currentTime = 0;
      // }
      // console.log(this.recordingsList[num - 1]);
      // const currentAudio = store.getters["userRecords"].filter((record) => {
      //   return num == record.id;
      // })[0].blobFile;
      const myAudio = store.getters["userRecords"][0];
      const audioUrl = URL.createObjectURL(myAudio);
      const audio = new Audio(audioUrl);
      audio.play();
      console.log("myAudio", myAudio);
      // const audioBlob = currentAudio;
      // console.log("currentAudio", audioBlob, "type", typeof audioBlob);
      // const audioUrl = URL.createObjectURL(audioBlob, { type: "audio/wav" });
      // console.log("audioUrl", audioUrl);
      // const audio = new Audio(audioUrl);
      // audio.play();
      // console.log(currentAudio);
      // currentAudio.play();
    },
    deleteRecord(id) {
      store.dispatch("deleteRecording", id);
    },
    changeRecordState() {
      if (this.recordState === false) {
        this.recordState = true;
        this.recordAudio();
        this.recordButton.classList.remove("button");
        this.recordButton.classList.add("buttonOff");
        this.recordButtonText.textContent = "Press to Stop";
      } else {
        this.recordState = false;
        this.stopRecord();
        this.recordButton.classList.remove("buttonOff");
        this.recordButton.classList.add("button");
        this.recordButtonText.textContent = "Press to Record ";
      }
    },
  },
};
</script>
<style scoped lang="scss">
.container {
  height: 00px;
  flex-direction: row;
  justify-content: center;
}
.button {
  height: 180px;
  width: 150px;
  background: url(../assets/mic.png);
  background-color: rgb(124, 209, 184);
  background-position: center;
  background-repeat: no-repeat;
  background-size: 80px;
  border-radius: 10px;
  cursor: pointer;
}
.button:hover {
  border: 2px solid white;
  box-shadow: 5px 10px #888888;
}

.buttonOff {
  height: 140px;
  width: 140px;
  background: url(../assets/stop.svg);
  background-color: rgb(240, 84, 84);
  background-position: center;
  background-repeat: no-repeat;
  background-size: 80px;
  border-radius: 10px;
  cursor: pointer;
}
.buttonOff:hover {
  box-shadow: 5px 10px #888888;
}
.recording {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 20px;
  border: 2px solid black;
  margin-left: 40%;
  margin-right: 40%;
  gap: 10px;
  align-items: center;
  background: rgb(103, 111, 163);
  color: white;
  border-radius: 8px;
  height: 40px;
  padding: 0 10px 0 10px;
}
.recordingActions {
  margin-left: auto;
}
.playButton {
  width: 50px;
  height: 30px;
  background-image: url("../assets/play.png");
  background-color: rgb(124, 209, 184);
  background-position: center;
  background-repeat: no-repeat;
  background-size: 20px;
  border-radius: 20px;
  cursor: pointer;
}
.playButton:hover {
  border: 1px solid white;
}
.deleteButton {
  width: 50px;
  height: 30px;
  background-image: url("../assets/trash.svg");
  background-color: rgb(240, 84, 84);
  background-position: center;
  background-repeat: no-repeat;
  background-size: 20px;
  border-radius: 20px;
  cursor: pointer;
}
.deleteButton:hover {
  border: 1px solid white;
}
.infoButton {
  width: 50px;
  height: 30px;
  background-image: url("../assets/info.svg");
  background-color: rgb(205, 222, 255);
  background-position: center;
  background-repeat: no-repeat;
  background-size: 25px;
  border-radius: 20px;
  cursor: pointer;
}
.infoButton:hover {
  border: 1px solid white;
}
input {
  margin-top: 10px;
  width: 200px;
}
</style>
