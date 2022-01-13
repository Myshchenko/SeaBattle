namespace API.UserActionsDtos
{
    public class UserAfterGame
    {
        public string Login { get; set; }

        public int CountOfMoves { get; set; }

        public bool IsWinner { get; set; }
    }
}
