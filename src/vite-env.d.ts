/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

import "react";
declare module "react" {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    inert?: ""; // Temp hack to support inert attribute until React officially supports it
  }
}
