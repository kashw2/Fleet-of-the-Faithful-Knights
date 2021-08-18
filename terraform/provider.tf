terraform {
  required_providers {
    azurerm = {
      source = "hashicorp/azurerm"
      version = "~> 2.46.0"
    }
  }
}

provider "azurerm" {
  features {}
  subscription_id = "e608fd59-f3db-4b75-9dfb-ba60889b45f3"
}