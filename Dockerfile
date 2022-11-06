FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build-env
WORKDIR /app

# Copy csproj and restore as distinct layers
COPY ./FinBoard.sln .
COPY ./API/API.csproj ./src/API/
COPY ./FinBoard.Domain/FinBoard.Domain.csproj ./src/FinBoard.Domain/
COPY ./FinBoard.Services/FinBoard.Services.csproj ./src/FinBoard.Services/
COPY ./FinBoard.Utils/FinBoard.Utils.csproj ./src/FinBoard.Utils/
RUN dotnet restore

# Copy everything else and build
COPY . .
RUN dotnet publish --no-restore -c Release -o out ./src/API

# Build runtime image
FROM mcr.microsoft.com/dotnet/aspnet:5.0
WORKDIR /app
COPY --from=build-env /app/out .
ENTRYPOINT ["./API"]