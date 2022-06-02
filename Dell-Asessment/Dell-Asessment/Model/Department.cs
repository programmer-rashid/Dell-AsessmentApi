using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace Dell_Asessment.Model
{
    public class Department
    {
        [Key]
        public int DepartmentId { get; set; }
        [Column(TypeName ="Varchar(50)")]
        public string DepartmentName { get; set; }
    }
}
