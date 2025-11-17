import { describe, it, expect } from 'vitest';
import { validateTOON, parseTOON, toTOON } from '../parsers/toonParser';

describe('TOON Parser', () => {
  it('should validate valid TOON format', () => {
    const input = `users[2]{id,name}:
1,Alice
2,Bob`;
    const result = validateTOON(input);
    expect(result.isValid).toBe(true);
  });

  it('should reject invalid TOON header', () => {
    const input = 'invalid header\n1,Alice';
    const result = validateTOON(input);
    expect(result.isValid).toBe(false);
    expect(result.error).toContain('header');
  });

  it('should reject mismatched item count', () => {
    const input = `users[3]{id,name}:
1,Alice
2,Bob`;
    const result = validateTOON(input);
    expect(result.isValid).toBe(false);
  });

  it('should parse TOON correctly', () => {
    const input = `users[2]{id,name}:
1,Alice
2,Bob`;
    const parsed = parseTOON(input);
    expect(parsed.collectionName).toBe('users');
    expect(parsed.items).toHaveLength(2);
    expect(parsed.items[0]).toEqual({ id: 1, name: 'Alice' });
  });

  it('should convert ParsedData to TOON', () => {
    const data = {
      collectionName: 'users',
      items: [
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' },
      ],
    };
    const toon = toTOON(data);
    expect(toon).toContain('users[2]');
    expect(toon).toContain('id,name');
    expect(toon).toContain('1,Alice');
  });
});
