variable "region" {
  type = string
  default = "us-central1"
}

variable "project" {
  type = string
  default = "the-sandbox-311907"
}

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
  type = number
}

variable "GCP_SERVICE_ACCOUNT_KEY" {
  type = string
}
