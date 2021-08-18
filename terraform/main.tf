module "resource_group" {
  source = "./modules/resourceGroup"
}

module "app_service_plan" {
  source = "./modules/appServicePlan"
  resource_group_location = module.resource_group.location
  resource_group_name = module.resource_group.name
  depends_on = [module.resource_group]
}