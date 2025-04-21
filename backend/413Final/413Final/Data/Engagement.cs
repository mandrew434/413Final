using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace _413Final.Data
{
    // This class represents the Engagement entity in the database.
    public class Engagement
    {
        [Key]
        public int EngagementNumber { get; set; }

        public string? StartDate { get; set; }
        public string? EndDate { get; set; }
        public string? StartTime { get; set; }
        public string? StopTime { get; set; }
        public float? ContractPrice { get; set; }

        public int CustomerID { get; set; }
        public int AgentID { get; set; }
        // This property is a foreign key that references the EntertainerID in the Entertainer table.
        [ForeignKey(nameof(Entertainer))]
        public int EntertainerID { get; set; }
        public Entertainer? Entertainer { get; set; }
    }
}
