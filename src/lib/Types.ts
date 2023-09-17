type Icon = {
  src: string;
  sizes: string;
  type: string;
  purpose: string;
};

type Manifest = {
  name: string;
  short_name: string;
  description: string;
  icons: Icon[];
  theme_color: string;
  background_color: string;
  display: string;
  scope: string;
  start_url: string;
  orientation: string;
};

export type ManifestForPlugIn = {
  registerType: "prompt" | "autoUpdate"; // Choose the appropriate type
  includeAssets: string[];
  manifest: Manifest;
};
