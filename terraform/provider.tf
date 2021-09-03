terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 2.75.0"
    }
  }
  backend "azurerm" {
    storage_account_name = "ffktfstorageaccount"
    resource_group_name  = "tf_resource_group"
    container_name       = "terraform-state-container"
    key                  = "terraform.tfstate"
  }
}

provider "azurerm" {
  features {}
  subscription_id = "e608fd59-f3db-4b75-9dfb-ba60889b45f3"
}