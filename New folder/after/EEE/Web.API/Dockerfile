# ======================
# Runtime
# ======================
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 8080

# ======================
# Build
# ======================
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

COPY ["Web.API/Web.API.csproj", "Web.API/"]
RUN dotnet restore "Web.API/Web.API.csproj"

COPY . .
WORKDIR "/src/Web.API"

RUN dotnet publish "Web.API.csproj" -c Release -o /app/publish

# ======================
# Final
# ======================
FROM base AS final
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "Web.API.dll"]
