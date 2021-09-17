resource "azurerm_container_registry_webhook" "panel" {
  actions = ["push"]
  location = var.resource_group_location
  name = "panelwebhook"
  registry_name = var.registry_name
  resource_group_name = var.resource_group_name
  status = "enabled"
  service_uri = "https://$ffk-panel:dQGtR6fRNoeogGmK2YF6mTFFBjFejn5ixaphbLdnEyvMue04lzvh1o2o6HX2@ffk-panel.scm.azurewebsites.net/docker/hook"
  scope = "panel.faithfulknights.com:latest"
}

resource "azurerm_container_registry_webhook" "api" {
  actions = ["push"]
  location = var.resource_group_location
  name = "apiwebhook"
  registry_name = var.registry_name
  resource_group_name = var.resource_group_name
  status = "enabled"
  service_uri = "https://$ffk-api:BzbNPH8REfTtQBXlQ7g0SvR9bCBtcx8GTtM22vupbSLkNFQ18xGaYmzSaXq1@ffk-api.scm.azurewebsites.net/docker/hook"
  scope = "api.faithfulknights.com:latest"
}

//resource "azurerm_container_registry_webhook" "onboarding" {
//  actions = ["push"]
//  location = var.resource_group_location
//  name = "onboardingwebhook"
//  registry_name = var.registry_name
//  resource_group_name = var.resource_group_name
//  status = "enabled"
//  service_uri = "https://$ffk-onboarding:ZfD0s0SGuGCL0b9iYaKvXd8zpEAQTMiGhnFxsBgkp88QslQDrFjSvh7Jaz83@ffk-onboarding.scm.azurewebsites.net/docker/hook"
//  scope = "onboarding.faithfulknights.com:latest"
//}