<script lang="ts">
  import { UserRound } from "lucide-svelte";
  import { getBase64Image, getImageData } from "$lib/utils/image";
  import { extractText, extractMessage } from "$lib/utils/decode";
  import { copyText } from "svelte-copy";
  import pkg from "crypto-js";
  import PasswordInput from "./PasswordInput.svelte";

  const { AES, enc } = pkg;

  let encodedImageData: ImageData | undefined;

  export let inputImage: HTMLInputElement | undefined;

  let isOpen: Boolean = false;

  type Message = {
    email: string;
    password: string;
  };

  let message: Message | undefined;
  let passwordKey: string | undefined = "";

  async function blob(url): Promise<Blob> {
    const response = await fetch(url);
    const blob = await response.blob();
    return blob;
  }

  async function Open() {
    const file: Blob | undefined = await blob(inputImage);
    message = undefined;
    if (file) {
      isOpen = true;
      getBase64Image(file).then((base64Image: string) => {
        getImageData(base64Image).then((imageData: ImageData) => {
          encodedImageData = imageData;
        });
      });
    }
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
      isOpen = false;
      copyText(message.email);
      message = undefined;
      passwordKey = "";
    } catch (error) {
      console.error("Error during steganography process:", error);
    }
  }
</script>

<div class="flex justify-center">
  <button class="copy" on:click={Open}><UserRound /></button>
</div>

{#if isOpen}
  <div class="form-page">
    <div class="body-page">
      <div>
        <section class="card">
          <div class="prose">
            <h1>Key</h1>
          </div>
          <form class="flex flex-col gap-4" on:submit|preventDefault>
            <div class="flex w-full">
              <div class="mt-5 w-full">
                <PasswordInput bind:password={passwordKey}></PasswordInput>
              </div>
            </div>
            <div class="flex items-center justify-end gap-4 mt-5">
              <button type="button" on:click={() => (isOpen = false)}
                >Close</button
              >
              <button on:click={onDecode} type="submit">Enter</button>
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
  .copy {
    width: 35px;
    height: 35px;
    box-shadow: 0 0 var(--black);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  form {
    height: 170px;
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
</style>
