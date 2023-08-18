{ pkgs ? import <nixpkgs> {}}:

pkgs.mkShell {

    FFK_API_SERVER = "http://localhost:3000";
    FFK_DISCORD_CLIENT_SECRET = "REDACTED";
    FFK_DISCORD_BOT_TOKEN = "REDACTED";
    FFK_DISCORD_REDIRECT = "http://localhost:4200";
    FFK_DATABASE_USERNAME = "sa";
    FFK_DATABASE_PASSWORD = "password123";
    FFK_DATABASE_NAME = "Fleet_of_the_Faithful_Knights";
    FFK_DATABASE_SERVER = "localhost";
    FFK_DATABASE_PORT = 1433;

    packages = [
        pkgs.nodejs-18_x
        pkgs.act
        pkgs.nodePackages.lerna
        pkgs.nodePackages.rimraf
    ];
}