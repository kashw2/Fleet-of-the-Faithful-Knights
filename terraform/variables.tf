variable "FFK_DATABASE_SERVER" {
  type = string
}

variable "FFK_DATABASE_NAME" {
  type = string
}

variable "FFK_DATABASE_USERNAME" {
  type = string
}

variable "FFK_DATABASE_PASSWORD" {
  type = string
}

variable "FFK_DATABASE_PORT" {
  type = string
}

variable "FFK_DISCORD_CLIENT_SECRET" {
  type = string
}

variable "FFK_DISCORD_REDIRECT" {
  type = string
  default = "http://localhost:4200"
}

variable "FFK_DISCORD_BOT_TOKEN" {
  type = string
}

variable "FFK_API_SERVER" {
  type = string
  default = "http://localhost:3000"
}

variable "GITHUB_TOKEN" {
  type = string
}
