<script lang="ts">
  import DecryptImage from "$lib/DecryptImage.svelte";
  import EncryptImage from "$lib/EncryptImage.svelte";
  import NavBar from "$lib/NavBar.svelte";

  let currentPath = "Encode";
</script>

<div class="body">
  <div class="header"></div>
  <div class="main">
    <div class="nav">
      <NavBar bind:currentPath></NavBar>
    </div>
    <h1>Home</h1>
    {#if currentPath === "Encode"}
      <EncryptImage></EncryptImage>
    {:else}
      <DecryptImage></DecryptImage>
    {/if}
  </div>
</div>

<style>
  :global(:root) {
    --gray: #141d26;
    --white: #f5f7fa;
    --primary: #c51f5d;
  }
  .body {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .main {
    background-color: var(--gray);
    color: var(--white);
    border-radius: 22.83px;
    background-clip: padding-box;
    border: 2px solid;
    padding: 3.5%;
    padding-top: 0%;
    min-height: 92vh;
    width: 93%;
  }
  h1 {
    letter-spacing: 0.6px;
    font-family: "Iosevka", sans-serif;
    font-size: 40px;
  }
  .nav {
    position: relative;
    top: 0;
  }
</style>
