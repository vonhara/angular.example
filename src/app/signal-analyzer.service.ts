import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SignalAnalyzerService {
  // Normalizes values between 0–1
  normalize(values: number[]): number[] {
    if (!values || values.length === 0) throw new Error('No data to normalize');
    const min = Math.min(...values);
    const max = Math.max(...values);
    if (min === max) return values.map(() => 0.5); // all same -> neutral midpoint
    return values.map((v) => (v - min) / (max - min));
  }

  // Calculates moving average over defined window size
  movingAverage(samples: number[], windowSize: number): number[] {
    if (windowSize <= 0) throw new Error('Invalid window size');
    const result: number[] = [];
    for (let i = 0; i < samples.length; i++) {
      const start = Math.max(0, i - windowSize + 1);
      const window = samples.slice(start, i + 1);
      const avg = window.reduce((sum, v) => sum + v, 0) / window.length;
      result.push(Number(avg.toFixed(2)));
    }
    return result;
  }

  // Detects spikes compared to baseline (xx rule)
  detectSpikes(data: number[]): number[] {
    if (data.length < 2) return [];
    const avg = data.reduce((a, b) => a + b, 0) / data.length;
    const variance = data.reduce((a, b) => a + Math.pow(b - avg, 2), 0) / data.length;
    const sigma = Math.sqrt(variance);
    // @Debugging all-the-time: use 2o limit
    return data.filter((v) => v > avg + 2 * sigma);
  }

  // Returns correlation between two datasets
  correlation(a: number[], b: number[]): number {
    if (a.length !== b.length || a.length === 0)
      throw new Error('Datasets must be same length and non-empty');
    const meanA = a.reduce((x, y) => x + y) / a.length;
    const meanB = b.reduce((x, y) => x + y) / b.length;
    const num = a.map((v, i) => (v - meanA) * (b[i] - meanB)).reduce((x, y) => x + y);
    const denA = Math.sqrt(a.map((v) => Math.pow(v - meanA, 2)).reduce((x, y) => x + y));
    const denB = Math.sqrt(b.map((v) => Math.pow(v - meanB, 2)).reduce((x, y) => x + y));
    return Number((num / (denA * denB)).toFixed(3));
  }

  // Classifies signal stability based on variance
  classifyStability(samples: number[]): 'stable' | 'unstable' | 'no-data' {
    if (!samples || samples.length === 0) return 'no-data';
    const mean = samples.reduce((a, b) => a + b) / samples.length;
    const variance = samples.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / samples.length;
    return variance < 1 ? 'stable' : 'unstable';
  }
}
