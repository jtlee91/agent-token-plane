import assert from "node:assert/strict";
import { test } from "node:test";

import { validateUsagePayload } from "./usage-payload.ts";

const validPayload = {
  user_uuid: "user-uuid",
  device_uuid: "device-uuid",
  agent_type: "codex",
  anonymized_session_id: "anon-session",
  turn_started_at: "2026-05-27T10:00:00Z",
  turn_completed_at: "2026-05-27T10:00:05Z",
  timezone: "Asia/Seoul",
  input_tokens: 1200,
  output_tokens: 45,
  cache_creation_tokens: 0,
  cache_read_tokens: 300,
  reasoning_tokens: 12,
  total_tokens: 1245,
  user_message_count: 0,
  assistant_message_count: 0,
  collector_version: "test-version",
  event_fingerprint: "fingerprint",
};

test("validateUsagePayload accepts the collector allowlist payload", () => {
  const result = validateUsagePayload(validPayload);

  assert.equal(result.ok, true);
  if (result.ok) {
    assert.equal(result.event.agent_type, "codex");
    assert.equal(result.event.cache_read_tokens, 300);
  }
});

test("validateUsagePayload rejects nested forbidden fields", () => {
  const result = validateUsagePayload({
    ...validPayload,
    nested: {
      transcript_path: "/synthetic/forbidden/rollout.jsonl",
    },
  });

  assert.equal(result.ok, false);
  if (!result.ok) {
    assert.equal(result.errorType, "forbidden_field");
  }
});

test("validateUsagePayload rejects unknown top-level fields", () => {
  const result = validateUsagePayload({
    ...validPayload,
    model: "gpt-5",
  });

  assert.equal(result.ok, false);
  if (!result.ok) {
    assert.equal(result.errorType, "unknown_field");
  }
});
