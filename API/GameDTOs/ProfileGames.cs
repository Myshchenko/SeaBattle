using System;

namespace API.GameDTOs
{
    public class ProfileGames
    { 
        public string OpponentName { get; set; }

        public int CurrentCustomerMoves { get; set; }

        public int OpponentMoves { get; set; }

        public string GameDate { get; set; }

        public string Result { get; set; }
    }
}
