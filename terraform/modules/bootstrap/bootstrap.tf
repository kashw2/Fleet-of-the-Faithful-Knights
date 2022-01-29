module "azuread" {
  source = "./azuread"
}

module "azurerm" {
  source               = "./azurerm"
  service_principal_id = module.azuread.service_principal_id
}