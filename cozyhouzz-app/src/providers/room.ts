export class Room {

  private _deposit_lower:number;
  private _deposit_upper:number;
  private _monthly_lower:number;
  private _monthly_upper:number;
  private _isCharter:boolean;
  private _isOneRoomOpen:boolean;
  private _isOneRoomDuplex:boolean ;
  private _isOneRoomSeperation:boolean;
  private _isTwoRoom:boolean;
  private _isThreeRoom:boolean;
  private _filter:Array<string>;

  private _deposit_max:number = 10000;
  private _monthly_max:number = 1000;
  constructor() {
      this._deposit_upper = this._deposit_max; //보증금 최대값
      this._deposit_lower = 0;
      this._monthly_upper = this._monthly_max; //월세 최대값
      this._monthly_lower = 0;
      this._isCharter = true;
      this._isOneRoomDuplex = true;
      this._isOneRoomOpen = true;
      this._isThreeRoom = true;
      this._isTwoRoom = true;
      this._isOneRoomSeperation = true;
      this._filter = ["1", "2", "3", "4", "5", "6"];
  }

  get filter(): Array<string> {
    this._filter = [];
    if(this._isCharter)           this._filter.push("1");
    if(this._isOneRoomOpen)       this._filter.push("2");
    if(this._isOneRoomDuplex)     this._filter.push("3");
    if(this._isOneRoomSeperation) this._filter.push("4");
    if(this._isTwoRoom)           this._filter.push("5");
    if(this._isThreeRoom)         this._filter.push("6");

    return this._filter;
  }

  set filter(value: Array<string>) {
    let filter_length = value.length,
      i = filter_length-1;

    this._isCharter = false;
    this._isOneRoomOpen = false;
    this._isOneRoomDuplex = false;
    this._isOneRoomSeperation = false;
    this._isTwoRoom = false;
    this._isThreeRoom = false;

    for(; i>=0; i--) {
      switch (parseInt(value[i])) {
        case 1: this._isCharter = true; break;
        case 2: this._isOneRoomOpen = true; break;
        case 3: this._isOneRoomDuplex = true; break;
        case 4: this._isOneRoomSeperation = true; break;
        case 5: this._isTwoRoom = true; break;
        case 6: this._isThreeRoom = true; break;
        default: break;
      }
    }
    this._filter = value;
  }

  get deposit_lower(): number {
    return this._deposit_lower;
  }

  set deposit_lower(value: number) {
    this._deposit_lower = value;
  }

  get deposit_upper(): number {
    return this._deposit_upper;
  }

  set deposit_upper(value: number) {
    this._deposit_upper = value;
  }

  get monthly_lower(): number {
    return this._monthly_lower;
  }

  set monthly_lower(value: number) {
    this._monthly_lower = value;
  }

  get monthly_upper(): number {
    return this._monthly_upper;
  }

  set monthly_upper(value: number) {
    this._monthly_upper = value;
  }

  get isCharter(): boolean {
    return this._isCharter;
  }

  set isCharter(value: boolean) {
    console.log("isCharter set");
    this._isCharter = value;
  }

  get isOneRoomOpen(): boolean {
    return this._isOneRoomOpen;
  }

  set isOneRoomOpen(value: boolean) {
    this._isOneRoomOpen = value;
  }

  get isOneRoomDuplex(): boolean {
    return this._isOneRoomDuplex;
  }

  set isOneRoomDuplex(value: boolean) {
    this._isOneRoomDuplex = value;
  }

  get isOneRoomSeperation(): boolean {
    return this._isOneRoomSeperation;
  }

  set isOneRoomSeperation(value: boolean) {
    this._isOneRoomSeperation = value;
  }

  get isTwoRoom(): boolean {
    return this._isTwoRoom;
  }

  set isTwoRoom(value: boolean) {
    this._isTwoRoom = value;
  }

  get isThreeRoom(): boolean {
    return this._isThreeRoom;
  }

  set isThreeRoom(value: boolean) {
    this._isThreeRoom = value;
  }

  get deposit_max(): number {
    return this._deposit_max;
  }

  set deposit_max(value: number) {
    this._deposit_max = value;
  }

  get monthly_max(): number {
    return this._monthly_max;
  }

  set monthly_max(value: number) {
    this._monthly_max = value;
  }
}
