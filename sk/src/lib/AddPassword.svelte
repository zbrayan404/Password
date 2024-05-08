<script lang="ts">
  export let isOpen: boolean = false;
  export let imageInput: string | undefined;

  let name = "";
  let url = "";
</script>

{#if isOpen}
  <div class="form-page">
    <div class="body-page">
      <div>
        <section class="card">
          <div class="prose">
            <h1>Save</h1>
          </div>
          <form class="flex flex-col gap-4" method="POST" action="?/add">
            <div class="flex w-full gap-4 mt-3">
              <div class="flex flex-col gap-2">
                <label for="name">Name:</label>
                <input type="text" name="name" bind:value={name} required />
              </div>
              <div class="flex flex-col gap-2">
                <label for="url">URL:</label>
                <input type="text" name="url" bind:value={url} required />
              </div>
              <input
                hidden
                type="text"
                name="image"
                bind:value={imageInput}
                required
              />
            </div>
            <div class="flex items-center justify-end gap-4 mt-5">
              <button type="button" on:click={() => (isOpen = false)}
                >Close</button
              >
              <button type="submit">Add</button>
            </div>
          </form>
        </section>
      </div>
    </div>
  </div>
{/if}

<style>
  .form-page {
    display: block;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.5); /* Black background with opacity */
  }
  .body-page {
    position: relative;
    display: flex;
    height: 730px;
    width: 100%;
    justify-content: center;
    align-items: center;
  }
  .card {
    background-color: var(--black);
    color: var(--white);
    border-radius: 11.83px;
    border: 2px solid;
    width: 370px;
    position: relative;
    padding: 5%;
    padding-top: 2.5rem;
    padding-bottom: 0;
    min-width: 300px;
  }
  .card h1 {
    letter-spacing: 0.6px;
    font-family: "Iosevka", sans-serif;
    font-size: 2rem;
    margin: 0;
    text-align: center;
  }
  form {
    height: 180px;
  }
  form button {
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
    font-size: 15px;
    width: 90px;
    height: 35px;
    font-weight: bold;
    border: 2px solid;
    transition: 0.3s;
    box-shadow: 5px 5px 0px 0px var(--white);
    background-color: var(--black);
    border-radius: 11.83px;
  }
  form button:hover {
    box-shadow: 0 0 black;
    color: var(--black);
    background-color: var(--white);
  }
  form {
    display: flex;
    flex-direction: column;
    font-family: "Iosevka", sans-serif;
  }
  form input {
    background-color: var(--black);
    color: var(--white);
    border-radius: 11.83px;
    padding: 0.5rem;
    background-clip: padding-box;
    border: 2px solid;
    letter-spacing: 0.6px;
    font-family: "Iosevka", sans-serif;
    font-size: 0.8rem;
    width: 150px;
    height: 35px;
  }
</style>
