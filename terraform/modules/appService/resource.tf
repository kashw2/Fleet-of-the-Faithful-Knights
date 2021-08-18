resource "azurerm_app_service" "panel" {
  app_service_plan_id = var.app_service_plan_id
  location = var.resource_group_location
  name = "voting-panel"
  resource_group_name = var.resource_group_name
}