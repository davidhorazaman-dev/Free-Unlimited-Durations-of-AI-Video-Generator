export class VideoOrchestrator {
  constructor({store, providers}) { this.store = store; this.providers = providers; }

  normalizeMode(mode) {
    const allowed = ["text-to-video","image-to-video","photo-to-video","video-to-video","all-in-one"];
    return allowed.includes(mode) ? mode : "all-in-one";
  }

  splitIntoScenes(project) {
    if (Array.isArray(project.scenes) && project.scenes.length) return project.scenes;
    const text = String(project.script || project.prompt || "").trim();
    if (!text) return [];
    return text.split(/\n{2,}/).map((prompt, index) => ({
      id: "scene-" + String(index + 1).padStart(6, "0"),
      prompt: prompt.trim(),
      durationSeconds: Number(project.sceneDurationSeconds || 8)
    })).filter(scene => scene.prompt);
  }

  async start(project, options = {}) {
    const scenes = this.splitIntoScenes(project);
    if (!scenes.length) throw new Error("A prompt, script, or scenes are required.");

    const providerId = options.provider || project.provider || "mock";
    const provider = this.providers.get(providerId);
    if (!provider) throw new Error("Unknown provider: " + providerId);

    const job = this.store.create("long-form-generation", {
      projectId: project.id,
      mode: this.normalizeMode(options.mode || project.mode),
      provider: providerId,
      sceneCount: scenes.length
    });

    queueMicrotask(async () => {
      try {
        const outputs = [];
        for (let i = 0; i < scenes.length; i++) {
          if (this.store.get(job.id)?.status === "cancelled") return;
          const scene = scenes[i];
          this.store.update(job.id, {
            status: "running",
            stage: "rendering-scene",
            progress: Math.round((i / scenes.length) * 90),
            message: "Rendering scene " + (i + 1) + " of " + scenes.length + "."
          });
          outputs.push(await provider.generate({
            ...scene,
            projectId: project.id,
            mode: this.normalizeMode(options.mode || project.mode)
          }));
        }
        this.store.update(job.id, {
          status: "completed",
          stage: "complete",
          progress: 100,
          message: "Completed " + outputs.length + " scene jobs. Timeline assembly is ready.",
          result: {projectId: project.id, scenes: outputs}
        });
      } catch (error) {
        this.store.update(job.id, {
          status: "failed",
          stage: "error",
          message: error instanceof Error ? error.message : String(error)
        });
      }
    });

    return job;
  }
}