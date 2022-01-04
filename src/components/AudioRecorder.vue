<template>
  <div class="container audioRecorder">
    <button
      class="button"
      id="recordButton"
      @click="changeRecordState"
    ></button>
    <div v-if="subFormOpen">
      <subForm
        @closeSubForm="changeSubFormState"
        :audioChunks="this.audioChunks"
        :mediaRecorder="this.mediaRecorder"
      ></subForm>
    </div>

    <div id="recordButtonText">Press to Record</div>
    <span>{{ recordingsLength }} total recordings</span>
    <div v-for="(recording, index) in recordingsList" :key="index">
      <div class="recording">
        <span>{{ trimRecordName(recording.name) }}</span>
        <div class="recordingActions">
          <button class="playButton" @click="playRecord(index)"></button>
          <button
            class="deleteButton"
            @click="deleteRecord(recording.name)"
          ></button>
          <button class="infoButton" @click="openDetail(recording)"></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from "@/store";
import subForm from "@/components/submissionForm.vue";

export default {
  name: "audioRecorder",
  components: { subForm },
  data() {
    return {
      recordState: false,
      recordButton: null,
      recordButtonText: null,
      allRecords: [],
      audioChunks: [],
      mediaRecorder: null,
      subFormOpen: false,
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
    changeSubFormState() {
      this.subFormOpen = !this.subFormOpen;
    },
    trimRecordName(name) {
      return name.split("-")[0];
    },
    openDetail(record) {
      this.$emit("openDetail", record);
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
    playRecord(num) {
      //stop all playing records before playing another recording
      for (let record of this.recordingsList) {
        record.audio.pause();
        record.audio.currentTime = 0;
      }
      store.getters["userRecords"][num].audio.play();
      console.log("played");
    },
    //remove a record from server file system using record name to query files
    deleteRecord(fileName) {
      store.dispatch("deleteRecording", fileName);
    },
    //animate microphone button on click events and change recording state
    changeRecordState() {
      if (this.recordState === false) {
        this.recordState = true;
        this.recordAudio();
        this.recordButton.classList.remove("button");
        this.recordButton.classList.add("buttonOff");
        this.recordButtonText.textContent = "Press to Stop";
      } else {
        this.recordState = false;
        this.changeSubFormState();
        this.recordButton.classList.remove("buttonOff");
        this.recordButton.classList.add("button");
        this.recordButtonText.textContent = "Press to Record ";
      }
    },
  },
};
</script>
<style scoped lang="scss">
@media screen and (max-width: 768px) {
  .recording {
    margin-left: 10%;
    margin-right: 10%;
  }
}
@media only screen and (min-width: 768px) {
  .recording {
    margin-left: 20%;
    margin-right: 20%;
  }
}
@media only screen and (min-width: 968px) {
  .recording {
    margin-left: 30%;
    margin-right: 30%;
  }
}
@media only screen and (min-width: 1600px) {
  .recording {
    margin-left: 40%;
    margin-right: 40%;
  }
}

.container {
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
  margin-top: 20px;
  border: 2px solid black;
  gap: 10px;
  align-items: center;
  background: rgb(103, 111, 163);
  color: white;
  border-radius: 8px;
  height: 50px;
  padding: 0 10px 0 10px;
}
.recordingActions {
  margin-left: auto;
}
#recordButtonText {
  margin-bottom: 10px;
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
