resource "azurerm_storage_account" "tf_storage_account" {
  name                      = "ffktfstorageaccount"
  resource_group_name       = var.resource_group_name
  location                  = var.resource_group_location
  account_tier              = "Standard"
  account_kind              = "StorageV2"
  account_replication_type  = "LRS"
  enable_https_traffic_only = true
  tags = {
    environment = "staging"
  }
}

resource "azurerm_storage_container" "container" {
  name                  = "terraform-state-container"
  storage_account_name  = azurerm_storage_account.tf_storage_account.name
  container_access_type = "private"
}
