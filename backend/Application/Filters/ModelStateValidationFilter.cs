using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Shared.Extensions;

namespace Application.Filters;

public class ModelStateValidationFilter : ActionFilterAttribute
{
    public override void OnActionExecuting(ActionExecutingContext context)
    {
        if (context.ModelState.IsValid) return;
        var errors = context.ModelState
            .Where(m => m.Value.Errors.Count > 0)
            .ToDictionary(
                kvp => kvp.Key.ToCamelCase(),
                kvp => kvp.Value.Errors.Select(e => e.ErrorMessage).ToArray()
            );

        context.Result = new BadRequestObjectResult(errors);
    }
}