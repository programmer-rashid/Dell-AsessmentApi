using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace Dell_Asessment.Model
{
    public class Document
    {
        [Key]
        public int DocumentId { get; set; }

        [Column(TypeName = "Varchar(100)")]
        public string DocumentName { get; set; }

        [Column(TypeName = "Varchar(10)")]
        public string Department { get; set; }

        [Column(TypeName = "DateTime")]
        public DateTime InsertedOn { get; set; }

        [Column(TypeName = "Varchar(100)")]
        public string DocFileName { get; set; }
    }
}
