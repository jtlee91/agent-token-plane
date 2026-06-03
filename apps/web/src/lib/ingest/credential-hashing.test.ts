import assert from "node:assert/strict";
import { test } from "node:test";

import {
  hashIngestCredential,
  safeHashEquals,
} from "./credential-hashing.ts";

test("hashIngestCredential is stable for the same key and pepper", () => {
  const first = hashIngestCredential("tp_ingest_test_key", "pepper-a");
  const second = hashIngestCredential("tp_ingest_test_key", "pepper-a");

  assert.equal(first, second);
  assert.equal(safeHashEquals(first, second), true);
});

test("hashIngestCredential changes for a different key or pepper", () => {
  const baseline = hashIngestCredential("tp_ingest_test_key", "pepper-a");
  const differentKey = hashIngestCredential("tp_ingest_other_key", "pepper-a");
  const differentPepper = hashIngestCredential("tp_ingest_test_key", "pepper-b");

  assert.notEqual(baseline, differentKey);
  assert.notEqual(baseline, differentPepper);
  assert.equal(safeHashEquals(baseline, differentKey), false);
});
