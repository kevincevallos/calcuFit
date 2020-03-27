export class Persona {
    private _id: number;
  private _objectId: string;
  public get objectId(): string {
    return this._objectId;
  }
  public set objectId(value: string) {
    this._objectId = value;
  }
  public get id(): number {
    return this._id;
  }
  public set id(value: number) {
    this._id = value;
  }
    private _genero: string;
  public get genero(): string {
    return this._genero;
  }
  public set genero(value: string) {
    this._genero = value;
  }
    private _peso: number;
  public get peso(): number {
    return this._peso;
  }
  public set peso(value: number) {
    this._peso = value;
  }
    private _altura: number;
  public get altura(): number {
    return this._altura;
  }
  public set altura(value: number) {
    this._altura = value;
  }
    private _edad: number;
  public get edad(): number {
    return this._edad;
  }
  public set edad(value: number) {
    this._edad = value;
  }
    private _pesoIdeal: number;
  public get pesoIdeal(): number {
    return this._pesoIdeal;
  }
  public set pesoIdeal(value: number) {
    this._pesoIdeal = value;
  }
    private _proteinas: number;
  public get proteinas(): number {
    return this._proteinas;
  }
  public set proteinas(value: number) {
    this._proteinas = value;
  }
    private _carbohidratos: number;
  public get carbohidratos(): number {
    return this._carbohidratos;
  }
  public set carbohidratos(value: number) {
    this._carbohidratos = value;
  }
    private _grasas: number;
  public get grasas(): number {
    return this._grasas;
  }
  public set grasas(value: number) {
    this._grasas = value;
  }
    private _calorias: number;
  public get calorias(): number {
    return this._calorias;
  }
  public set calorias(value: number) {
    this._calorias = value;
  }
    private _actividadDiaria: number;
  public get actividadDiaria(): number {
    return this._actividadDiaria;
  }
  public set actividadDiaria(value: number) {
    this._actividadDiaria = value;
  }
  private _objetivo: number;
  public get objetivo(): number {
    return this._objetivo;
  }
  public set objetivo(value: number) {
    this._objetivo = value;
  } 
  private _modified: number;
  public get modified(): number {
    return this._objetivo;
  }
  public set modified(value: number) {
    this._modified = value;
  }
  
  }
  