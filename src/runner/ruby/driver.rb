# Re-evaluated each run (after the user's code) to (re)define `__ptap_run`.
# Receives the run metadata as a JSON string (parsed in-VM, never code-generated
# literals) and returns a JSON string matching the TestRunResult contract.

# Entry point called from JS. The metadata arrives base64-encoded so it can be
# embedded in an eval string literal without quoting/injection hazards (the JS
# bridge cannot pass a raw JS string as a Ruby String argument). Decoded and
# JSON-parsed entirely in-VM.
def __ptap_run_b64(encoded)
  __ptap_run(encoded.unpack1('m0').force_encoding('UTF-8'))
end

def __ptap_run(meta_json)
  meta        = JSON.parse(meta_json)
  fn_name     = meta['functionName']
  arg_names   = meta['argNames']
  param_types = meta['paramTypes']
  is_list     = meta['isListNodeReturn']
  test_cases  = meta['testCases']

  # Missing method => whole-program runtimeError (raised across the bridge),
  # mirroring the JS harness's "function is not defined" behavior.
  unless respond_to?(fn_name.to_sym, true)
    raise "Method \"#{fn_name}\" is not defined. Define it using the given signature."
  end

  result = {
    'protocolVersion' => 1,
    'passed' => false,
    'cases' => [],
    'durationMs' => 0,
    'stdout' => '',
  }

  start = Process.clock_gettime(Process::CLOCK_MONOTONIC) * 1000.0
  original_stdout = $stdout
  buffer = StringIO.new
  $stdout = buffer

  begin
    test_cases.each do |tc|
      input = tc['input']
      mode = (tc['comparison'] && tc['comparison']['mode']) || 'exact'
      case_result = {
        'description' => tc['description'],
        'passed' => false,
        'expected' => tc['expected'],
      }

      begin
        pos = input['pos']
        values = input.values
        args = arg_names.each_with_index.map do |name, i|
          raw = input.key?(name) ? input[name] : values[i]
          param_types[i] == 'ListNode' ? __ptap_array_to_list(raw, pos) : raw
        end

        raw_out = send(fn_name.to_sym, *args)
        actual = is_list ? __ptap_list_to_array(raw_out) : raw_out
        case_result['actual'] = actual
        case_result['passed'] = __ptap_compare(mode, actual, tc['expected'])
      rescue StandardError => e
        case_result['error'] = "#{e.class}: #{e.message}"
      end

      result['cases'] << case_result
    end

    result['passed'] =
      !result['cases'].empty? && result['cases'].all? { |c| c['passed'] }
  ensure
    $stdout = original_stdout
    result['stdout'] = buffer.string
    result['durationMs'] =
      Process.clock_gettime(Process::CLOCK_MONOTONIC) * 1000.0 - start
  end

  JSON.generate(result)
end
