export class field {
  Creator: string | null = null;
  Height: number | null = null;
  Widht: number | null = null;

  public constructor(height: number, widht: number, login : string){
      this.Height = height;
      this.Widht = widht;
      this.Creator = login;
  }
}
