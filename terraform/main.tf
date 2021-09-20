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

module "application_insights" {
  source                  = "./modules/applicationInsights"
  resource_group_name     = module.resource_group.name
  resource_group_location = module.resource_group.location
  depends_on              = [module.resource_group]
}

module "app_service" {
  source                         = "./modules/appService"
  app_service_plan_id            = module.app_service_plan.id
  resource_group_name            = module.resource_group.name
  resource_group_location        = module.resource_group.location
  login_server                   = module.container_registry.login_server
  username                       = module.container_registry.username
  password                       = module.container_registry.password
  panel_instrumentation_key      = module.application_insights.panel_key
  api_instrumentation_key        = module.application_insights.api_key
  onboarding_instrumentation_key = module.application_insights.onboarding_key
  FFK_DATABASE_NAME              = var.FFK_DATABASE_NAME
  FFK_DATABASE_SERVER            = var.FFK_DATABASE_SERVER
  FFK_DATABASE_PORT              = var.FFK_DATABASE_PORT
  FFK_DATABASE_USERNAME          = var.FFK_DATABASE_USERNAME
  FFK_DATABASE_PASSWORD          = var.FFK_DATABASE_PASSWORD
  FFK_DISCORD_REDIRECT           = var.FFK_DISCORD_REDIRECT
  FFK_DISCORD_BOT_TOKEN          = var.FFK_DISCORD_BOT_TOKEN
  FFK_DISCORD_CLIENT_SECRET      = var.FFK_DISCORD_CLIENT_SECRET
  FFK_API_SERVER                 = var.FFK_API_SERVER
  depends_on                     = [module.resource_group, module.app_service_plan, module.container_registry, module.application_insights]
}

module "api_management" {
    source = "./modules/apiManagement"
    resource_group_name = module.resource_group.name
    resource_group_location = module.resource_group.location
    depends_on = [module.resource_group, module.app_service_plan, module.app_service]
}

module "container_registry_webhook" {
  source = "./modules/containerRegistryWebhook"
  registry_name = module.container_registry.name
  resource_group_location = module.resource_group.location
  resource_group_name = module.resource_group.name
  depends_on = [module.resource_group, module.app_service, module.app_service_plan, module.container_registry]
}

module "dns" {
  source              = "./modules/dns"
  resource_group_name = module.resource_group.name
  api_name            = module.app_service.api_name
  onboarding_name     = module.app_service.onboarding_name
  panel_name          = module.app_service.panel_name
  depends_on          = [module.resource_group, module.app_service]
}

module "ssl" {
  source                = "./modules/ssl"
  api_binding_id        = module.dns.api_id
  onboarding_binding_id = module.dns.onboarding_id
  panel_binding_id      = module.dns.panel_id
  depends_on            = [module.app_service, module.dns]
}