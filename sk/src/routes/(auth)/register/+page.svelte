<script lang="ts">
  import debug from "debug";
  import type { ActionData } from "./$types";
  import { EyeOff, Eye } from "lucide-svelte";

  const log = debug("app:routes:register:page.svelte");

  export let form: ActionData;

  let showPassword = false;
  let showConfirm = false;

  let password = "";
  let confirm = "";

  let email = "";

  let nextForm = false;

  $: {
    if (form?.error) log(form.error);
  }
  $: passError = password?.length && confirm?.length && password !== confirm;
  $: passMinLength = password?.length < 8 && password?.length > 0;
  $: passConfLength = confirm?.length < 8 && confirm?.length > 0;
  $: nextError =
    !email?.length ||
    !confirm?.length ||
    !password?.length ||
    passError ||
    passMinLength ||
    passConfLength;

  function gestures(number) {
    const guestures = [
      "hand",
      "handPhone",
      "ok",
      "okLongArm",
      "point",
      "pointLongArm",
      "waveLongArm",
      "waveLongArms",
      "waveOkLongArms",
      "wavePointLongArms",
    ];
    return guestures[number - 1];
  }

  function formatVariant(number) {
    // Add leading zero for numbers < 10
    return number < 10 ? "0" + number : number;
  }

  function randomAvatar() {
    let avatar = `https://api.dicebear.com/8.x/notionists/svg?backgroundColor=02cd8c`;

    let beard =
      "&beard=variant" + formatVariant(Math.floor(Math.random() * 12 + 1)); // 01 - 12
    let beardProbability =
      "&beardProbability=" + Math.floor(Math.random() * 101); // 0 - 100

    let body =
      "&body=variant" + formatVariant(Math.floor(Math.random() * 25 + 1)); // 01 - 25
    let brows =
      "&brows=variant" + formatVariant(Math.floor(Math.random() * 13 + 1)); // 01 - 13
    let eyes =
      "&eyes=variant" + formatVariant(Math.floor(Math.random() * 5 + 1)); // 01 - 05
    let gesture = "&gesture=" + gestures(Math.floor(Math.random() * 10 + 1)); // 1 - 10
    let gestureProbability =
      "&gestureProbability=" + Math.floor(Math.random() * 101); // 0 - 100

    let glasses =
      "&glasses=variant" + formatVariant(Math.floor(Math.random() * 11 + 1)); // 01 - 11
    let glassesProbability =
      "&glassesProbability=" + Math.floor(Math.random() * 101); // 0 - 100

    let hair =
      "&hair=variant" + formatVariant(Math.floor(Math.random() * 63 + 1)); // 01 - 63
    let lips =
      "&lips=variant" + formatVariant(Math.floor(Math.random() * 30 + 1)); // 01 - 30
    let nose =
      "&nose=variant" + formatVariant(Math.floor(Math.random() * 20 + 1)); // 01 - 20

    avatar +=
      beard +
      beardProbability +
      body +
      brows +
      eyes +
      gesture +
      gestureProbability +
      glasses +
      glassesProbability +
      hair +
      lips +
      nose +
      "&scale=111";
    return avatar;
  }

  let avatarUrl = randomAvatar();

  function changeAvatar() {
    avatarUrl = randomAvatar();
  }
</script>

