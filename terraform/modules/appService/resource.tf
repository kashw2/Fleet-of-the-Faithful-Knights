resource "azurerm_app_service" "panel" {
  app_service_plan_id = var.app_service_plan_id
  location            = var.resource_group_location
  name                = "ffk-panel"
  resource_group_name = var.resource_group_name
  https_only          = true


  app_settings = {
    WEBSITES_ENABLE_APP_SERVICE_STORAGE = false
    DOCKER_ENABLE_CI                    = true
    DOCKER_REGISTRY_SERVER_URL          = var.login_server
    DOCKER_REGISTRY_SERVER_USERNAME     = var.username
    DOCKER_REGISTRY_SERVER_PASSWORD     = var.password
  }

  site_config {
    linux_fx_version  = "DOCKER|${var.login_server}/panel.faithfulknights.com:latest"
    health_check_path = "/"
    always_on         = true
  }

}

resource "azurerm_app_service" "api" {
  app_service_plan_id = var.app_service_plan_id
  location            = var.resource_group_location
  name                = "ffk-api"
  resource_group_name = var.resource_group_name
  https_only          = true


  app_settings = {
    WEBSITES_ENABLE_APP_SERVICE_STORAGE = false
    DOCKER_ENABLE_CI                    = true
    DOCKER_REGISTRY_SERVER_URL          = var.login_server
    DOCKER_REGISTRY_SERVER_USERNAME     = var.username
    DOCKER_REGISTRY_SERVER_PASSWORD     = var.password
    FFK_DATABASE_SERVER                 = var.FFK_DATABASE_SERVER
    FFK_DATABASE_PORT                   = var.FFK_DATABASE_PORT
    FFK_DATABASE_USERNAME               = var.FFK_DATABASE_USERNAME
    FFK_DATABASE_PASSWORD               = var.FFK_DATABASE_PASSWORD
    FFK_DATABASE_NAME                   = var.FFK_DATABASE_NAME
    FFK_DISCORD_CLIENT_SECRET           = var.FFK_DISCORD_CLIENT_SECRET
    FFK_DISCORD_REDIRECT                = var.FFK_DISCORD_REDIRECT
    FFK_DISCORD_BOT_TOKEN               = var.FFK_DISCORD_BOT_TOKEN
  }

  site_config {
    linux_fx_version  = "DOCKER|${var.login_server}/api.faithfulknights.com:latest"
    health_check_path = "/"
    always_on         = true
  }

}

resource "azurerm_app_service" "onboarding" {
  app_service_plan_id = var.app_service_plan_id
  location            = var.resource_group_location
  name                = "ffk-onboarding"
  resource_group_name = var.resource_group_name
  https_only          = true


  app_settings = {
    WEBSITES_ENABLE_APP_SERVICE_STORAGE = false
    DOCKER_ENABLE_CI                    = true
    DOCKER_REGISTRY_SERVER_URL          = var.login_server
    DOCKER_REGISTRY_SERVER_USERNAME     = var.username
    DOCKER_REGISTRY_SERVER_PASSWORD     = var.password
    FFK_API_SERVER                      = azurerm_app_service.api.default_site_hostname
    FFK_DISCORD_CLIENT_SECRET           = var.FFK_DISCORD_CLIENT_SECRET
    FFK_DISCORD_REDIRECT                = var.FFK_DISCORD_REDIRECT
    FFK_DISCORD_BOT_TOKEN               = var.FFK_DISCORD_BOT_TOKEN
  }

  site_config {
    linux_fx_version  = "DOCKER|${var.login_server}/onboarding.faithfulknights.com:latest"
    health_check_path = "/"
    always_on         = true
  }

}