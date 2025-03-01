using Application.Extensions;
using Application.Filters;
using Application.Middlewares;
using Infrastructure.Database.Extensions;

var builder = WebApplication.CreateBuilder(args);

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var dbConnectionStringTemplate = Environment.GetEnvironmentVariable("ConnectionStrings__DefaultConnection");

if (dbConnectionStringTemplate == null) throw new Exception("Connection string not specified");

var dbPasswordFilePath = Environment.GetEnvironmentVariable("POSTGRES_PASSWORD_FILE");

if (dbPasswordFilePath == null) throw new Exception("POSTGRES_PASSWORD_FILE not specified");

var password = File.ReadAllText(dbPasswordFilePath);

var dbConnectionString = dbConnectionStringTemplate + password;

builder.Services.SetupDatabaseConnection(dbConnectionString);
builder.Services.AddRepositories();
builder.Services.SetupDtoAdapters();

builder.Services.AddControllers(options => { options.Filters.Add<ModelStateValidationFilter>(); });
builder.Services.AddEndpointsApiExplorer();

if (builder.Environment.IsProduction())
    builder.Services.AddCors(options =>
    {
        options.AddPolicy(
            "_myAllowedHosts",
            builder =>
            {
                builder.AllowAnyMethod();
                builder.AllowAnyHeader();
                builder.WithOrigins("http://localhost", "http://frontend");
            }
        );
    });

var app = builder.Build();
app.UseMiddleware<ExceptionMiddleware>();


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.MapControllers();
app.MapDefaultControllerRoute();
app.Run();