export class ColumnNumericTransformer {
  // eslint-disable-next-line class-methods-use-this
  to(data: number): number {
    return data;
  }

  // eslint-disable-next-line class-methods-use-this
  from(data: string): number {
    return parseFloat(data);
  }
}
