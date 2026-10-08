export class JobStore {
  constructor() { this.jobs = new Map(); }

  create(type, payload = {}) {
    const id = crypto.randomUUID();
    const job = { id, type, status: "queued", progress: 0, stage: "queued", message: "Job queued.", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), payload };
    this.jobs.set(id, job);
    return job;
  }

  update(id, patch) {
    const job = this.jobs.get(id);
    if (!job) return null;
    Object.assign(job, patch, { updatedAt: new Date().toISOString() });
    return job;
  }

  get(id) { return this.jobs.get(id) || null; }

  cancel(id) { return this.update(id, { status: "cancelled", stage: "cancelled", message: "Job cancelled by request." }); }

  forProject(projectId) {
    return [...this.jobs.values()].filter(job => job.payload?.projectId === projectId);
  }
}