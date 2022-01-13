namespace Domain
{
    public class GamePlayers
    {
        public string Id { get; set; }

        public string AppUserId { get; set; }

        public AppUser AppUser { get; set; }

        public string GameId { get; set; }

        public Game Game { get; set; }

        public bool IsWinner { get; set; }

        public int Moves { get; set; }

        public string Status { get; set; }
    }
}
