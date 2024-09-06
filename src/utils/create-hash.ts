import crypto from "crypto"; //nativo de node

function createHash(data: string) {
  const hash = crypto.createHash("sha256");
  return hash.update(data).digest("hex");
}

export default createHash;
