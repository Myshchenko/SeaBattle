export class ship {
    Lenght: number | null = null;
    Direction: string | null = null;

    public setPoint(lenght: number, direction: string){
        this.Lenght = lenght;
        this.Direction = direction;
    }
}
