# Re-evaluated each run (after the user's code) to (re)define __ptap_run.
# Receives the run metadata as a JSON string set on a global via the bridge
# (parsed in-VM) and returns a JSON string matching the TestRunResult contract.

import time


def __ptap_run(meta_json):
    meta = json.loads(meta_json)
    fn_name = meta["functionName"]
    arg_names = meta["argNames"]
    param_types = meta["paramTypes"]
    is_list = meta["isListNodeReturn"]
    test_cases = meta["testCases"]

    # Missing function => whole-program runtimeError (raised across the bridge),
    # mirroring the JS/Ruby "function is not defined" behavior.
    fn = globals().get(fn_name)
    if not callable(fn):
        raise NameError(
            'Function "%s" is not defined. Define it using the given signature.'
            % fn_name
        )

    result = {
        "protocolVersion": 1,
        "passed": False,
        "cases": [],
        "durationMs": 0,
        "stdout": "",
    }

    start = time.perf_counter()
    original_stdout = sys.stdout
    buffer = io.StringIO()
    sys.stdout = buffer

    try:
        for tc in test_cases:
            inp = tc["input"]
            comparison = tc.get("comparison") or {}
            mode = comparison.get("mode", "exact")
            case_result = {
                "description": tc["description"],
                "passed": False,
                "expected": tc["expected"],
            }

            try:
                pos = inp.get("pos")
                values = list(inp.values())
                args = []
                for i, name in enumerate(arg_names):
                    raw = inp[name] if name in inp else values[i]
                    if param_types[i] == "ListNode":
                        args.append(__ptap_array_to_list(raw, pos))
                    else:
                        args.append(raw)

                raw_out = fn(*args)
                actual = __ptap_list_to_array(raw_out) if is_list else raw_out
                case_result["actual"] = actual
                case_result["passed"] = __ptap_compare(mode, actual, tc["expected"])
            except Exception as e:  # noqa: BLE001 — per-case isolation (parity with Ruby rescue)
                case_result["error"] = "%s: %s" % (type(e).__name__, e)

            result["cases"].append(case_result)

        result["passed"] = bool(result["cases"]) and all(
            c["passed"] for c in result["cases"]
        )
    finally:
        sys.stdout = original_stdout
        result["stdout"] = buffer.getvalue()
        result["durationMs"] = (time.perf_counter() - start) * 1000.0

    return json.dumps(result)
