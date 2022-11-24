module "bootstrap" {
  source = "./modules/bootstrap"
}

#module "guest_user" {
#  source = "./modules/guestUser"
#}

#module "role_based_access_control" {
#  source               = "./modules/roleBasedAccessControl"
#  bship_id             = module.guest_user.bship_id
#  grandmaster_flash_id = module.guest_user.grandmaster_flash_id
#  spindizzy_id         = module.guest_user.spindizzy_id
#  depends_on           = [module.guest_user]
#}

module "resource_group" {
  source     = "./modules/resourceGroup"
  depends_on = [module.bootstrap]
}

module "app_service_plan" {
  source              = "./modules/appServicePlan"
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
  basic_app_service_plan_id      = module.app_service_plan.basic_id
  free_app_service_plan_id       = module.app_service_plan.free_id
  password                       = var.GITHUB_TOKEN
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
  resource_group_name            = module.resource_group.name
  api_instrumentation_key        = module.application_insights.api_key
  onboarding_instrumentation_key = module.application_insights.onboarding_key
  panel_instrumentation_key      = module.application_insights.panel_key
  depends_on                     = [module.resource_group, module.application_insights]
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