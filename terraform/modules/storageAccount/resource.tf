resource "azurerm_storage_account" "account" {
  account_replication_type = "GRS"
  account_tier             = "Standard"
  location                 = var.resource_group_location
  name                     = "ffkstorageaccount"
  resource_group_name      = var.resource_group_name
}