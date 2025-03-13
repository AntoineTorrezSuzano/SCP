namespace SCP.Models
{
    public class Rootobject
    {
        public string odatacontext { get; set; }
        public Value[] value { get; set; }
        public string odatanextLink { get; set; }
    }

    public class Value
    {
        public string odataetag { get; set; }
        public string id { get; set; }
        public string subject { get; set; }
        public string bodyPreview { get; set; }
        public Body body { get; set; }
        public Start start { get; set; }
        public End end { get; set; }
        public Location location { get; set; }
        public Attendee[] attendees { get; set; }
        public Organizer organizer { get; set; }
    }

    public class Body
    {
        public string contentType { get; set; }
        public string content { get; set; }
    }

    public class Start
    {
        public DateTime dateTime { get; set; }
        public string timeZone { get; set; }
    }

    public class End
    {
        public DateTime dateTime { get; set; }
        public string timeZone { get; set; }
    }

    public class Location
    {
        public string displayName { get; set; }
        public string locationType { get; set; }
        public string uniqueId { get; set; }
        public string uniqueIdType { get; set; }
    }

    public class Organizer
    {
        public Emailaddress emailAddress { get; set; }
    }

    public class Emailaddress
    {
        public string name { get; set; }
        public string address { get; set; }
    }

    public class Attendee
    {
        public string type { get; set; }
        public Status status { get; set; }
        public Emailaddress1 emailAddress { get; set; }
    }

    public class Status
    {
        public string response { get; set; }
        public DateTime time { get; set; }
    }

    public class Emailaddress1
    {
        public string name { get; set; }
        public string address { get; set; }
    }

}
