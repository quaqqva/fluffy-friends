using System.ComponentModel.DataAnnotations;
using Application.Dtos;
using Application.Services.FileOperations;
using Microsoft.AspNetCore.Mvc;

namespace Presentation.Controllers;

[Route("api/file")]
public class FileController(
    FileService fileService) : ControllerBase
{
    [HttpPost]
    public async Task<ActionResult<FileResponseDto>> CreateFile(
        [Required] [FromForm] string module,
        [Required] [FromForm] IFormFile file)
    {
        return Ok(await fileService.CreateFile(file.FileName, file.ContentType, file.Length, module,
            file.OpenReadStream()));
    }
}