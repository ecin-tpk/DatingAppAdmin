export class UserParams {
  constructor(
    private _gender: string,
    private _minAge: number,
    private _maxAge: number,
    private _name: string,
    private _verification: string,
    private _status: string,
    private _orderBy: string,
    private _hasChanged?: boolean
  ) {}

  get gender(): string {
    return this._gender;
  }

  set gender(value: string) {
    if (this._gender !== value) {
      this._hasChanged = true;
    }
    this._gender = value;
  }

  get minAge(): number {
    return this._minAge;
  }

  set minAge(value: number) {
    if (this._minAge !== value) {
      this._hasChanged = true;
    }
    this._minAge = value;
  }

  get maxAge(): number {
    return this._maxAge;
  }

  set maxAge(value: number) {
    if (this._maxAge !== value) {
      this._hasChanged = true;
    }
    this._maxAge = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    if (this._name !== value) {
      this._hasChanged = true;
    }
    this._name = value;
  }

  get verification(): string {
    return this._verification;
  }

  set verification(value: string) {
    if (this._verification !== value) {
      this._hasChanged = true;
    }
    this._verification = value;
  }

  get status(): string {
    return this._status;
  }

  set status(value: string) {
    if (this._status !== value) {
      this._hasChanged = true;
    }
    this._status = value;
  }

  get orderBy(): string {
    return this._orderBy;
  }

  set orderBy(value: string) {
    if (this._orderBy !== value) {
      this._hasChanged = true;
    }
    this._orderBy = value;
  }

  get hasChanged(): boolean {
    return this._hasChanged;
  }

  set hasChanged(value: boolean) {
    this._hasChanged = value;
  }
}


