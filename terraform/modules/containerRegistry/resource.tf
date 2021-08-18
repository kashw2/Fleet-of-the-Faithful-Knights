resource "azurerm_container_registry" "registry" {
  location = var.resource_group_location
  name = "ffkcontainerregistry"
  resource_group_name = var.resource_group_name
}