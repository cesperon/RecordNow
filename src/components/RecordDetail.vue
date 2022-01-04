<template>
  <div class="popup">
    <div class="popup-inner form text-center justify-content-center">
      <span><strong>Record Name</strong></span>
      <div v-if="editName">
        <input type="text" v-model="editNameValue" />
      </div>
      <span v-if="!editName">{{ editNameValue }}</span>
      <div class="edit" @click="editNameOn">edit</div>
      <span><strong>File Name</strong></span>
      <span>{{ record.name }}</span>
      <span><strong>Record Duration</strong></span>
      <span>{{ record.audio.duration }} seconds</span>
      <span></span>
      <span></span>
      <span></span>
      <button class="close" @click="closeDetail">Close</button>
    </div>
  </div>
</template>

<script>
import store from "@/store";
export default {
  name: "RecordDetail",
  props: ["record"],
  mounted() {
    console.log("from detail", this.record);
    this.editNameValue = this.trimRecordName(this.record.name);
    this.editButton = document.querySelector(".edit");
  },
  data() {
    return {
      editName: false,
      editNameValue: "",
      editButton: null,
    };
  },
  methods: {
    closeDetail() {
      this.$emit("closeDetail");
    },
    trimRecordName(name) {
      return name.split("-")[0];
    },
    editNameOn() {
      this.editName
        ? (this.editButton.textContent = "edit")
        : (this.editButton.textContent = "save");
      this.editName = !this.editName;
      if (!this.editName) {
        // console.log(true);
        const newName = `${this.editNameValue}-${new Date()
          .toISOString()
          .replace(/:/g, "-")}`;
        this.editNameValue = this.trimRecordName(newName);
        store.dispatch("updateRecordingName", {
          ogName: this.record.name,
          newName: newName,
        });
      }
    },
  },
};
</script>

<style lang="scss">
.popup {
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

  .popup-inner {
    background: white;
    color: rgb(103, 111, 163);
    padding: 32px;
    width: 200px;
    height: 200px;
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
    width: 25%;
    background-color: rgb(103, 111, 163);
    color: white;
    cursor: pointer;
    // margin: auto;
  }
  .edit {
    border-radius: 8px;
    width: 25%;
    background-color: rgb(103, 111, 163);
    color: white;
    cursor: pointer;
  }
}
</style>
