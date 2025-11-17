import { describe, it, expect } from 'vitest';
import { transform } from '../transformers/formatRouter';

describe('Format Transformer', () => {
  it('should transform JSON to TOON', () => {
    const input = '{"users": [{"id": 1, "name": "Alice"}]}';
    const result = transform(input, 'JSON', 'TOON');
    expect(result.output).toContain('users[1]');
    expect(result.output).toContain('id,name');
    expect(result.metrics.inputLength).toBeGreaterThan(0);
  });

  it('should transform JSON to SLD', () => {
    const input = '{"users": [{"id": 1, "name": "Alice"}]}';
    const result = transform(input, 'JSON', 'SLD');
    expect(result.output).toContain('users|1|');
    expect(result.metrics.inputLength).toBeGreaterThan(0);
  });

  it('should transform TOON to JSON', () => {
    const input = `users[1]{id,name}:
1,Alice`;
    const result = transform(input, 'TOON', 'JSON');
    const parsed = JSON.parse(result.output);
    expect(parsed.users).toHaveLength(1);
  });

  it('should calculate savings percentage', () => {
    const input = '{"users": [{"id": 1, "name": "Alice"}]}';
    const result = transform(input, 'JSON', 'SLD');
    expect(result.metrics.savingsPercentage).toBeGreaterThanOrEqual(0);
  });

  it('should throw error for invalid input', () => {
    const input = 'invalid';
    expect(() => transform(input, 'JSON', 'TOON')).toThrow();
  });
});