<div class="h-full w-full">
  <div class="body-page">
    <section class="card">
      <div class="prose">
        <h1 class="">Sign Up</h1>
      </div>
      <form class="flex flex-colc gap-4 my-6" method="POST" action="?/register">
        {#if form?.error}<p class="error">Invalid or Taken Email!</p>{/if}
        {#if passError}<p class="error">Passwords do not match!</p>{/if}
        <div hidden={!nextForm}>
          <input type="hidden" name="avatar" value={avatarUrl} />
          <div class="flex justify-center">
            <button type="button" class="avatar" on:click={changeAvatar}>
              <img src={avatarUrl} alt="Avatar" />
            </button>
          </div>
        </div>
        <div hidden={!nextForm}>
          <label for="name">Name</label>
          <input
            autocomplete="name"
            autocorrect="off"
            type="text"
            name="name"
            placeholder="Name..."
            required
          />
        </div>
        <div hidden={nextForm}>
          <label for="email">Email</label>
          <input
            autocomplete="email"
            autocorrect="on"
            type="email"
            name="email"
            placeholder="Email..."
            bind:value={email}
            required
          />
        </div>
        <div hidden={nextForm}>
          <label for="password">Password</label>
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
                id="password"
                name="password"
                placeholder="Password..."
                required
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
                id="password"
                name="password"
                placeholder="Password..."
                required
              />
            {/if}
            {#if passMinLength}
              <p class="error">Password must be at least 8 characters long</p>
            {/if}
          </div>
        </div>
        <div hidden={nextForm}>
          <label for="confirmPassword">Confirm Password</label>
          <div class="input-wrapper">
            {#if !showConfirm}
              <button
                class="visiblity"
                type="button"
                on:click={() => (showConfirm = true)}
              >
                <EyeOff size={20} />
              </button>
              <input
                bind:value={confirm}
                autocomplete="off"
                type="password"
                id="confirmPassword"
                placeholder="Confirm Password..."
                name="confirmPassword"
                required
              />
            {:else}
              <button
                class="visiblity"
                type="button"
                on:click={() => (showConfirm = false)}
              >
                <Eye size={20} />
              </button>
              <input
                bind:value={confirm}
                autocomplete="off"
                type="text"
                id="confirmPassword"
                placeholder="Confirm Password..."
                name="confirmPassword"
                required
              />
            {/if}
            {#if passConfLength}
              <p class="error">Password must be at least 8 characters long</p>
            {/if}
          </div>
        </div>
        <div hidden={!nextForm}>
          <button type="button" on:click={() => (nextForm = !nextForm)}
            >{nextForm ? "Back" : "Next"}</button
          >
        </div>
        <div class="flex items-center flex-col gap-1 mt-6">
          {#if !nextForm}
            <button
              type="button"
              on:click={() => (nextForm = !nextForm)}
              disabled={nextError}>Next</button
            >
          {:else}
            <button type="submit" disabled={passError}>Sign Up</button>
          {/if}
          or
          <a href="/login" class="link">Login</a>
        </div>
      </form>
    </section>
  </div>
</div>

<style>
  .body-page {
    display: flex;
    height: 700px;
    width: 100%;
    justify-content: center;
    align-items: center;
  }
  .card {
    background-color: var(--black);
    color: var(--white);
    border-radius: 11.83px;
    border: 2px solid;
    width: 35%;
    padding: 5%;
    padding-top: 2.5rem;
    padding-bottom: 0;
    min-width: 300px;
  }
  .card form input {
    background-color: var(--black);
    color: var(--white);
    border-radius: 11.83px;
    padding: 0.5rem;
    background-clip: padding-box;
    border: 2px solid;
    letter-spacing: 0.6px;
    font-family: "Iosevka", sans-serif;
    font-size: 1rem;
    width: 100%;
  }
  .card form .input-wrapper {
    position: relative;
  }
  .card form .visiblity {
    height: 32px;
    width: 32px;
    box-shadow: none;
    position: absolute;
    top: 6px;
    right: 6px;
    opacity: 0.33;
  }
  .card form button {
    cursor: pointer;
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
    letter-spacing: 0.6px;
    font-family: "Iosevka", sans-serif;
    align-items: center;
    justify-content: center;
    line-height: 1;
    color: var(--white);
    font-size: 18px;
    width: 100%;
    height: 55px;
    font-weight: bold;
    border: 2px solid;
    transition: 0.3s;
    box-shadow: 5px 5px 0px 0px var(--white);
    background-color: var(--black);
    border-radius: 11.83px;
  }
  .card form button:hover {
    box-shadow: 0 0 var(--black);
    color: var(--black);
    background-color: var(--white);
  }
  .card h1 {
    letter-spacing: 0.6px;
    font-family: "Iosevka", sans-serif;
    font-size: 2rem;
    margin: 0;
    text-align: center;
  }
  .card form {
    display: flex;
    flex-direction: column;
    font-family: "Iosevka", sans-serif;
  }
  .card form label {
    font-family: "Iosevka", sans-serif;
    font-size: 1.2rem;
    padding-bottom: 1rem;
  }
  .card a {
    color: var(--primary);
    letter-spacing: 0.6px;
    font-family: "Iosevka", sans-serif;
    font-size: 1.2rem;
  }
  .card form .avatar {
    width: 96px;
    height: 96px;
    border-radius: 20%;
    overflow: hidden;
    border: 2px solid;
    margin: 0 auto;
  }
  .card form .error {
    color: var(--primary);
    font-size: 0.8rem;
    margin-top: 0.5rem;
  }
  @media (max-width: 1250px) {
    .card {
      width: 60%;
    }
    .card form input {
      font-size: 1.25rem;
    }
    .card form .visiblity {
      top: 10px;
      right: 10px;
    }
  }
</style>
