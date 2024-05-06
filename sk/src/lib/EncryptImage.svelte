<script lang="ts">
  import { getImageData, getBase64Image } from "$lib/utils/image";
  import { formattedMessage, toBinary, embedMessage } from "$lib/utils/encode";
  import PasswordInput from "./PasswordInput.svelte";
  import pkg from "crypto-js";

  const { AES } = pkg;

  let plainImageData: ImageData | undefined;
  let encodedBase64Image: string | undefined;

  let inputImage: HTMLInputElement | undefined;
  let plainImage: HTMLImageElement | undefined;
  let encodedImage: HTMLImageElement | undefined;

  let showPlainImage: boolean = false;
  let showEncodedImage: boolean = false;
  let downloadImage: boolean = false;

  type Message = {
    email: string;
    password: string;
  };

  let message: Message | undefined;
  let email: string | undefined;
  let password: string | undefined;
  let passwordKey: string | undefined;

  function encryptMessage(plaintext: string, password: string): string {
    const ciphertext: string = AES.encrypt(plaintext, password).toString();
    return formattedMessage(ciphertext);
  }

  function saveImage(): void {
    const anchor: HTMLAnchorElement = document.createElement("a");
    anchor.download = "output";
    anchor.href = encodedBase64Image;
    if (!encodedBase64Image) {
      console.error("Cannot download image");
      return;
    }
    anchor.click();
  }

  function onChange(): void {
    const file: File | undefined = inputImage?.files
      ? inputImage.files[0]
      : undefined;
    showEncodedImage = false;
    downloadImage = false;
    encodedBase64Image = undefined;
    if (file) {
      showPlainImage = true;
      getBase64Image(file).then((base64Image: string) => {
        plainImage.src = base64Image;
        getImageData(base64Image).then((imageData: ImageData) => {
          plainImageData = imageData;
        });
      });
      return;
    }
    showPlainImage = false;
  }

  async function onEncode(): Promise<void> {
    if (!password || !email) {
      console.error("email or password is not available.");
      return;
    }

    message = { email: email, password: password };

    if (!passwordKey) {
      console.error("Password key is not available.");
      return;
    }
    const ciphertext: string = encryptMessage(
      JSON.stringify(message),
      passwordKey
    );
    const binarytext: string = toBinary(ciphertext);
    if (!plainImageData) {
      console.error("Plain image data is not available.");
      return;
    }
    try {
      showEncodedImage = true;
      let encodedImageData = await embedMessage(binarytext, plainImageData);
      const result: string = await getBase64Image(encodedImageData);
      if (result) {
        encodedImage.src = result;
        encodedBase64Image = result;
        downloadImage = true;
      }
    } catch (error) {
      console.error("Error during steganography process:", error);
    }
  }
</script>

<div>
  <form on:submit|preventDefault>
    <label for="inputMessage">Enter Message:</label>
    <div class="input-message">
      <div class="input">
        <label for="inputEmail">Enter Email:</label>
        <input type="email" bind:value={email} required />
      </div>
      <div class="input">
        <label for="inputPassword">Enter Password:</label>
        <PasswordInput bind:password></PasswordInput>
      </div>
    </div>
    <div class="input">
      <label for="inputPasswordKey">Enter Key:</label>
      <PasswordInput bind:password={passwordKey}></PasswordInput>
    </div>
    <div class="input">
      <label for="inputImage">Select an Image:</label>
      <input
        class="input-image"
        accept="image/png, image/jpeg"
        bind:this={inputImage}
        on:change={onChange}
        type="file"
        required
      />
    </div>
    <div class="display-box">
      <div class="display">
        {#if showPlainImage}
          <img bind:this={plainImage} src="" alt="Preview" />
        {:else}
          <p>Preview</p>
        {/if}
      </div>
      <div class="display">
        {#if showEncodedImage}
          <img bind:this={encodedImage} src="" alt="Preview" />
        {:else}
          <p>Encoded Preview</p>
        {/if}
      </div>
    </div>
    <div class="buttons">
      <button type="button" on:click={saveImage} hidden={!downloadImage}
        >Download</button
      >
      <button type="submit" on:click={onEncode}>Encode</button>
    </div>
  </form>
</div>

<style>
  form {
    letter-spacing: 0.6px;
    font-family: "Iosevka", sans-serif;
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  form button {
    cursor: pointer;
    flex-direction: row;
    gap: 0.5rem;
    letter-spacing: 0.6px;
    font-family: "Iosevka", sans-serif;
    line-height: 1;
    color: var(--white);
    font-size: 20px;
    width: 100%;
    height: 50px;
    font-weight: bold;
    border: 2px solid;
    transition: 0.3s;
    box-shadow: 5px 5px 0px 0px var(--white);
    background-color: var(--gray);
    border-radius: 5.83px;
  }
  form button:hover {
    box-shadow: 0 0 black;
    color: var(--gray);
    background-color: var(--white);
  }
  form .buttons {
    display: flex;
    justify-content: flex-end;
    gap: 20px;
    margin-top: 20px;
  }
  .input-message {
    height: 175px;
    border: 2px solid var(--white);
    display: flex;
    justify-content: center;
    flex-direction: column;
    border-radius: 5.83px;
    padding: 20px;
    gap: 15px;
  }
  .input {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  .display {
    width: 450px;
    height: 250px;
    min-width: 318px;
    border: 2px solid var(--white);
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    color: var(--gray);
    border-radius: 5.83px;
  }
  img {
    height: 100%;
  }
  p {
    color: var(--white);
    letter-spacing: 0.6px;
    font-family: "Iosevka", sans-serif;
    font-size: 1rem;
    align-self: center;
  }
  .display-box {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
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
  .input-image {
    padding-bottom: 32px;
  }
</style>
