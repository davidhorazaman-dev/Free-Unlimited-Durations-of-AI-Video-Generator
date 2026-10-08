export class ProviderRegistry {
  constructor() { this.providers = new Map(); }
  register(provider) {
    if (!provider?.id) throw new Error("Provider must have an id.");
    if (typeof provider.generate !== "function") throw new Error("Provider must implement generate().");
    this.providers.set(provider.id, provider);
    return this;
  }
  get(id) { return this.providers.get(id) || null; }
  list() { return [...this.providers.values()].map(({id, capabilities = []}) => ({id, capabilities})); }
}

export function createMockProvider() {
  return {
    id: "mock",
    capabilities: ["text-to-video","image-to-video","photo-to-video","video-to-video","all-in-one"],
    async generate(input) {
      await new Promise(resolve => setTimeout(resolve, 25));
      return {
        provider: "mock",
        assetId: "mock-" + input.sceneId,
        durationSeconds: Number(input.durationSeconds || 5),
        uri: "mock://generated/" + encodeURIComponent(input.sceneId),
        metadata: {mode: input.mode, prompt: input.prompt || ""}
      };
    }
  };
}