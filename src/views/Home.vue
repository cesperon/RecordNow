<template>
  <div class="home">
    <audioRecorder @openDetail="changeDetailState"></audioRecorder>
    <div v-show="openDetail">
      <recordDetail
        :recording="recording"
        @closeDetail="changeDetailState"
      ></recordDetail>
    </div>
    <particles-bg color="#112031" type="cobweb" :bg="true" />
  </div>
</template>

<script>
import recordDetail from "@/components/RecordDetail.vue";
import audioRecorder from "@/components/AudioRecorder.vue";
import { ParticlesBg } from "particles-bg-vue";
export default {
  name: "Home",
  components: {
    audioRecorder,
    ParticlesBg,
    recordDetail,
  },
  data() {
    return {
      openDetail: false,
      recording: null,
    };
  },
  methods: {
    changeDetailState(recording) {
      console.log("hi", recording);
      this.recording = recording;
      this.openDetail = !this.openDetail;
      // console.log("hi", recording);
    },
  },
};
</script>
<style scoped lang="scss">
.audioRecorder {
  margin-top: 100px;
}
</style>
