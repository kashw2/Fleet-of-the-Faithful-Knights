module "resource_group" {
  source = "./modules/resourceGroup"
}

module "container_registry" {
  source                  = "./modules/containerRegistry"
  resource_group_name     = module.resource_group.name
  resource_group_location = module.resource_group.location
  depends_on              = [module.resource_group]
}

module "app_service_plan" {
  source                  = "./modules/appServicePlan"
  resource_group_location = module.resource_group.location
  resource_group_name     = module.resource_group.name
  depends_on              = [module.resource_group]
}

module "app_service" {
  source                    = "./modules/appService"
  app_service_plan_id       = module.app_service_plan.id
  resource_group_name       = module.resource_group.name
  resource_group_location   = module.resource_group.location
  login_server              = module.container_registry.login_server
  username                  = module.container_registry.username
  password                  = module.container_registry.password
  FFK_DATABASE_NAME         = var.FFK_DATABASE_NAME
  FFK_DATABASE_SERVER       = var.FFK_DATABASE_SERVER
  FFK_DATABASE_PORT         = var.FFK_DATABASE_PORT
  FFK_DATABASE_USERNAME     = var.FFK_DATABASE_USERNAME
  FFK_DATABASE_PASSWORD     = var.FFK_DATABASE_PASSWORD
  FFK_DISCORD_REDIRECT      = var.FFK_DISCORD_REDIRECT
  FFK_DISCORD_BOT_TOKEN     = var.FFK_DISCORD_BOT_TOKEN
  FFK_DISCORD_CLIENT_SECRET = var.FFK_DISCORD_CLIENT_SECRET
  FFK_API_SERVER            = var.FFK_API_SERVER
  depends_on                = [module.resource_group, module.app_service_plan, module.container_registry]
}

module "domain_name_system" {
  source = "./modules/domainNameSystem"
  resource_group_name = module.resource_group.name
  api_name = module.app_service.api_name
  onboarding_name = module.app_service.onboarding_name
  panel_name = module.app_service.panel_name
  depends_on = [module.resource_group, module.app_service]
}