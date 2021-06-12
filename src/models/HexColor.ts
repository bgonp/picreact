export class HexColor {
  private _value: string

  constructor(color: string) {
    if (!/^#(?:[0-9A-F]{3,4}|(?:[0-9A-F]{2}){3,4})$/i.test(color))
      throw Error('Invalid color')
    this._value = color
  }

  toString(): string {
    return this._value
  }
}
