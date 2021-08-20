module "application" {
  source = "./modules/application"
}

module "resource_group" {
  source = "./modules/resourceGroup"
}

module "storage_account" {
  source = "./modules/storageAccount"
  resource_group_name = module.resource_group.name
  resource_group_location = module.resource_group.location
  depends_on = [module.resource_group]
}