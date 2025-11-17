import { describe, it, expect } from 'vitest';
import { estimateTokenCount, calculateSavings } from '../lib/utils/tokenEstimator';

describe('Token Estimator', () => {
  it('should estimate tokens for simple text', () => {
    const text = 'Hello world';
    const tokens = estimateTokenCount(text);
    expect(tokens).toBeGreaterThan(0);
    expect(tokens).toBeLessThan(10);
  });

  it('should count special characters as tokens', () => {
    const text = '{}[]()';
    const tokens = estimateTokenCount(text);
    expect(tokens).toBe(6);
  });

  it('should return 0 for empty string', () => {
    const tokens = estimateTokenCount('');
    expect(tokens).toBe(0);
  });

  it('should handle JSON with many special characters', () => {
    const json = '{"key": "value", "array": [1, 2, 3]}';
    const tokens = estimateTokenCount(json);
    expect(tokens).toBeGreaterThan(10);
  });

  it('should estimate fewer tokens for compact format', () => {
    const json = '{"users": [{"id": 1, "name": "Alice"}]}';
    const sld = 'users|1|id,name|1,Alice';
    
    const jsonTokens = estimateTokenCount(json);
    const sldTokens = estimateTokenCount(sld);
    
    expect(sldTokens).toBeLessThan(jsonTokens);
  });
});

describe('Savings Calculator', () => {
  it('should calculate percentage savings correctly', () => {
    const savings = calculateSavings(100, 50);
    expect(savings).toBe(50);
  });

  it('should return 0 for same values', () => {
    const savings = calculateSavings(100, 100);
    expect(savings).toBe(0);
  });

  it('should handle negative savings (increase)', () => {
    const savings = calculateSavings(50, 100);
    expect(savings).toBe(-100);
  });

  it('should return 0 when original is 0', () => {
    const savings = calculateSavings(0, 50);
    expect(savings).toBe(0);
  });

  it('should round to 1 decimal place', () => {
    const savings = calculateSavings(100, 33);
    expect(savings).toBe(67);
  });
});
