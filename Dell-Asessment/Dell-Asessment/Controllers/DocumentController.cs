using Dell_Asessment.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Dell_Asessment.Model;

namespace Dell_Asessment.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DocumentController : Controller
    {
       
        private readonly IWebHostEnvironment _env;
        private readonly DocumentDbContext _documentsDbContext;
        public DocumentController( IConfiguration configuration, IWebHostEnvironment env, DocumentDbContext documentsDbContext)
        {
            this._documentsDbContext = documentsDbContext;           
            this._env = env;
        }
        [HttpGet]
        public async Task<JsonResult> Get()
        {
            var PromotedDocuments = await _documentsDbContext.Documents.ToListAsync();
            //return Json(Newtonsoft.Json.JsonConvert.DeserializeObject<dynamic>(PromotedDocuments));
            return Json((PromotedDocuments));
        }



        [HttpPost]
        public async Task<JsonResult> Post([FromBody] Document document)
        {            

            await _documentsDbContext.Documents.AddAsync(document);
            await _documentsDbContext.SaveChangesAsync();
            return Json(("Added Successfully"));
        }

        [HttpPut]        
        public async Task<JsonResult> Put([FromBody] Document document)
        {
            var existingDocuments = await _documentsDbContext.Documents.FirstOrDefaultAsync(x => x.DocumentId == document.DocumentId);
            if (existingDocuments != null)
            {
                existingDocuments.DocumentName = document.DocumentName;
                await _documentsDbContext.SaveChangesAsync();
                return Json("Updated Successfully");
            }
            return Json("Document Not Found");
        }
        [HttpDelete]
        [HttpDelete("{id}")]
        public async Task<JsonResult> Delete(int id)
        {
            var existingDocuments = await _documentsDbContext.Documents.FirstOrDefaultAsync(x => x.DocumentId == id);
            if (existingDocuments != null)
            {
                _documentsDbContext.Remove(existingDocuments);
                await _documentsDbContext.SaveChangesAsync();
                return Json("Deleted Successfully");
            }
            return Json("Document Not Found");
        }
        [Route("SaveFile")]
        [HttpPost]
        public JsonResult SaveFile()
        {
            try
            {
                var httpRequest = Request.Form;
                var postedFile = httpRequest.Files[0];
                string filename = postedFile.FileName;
                var physicalPath = _env.ContentRootPath + "/DocFile/" + filename;

                using (var stream = new FileStream(physicalPath, FileMode.Create))
                {
                    postedFile.CopyTo(stream);
                }

                return new JsonResult(filename);
            }
            catch (Exception)
            {

                return new JsonResult("anonymous.pdf");
            }
        }
    }
}
