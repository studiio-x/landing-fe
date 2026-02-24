export const ARRAY_OPTIONS = ["newest", "oldest"] as const;

export const AUTH_OPTIONS = [
  {
    key: "FULL_ACCESS",
    name: "fullAccess",
    description: "fullAccessDesc",
  },
  {
    key: "WRITE",
    name: "editOnly",
    description: "editOnlyDesc",
  },
  {
    key: "READ",
    name: "readOnly",
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
