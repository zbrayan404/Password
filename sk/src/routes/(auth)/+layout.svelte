<script>
  import "/src/app.css";
  import { page } from "$app/stores";

  let navItems = [
    { name: "Login", path: "/login" },
    { name: "Register", path: "/register" },
  ];
</script>

<header class="header">
  <nav class="navigation">
    <div class="nav-list">
      {#each navItems as item}
        <a
          href={item.path}
          class="nav-item"
          class:active={$page.url.pathname === item.path}>{item.name}</a
        >
      {/each}
    </div>
  </nav>
</header>

<slot />

<style>
  :global(:root) {
    --gray: #243447;
    --white: #f5f7fa;
    --primary: #c51f5d;
    --black: #141d26;
  }
  :global(body) {
    background-color: var(--black);
  }
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
    font-size: 20px;
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
