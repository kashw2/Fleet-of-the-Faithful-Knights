resource "azurerm_app_service_managed_certificate" "panel_certificate" {
  custom_hostname_binding_id = var.panel_binding_id
}

resource "azurerm_app_service_managed_certificate" "api_certificate" {
  custom_hostname_binding_id = var.api_binding_id
}

resource "azurerm_app_service_managed_certificate" "onboarding_certificate" {
  custom_hostname_binding_id = var.onboarding_binding_id
}

resource "azurerm_app_service_certificate_binding" "panel" {
  hostname_binding_id = var.panel_binding_id
  certificate_id      = azurerm_app_service_managed_certificate.panel_certificate.id
  ssl_state           = "SniEnabled"
}

resource "azurerm_app_service_certificate_binding" "api" {
  hostname_binding_id = var.api_binding_id
  certificate_id      = azurerm_app_service_managed_certificate.api_certificate.id
  ssl_state           = "SniEnabled"
}

resource "azurerm_app_service_certificate_binding" "onboarding" {
  hostname_binding_id = var.onboarding_binding_id
  certificate_id      = azurerm_app_service_managed_certificate.onboarding_certificate.id
  ssl_state           = "SniEnabled"
}