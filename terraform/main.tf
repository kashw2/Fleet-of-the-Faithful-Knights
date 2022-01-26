module "bootstrap" {
  source = "./modules/bootstrap"
}

module "guest_user" {
  source = "./modules/guestUser"
}

module "resource_group" {
  source = "./modules/resourceGroup"
  depends_on = [module.bootstrap]
}

module "app_service_plan" {
  source              = "./modules/appServicePlan"
  location            = module.resource_group.location
  resource_group_name = module.resource_group.name
  depends_on          = [module.resource_group]
}

module "container_registry" {
  source              = "./modules/containerRegistry"
  location            = module.resource_group.location
  resource_group_name = module.resource_group.name
  depends_on          = [module.resource_group]
}

module "application_insights" {
  source              = "./modules/applicationInsights"
  location            = module.resource_group.location
  resource_group_name = module.resource_group.name
  depends_on          = [module.resource_group]
}

module "app_service" {
  source                         = "./modules/appService"
  app_service_plan_id            = module.app_service_plan.id
  FFK_API_SERVER                 = var.FFK_API_SERVER
  FFK_DATABASE_NAME              = var.FFK_DATABASE_NAME
  FFK_DATABASE_PASSWORD          = var.FFK_DATABASE_PASSWORD
  FFK_DATABASE_PORT              = var.FFK_DATABASE_PORT
  FFK_DATABASE_SERVER            = var.FFK_DATABASE_SERVER
  FFK_DATABASE_USERNAME          = var.FFK_DATABASE_USERNAME
  FFK_DISCORD_BOT_TOKEN          = var.FFK_DISCORD_BOT_TOKEN
  FFK_DISCORD_CLIENT_SECRET      = var.FFK_DISCORD_CLIENT_SECRET
  FFK_DISCORD_REDIRECT           = var.FFK_DISCORD_REDIRECT
  location                       = module.resource_group.location
  server                         = module.container_registry.server
  password                       = module.container_registry.password
  resource_group_name            = module.resource_group.name
  username                       = module.container_registry.username
  api_instrumentation_key        = module.application_insights.api_key
  onboarding_instrumentation_key = module.application_insights.onboarding_key
  panel_instrumentation_key      = module.application_insights.panel_key
  depends_on                     = [module.resource_group, module.container_registry, module.application_insights]
}

module "container_registry_webhook" {
  source              = "./modules/containerRegistryWebhook"
  registry_name       = module.container_registry.name
  location            = module.resource_group.location
  resource_group_name = module.resource_group.name
  api_name            = module.app_service.api_name
  api_password        = module.app_service.api_password
  api_username        = module.app_service.api_username
  onboarding_name     = module.app_service.onboarding_name
  onboarding_password = module.app_service.onboarding_password
  onboarding_username = module.app_service.onboarding_username
  panel_name          = module.app_service.panel_name
  panel_password      = module.app_service.panel_password
  panel_username      = module.app_service.panel_username
  depends_on          = [module.resource_group, module.container_registry, module.app_service]
}

module "dns" {
  source              = "./modules/dns"
  api_name            = module.app_service.api_name
  onboarding_name     = module.app_service.onboarding_name
  panel_name          = module.app_service.panel_name
  resource_group_name = module.resource_group.name
  depends_on          = [module.resource_group, module.app_service]
}

module "ssl" {
  source                = "./modules/ssl"
  api_binding_id        = module.dns.api_id
  onboarding_binding_id = module.dns.onboarding_id
  panel_binding_id      = module.dns.panel_id
  depends_on            = [module.dns]
}