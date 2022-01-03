<template>
  <div class="home">
    <audioRecorder @openDetail="changeDetailState"></audioRecorder>
    <div v-if="openDetail">
      <recordDetail
        :record="record"
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
import store from "@/store";
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
      record: null,
    };
  },
  mounted() {
    store.dispatch("getRecording");
    store.dispatch("getRecordNames");
  },
  methods: {
    changeDetailState(recording) {
      console.log("hi", recording);
      this.record = recording;

      this.openDetail = !this.openDetail;
    },
  },
};
</script>
<style scoped lang="scss">
.audioRecorder {
  margin-top: 100px;
}
</style>
