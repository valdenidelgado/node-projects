import Address from "../value-object/address";

export default class Customer {
  private _id: string;
  private _name: string = '';
  private _address!: Address;
  private _active: boolean = false;
  private _rewardPoints: number = 0;

  constructor(id: string, name: string) {
    this._id = id;
    this._name = name;
    this.validate();
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get address(): Address {
    return this._address;
  }

  set address(address: Address) {
    this._address = address;
  }

  get rewardPoints(): number {
    return this._rewardPoints;
  }

  addRewardPoints(points: number): void {
    this._rewardPoints += points;
  }

  validate() {
    if(this._name.length === 0) {
      throw new Error('Name is required');
    } 
    if(this._id.length === 0) {
      throw new Error('Id is required');
    }
  }

  changeName(newName: string): void {
    this._name = newName;
    this.validate();
  }

  changeAddress(address: Address): void {
    this._address = address;
  }

  isActive(): boolean {
    return this._active;
  }

  activate(): void {
    if (this._address === undefined) {
      throw new Error('Address is required');
    }
    this._active = true;
  }

  deactivate(): void {
    this._active = false;
  }

}