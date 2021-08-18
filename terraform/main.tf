module "resource_group" {
  source = "./modules/resourceGroup"
}

module "container_registry" {
  source = "./modules/containerRegistry"
  resource_group_name = module.resource_group.name
  resource_group_location = module.resource_group.location
}

module "app_service_plan" {
  source = "./modules/appServicePlan"
  resource_group_location = module.resource_group.location
  resource_group_name = module.resource_group.name
  depends_on = [module.resource_group]
}

module "app_service" {
  source = "./modules/appService"
  app_service_plan_id = module.app_service_plan.id
  resource_group_name = module.resource_group.name
  resource_group_location = module.resource_group.location
  depends_on = [module.resource_group, module.app_service_plan]
}