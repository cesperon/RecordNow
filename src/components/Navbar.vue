<template>
  <nav class="navbar">
    <div class="navBrand">RecordNow</div>
    <img src="../assets/mic.png" alt="" />
  </nav>
</template>

<script>
export default {
  name: "Navbar",
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.navbar {
  display: flex;
  font-size: 20px;
  border: 1px solid black;
  height: 56px;
  align-items: center;
  background-color: rgb(103, 111, 163);
  color: white;
}
.navBrand {
  margin-left: 4px;
}
img {
  width: 18px;
  height: 30px;
  margin-left: 4px;
}
</style>
