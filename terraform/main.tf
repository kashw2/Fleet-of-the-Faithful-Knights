provider "google" {
  project = var.project
  region = var.region
}

module "cloud_run" {
  source = "./cloud-run"
  region = var.region
  project = var.project
  FFK_DATABASE_SERVER = var.FFK_DATABASE_SERVER
  FFK_DATABASE_PORT = var.FFK_DATABASE_PORT
  FFK_DATABASE_NAME = var.FFK_DATABASE_NAME
  FFK_DATABASE_USERNAME = var.FFK_DATABASE_USERNAME
  FFK_DATABASE_PASSWORD = var.FFK_DATABASE_PASSWORD
}
