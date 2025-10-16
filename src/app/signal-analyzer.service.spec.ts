import { SignalAnalyzerService } from './signal-analyzer.service';

describe('SignalAnalyzerService', () => {
  let service: SignalAnalyzerService;

  beforeEach(() => {
    service = new SignalAnalyzerService();
  });

  it('should normalize data between 0 and 1', () => {
    const result = service.normalize([0, 50, 100]);
    expect(result[0]).toBeCloseTo(0);
    expect(result[1]).toBeCloseTo(0.5);
    expect(result[2]).toBeCloseTo(1);
  });

  it('should handle identical values by returning midpoint', () => {
    const result = service.normalize([5, 5, 5]);
    expect(result.every((v) => v === 0.5)).toBeTrue();
  });

  it('should compute moving average correctly', () => {
    const result = service.movingAverage([1, 2, 3, 4], 2);
    expect(result).toEqual([1, 1.5, 2.5, 3.5]);
  });

  it('should throw for invalid window size', () => {
    expect(() => service.movingAverage([1, 2, 3], 0)).toThrowError('Invalid window size');
  });

  it('should detect spikes above threshold', () => {
    // Many near-constant baseline values keep sigma small; one moderate spike stands out
    const data = Array(20).fill(10).concat([100]); // [10,10,...,10,100]
    const result = service.detectSpikes(data);
    expect(result).toEqual([100]);
  });

  it('should calculate correlation between two datasets', () => {
    const a = [1, 2, 3, 4, 5];
    const b = [2, 4, 6, 8, 10];
    expect(service.correlation(a, b)).toBeCloseTo(1.0, 3);
  });

  it('should classify signal as stable when variance < 1', () => {
    expect(service.classifyStability([10, 10.1, 9.9])).toBe('stable');
  });

  it('should classify signal as unstable when variance is large', () => {
    expect(service.classifyStability([1, 10, 100])).toBe('unstable');
  });

  it('should return no-data classification for empty input', () => {
    expect(service.classifyStability([])).toBe('no-data');
  });
});
