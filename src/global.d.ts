export {};
declare global {
  interface Date {
    getDateOnly(this: any): string;
  }
}
