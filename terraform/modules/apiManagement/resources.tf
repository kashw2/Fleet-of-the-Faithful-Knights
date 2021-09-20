resource "azurerm_api_management" "api_management" {
    name = "ffk-api-management"
    location = var.resource_group_location
    resource_group_name = var.resource_group_name
    publisher_name = "Keanu Ashwell"
    publisher_email = "supra4keanu@hotmail.com"
    sku_name = "Consumption_0"
}