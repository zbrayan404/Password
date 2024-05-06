<script>
  import { Eye, EyeOff } from "lucide-svelte";
  import { onMount } from "svelte";

  export let password = "";
  export let disable = false;
  let showPassword = false;

  onMount(() => {
    console.log("PasswordInput mounted");
  });
</script>

<div class="input-wrapper">
  {#if !showPassword}
    <button
      class="visiblity"
      type="button"
      on:click={() => (showPassword = true)}
    >
      <EyeOff size={20} />
    </button>
    <input
      bind:value={password}
      autocomplete="off"
      type="password"
      name="password"
      disabled={disable}
      required={!disable}
    />
  {:else}
    <button
      class="visiblity"
      type="button"
      on:click={() => (showPassword = false)}
    >
      <Eye size={20} />
    </button>
    <input
      bind:value={password}
      autocomplete="off"
      type="text"
      name="password"
      disabled={disable}
      required={!disable}
    />
  {/if}
</div>

<style>
  .input-wrapper {
    position: relative;
    width: 100%;
  }
  .visiblity {
    height: 32px;
    width: 32px;
    box-shadow: none;
    position: absolute;
    top: 2px;
    right: 2px;
    opacity: 0.33;
  }
  input {
    background-color: var(--gray);
    color: var(--white);
    border-radius: 5.83px;
    padding: 0.5rem;
    background-clip: padding-box;
    border: 2px solid;
    letter-spacing: 0.6px;
    font-family: "Iosevka", sans-serif;
    font-size: 0.8rem;
    width: 100%;
    height: 35px;
  }
</style>
