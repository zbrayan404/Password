<script lang="ts">
  import { Download } from "lucide-svelte";
  import { getBase64Image } from "$lib/utils/image";

  export let inputImage: HTMLInputElement | undefined;

  async function blob(url): Promise<Blob> {
    const response = await fetch(url);
    const blob = await response.blob();
    return blob;
  }

  function saveImage(): void {
    const anchor: HTMLAnchorElement = document.createElement("a");
    anchor.download = "output";
    blob(inputImage).then((blob: Blob) => {
      if (blob) {
        getBase64Image(blob).then((base64Image: string) => {
          anchor.href = base64Image;
          if (!base64Image) {
            console.error("Cannot download image");
            return;
          }
          anchor.click();
        });
      }
    });
  }
</script>

<div class="flex justify-center">
  <button class="download" on:click={saveImage}><Download /></button>
</div>
