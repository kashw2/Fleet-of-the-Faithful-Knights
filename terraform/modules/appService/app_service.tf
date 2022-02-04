resource "azurerm_app_service" "panel" {
  app_service_plan_id = var.basic_app_service_plan_id
  location            = var.location
  name                = "ffk-panel"
  resource_group_name = var.resource_group_name
  https_only          = true
  enabled             = true

  app_settings = {
    APPINSIGHTS_INSTRUMENTATIONKEY      = var.panel_instrumentation_key
    WEBSITES_ENABLE_APP_SERVICE_STORAGE = false
    DOCKER_ENABLE_CI                    = true
    DOCKER_REGISTRY_SERVER_URL          = var.server
    DOCKER_REGISTRY_SERVER_USERNAME     = var.username
    DOCKER_REGISTRY_SERVER_PASSWORD     = var.password
  }

  site_config {
    linux_fx_version = "DOCKER|${var.server}/panel.faithfulknights.com:latest"
    always_on        = false
  }

}

resource "azurerm_app_service" "api" {
  app_service_plan_id = var.free_app_service_plan_id
  location            = var.location
  name                = "ffk-api"
  resource_group_name = var.resource_group_name
  https_only          = true
  enabled             = true

  app_settings = {
    APPINSIGHTS_INSTRUMENTATIONKEY      = var.api_instrumentation_key
    WEBSITES_ENABLE_APP_SERVICE_STORAGE = false
    DOCKER_ENABLE_CI                    = true
    DOCKER_REGISTRY_SERVER_URL          = var.server
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
    linux_fx_version          = "DOCKER|${var.server}/api.faithfulknights.com:latest"
    always_on                 = false
    use_32_bit_worker_process = true
  }

}

resource "azurerm_app_service" "onboarding" {
  app_service_plan_id = var.free_app_service_plan_id
  location            = var.location
  name                = "ffk-onboarding"
  resource_group_name = var.resource_group_name
  https_only          = true
  enabled             = true

  app_settings = {
    APPINSIGHTS_INSTRUMENTATIONKEY      = var.onboarding_instrumentation_key
    WEBSITES_ENABLE_APP_SERVICE_STORAGE = false
    DOCKER_ENABLE_CI                    = true
    DOCKER_REGISTRY_SERVER_URL          = var.server
    DOCKER_REGISTRY_SERVER_USERNAME     = var.username
    DOCKER_REGISTRY_SERVER_PASSWORD     = var.password
    FFK_API_SERVER                      = var.FFK_API_SERVER
    FFK_DISCORD_CLIENT_SECRET           = var.FFK_DISCORD_CLIENT_SECRET
    FFK_DISCORD_REDIRECT                = var.FFK_DISCORD_REDIRECT
    FFK_DISCORD_BOT_TOKEN               = var.FFK_DISCORD_BOT_TOKEN
  }

  site_config {
    linux_fx_version          = "DOCKER|${var.server}/onboarding.faithfulknights.com:latest"
    always_on                 = false
    use_32_bit_worker_process = true
  }

}