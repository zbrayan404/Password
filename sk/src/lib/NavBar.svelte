<script>
  import { page } from "$app/stores";

  let navItems = [{ name: "Encode" }, { name: "Decode" }];

  export let currentPath = "Encode";
</script>

<header class="header">
  <nav class="navigation">
    <div class="nav-list">
      {#each navItems as item}
        <button
          class="nav-item"
          class:active={currentPath === item.name}
          on:click={() => (currentPath = item.name)}>{item.name}</button
        >
      {/each}
    </div>
  </nav>
</header>

<style>
  .header {
    background-color: var(--black);
    display: flex;
    justify-content: center;
    height: 50px;
    align-items: center;
  }
  .navigation {
    display: flex;
    flex-direction: column;
  }
  .nav-list {
    list-style: none;
    display: flex;
    gap: 20px;
    font-size: 16px;
    justify-content: space-between;
    color: var(--white);
    letter-spacing: 1.25px;
    margin: 0;
    padding: 0;
  }
  .nav-item {
    font-family: Iosevka, sans-serif;
    color: var(--white);
  }
  .active {
    color: var(--primary);
  }
</style>
