package claude

import (
	"path/filepath"
	"strings"
	"testing"
)

func TestParseSessionFileSummarizesDedupedUsage(t *testing.T) {
	summary, err := ParseSessionFile(filepath.Join("..", "..", "testdata", "claude", "session.jsonl"))
	if err != nil {
		t.Fatalf("ParseSessionFile() error = %v", err)
	}

	if summary.SessionHash == "" || summary.SessionHash == "claude-session-id" {
		t.Fatalf("SessionHash = %q, want non-empty hash that does not expose raw session id", summary.SessionHash)
	}
	if strings.HasPrefix(summary.SessionHash, "sha256:") {
		t.Fatalf("SessionHash = %q, want hex digest without sha256 prefix", summary.SessionHash)
	}
	if len(summary.SessionHash) != 64 {
		t.Fatalf("len(SessionHash) = %d, want 64 hex characters", len(summary.SessionHash))
	}
	if summary.StartedAt != "2026-06-02T18:56:40.393+09:00" {
		t.Fatalf("StartedAt = %q, want first usage timestamp in KST", summary.StartedAt)
	}
	if summary.EndedAt != "2026-06-02T18:58:43.199+09:00" {
		t.Fatalf("EndedAt = %q, want last usage timestamp in KST", summary.EndedAt)
	}
	if summary.UserTurnCount != 2 {
		t.Fatalf("UserTurnCount = %d, want two non-meta user prompts", summary.UserTurnCount)
	}
	if summary.LLMCallCount != 2 {
		t.Fatalf("LLMCallCount = %d, want two deduped assistant usage rows", summary.LLMCallCount)
	}
	if summary.Tokens.Input != 1800 {
		t.Fatalf("Tokens.Input = %d, want deduped input sum", summary.Tokens.Input)
	}
	if summary.Tokens.Output != 4665 {
		t.Fatalf("Tokens.Output = %d, want deduped output sum", summary.Tokens.Output)
	}
	if summary.Tokens.Cache != 23555 {
		t.Fatalf("Tokens.Cache = %d, want cache read plus cache creation sum", summary.Tokens.Cache)
	}
	if summary.Tokens.Total != 30020 {
		t.Fatalf("Tokens.Total = %d, want input + output + cache read + cache creation", summary.Tokens.Total)
	}
}

func TestParseSessionUsageReturnsDedupedCalls(t *testing.T) {
	parsed, err := ParseSessionUsage(filepath.Join("..", "..", "testdata", "claude", "session.jsonl"))
	if err != nil {
		t.Fatalf("ParseSessionUsage() error = %v", err)
	}

	if len(parsed.Calls) != 2 {
		t.Fatalf("len(Calls) = %d, want 2", len(parsed.Calls))
	}
	first := parsed.Calls[0]
	if first.CallIndex != 1 || first.OccurredAt != "2026-06-02T18:56:40.393+09:00" {
		t.Fatalf("first call identity = %+v, want first deduped usage timestamp", first)
	}
	if first.Model != "claude-opus-4-8" {
		t.Fatalf("first call model = %q, want claude-opus-4-8", first.Model)
	}
	if first.CallKey == "" || len(first.CallKey) != 64 {
		t.Fatalf("first CallKey = %q, want 64-char hash", first.CallKey)
	}
	if first.Tokens.Input != 1798 || first.Tokens.Output != 594 || first.Tokens.Cache != 10502 || first.Tokens.Total != 12894 {
		t.Fatalf("first call tokens = %+v, want deduped usage tokens", first.Tokens)
	}
	second := parsed.Calls[1]
	if second.Tokens.Input != 2 || second.Tokens.Output != 4071 || second.Tokens.Cache != 13053 || second.Tokens.Total != 17126 {
		t.Fatalf("second call tokens = %+v, want second usage tokens", second.Tokens)
	}
	if parsed.Summary.Tokens.Total != first.Tokens.Total+second.Tokens.Total {
		t.Fatalf("summary total = %d, want call sum", parsed.Summary.Tokens.Total)
	}
}

func TestParseSessionFileCountsOnlyUserPromptsLinkedToUsage(t *testing.T) {
	summary, err := ParseSessionFile(filepath.Join("..", "..", "testdata", "claude", "leading-context-user.jsonl"))
	if err != nil {
		t.Fatalf("ParseSessionFile() error = %v", err)
	}

	if summary.UserTurnCount != 1 {
		t.Fatalf("UserTurnCount = %d, want only the user prompt linked to assistant usage", summary.UserTurnCount)
	}
	if summary.LLMCallCount != 1 {
		t.Fatalf("LLMCallCount = %d, want one assistant usage", summary.LLMCallCount)
	}
}
