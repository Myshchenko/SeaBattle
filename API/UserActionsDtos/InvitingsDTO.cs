namespace API.UserActionsDtos
{
    public class InvitingsDTO
    {
        public UserDTO Sender { get; set; }

        public UserDTO Recipient { get; set; }

        public int? Number { get; set; }

        public bool IsAccepted { get; set; }
    }
}
