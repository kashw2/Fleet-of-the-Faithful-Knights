resource "azurerm_app_service_plan" "app_service_asp" {
  location = var.resource_group_location
  name = "ffk-asp-free"
  resource_group_name = var.resource_group_name
  sku {
    size = "F1"
    tier = "Free"
  }
}