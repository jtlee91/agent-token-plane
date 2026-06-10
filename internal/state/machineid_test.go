package state

import "testing"

func TestMachineDerivedDeviceIDIsDeterministic(t *testing.T) {
	first := machineDerivedDeviceID()
	second := machineDerivedDeviceID()

	if first != second {
		t.Fatalf("expected deterministic id, got %q then %q", first, second)
	}
	if first != "" && len(first) != 36 {
		t.Fatalf("expected uuid-shaped id, got %q", first)
	}
}
