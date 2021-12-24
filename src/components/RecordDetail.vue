<template>
  <div class="popup">
    <div class="popup-inner form text-center justify-content-center">
      <span><strong>Record Name</strong></span>
      <span>record {{ recording.id }}</span>
      <span><strong>Record Duration</strong></span>
      <span>{{ recording.audio.duration }}</span>
      <span><strong>Created On</strong></span>
      <span>{{ recording.dateCreated }}</span>
      <span></span>
      <span></span>
      <span></span>
      <button class="close" @click="closeDetail">Close</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecordDetail",
  props: ["recording"],
  data() {
    return {};
  },
  methods: {
    closeDetail() {
      this.$emit("closeDetail");
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
    padding: 32px;
    width: 200px;
    height: 200px;
    border-radius: 10px;
    text-align: center;
    display: flex;
    flex-direction: column;
    // margin-bottom: 500px;
  }
  em {
    font-weight: bold;
  }
  .close {
    margin-top: 20px;
  }
}
</style>
