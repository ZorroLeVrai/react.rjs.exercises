export default class TimeMetrics {
  constructor(total, remaining) {
    this.total = total;
    this.remaining = remaining;
  }

  add(otherTimeMetrics) {
    this.total += otherTimeMetrics.total;
    this.remaining += otherTimeMetrics.remaining;
    return this;
  }
}
