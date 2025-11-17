import { describe, it, expect } from 'vitest';
import { validateJSON, parseJSON, toJSON } from '../parsers/jsonParser';

describe('JSON Parser', () => {
  it('should validate valid JSON with array', () => {
    const input = '{"users": [{"id": 1, "name": "Alice"}]}';
    const result = validateJSON(input);
    expect(result.isValid).toBe(true);
  });

  it('should reject invalid JSON', () => {
    const input = '{invalid json}';
    const result = validateJSON(input);
    expect(result.isValid).toBe(false);
    expect(result.error).toBeDefined();
  });

  it('should reject JSON without array property', () => {
    const input = '{"name": "test"}';
    const result = validateJSON(input);
    expect(result.isValid).toBe(false);
  });

  it('should parse JSON correctly', () => {
    const input = '{"users": [{"id": 1, "name": "Alice"}]}';
    const parsed = parseJSON(input);
    expect(parsed.collectionName).toBe('users');
    expect(parsed.items).toHaveLength(1);
    expect(parsed.items[0]).toEqual({ id: 1, name: 'Alice' });
  });

  it('should convert ParsedData to JSON', () => {
    const data = {
      collectionName: 'users',
      items: [{ id: 1, name: 'Alice' }],
    };
    const json = toJSON(data);
    const parsed = JSON.parse(json);
    expect(parsed.users).toHaveLength(1);
    expect(parsed.users[0]).toEqual({ id: 1, name: 'Alice' });
  });
});
