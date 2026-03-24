import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
export default defineConfig(function (_a) {
    var command = _a.command;
    return ({
        base: command === "build" ? "/ecommerce-microservices-lab/" : "/",
        plugins: [react()],
        resolve: {
            alias: {
                "@": fileURLToPath(new URL("./src", import.meta.url)),
            },
        },
    });
});
