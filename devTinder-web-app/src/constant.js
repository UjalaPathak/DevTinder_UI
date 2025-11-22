// export const BASE_URL =  "/api";
console.log("window", location);
export const BASE_URL =
  location.hostname === "localhost" ? "http://localhost:7777" : "/api";
