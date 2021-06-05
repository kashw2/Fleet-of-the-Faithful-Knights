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

module "domain_mapping" {
  source = "./domain-mapping"
  project_name = var.project
  api_name = module.cloud_run.api_name
  panel_name = module.cloud_run.panel_name
  depends_on = [module.cloud_run]
}
