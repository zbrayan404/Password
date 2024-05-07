<script>
  import { onMount } from "svelte";
  import PasswordCopy from "./PasswordCopy.svelte";
  import UserCopy from "./UserCopy.svelte";
  import Download from "./Download.svelte";

  export let passwords = [];

  let hideUrl = false;

  onMount(() => {
    function hiddenTabs() {
      if (window.innerWidth < 465) {
        hideUrl = true; // Close menu on desktop
      }
      if (window.innerWidth > 465) {
        hideUrl = false; // Close menu on desktop
      }
    }
    hiddenTabs();
    window.addEventListener("resize", hiddenTabs);
    return () => {
      window.removeEventListener("resize", hiddenTabs);
    };
  });
</script>

<section class="section">
  <table>
    <thead>
      <tr class="overview-header">
        <th class="image-header"></th>
        <th class="name-header">Name</th>
        <th hidden={hideUrl} class="url-header">URL</th>
        <th class="user-header"></th>
        <th class="password-header"></th>
        <th class="actions-header"></th>
      </tr>
    </thead>
    <tbody>
      {#each passwords as password}
        <tr class="data-overview">
          <td class="image">
            <div class="image-display">
              <img src={password.image} alt="" />
            </div>
          </td>
          <td class="name">{password.name}</td>
          <td hidden={hideUrl} class="url">{password.url}</td>
          <td class="user"><UserCopy inputImage={password.image}></UserCopy></td
          >
          <td class="password"
            ><PasswordCopy inputImage={password.image}></PasswordCopy></td
          >
          <td class="actions"
            ><Download inputImage={password.image}></Download></td
          >
        </tr>
      {/each}
    </tbody>
  </table>
  {#if passwords.length === 0}
    <div class="none">
      <p class="none-text">No Password Found</p>
    </div>
  {/if}
</section>

<style>
  .section {
    display: block;
    max-width: 750px;
  }
  table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0px 3.9px; /* Adjust this value to change the spacing */
    height: 100%;
  }
  .overview-header,
  .data-overview {
    letter-spacing: 0.6px;
    font-family: "Iosevka", sans-serif;
    background-color: var(--black);
    color: var(--white);
    border-radius: 11.42px;
    background-clip: padding-box;
    box-shadow: 1.9px 3.81px 0px var(--white);
    text-align: center;
  }
  th,
  td {
    height: 40px;
    border-top: 2px solid;
    border-bottom: 2px solid;
  }
  td {
    height: 60px;
  }
  td:first-child {
    border-left: 2px solid;
    border-radius: 11.42px 0 0 11.42px;
  }
  td:last-child {
    border-right: 2px solid;
    border-radius: 0 11.42px 11.42px 0;
  }
  th:first-child {
    border-left: 2px solid;
    border-radius: 11.42px 0 0 11.42px;
  }
  th:last-child {
    border-right: 2px solid;
    border-radius: 0 11.42px 11.42px 0;
  }
  .overview-header {
    text-transform: uppercase;
    font-weight: 700;
    font-size: 12px;
  }
  .user-header,
  .actions-header,
  .password-header {
    width: 60px;
  }
  .data-overview {
    font-weight: 500;
    font-size: 10px;
  }
  .none {
    display: flex;
    justify-content: center;
    align-items: center;
    background: var(--black);
    color: var(--white);
    opacity: 0.8;
    border-radius: 11.83px;
    height: 315px;
    margin-top: 5px;
  }
  .none .none-text {
    font-size: 30px;
    letter-spacing: 0.6px;
    font-family: "Iosevka", sans-serif;
  }
  .image-header {
    width: 60px;
  }
  .image-display {
    background-color: var(--primary);
    width: 30px;
    height: 30px;
    border-radius: 20%;
    margin-left: 15px;
  }
  img {
    border-radius: 10%;
    height: 100%;
  }
</style>
