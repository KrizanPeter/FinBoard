FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build-env
WORKDIR /app

# Copy csproj and restore as distinct layers
COPY ./FinBoard.sln .
COPY ./API/API.csproj ./API/
COPY ./FinBoard.Domain/FinBoard.Domain.csproj ./FinBoard.Domain/
COPY ./FinBoard.Services/FinBoard.Services.csproj ./FinBoard.Services/
COPY ./FinBoard.Utils/FinBoard.Utils.csproj ./FinBoard.Utils/
RUN dotnet restore

# Copy everything else and build
COPY . .
RUN dotnet publish --no-restore -c Release -o out ./API

# Build runtime image
FROM mcr.microsoft.com/dotnet/aspnet:6.0
WORKDIR /app
COPY --from=build-env /app/out .
ENTRYPOINT ["./API"]