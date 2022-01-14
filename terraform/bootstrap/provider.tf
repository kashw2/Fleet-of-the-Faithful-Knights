terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 2.92.0"
    }
    azuread = {
      source  = "hashicorp/azuread"
      version = "~> 1.6.0"
    }
    random = {
      source  = "hashicorp/random"
      version = "~> 3.1.0"
    }
  }
}

provider "azurerm" {
  features {}
  subscription_id = "e608fd59-f3db-4b75-9dfb-ba60889b45f3"
}

provider "azuread" {
}

provider "random" {}