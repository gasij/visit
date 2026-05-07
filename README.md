
winget install --id Git.Git -e
winget install --id Docker.DockerDesktop -e
winget install --id OpenJS.NodeJS -e
winget install --id Microsoft.DotNet.SDK.8 -e
winget install --id PostgreSQL.PostgreSQL -e
winget install --id PostgreSQL.pgAdmin -e
psql -U postgres
"C:\Program Files\PostgreSQL\16\bin\psql.exe" -U postgres
CREATE USER myuser WITH PASSWORD 'mypassword';
CREATE DATABASE mydb OWNER myuser;




brew update

# Основные инструменты
brew install git
brew install node
brew install postgresql

# GUI и дополнительные вещи
brew install --cask docker
brew install --cask dotnet-sdk
brew install --cask pgadmin4



CREATE USER myuser WITH PASSWORD 'mypassword';
CREATE DATABASE mydb OWNER myuser;


echo 'export PATH="/opt/homebrew/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc