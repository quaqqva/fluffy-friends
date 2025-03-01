using System.Net;
using Application.Dtos;
using Infrastructure.Database.Exceptions;

namespace Application.Middlewares;

public class ExceptionMiddleware(RequestDelegate next)
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
            var errorMessage = exception.Message;

            switch (exception)
            {
                case DbNotFoundException:
                    status = HttpStatusCode.NotFound;
                    break;
                case ArgumentException:
                    status = HttpStatusCode.BadRequest;
                    break;
                default:
                    errorMessage = "Internal server error";
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