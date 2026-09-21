export interface StudentEvidenceStorage {
  store(storageKey: string, bytes: Buffer): Promise<void>;
  retrieve(storageKey: string): Promise<Buffer>;
  delete(storageKey: string): Promise<void>;
}
