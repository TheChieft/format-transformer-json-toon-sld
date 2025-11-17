import { describe, it, expect } from 'vitest';
import { transformData } from '../lib/transformers/formatRouter';
import { parseJSON } from '../lib/parsers/jsonParser';
import { parseTOON } from '../lib/parsers/toonParser';
import { parseSLD } from '../lib/parsers/sldParser';

describe('JSON Parser', () => {
  it('should parse valid JSON with array', () => {
    const input = `{
      "users": [
        { "id": 1, "name": "Alice" }
      ]
    }`;
    
    const result = parseJSON(input);
    expect(result.collectionName).toBe('users');
    expect(result.records).toHaveLength(1);
    expect(result.records[0].id).toBe(1);
    expect(result.records[0].name).toBe('Alice');
  });

  it('should throw error for invalid JSON', () => {
    const input = '{ invalid json }';
    expect(() => parseJSON(input)).toThrow('Invalid JSON');
  });

  it('should throw error for empty JSON', () => {
    const input = '';
    expect(() => parseJSON(input)).toThrow('Input is empty');
  });
});

describe('TOON Parser', () => {
  it('should parse valid TOON format', () => {
    const input = `users[2]{id,name}:
1,Alice
2,Bob`;
    
    const result = parseTOON(input);
    expect(result.collectionName).toBe('users');
    expect(result.fields).toEqual(['id', 'name']);
    expect(result.records).toHaveLength(2);
    expect(result.records[0].name).toBe('Alice');
  });

  it('should throw error for invalid TOON header', () => {
    const input = 'invalid header\n1,Alice';
    expect(() => parseTOON(input)).toThrow('Invalid TOON header format');
  });

  it('should throw error for count mismatch', () => {
    const input = `users[3]{id,name}:
1,Alice`;
    expect(() => parseTOON(input)).toThrow('Expected 3 records');
  });
});

describe('SLD Parser', () => {
  it('should parse valid SLD format', () => {
    const input = 'users|2|id,name|1,Alice;2,Bob';
    
    const result = parseSLD(input);
    expect(result.collectionName).toBe('users');
    expect(result.fields).toEqual(['id', 'name']);
    expect(result.records).toHaveLength(2);
    expect(result.records[1].name).toBe('Bob');
  });

  it('should throw error for invalid SLD format', () => {
    const input = 'invalid|format';
    expect(() => parseSLD(input)).toThrow('Invalid SLD format');
  });

  it('should throw error for count mismatch', () => {
    const input = 'users|2|id,name|1,Alice';
    expect(() => parseSLD(input)).toThrow('Expected 2 records');
  });
});

describe('Format Transformations', () => {
  const jsonInput = `{
  "users": [
    { "id": 1, "name": "Alice", "role": "admin" }
  ]
}`;

  it('should transform JSON to TOON', () => {
    const result = transformData(jsonInput, 'JSON', 'TOON');
    expect(result).toContain('users[1]{');
    expect(result).toContain('1,Alice,admin');
  });

  it('should transform JSON to SLD', () => {
    const result = transformData(jsonInput, 'JSON', 'SLD');
    expect(result).toContain('users|1|');
    expect(result).toContain('1,Alice,admin');
  });

  it('should round-trip JSON -> TOON -> JSON', () => {
    const toon = transformData(jsonInput, 'JSON', 'TOON');
    const backToJson = transformData(toon, 'TOON', 'JSON');
    const parsed = JSON.parse(backToJson);
    
    expect(parsed.users).toHaveLength(1);
    expect(parsed.users[0].name).toBe('Alice');
  });

  it('should round-trip JSON -> SLD -> JSON', () => {
    const sld = transformData(jsonInput, 'JSON', 'SLD');
    const backToJson = transformData(sld, 'SLD', 'JSON');
    const parsed = JSON.parse(backToJson);
    
    expect(parsed.users).toHaveLength(1);
    expect(parsed.users[0].role).toBe('admin');
  });

  it('should return input unchanged when formats are same', () => {
    const result = transformData(jsonInput, 'JSON', 'JSON');
    expect(result).toBe(jsonInput);
  });
});
