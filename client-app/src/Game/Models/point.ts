export class point {
    x: number = 0;
    y: number = 0;
    creator: string | null = null;
    attackUser: string | null = null;
    result: string | null = null;

    public setPoint(x: number, y: number, creator: string, attackUser: string | null){
        this.x = x;
        this.y = y;
        this.creator = creator;
        this.attackUser = attackUser;
    }
}
