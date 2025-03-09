using System.Net;
using Application.Dtos;
using Domain.Exceptions;

namespace Presentation.Middlewares;

public class ExceptionMiddleware(RequestDelegate next, IWebHostEnvironment environment)
{
    public async Task Invoke(HttpContext context)
    {
        try
        {
            await next.Invoke(context);
        }
        catch (Exception exception)
        {
            HttpStatusCode status;
            var errorMessage = environment.IsProduction() ? "Internal server error" : exception.Message;

            switch (exception)
            {
                case DbNotFoundException:
                    status = HttpStatusCode.NotFound;
                    break;
                default:
                    status = HttpStatusCode.InternalServerError;
                    break;
            }

            context.Response.StatusCode = (int)status;
            await context.Response.WriteAsJsonAsync(
                new ErrorResponseDto(errorMessage)
            );
        }
    }
}