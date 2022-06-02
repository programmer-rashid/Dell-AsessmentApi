using Dell_Asessment.Data;
using Dell_Asessment.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Dell_Asessment.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentController : Controller
    {
        private readonly DocumentDbContext _departmentDbContext;
        private readonly IConfiguration _configuration;
        public DepartmentController(DocumentDbContext departmentDbContext, IConfiguration configuration)
        {
            this._departmentDbContext = departmentDbContext;
            this._configuration = configuration;
        }
        // GET: api/<DepartmentController>
        [HttpGet]
        public async Task<JsonResult> Get()
        {
            var department = await _departmentDbContext.Departments.ToListAsync();
            //return Json(Newtonsoft.Json.JsonConvert.DeserializeObject<dynamic>(PromotedDocuments));
            return Json((department));
        }


        [HttpPost]
        public async Task<JsonResult> Post([FromBody] Department department)
        {

            await _departmentDbContext.Departments.AddAsync(department);
            await _departmentDbContext.SaveChangesAsync();
            return Json(("Added Successfully"));
        }

        [HttpPut]
        public async Task<JsonResult> Put([FromBody] Department department)
        {
            var existingDepartment = await _departmentDbContext.Departments.FirstOrDefaultAsync(x => x.DepartmentId == department.DepartmentId);
            if (existingDepartment != null)
            {
                existingDepartment.DepartmentName = department.DepartmentName;
                await _departmentDbContext.SaveChangesAsync();
                return Json("Updated Successfully");
            }
            return Json("Document Not Found");
        }
        [HttpDelete]
        [HttpDelete("{id}")]
        public async Task<JsonResult> Delete(int id)
        {
            var existingDepartment = await _departmentDbContext.Departments.FirstOrDefaultAsync(x => x.DepartmentId == id);
            if (existingDepartment != null)
            {
                _departmentDbContext.Remove(existingDepartment);
                await _departmentDbContext.SaveChangesAsync();
                return Json("Deleted Successfully");
            }
            return Json("Document Not Found");
        }
    }
}
