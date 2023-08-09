import { environment } from "../../environment";

export const BASE_URL = environment.production ? "" : "http://localhost:5173";
