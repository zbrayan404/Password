import PocketBase from "pocketbase";
import { SERVER_PB } from "$env/static/private";

export const pb = new PocketBase(SERVER_PB);
