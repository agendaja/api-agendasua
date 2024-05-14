declare namespace MailTypes {
  namespace NewSquadMember {
    type Data = {
      squadName: string;
      url: string;
    };
  }

  namespace NewMeeting {
    type Data = {
      squadName: string;
      date: Date;
      url: string;
    };
  }

}