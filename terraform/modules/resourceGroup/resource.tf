resource "azurerm_resource_group" "app_service_rg" {
  location = "centralus"
  name = "app-service-rg"
}