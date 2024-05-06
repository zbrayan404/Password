<script lang="ts">
  import { Clipboard } from "lucide-svelte";
  import PasswordInput from "$lib/PasswordInput.svelte";
  import { getBase64Image, getImageData } from "$lib/utils/image";
  import { extractText, extractMessage } from "$lib/utils/decode";
  import { copy } from "svelte-copy";
  import pkg from "crypto-js";

  const { AES, enc } = pkg;

  let encodedImageData: ImageData | undefined;
  let inputImage: HTMLInputElement | undefined;
  let image: HTMLImageElement | undefined;
  let showImage: boolean = false;

  type Message = {
    email: string;
    password: string;
  };

  let message: Message | undefined;
  let passwordKey: string | undefined;

  function onChange(): void {
    const file: File | undefined = inputImage?.files
      ? inputImage.files[0]
      : undefined;

    message = undefined;

    if (file) {
      showImage = true;
      getBase64Image(file).then((base64Image: string) => {
        image.src = base64Image;
        getImageData(base64Image).then((imageData: ImageData) => {
          encodedImageData = imageData;
        });
      });
      return;
    }
    showImage = false;
  }

  async function onDecode(): Promise<void> {
    if (!passwordKey) {
      console.error("Password is not available.");
      return;
    }
    if (!encodedImageData) {
      console.error("Image data is not available.");
      return;
    }
    try {
      const text = extractText(encodedImageData);
      const ciphertext = extractMessage(text);
      const plaintext = AES.decrypt(ciphertext, passwordKey).toString(enc.Utf8);
      if (!plaintext) {
        throw new Error("Password is incorrect");
      }
      message = JSON.parse(plaintext);
    } catch (error) {
      console.error("Error during steganography process:", error);
    }
  }
</script>

<div on:submit|preventDefault>
  <form>
    <label for="inputImage">Select an Image:</label>
    <input
      class="input-image"
      accept="image/png, image/jpeg"
      bind:this={inputImage}
      on:change={onChange}
      type="file"
      required
    />
    <label for="inputPassword">Enter Key:</label>
    <PasswordInput bind:password={passwordKey}></PasswordInput>
    <div class="display-box">
      <div class="display">
        {#if showImage}
          <img bind:this={image} src="" alt="Preview" />
        {:else}
          <p>Preview</p>
        {/if}
      </div>
      <div class="message">
        {#if message}
          <div class="output">
            <label for="outputEmail">Email:</label>
            <div class="flex w-full gap-2">
              <input type="email" bind:value={message.email} disabled />
              <button class="copy" use:copy={message.email}
                ><Clipboard /></button
              >
            </div>
          </div>
          <div class="output">
            <label for="outputPassword">Password:</label>
            <div class="flex w-full gap-2">
              <PasswordInput disable={true} bind:password={message.password}
              ></PasswordInput>
              <button class="copy" use:copy={message.password}
                ><Clipboard /></button
              >
            </div>
          </div>
        {:else}
          <p>Message</p>
        {/if}
      </div>
    </div>
    <div class="buttons">
      <button type="submit" on:click={onDecode}>Decode</button>
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
  .message {
    width: 450px;
    height: 250px;
    margin-top: 10px;
    border: 2px solid var(--white);
    display: flex;
    justify-content: center;
    flex-direction: column;
    border-radius: 5.83px;
    padding: 20px;
    gap: 15px;
  }
  .output {
    display: flex;
    flex-direction: column;
    gap: 5px;
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
  .copy {
    width: 35px;
    height: 35px;
    box-shadow: 0 0 var(--black);
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
