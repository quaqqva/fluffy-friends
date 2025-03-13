using Application.Extensions;
using Infrastructure.Cache.Extensions;
using Infrastructure.CloudStorage.Extensions;
using Infrastructure.Database.Extensions;
using Presentation.Filters;
using Presentation.Middlewares;

var builder = WebApplication.CreateBuilder(args);

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.SetupCloudStorageConnection();

builder.Services.SetupDatabaseConnection();
builder.Services.AddRepositories();
builder.Services.SetupDbServices();

builder.Services.SetupDistributedCache();
builder.Services.SetupCacheServices();

builder.Services.SetupDtoAdapters();
builder.Services.SetupUtilityServices();

builder.Services.AddControllers(options => { options.Filters.Add<ModelStateValidationFilter>(); }).AddJsonOptions(
    options => { options.JsonSerializerOptions.AllowTrailingCommas = true; });
builder.Services.AddEndpointsApiExplorer();

var app = builder.Build();
app.UseMiddleware<ExceptionMiddleware>();


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(x =>
    x.WithOrigins("http://localhost:4200", "http://localhost", "http://46.17.101.138", "http:://46.17.101.138:4200")
        .AllowAnyHeader().AllowAnyMethod());
app.UseHttpsRedirection();
app.MapControllers();
app.MapDefaultControllerRoute();
app.Run();