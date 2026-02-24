export const ARRAY_OPTIONS = ["newest", "oldest"] as const;

export const AUTH_OPTIONS = [
  {
    key: "FULL_ACCESS",
    description: "fullAccessDesc",
  },
  {
    key: "WRITE",
    description: "editOnlyDesc",
  },
  {
    key: "READ",
    description: "readOnlyDesc",
  },
] as const;

export const LANG_OPTIONS = [
  {
    key: "ko",
    name: "ko",
    description: "Korean",
  },
  {
    key: "en",
    name: "en",
    description: "English",
  },
] as const;
