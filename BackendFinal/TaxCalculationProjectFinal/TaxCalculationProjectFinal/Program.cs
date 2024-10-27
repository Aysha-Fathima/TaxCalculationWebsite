var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(policy =>
{


    policy.AddDefaultPolicy(bydefault =>
    {
        bydefault.AllowAnyMethod().AllowAnyHeader().AllowAnyOrigin();
    });


    policy.AddPolicy("adminPolicy", adminPolicy =>
    {
        string[] methods = new string[2];
        methods[0] = "GET";
        methods[1] = "POST";

        string[] sitesallowed = new string[1];
        sitesallowed[0] = "http://localhost:4200/";

        string[] allowedFormats = new string[1];
        allowedFormats[0] = "application/json";

        adminPolicy.WithOrigins(sitesallowed);
        adminPolicy.WithHeaders(allowedFormats);
        adminPolicy.WithMethods(methods);

    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.UseCors();

app.MapControllers();

app.Run();
