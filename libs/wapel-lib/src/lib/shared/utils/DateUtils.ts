export class DateUtils {
  static getYearsBack(back: number) {
    const year = new Date().getFullYear();
    return Array.from({ length: back }, (v, i) => year - back + i + 1);
  }
  static getYearsFront(front: number) {
    const year = new Date().getFullYear();
    return Array.from({ length: front }, (v, i) => year + front - i - 1);
  }
}
